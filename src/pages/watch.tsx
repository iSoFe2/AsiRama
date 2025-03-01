import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { SiteNavbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { getMovieById } from "../data/movies";
import { Button, Card, CardBody, Tabs, Tab, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get('episode');
  const navigate = useNavigate();
  const content = getMovieById(id || "");

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center" dir="rtl">
        <h1 className="text-2xl mb-4">المحتوى غير موجود</h1>
        <Button color="primary" onPress={() => navigate("/")}>العودة للرئيسية</Button>
      </div>
    );
  }

  const handleBack = () => {
    if (content.isSeries) {
      navigate(`/series/${id}`);
    } else {
      navigate(`/movie/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl">
      <SiteNavbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="light" 
          color="default" 
          className="mb-4"
          startContent={<Icon icon="lucide:arrow-right" />}
          onPress={handleBack}
        >
          العودة
        </Button>
        
        {/* Content Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{content.title}</h1>
            {episodeId && (
              <p className="text-gray-400">
                {episodeId.replace('s', 'الموسم ').replace('e', ' - الحلقة ')}
              </p>
            )}
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Chip color="primary" variant="flat">{content.category}</Chip>
            {content.isSeries ? (
              <Chip color="secondary" variant="flat">مسلسل</Chip>
            ) : (
              <Chip color="secondary" variant="flat">فيلم</Chip>
            )}
          </div>
        </div>
        
        {/* Video Player */}
        <div className="aspect-video bg-black rounded-lg mb-6 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Icon icon="lucide:play" className="text-6xl text-white/50 mb-4" />
              <p className="text-xl">اضغط للتشغيل</p>
              <p className="text-sm text-gray-400 mt-2">(محاكاة مشغل فيديو)</p>
            </div>
          </div>
        </div>
        
        {/* Video Controls */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button 
            color="primary" 
            startContent={<Icon icon="lucide:download" />}
          >
            تحميل
          </Button>
          <Button 
            variant="flat" 
            color="default"
            startContent={<Icon icon="lucide:plus" />}
          >
            إضافة للمفضلة
          </Button>
          <Button 
            variant="flat" 
            color="default"
            startContent={<Icon icon="lucide:share-2" />}
          >
            مشاركة
          </Button>
          <Button 
            variant="flat" 
            color="default"
            startContent={<Icon icon="lucide:flag" />}
          >
            إبلاغ عن مشكلة
          </Button>
        </div>
        
        {/* Tabs for Details and Comments */}
        <Tabs aria-label="Options" color="primary" variant="underlined">
          <Tab key="details" title="التفاصيل">
            <Card className="mt-4">
              <CardBody>
                <h3 className="text-xl font-bold mb-4">عن {content.isSeries ? "المسلسل" : "الفيلم"}</h3>
                <p className="text-gray-300 mb-4">{content.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><span className="text-gray-400">العنوان: </span>{content.title}</p>
                    <p className="mb-2"><span className="text-gray-400">سنة الإنتاج: </span>{content.year}</p>
                    <p className="mb-2"><span className="text-gray-400">التصنيف: </span>{content.category}</p>
                    {content.duration && (
                      <p className="mb-2"><span className="text-gray-400">المدة: </span>{content.duration}</p>
                    )}
                  </div>
                  <div>
                    <p className="mb-2"><span className="text-gray-400">اللغة: </span>{content.language || "غير متوفر"}</p>
                    <p className="mb-2"><span className="text-gray-400">المخرج: </span>{content.director || "غير متوفر"}</p>
                    <p className="mb-2"><span className="text-gray-400">التقييم: </span>{content.rating}/10</p>
                    {content.isSeries && content.seasons && (
                      <p className="mb-2"><span className="text-gray-400">عدد المواسم: </span>{content.seasons}</p>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          
          <Tab key="comments" title="التعليقات">
            <Card className="mt-4">
              <CardBody>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <Icon icon="lucide:user" className="text-gray-300" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="أضف تعليقًا..." 
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button color="primary" isIconOnly>
                    <Icon icon="lucide:send" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Sample Comments */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center">
                      <Icon icon="lucide:user" className="text-gray-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">أحمد محمد</span>
                        <span className="text-xs text-gray-400">منذ 3 ساعات</span>
                      </div>
                      <p className="text-gray-300">محتوى رائع جدًا! استمتعت بمشاهدته كثيرًا.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center">
                      <Icon icon="lucide:user" className="text-gray-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">سارة أحمد</span>
                        <span className="text-xs text-gray-400">منذ 5 ساعات</span>
                      </div>
                      <p className="text-gray-300">أداء الممثلين كان مميزًا، أنصح الجميع بالمشاهدة!</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center">
                      <Icon icon="lucide:user" className="text-gray-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">محمود علي</span>
                        <span className="text-xs text-gray-400">منذ يوم</span>
                      </div>
                      <p className="text-gray-300">القصة مشوقة والإخراج متميز، من أفضل ما شاهدت هذا العام.</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}