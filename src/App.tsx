import React from "react";
import { Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { VideoBackground } from "./components/video-background";
import { CountdownTimer } from "./components/countdown-timer";
import { NewsletterForm } from "./components/newsletter-form";
import { SocialIcons } from "./components/social-icons";
import { FeatureCard } from "./components/feature-card";

export default function App() {
  // In a real app, this would be a real video URL
  const videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4";

  const features = [
    {
      icon: "lucide:film",
      title: "أفلام حصرية",
      description: "الوصول إلى آلاف الأفلام الحصرية من جميع أنحاء العالم."
    },
    {
      icon: "lucide:tv",
      title: "مسلسلات تلفزيونية",
      description: "شاهد مسلسلاتك المفضلة مع إضافة حلقات جديدة بانتظام."
    },
    {
      icon: "lucide:download",
      title: "تحميل ومشاهدة",
      description: "قم بتحميل المحتوى لمشاهدته دون اتصال بالإنترنت في أي وقت وأي مكان."
    },
    {
      icon: "lucide:devices",
      title: "متعدد الأجهزة",
      description: "شاهد على التلفزيون أو الكمبيوتر أو الجهاز اللوحي أو الهاتف الذكي بسلاسة."
    }
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden" dir="rtl">
      <VideoBackground videoSrc={videoSrc} />
      
      <div className="relative z-20 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:film" className="text-danger text-3xl" />
            <h1 className="text-2xl font-bold">آسيراما</h1>
          </div>
          <div className="flex gap-4">
            <Button 
              as="a" 
              href="#features" 
              variant="flat" 
              className="bg-black/30 backdrop-blur-md border-white/10"
            >
              المميزات
            </Button>
            <Button 
              as="a" 
              href="#" 
              color="danger"
              startContent={<Icon icon="lucide:arrow-left" />}
            >
              الوصول المبكر
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 lg:py-32">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            وجهتك النهائية للترفيه
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-8">
            أفلام ومسلسلات تلفزيونية غير محدودة والمزيد. قريباً على شاشاتكم.
          </p>
          
          <CountdownTimer className="mb-10" />
          
          <div className="w-full max-w-md mb-8">
            <p className="mb-4 text-white/80">
              كن أول من يعرف عند إطلاق الموقع:
            </p>
            <NewsletterForm />
          </div>
          
          <SocialIcons />
        </section>

        <Divider className="my-16 bg-white/10" />

        {/* Features Section */}
        <section id="features" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            لماذا تختار <span className="text-danger">آسيراما</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard 
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 mt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:film" className="text-danger text-2xl" />
              <span className="text-xl font-bold">آسيراما</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-white/70 hover:text-white">عن الموقع</a>
              <a href="#" className="text-white/70 hover:text-white">اتصل بنا</a>
              <a href="#" className="text-white/70 hover:text-white">الشروط</a>
              <a href="#" className="text-white/70 hover:text-white">الخصوصية</a>
            </div>
            
            <SocialIcons />
          </div>
          <p className="text-center text-white/50 mt-8">
            © {new Date().getFullYear()} آسيراما. جميع الحقوق محفوظة.
          </p>
        </footer>
      </div>
    </div>
  );
}