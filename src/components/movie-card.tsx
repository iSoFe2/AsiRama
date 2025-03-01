import React from "react";
import { Card, CardBody, CardFooter, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  id: string;
  title: string;
  year: number;
  rating: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  isSeries?: boolean;
}

export function MovieCard({ id, title, year, rating, imageUrl, category, isNew = false, isSeries = false }: MovieCardProps) {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    if (isSeries) {
      navigate(`/series/${id}`);
    } else {
      navigate(`/movie/${id}`);
    }
  };

  const handleWatchNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/watch/${id}`);
  };

  return (
    <Card 
      isPressable 
      className="w-full h-[280px] sm:h-[300px] md:h-[320px] overflow-hidden"
      classNames={{
        base: "group",
      }}
      onPress={handleMovieClick}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>
      
      {isNew && (
        <Chip 
          color="primary" 
          variant="solid" 
          className="absolute top-2 right-2 z-20"
          size="sm"
        >
          جديد
        </Chip>
      )}
      
      <CardBody className="absolute bottom-0 z-10 p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/70 text-xs sm:text-sm">{year}</span>
              <span className="text-white/70 text-xs sm:text-sm">•</span>
              <span className="text-white/70 text-xs sm:text-sm">{category}</span>
            </div>
          </div>
          <div className="flex items-center bg-yellow-500/90 px-2 py-1 rounded-md">
            <Icon icon="lucide:star" className="text-white text-xs sm:text-sm mr-1" />
            <span className="text-white font-medium text-xs sm:text-sm">{rating}</span>
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="absolute inset-0 justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/60 backdrop-blur-sm">
        <Button 
          color="primary"
          endContent={<Icon icon="lucide:play" />}
          onPress={handleWatchNow}
        >
          شاهد الآن
        </Button>
      </CardFooter>
    </Card>
  );
}