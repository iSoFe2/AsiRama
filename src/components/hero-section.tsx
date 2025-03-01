import React from "react";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  const handleWatchNow = () => {
    navigate("/movie/1"); // Navigate to featured movie
  };

  const handleBrowseContent = () => {
    navigate("/movies"); // Navigate to movies page
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          filter: "brightness(0.4)"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <Card className="w-full max-w-3xl bg-black/50 border-none shadow-xl backdrop-blur-sm">
          <CardBody className="flex flex-col items-center text-center gap-4 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              شاهد أحدث الأفلام والمسلسلات
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-md">
              استمتع بمشاهدة أحدث الأفلام والمسلسلات العربية والأجنبية بجودة عالية
            </p>
            <div className="flex gap-3 sm:gap-4 mt-4">
              <Button 
                color="primary" 
                size="md"
                endContent={<Icon icon="lucide:play" />}
                onPress={handleWatchNow}
              >
                شاهد الآن
              </Button>
              <Button 
                variant="bordered" 
                color="default"
                size="md"
                className="text-white border-white/50"
                onPress={handleBrowseContent}
              >
                تصفح المحتوى
              </Button>
            </div>
          </CardBody>
          <CardFooter className="flex justify-center gap-4 sm:gap-8 pb-6 pt-0">
            <div className="flex flex-col items-center">
              <span className="text-white font-bold text-lg sm:text-xl">+1000</span>
              <span className="text-white/70 text-xs sm:text-sm">فيلم</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-bold text-lg sm:text-xl">+500</span>
              <span className="text-white/70 text-xs sm:text-sm">مسلسل</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-bold text-lg sm:text-xl">HD</span>
              <span className="text-white/70 text-xs sm:text-sm">جودة عالية</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}