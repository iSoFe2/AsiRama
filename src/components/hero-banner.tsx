import React from "react";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Movie } from "../data/movies";

interface HeroBannerProps {
  movie: Movie;
}

export function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[85vh] md:h-[70vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdropImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent md:bg-gradient-to-r md:from-black md:via-black/70 md:to-transparent" />
      </div>
      
      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-12 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{movie.title}</h1>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-white/80">{movie.year}</span>
          <span className="text-white/80">{movie.duration}</span>
          <span className="px-2 py-1 text-xs bg-red-600 text-white rounded-md">
            {movie.rating.toFixed(1)}
          </span>
        </div>
        <p className="text-white/80 text-lg max-w-2xl mb-6 line-clamp-3">
          {movie.description}
        </p>
        <div className="flex gap-4 pb-8 md:pb-0">
          <Button 
            as={Link}
            to={`/watch/${movie.id}`}
            color="danger" 
            startContent={<Icon icon="lucide:play" />}
            className="flex-1 md:flex-none"
          >
            Play
          </Button>
          <Button 
            as={Link}
            to={`/details/${movie.id}`}
            variant="bordered" 
            color="default"
            startContent={<Icon icon="lucide:info" />}
            className="flex-1 md:flex-none"
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
}