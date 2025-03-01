import React from "react";
import { getMovies } from "../data/movies";
import { MovieCard } from "../components/movie-card";
import { Tabs, Tab } from "@heroui/react";

export function MoviesPage() {
  const movies = getMovies();
  const [selectedGenre, setSelectedGenre] = React.useState("all");
  
  const genres = ["all", ...new Set(movies.flatMap(movie => movie.genre.map(g => g.toLowerCase())))];
  
  const filteredMovies = selectedGenre === "all" 
    ? movies.filter(movie => movie.type === "movie")
    : movies.filter(movie => 
        movie.type === "movie" && 
        movie.genre.some(g => g.toLowerCase() === selectedGenre)
      );
  
  return (
    <div className="min-h-screen bg-black pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-16 pt-20">
        <h1 className="text-3xl font-bold text-white mb-4">Movies</h1>
        
        <Tabs 
          selectedKey={selectedGenre} 
          onSelectionChange={(key) => setSelectedGenre(key as string)}
          color="danger"
          variant="underlined"
          classNames={{
            tabList: "bg-transparent overflow-x-auto",
            cursor: "bg-danger",
            tab: "text-white/70 data-[selected=true]:text-white capitalize"
          }}
        >
          {genres.map((genre) => (
            <Tab key={genre} title={genre === "all" ? "All Movies" : genre} />
          ))}
        </Tabs>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="aspect-[2/3]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}