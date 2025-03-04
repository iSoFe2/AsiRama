import React from "react";

interface VideoBackgroundProps {
  videoSrc: string;
}

export function VideoBackground({ videoSrc }: VideoBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}