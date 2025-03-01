import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SiteNavbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { getMovieById, Movie, allMovies } from "../data/movies";
import { Button, Card, CardBody, Chip, Divider, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { MovieCard } from "../components/movie-card";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = getMovieById(id || "");
  
  // Get similar movies (same category)
  const similarMovies = allMovies
    .filter(m => m.category === movie?.category && m.id !== movie?.id)
    .slice(0, 5);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center" dir="rtl">
        <h1 className="text-2xl mb-4">الفيلم غير موجود</h1>
        <Button color="primary" onPress={() => navigate("/")}>العودة للرئيسية</Button>
      </div>
    );
  }

  const handleWatchNow = () => {
    navigate(`/watch/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl">
      <SiteNavbar />
      
      <main>
        {/* Hero Section with Movie Details */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('${movie.imageUrl}')`,
              filter: "brightness(0.3)"
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Movie Poster */}
              <div className="w-full md:w-1/4 lg:w-1/5">
                <img style="width: 100%; height: 500px; object-fit: cover;" 
                  src={movie.imageUrl} 
                  alt={movie.title} 
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
              
              {/* Movie Info */}
              <div className="w-full md:w-3/4 lg:w-4/5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Chip color="primary" variant="flat">{movie.category}</Chip>
                  {movie.isNew && <Chip color="success" variant="flat">جديد</Chip>}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Icon icon="lucide:star" className="text-yellow-500 mr-1" />
                    <span>{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon="lucide:calendar" className="text-gray-400 mr-1" />
                    <span>{movie.year}</span>
                  </div>
                  {movie.duration && (
                    <div className="flex items-center">
                      <Icon icon="lucide:clock" className="text-gray-400 mr-1" />
                      <span>{movie.duration}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 mb-6 max-w-3xl">{movie.description}</p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button 
                    color="primary" 
                    size="lg"
                    endContent={<Icon icon="lucide:play" />}
                    onPress={handleWatchNow}
                  >
                    مشاهدة الآن
                  </Button>
                  <Button 
                    variant="bordered" 
                    color="default"
                    size="lg"
                    className="text-white border-white/50"
                    startContent={<Icon icon="lucide:plus" />}
                  >
                    إضافة للمفضلة
                  </Button>
                  <Button 
                    variant="flat" 
                    color="default"
                    size="lg"
                    className="text-white"
                    startContent={<Icon icon="lucide:share-2" />}
                  >
                    مشاركة
                  </Button>
                </div>
                
                {movie.director && (
                  <div className="mb-2">
                    <span className="text-gray-400">المخرج: </span>
                    <span className="text-white">{movie.director}</span>
                  </div>
                )}
                
                {movie.actors && movie.actors.length > 0 && (
                  <div>
                    <span className="text-gray-400">الممثلون: </span>
                    <span className="text-white">{movie.actors.join('، ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="container mx-auto px-4 py-8">
          <Tabs aria-label="Movie Options" color="primary" variant="underlined">
            <Tab key="about" title="عن الفيلم">
              <Card className="mt-4">
                <CardBody>
                  <h3 className="text-xl font-bold mb-4">تفاصيل الفيلم</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="mb-2"><span className="text-gray-400">العنوان: </span>{movie.title}</p>
                      <p className="mb-2"><span className="text-gray-400">سنة الإنتاج: </span>{movie.year}</p>
                      <p className="mb-2"><span className="text-gray-400">التصنيف: </span>{movie.category}</p>
                      <p className="mb-2"><span className="text-gray-400">المدة: </span>{movie.duration || "غير متوفر"}</p>
                    </div>
                    <div>
                      <p className="mb-2"><span className="text-gray-400">اللغة: </span>{movie.language || "غير متوفر"}</p>
                      <p className="mb-2"><span className="text-gray-400">المخرج: </span>{movie.director || "غير متوفر"}</p>
                      <p className="mb-2"><span className="text-gray-400">التقييم: </span>{movie.rating}/10</p>
                    </div>
                  </div>
                  
                  <Divider className="my-4" />
                  
                  <h3 className="text-xl font-bold mb-4">القصة</h3>
                  <p className="text-gray-300">{movie.description}</p>
                  
                  <Divider className="my-4" />
                  
                  <h3 className="text-xl font-bold mb-4">طاقم التمثيل</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.actors && movie.actors.map((actor, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                          <Icon icon="lucide:user" className="text-gray-300" />
                        </div>
                        <span>{actor}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Tab>
            
            <Tab key="trailer" title="الإعلان">
              <Card className="mt-4">
                <CardBody>
                  <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                    {movie.trailerUrl ? (
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={movie.trailerUrl.replace('watch?v=', 'embed/')} 
                        title={`${movie.title} Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      ></iframe>
                    ) : (
                      <div className="text-center">
                        <Icon icon="lucide:video-off" className="text-4xl text-gray-500 mb-2" />
                        <p>الإعلان غير متوفر</p>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
        
        {/* Similar Movies */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-bold mb-4">أفلام مشابهة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {similarMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}