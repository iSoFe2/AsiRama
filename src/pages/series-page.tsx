import React from "react";
import { getSeries } from "../data/movies";
import { MovieCard } from "../components/movie-card";
import { Tabs, Tab } from "@heroui/react";

export function SeriesPage() {
  const series = getSeries();
  const [selectedGenre, setSelectedGenre] = React.useState("all");
  
  const genres = ["all", ...new Set(series.flatMap(show => show.genre.map(g => g.toLowerCase())))];
  
  const filteredSeries = selectedGenre === "all" 
    ? series
    : series.filter(show => 
        show.genre.some(g => g.toLowerCase() === selectedGenre)
      );
  
  return (
    <div className="min-h-screen bg-black pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-16 pt-20">
        <h1 className="text-3xl font-bold text-white mb-4">TV Shows</h1>
        
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
            <Tab key={genre} title={genre === "all" ? "All Shows" : genre} />
          ))}
        </Tabs>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
          {filteredSeries.map((show) => (
            <div key={show.id} className="aspect-[2/3]">
              <MovieCard movie={show} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}