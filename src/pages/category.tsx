import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SiteNavbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { MovieCard } from "../components/movie-card";
import { getMoviesByCategory } from "../data/movies";
import { Button, Pagination } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 20;
  
  // Get content for this category
  const categoryContent = getMoviesByCategory(category || "");
  
  // Calculate pagination
  const totalPages = Math.ceil(categoryContent.length / itemsPerPage);
  const currentItems = categoryContent.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Category name mapping
  const getCategoryName = (key: string): string => {
    const categories: Record<string, string> = {
      "action": "أكشن",
      "comedy": "كوميدي",
      "drama": "دراما",
      "horror": "رعب",
      "romance": "رومانسي",
      "adventure": "مغامرة",
      "mystery": "غموض",
      "most-watched": "الأكثر مشاهدة",
      "latest": "الأحدث"
    };
    
    return categories[key] || key;
  };
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center" dir="rtl">
        <h1 className="text-2xl mb-4">التصنيف غير موجود</h1>
        <Button color="primary" onPress={() => navigate("/")}>العودة للرئيسية</Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl">
      <SiteNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="light" 
            isIconOnly
            onPress={() => navigate(-1)}
          >
            <Icon icon="lucide:arrow-right" />
          </Button>
          <h1 className="text-3xl font-bold">{getCategoryName(category)}</h1>
        </div>
        
        {/* Content Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
            {currentItems.map((item) => (
              <MovieCard key={item.id} {...item} isSeries={!!item.isSeries} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon icon="lucide:file-off" className="text-5xl text-gray-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">لا يوجد محتوى</h3>
            <p className="text-gray-400">لم يتم العثور على محتوى في هذا التصنيف</p>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
              showControls
              color="primary"
            />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}