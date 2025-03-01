import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { VideoPlayer } from "../components/video-player";
import { getMovieById } from "../data/movies";

export function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get("episode");
  const navigate = useNavigate();
  
  const movie = id ? getMovieById(id) : undefined;
  
  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-white">Movie not found</p>
      </div>
    );
  }
  
  let videoUrl = movie.videoUrl;
  let videoTitle = movie.title;
  
  // If it's a series and an episode is specified
  if (movie.type === "series" && episodeId && movie.seasons) {
    for (const season of movie.seasons) {
      const episode = season.episodes.find(ep => ep.id === episodeId);
      if (episode) {
        videoUrl = episode.videoUrl;
        videoTitle = `${movie.title} - ${episode.title}`;
        break;
      }
    }
  }
  
  const handleVideoEnded = () => {
    // Navigate back to details page when video ends
    navigate(`/details/${id}`);
  };
  
  return (
    <VideoPlayer 
      videoUrl={videoUrl} 
      title={videoTitle} 
      onEnded={handleVideoEnded}
    />
  );
}