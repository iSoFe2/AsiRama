import React from "react";
import { SiteNavbar } from "../components/navbar";
import { HeroSection } from "../components/hero-section";
import { SectionHeader } from "../components/section-header";
import { MovieCard } from "../components/movie-card";
import { Footer } from "../components/footer";
import { featuredMovies, latestMovies, popularSeries } from "../data/movies";
import { Tabs, Tab, Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription");
    alert("تم الاشتراك في النشرة البريدية بنجاح!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl">
      <SiteNavbar />
      
      <main>
        <HeroSection />
        
        <div className="container mx-auto px-4 py-8">
          {/* Featured Movies */}
          <section className="mb-12">
            <SectionHeader 
              title="أفلام مميزة" 
              showViewAll={true} 
              onViewAll={() => navigate("/movies")}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {featuredMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </section>
          
          {/* Latest Movies & Series */}
          <section className="mb-12">
            <Tabs aria-label="Options" color="primary" variant="underlined">
              <Tab key="movies" title="أحدث الأفلام">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-4">
                  {latestMovies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              </Tab>
              <Tab key="series" title="أحدث المسلسلات">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-4">
                  {popularSeries.map((series) => (
                    <MovieCard key={series.id} {...series} isSeries={true} />
                  ))}
                </div>
              </Tab>
            </Tabs>
          </section>
          
          {/* Popular Series */}
          <section className="mb-12">
            <SectionHeader 
              title="مسلسلات شائعة" 
              showViewAll={true}
              onViewAll={() => navigate("/series")}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {popularSeries.map((series) => (
                <MovieCard key={series.id} {...series} isSeries={true} />
              ))}
            </div>
          </section>
          
          {/* Newsletter */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-none shadow-xl">
              <CardBody className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
                <div className="text-center md:text-right">
                  <h3 className="text-2xl font-bold mb-2">اشترك في النشرة البريدية</h3>
                  <p className="text-white/80">
                    احصل على إشعارات بأحدث الأفلام والمسلسلات فور إضافتها
                  </p>
                </div>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <input 
                    type="email" 
                    placeholder="أدخل بريدك الإلكتروني" 
                    className="px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <Button 
                    color="primary"
                    endContent={<Icon icon="lucide:send" />}
                    type="submit"
                  >
                    اشترك الآن
                  </Button>
                </form>
              </CardBody>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}