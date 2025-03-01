import React from "react";
import ReactPlayer from "react-player";
import { Button, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onEnded?: () => void;
}

export function VideoPlayer({ videoUrl, title, onEnded }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [volume, setVolume] = React.useState(0.5);
  const [played, setPlayed] = React.useState(0);
  const [seeking, setSeeking] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const [isBuffering, setIsBuffering] = React.useState(true);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showSubtitles, setShowSubtitles] = React.useState(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
  const [showDoubleTapIndicator, setShowDoubleTapIndicator] = React.useState<'left' | 'right' | null>(null);
  
  const playerRef = React.useRef<ReactPlayer>(null);
  const playerContainerRef = React.useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const doubleTapTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat((e.target as HTMLInputElement).value));
    }
  };

  const handleProgress = (state: { played: number; buffered: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleBuffer = () => {
    setIsBuffering(true);
  };

  const handleBufferEnd = () => {
    setIsBuffering(false);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDoubleTap = (direction: 'left' | 'right') => {
    if (!playerRef.current) return;
    
    const currentTime = playerRef.current.getCurrentTime();
    const duration = playerRef.current.getDuration();
    
    // Show visual indicator
    setShowDoubleTapIndicator(direction);
    
    if (doubleTapTimeoutRef.current) {
      clearTimeout(doubleTapTimeoutRef.current);
    }
    
    doubleTapTimeoutRef.current = setTimeout(() => {
      setShowDoubleTapIndicator(null);
    }, 800);
    
    if (direction === 'left') {
      // Rewind 10 seconds
      playerRef.current.seekTo(Math.max(0, currentTime - 10));
    } else {
      // Forward 10 seconds
      playerRef.current.seekTo(Math.min(duration, currentTime + 10));
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    
    return `${mm}:${ss}`;
  };

  const duration = playerRef.current ? playerRef.current.getDuration() : 0;
  const currentTime = duration * played;

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (doubleTapTimeoutRef.current) {
        clearTimeout(doubleTapTimeoutRef.current);
      }
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Subtitles options
  const subtitlesOptions = [
    { key: "english", label: "English" },
    { key: "spanish", label: "Spanish" },
    { key: "french", label: "French" },
    { key: "arabic", label: "Arabic" },
    { key: "off", label: "Off" }
  ];

  // Playback speed options
  const playbackSpeedOptions = [
    { key: 0.5, label: "0.5x" },
    { key: 0.75, label: "0.75x" },
    { key: 1, label: "Normal" },
    { key: 1.25, label: "1.25x" },
    { key: 1.5, label: "1.5x" },
    { key: 2, label: "2x" }
  ];

  // Quality options
  const qualityOptions = [
    { key: "auto", label: "Auto" },
    { key: "1080p", label: "1080p" },
    { key: "720p", label: "720p" },
    { key: "480p", label: "480p" },
    { key: "360p", label: "360p" }
  ];

  return (
    <div 
      ref={playerContainerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseMove}
    >
      <Button 
        isIconOnly
        className="absolute top-4 left-4 z-50 bg-black/50 text-white"
        onClick={() => navigate(-1)}
      >
        <Icon icon="lucide:arrow-left" className="text-xl" />
      </Button>
      
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Spinner color="danger" size="lg" />
        </div>
      )}
      
      {/* Double tap indicators */}
      {showDoubleTapIndicator === 'left' && (
        <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-black/70 rounded-full p-6 animate-pulse">
          <Icon icon="lucide:rewind-10" className="text-white text-4xl" />
        </div>
      )}
      
      {showDoubleTapIndicator === 'right' && (
        <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-30 bg-black/70 rounded-full p-6 animate-pulse">
          <Icon icon="lucide:fast-forward-10" className="text-white text-4xl" />
        </div>
      )}
      
      {/* Double tap areas for seeking */}
      <div className="absolute inset-0 z-10 flex pointer-events-none">
        <div 
          className="w-1/2 h-full pointer-events-auto"
          onDoubleClick={() => handleDoubleTap('left')}
        />
        <div 
          className="w-1/2 h-full pointer-events-auto"
          onDoubleClick={() => handleDoubleTap('right')}
        />
      </div>
      
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="100%"
        playing={isPlaying}
        volume={volume}
        playbackRate={playbackSpeed}
        onProgress={handleProgress}
        onEnded={onEnded}
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
        progressInterval={1000}
        style={{ position: 'absolute', top: 0, left: 0 }}
        playsinline={true}
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous"
            },
            tracks: showSubtitles ? [
              {kind: 'subtitles', src: '/subtitles/english.vtt', srcLang: 'en', default: true}
            ] : []
          }
        }}
      />
      
      {/* Video Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100 z-40' : 'opacity-0 z-0'}`}
      >
        <div className="flex flex-col gap-2 max-w-7xl mx-auto">
          <h2 className="text-white text-lg font-medium">{title}</h2>
          
          {/* Progress Bar */}
          <div className="w-full">
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onTouchStart={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              onTouchEnd={handleSeekMouseUp as any}
              className="w-full h-2 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600"
            />
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                isIconOnly 
                variant="light" 
                onClick={handlePlayPause}
                className="text-white"
              >
                <Icon icon={isPlaying ? "lucide:pause" : "lucide:play"} className="text-xl" />
              </Button>
              
              <Button 
                isIconOnly 
                variant="light"
                className="text-white"
                onClick={() => {
                  if (playerRef.current) {
                    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
                  }
                }}
              >
                <Icon icon="lucide:skip-forward" className="text-xl" />
              </Button>
              
              <div className="hidden md:flex items-center gap-2 text-white">
                <Icon icon="lucide:volume-2" className="text-xl" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </div>
              
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Subtitles Dropdown */}
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    isIconOnly 
                    variant="light"
                    className="text-white"
                  >
                    <Icon icon="lucide:subtitles" className={`text-xl ${showSubtitles ? 'text-red-500' : ''}`} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Subtitles" 
                  variant="flat"
                  onAction={(key) => {
                    if (key === "off") {
                      setShowSubtitles(false);
                    } else {
                      setShowSubtitles(true);
                    }
                  }}
                >
                  {subtitlesOptions.map((option) => (
                    <DropdownItem key={option.key}>{option.label}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              
              {/* Settings Dropdown */}
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    isIconOnly 
                    variant="light"
                    className="text-white"
                  >
                    <Icon icon="lucide:settings" className="text-xl" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Settings" variant="flat">
                  <DropdownItem key="quality" className="font-bold">Quality</DropdownItem>
                  {qualityOptions.map((option) => (
                    <DropdownItem key={option.key} className="pl-6">{option.label}</DropdownItem>
                  ))}
                  <DropdownItem key="speed" className="font-bold">Playback Speed</DropdownItem>
                  {playbackSpeedOptions.map((option) => (
                    <DropdownItem 
                      key={option.key} 
                      className={`pl-6 ${playbackSpeed === option.key ? 'text-red-500' : ''}`}
                      onPress={() => setPlaybackSpeed(option.key as number)}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              
              <Button 
                isIconOnly 
                variant="light"
                className="text-white"
                onClick={toggleFullscreen}
              >
                <Icon icon={isFullscreen ? "lucide:minimize" : "lucide:maximize"} className="text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}