import React from "react";
import { SiteNavbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { MovieCard } from "../components/movie-card";
import { allMovies } from "../data/movies";
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Pagination } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const moviesPerPage = 20;
  
  // Filter movies based on search and category
  const filteredMovies = allMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || movie.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory && !movie.isSeries;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );
  
  const categories = [
    { key: "all", name: "جميع الأفلام" },
    { key: "action", name: "أكشن" },
    { key: "drama", name: "دراما" },
    { key: "comedy", name: "كوميدي" },
    { key: "horror", name: "رعب" },
    { key: "romance", name: "رومانسي" },
    { key: "adventure", name: "مغامرة" },
    { key: "mystery", name: "غموض" }
  ];
  
  const handleCategorySelect = (key: React.Key) => {
    setSelectedCategory(key as string);
    setCurrentPage(1);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by state change
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl">
      <SiteNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">أفلام</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <form onSubmit={handleSearch} className="w-full md:w-auto">
            <Input
              placeholder="ابحث عن فيلم..."
              startContent={<Icon icon="lucide:search" />}
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="w-full md:w-64"
            />
          </form>
          
          <div className="flex flex-wrap gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  endContent={<Icon icon="lucide:chevron-down" />}
                >
                  {categories.find(cat => cat.key === selectedCategory)?.name || "جميع الأفلام"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Categories"
                onAction={handleCategorySelect}
                selectedKeys={[selectedCategory]}
                selectionMode="single"
              >
                {categories.map((category) => (
                  <DropdownItem key={category.key}>{category.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            
            <Button 
              variant="flat" 
              endContent={<Icon icon="lucide:chevron-down" />}
            >
              الأحدث
            </Button>
          </div>
        </div>
        
        {/* Movies Grid */}
        {currentMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
            {currentMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon icon="lucide:film-off" className="text-5xl text-gray-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">لا توجد أفلام</h3>
            <p className="text-gray-400">لم يتم العثور على أفلام مطابقة لبحثك</p>
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