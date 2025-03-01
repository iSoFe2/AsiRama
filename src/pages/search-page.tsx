import React from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies } from "../data/movies";
import { MovieCard } from "../components/movie-card";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const allContent = getMovies();
  
  const filteredContent = allContent.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
        <p className="text-white/70 mb-8">Found {filteredContent.length} results for "{query}"</p>
        
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredContent.map((item) => (
              <div key={item.id} className="aspect-[2/3]">
                <MovieCard movie={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-white text-xl">No results found for "{query}"</p>
            <p className="text-white/70 mt-2">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
}