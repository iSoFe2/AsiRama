import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Chip, Tabs, Tab, Card, CardBody, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { getMovieById, getMoviesByCategory, Movie, Episode } from "../data/movies";

export function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = React.useState<Movie | undefined>(undefined);
  const [selectedSeason, setSelectedSeason] = React.useState<string>("s1");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        const foundMovie = getMovieById(id);
        setMovie(foundMovie);
        
        if (foundMovie?.seasons && foundMovie.seasons.length > 0) {
          setSelectedSeason(foundMovie.seasons[0].id);
        }
        setIsLoading(false);
      }, 800);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-white">Content not found</p>
      </div>
    );
  }

  const currentSeason = movie.type === "series" 
    ? movie.seasons?.find(season => season.id === selectedSeason) 
    : undefined;

  return (
    <div className="min-h-screen bg-black pb-16 md:pb-0">
      {/* Hero Section - Fixed the padding to avoid navbar overlap */}
      <div className="relative w-full h-[50vh] overflow-hidden pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdropImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        
        <div className="relative z-10 flex h-full p-6 md:p-12">
          <div className="hidden md:block w-64 h-96 overflow-hidden rounded-lg shadow-xl">
            <img style="width: 100%; height: 500px; object-fit: cover;" 
              src={movie.posterImage} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center md:ml-8 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="text-white/80">{movie.year}</span>
              <span className="text-white/80">{movie.duration}</span>
              <Chip color="danger" variant="flat">
                {movie.rating.toFixed(1)}
              </Chip>
              {movie.genre.map((genre) => (
                <Chip key={genre} variant="flat" className="text-white/80">
                  {genre}
                </Chip>
              ))}
            </div>
            <p className="text-white/80 text-lg mb-6">
              {movie.description}
            </p>
            <div className="flex gap-4">
              <Button 
                as={Link}
                to={`/watch/${movie.id}`}
                color="danger" 
                startContent={<Icon icon="lucide:play" />}
                className="flex-1 md:flex-none"
              >
                {movie.type === "movie" ? "Watch Movie" : "Watch Now"}
              </Button>
              <Button 
                variant="bordered" 
                color="default"
                startContent={<Icon icon="lucide:plus" />}
                className="flex-1 md:flex-none"
              >
                Add to My List
              </Button>
              <Button 
                variant="bordered" 
                color="default"
                isIconOnly
                className="md:flex-none"
              >
                <Icon icon="lucide:download" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {movie.type === "series" && movie.seasons && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Episodes</h2>
            
            <Tabs 
              selectedKey={selectedSeason} 
              onSelectionChange={(key) => setSelectedSeason(key as string)}
              color="danger"
              variant="underlined"
              classNames={{
                tabList: "bg-transparent",
                cursor: "bg-danger",
                tab: "text-white/70 data-[selected=true]:text-white"
              }}
            >
              {movie.seasons.map((season) => (
                <Tab key={season.id} title={season.name} />
              ))}
            </Tabs>
            
            <div className="mt-4 space-y-4">
              {currentSeason?.episodes.map((episode) => (
                <EpisodeCard 
                  key={episode.id} 
                  episode={episode} 
                  movieId={movie.id} 
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Similar Content Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">More Like This</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movie.genre.length > 0 && getMoviesByCategory(movie.genre[0].toLowerCase()).slice(0, 6).map((similarMovie) => {
              if (similarMovie.id === movie.id) return null;
              return (
                <div key={similarMovie.id} className="aspect-[2/3]">
                  <Card 
                    isPressable
                    as={Link}
                    to={`/details/${similarMovie.id}`}
                    className="w-full h-full overflow-hidden bg-black border-0"
                  >
                    <img 
                      src={similarMovie.posterImage} 
                      alt={similarMovie.title}
                      className="w-full h-full object-cover"
                    />
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface EpisodeCardProps {
  episode: Episode;
  movieId: string;
}

function EpisodeCard({ episode, movieId }: EpisodeCardProps) {
  return (
    <Card className="bg-gray-900 border-0">
      <CardBody>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-48 h-32 overflow-hidden rounded-lg">
            <img 
              src={episode.thumbnailUrl} 
              alt={episode.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                as={Link}
                to={`/watch/${movieId}?episode=${episode.id}`}
                isIconOnly
                color="danger"
                className="opacity-90 hover:opacity-100"
              >
                <Icon icon="lucide:play" className="text-xl" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-white">{episode.title}</h3>
              <span className="text-white/70">{episode.duration}</span>
            </div>
            <p className="text-white/70 mt-2">{episode.description}</p>
            <div className="flex gap-2 mt-3">
              <Button 
                size="sm" 
                variant="bordered"
                color="default"
                isIconOnly
              >
                <Icon icon="lucide:download" />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}