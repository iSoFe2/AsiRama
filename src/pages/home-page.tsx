import React from "react";
import { HeroBanner } from "../components/hero-banner";
import { MovieSlider } from "../components/movie-slider";
import { getFeaturedMovies, getMoviesByCategory, categories } from "../data/movies";

export function HomePage() {
  const featuredMovies = getFeaturedMovies();
  const featuredMovie = featuredMovies[Math.floor(Math.random() * featuredMovies.length)];

  return (
    <div className="min-h-screen bg-black pb-16 md:pb-0">
      <HeroBanner movie={featuredMovie} />
      
      <div className="py-4">
        {categories.map((category) => {
          const categoryMovies = getMoviesByCategory(category.id);
          
          if (categoryMovies.length === 0) return null;
          
          return (
            <MovieSlider 
              key={category.id} 
              title={category.name} 
              movies={categoryMovies} 
            />
          );
        })}
      </div>
    </div>
  );
}