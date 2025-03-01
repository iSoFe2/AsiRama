import React from "react";
import { MovieCard } from "./movie-card";
import { Movie } from "../data/movies";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="aspect-[2/3]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}