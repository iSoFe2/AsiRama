import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SiteNavbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { MovieCard } from "../components/movie-card";
import { searchMovies } from "../data/movies";
import { Button, Tabs, Tab, Pagination } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = React.useState(1);
  const [contentType, setContentType] = React.useState("all");
  const itemsPerPage = 20;
  
  // Get search results
  const searchResults = searchMovies(query);
  
  // Filter by content type
  const filteredResults = contentType === "all" 
    ? searchResults 
    : contentType === "movies" 
      ? searchResults.filter(item => !item.isSeries) 
      : searchResults.filter(item => item.isSeries);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const currentItems = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
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
          <h1 className="text-3xl font-bold">نتائج البحث: "{query}"</h1>
        </div>
        
        <div className="mb-6">
          <Tabs 
            aria-label="Content Type" 
            color="primary" 
            variant="underlined"
            selectedKey={contentType}
            onSelectionChange={(key) => {
              setContentType(key as string);
              setCurrentPage(1);
            }}
          >
            <Tab key="all" title="الكل" />
            <Tab key="movies" title="أفلام" />
            <Tab key="series" title="مسلسلات" />
          </Tabs>
        </div>
        
        {/* Results Count */}
        <p className="text-gray-400 mb-4">تم العثور على {filteredResults.length} نتيجة</p>
        
        {/* Content Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
            {currentItems.map((item) => (
              <MovieCard key={item.id} {...item} isSeries={!!item.isSeries} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon icon="lucide:search-x" className="text-5xl text-gray-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">لا توجد نتائج</h3>
            <p className="text-gray-400">لم يتم العثور على نتائج مطابقة لبحثك</p>
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