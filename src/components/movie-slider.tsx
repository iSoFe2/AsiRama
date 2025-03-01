import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { MovieCard } from "./movie-card";
import { Movie } from "../data/movies";
import "swiper/css";
import "swiper/css/free-mode";

interface MovieSliderProps {
  title: string;
  movies: Movie[];
}

export function MovieSlider({ title, movies }: MovieSliderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-4">{title}</h2>
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={12}
        freeMode={true}
        className="movie-slider"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="w-[160px] md:w-[200px]">
            <div className="aspect-[2/3]">
              <MovieCard movie={movie} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}