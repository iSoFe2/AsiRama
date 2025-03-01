import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SiteNavbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { getMovieById, Movie, popularSeries } from "../data/movies";
import { Button, Card, CardBody, Chip, Divider, Tabs, Tab, Accordion, AccordionItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { MovieCard } from "../components/movie-card";

export default function SeriesDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const series = getMovieById(id || "");
  
  // Get similar series (same category)
  const similarSeries = popularSeries
    .filter(s => s.category === series?.category && s.id !== series?.id)
    .slice(0, 5);

  // Generate fake episodes for demo
  const generateEpisodes = (seasonNum: number, episodeCount: number) => {
    return Array.from({ length: episodeCount }, (_, i) => ({
      id: `s${seasonNum}e${i + 1}`,
      title: `الحلقة ${i + 1}`,
      duration: "45 دقيقة",
      description: `وصف الحلقة ${i + 1} من الموسم ${seasonNum}`
    }));
  };

  // Generate seasons based on series data
  const seasons = series?.seasons 
    ? Array.from({ length: series.seasons }, (_, i) => ({
        number: i + 1,
        episodes: generateEpisodes(i + 1, Math.floor(Math.random() * 10) + 5)
      }))
    : [];

  if (!series || !series.isSeries) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center" dir="rtl">
        <h1 className="text-2xl mb-4">المسلسل غير موجود</h1>
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
        {/* Hero Section with Series Details */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('${series.imageUrl}')`,
              filter: "brightness(0.3)"
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Series Poster */}
              <div className="w-full md:w-1/4 lg:w-1/5">
                <img style="width: 100%; height: 500px; object-fit: cover;" 
                  src={series.imageUrl} 
                  alt={series.title} 
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
              
              {/* Series Info */}
              <div className="w-full md:w-3/4 lg:w-4/5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Chip color="primary" variant="flat">{series.category}</Chip>
                  <Chip color="secondary" variant="flat">مسلسل</Chip>
                  {series.isNew && <Chip color="success" variant="flat">جديد</Chip>}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{series.title}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Icon icon="lucide:star" className="text-yellow-500 mr-1" />
                    <span>{series.rating}/10</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon="lucide:calendar" className="text-gray-400 mr-1" />
                    <span>{series.year}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon="lucide:layers" className="text-gray-400 mr-1" />
                    <span>{series.seasons} مواسم</span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 max-w-3xl">{series.description}</p>
                
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
                
                {series.director && (
                  <div className="mb-2">
                    <span className="text-gray-400">المخرج: </span>
                    <span className="text-white">{series.director}</span>
                  </div>
                )}
                
                {series.actors && series.actors.length > 0 && (
                  <div>
                    <span className="text-gray-400">الممثلون: </span>
                    <span className="text-white">{series.actors.join('، ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="container mx-auto px-4 py-8">
          <Tabs aria-label="Series Options" color="primary" variant="underlined">
            <Tab key="episodes" title="الحلقات">
              <Card className="mt-4">
                <CardBody>
                  <Accordion>
                    {seasons.map((season) => (
                      <AccordionItem 
                        key={`season-${season.number}`} 
                        title={`الموسم ${season.number}`}
                        subtitle={`${season.episodes.length} حلقة`}
                      >
                        <div className="space-y-3 p-2">
                          {season.episodes.map((episode) => (
                            <Card key={episode.id} isPressable className="w-full">
                              <CardBody className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Button 
                                    isIconOnly 
                                    color="primary" 
                                    variant="flat" 
                                    radius="full"
                                    onPress={() => navigate(`/watch/${series.id}?episode=${episode.id}`)}
                                  >
                                    <Icon icon="lucide:play" />
                                  </Button>
                                  <div>
                                    <p className="font-medium">{episode.title}</p>
                                    <p className="text-small text-default-500">{episode.duration}</p>
                                  </div>
                                </div>
                                <Icon icon="lucide:chevron-left" className="text-default-500" />
                              </CardBody>
                            </Card>
                          ))}
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardBody>
              </Card>
            </Tab>
            
            <Tab key="about" title="عن المسلسل">
              <Card className="mt-4">
                <CardBody>
                  <h3 className="text-xl font-bold mb-4">تفاصيل المسلسل</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="mb-2"><span className="text-gray-400">العنوان: </span>{series.title}</p>
                      <p className="mb-2"><span className="text-gray-400">سنة الإنتاج: </span>{series.year}</p>
                      <p className="mb-2"><span className="text-gray-400">التصنيف: </span>{series.category}</p>
                      <p className="mb-2"><span className="text-gray-400">عدد المواسم: </span>{series.seasons}</p>
                    </div>
                    <div>
                      <p className="mb-2"><span className="text-gray-400">اللغة: </span>{series.language || "غير متوفر"}</p>
                      <p className="mb-2"><span className="text-gray-400">المخرج: </span>{series.director || "غير متوفر"}</p>
                      <p className="mb-2"><span className="text-gray-400">التقييم: </span>{series.rating}/10</p>
                      <p className="mb-2"><span className="text-gray-400">عدد الحلقات: </span>{series.episodes || "غير متوفر"}</p>
                    </div>
                  </div>
                  
                  <Divider className="my-4" />
                  
                  <h3 className="text-xl font-bold mb-4">القصة</h3>
                  <p className="text-gray-300">{series.description}</p>
                  
                  <Divider className="my-4" />
                  
                  <h3 className="text-xl font-bold mb-4">طاقم التمثيل</h3>
                  <div className="flex flex-wrap gap-4">
                    {series.actors && series.actors.map((actor, index) => (
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
                    {series.trailerUrl ? (
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={series.trailerUrl.replace('watch?v=', 'embed/')} 
                        title={`${series.title} Trailer`}
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
        
        {/* Similar Series */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-bold mb-4">مسلسلات مشابهة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {similarSeries.map((series) => (
              <MovieCard key={series.id} {...series} isSeries={true} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}