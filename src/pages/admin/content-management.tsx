import React from "react";
import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  Button, 
  Input, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Chip,
  Pagination
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { movies, Movie } from "../../data/movies";

export function ContentManagement() {
  const [searchValue, setSearchValue] = React.useState("");
  const [contentType, setContentType] = React.useState<"all" | "movie" | "series">("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedContent, setSelectedContent] = React.useState<string[]>([]);
  
  const itemsPerPage = 10;
  
  const filteredContent = React.useMemo(() => {
    return movies.filter(item => {
      // Filter by content type
      if (contentType !== "all" && item.type !== contentType) {
        return false;
      }
      
      // Filter by search term
      if (searchValue) {
        const searchLower = searchValue.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.genre.some(g => g.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
  }, [movies, contentType, searchValue]);
  
  const paginatedContent = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContent.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContent, currentPage]);
  
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  
  const handleContentTypeChange = (type: "all" | "movie" | "series") => {
    setContentType(type);
    setCurrentPage(1);
  };
  
  const handleSelectAll = () => {
    if (selectedContent.length === paginatedContent.length) {
      setSelectedContent([]);
    } else {
      setSelectedContent(paginatedContent.map(item => item.id));
    }
  };
  
  const handleSelectItem = (id: string) => {
    if (selectedContent.includes(id)) {
      setSelectedContent(selectedContent.filter(itemId => itemId !== id));
    } else {
      setSelectedContent([...selectedContent, id]);
    }
  };
  
  const getStatusColor = (rating: number) => {
    if (rating >= 8.5) return "success";
    if (rating >= 7) return "warning";
    return "danger";
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16 pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Content Management</h1>
            <p className="text-gray-400">Manage all your movies and TV shows</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button 
              as={Link}
              to="/admin/content/new"
              color="danger" 
              startContent={<Icon icon="lucide:plus" />}
            >
              Add Content
            </Button>
            <Button 
              as={Link}
              to="/admin"
              variant="bordered" 
              color="default"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search content..."
            startContent={<Icon icon="lucide:search" />}
            value={searchValue}
            onValueChange={setSearchValue}
            className="md:max-w-xs"
          />
          
          <div className="flex gap-2">
            <Button 
              variant={contentType === "all" ? "solid" : "bordered"} 
              color={contentType === "all" ? "primary" : "default"}
              onClick={() => handleContentTypeChange("all")}
            >
              All
            </Button>
            <Button 
              variant={contentType === "movie" ? "solid" : "bordered"} 
              color={contentType === "movie" ? "primary" : "default"}
              onClick={() => handleContentTypeChange("movie")}
            >
              Movies
            </Button>
            <Button 
              variant={contentType === "series" ? "solid" : "bordered"} 
              color={contentType === "series" ? "primary" : "default"}
              onClick={() => handleContentTypeChange("series")}
            >
              TV Shows
            </Button>
          </div>
          
          <div className="flex-grow"></div>
          
          {selectedContent.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-white">{selectedContent.length} selected</span>
              <Button 
                color="danger" 
                variant="light"
                startContent={<Icon icon="lucide:trash" />}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        
        {/* Content Table */}
        <Table 
          aria-label="Content management table"
          color="default"
          selectionMode="multiple"
          selectedKeys={selectedContent}
          onSelectionChange={(keys) => setSelectedContent([...(keys as Set<string>)])}
          className="mb-6"
        >
          <TableHeader>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>YEAR</TableColumn>
            <TableColumn>RATING</TableColumn>
            <TableColumn>GENRES</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No content found">
            {paginatedContent.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img style="width: 100%; height: 500px; object-fit: cover;" 
                      src={item.posterImage} 
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-gray-400 text-sm line-clamp-1">{item.description.substring(0, 60)}...</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip color={item.type === "movie" ? "primary" : "secondary"} variant="flat">
                    {item.type === "movie" ? "Movie" : "TV Show"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <span className="text-white">{item.year}</span>
                </TableCell>
                <TableCell>
                  <Chip color={getStatusColor(item.rating)} variant="flat">
                    {item.rating.toFixed(1)}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.genre.slice(0, 2).map((genre) => (
                      <Chip key={genre} size="sm" variant="flat">
                        {genre}
                      </Chip>
                    ))}
                    {item.genre.length > 2 && (
                      <Chip size="sm" variant="flat">+{item.genre.length - 2}</Chip>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      as={Link}
                      to={`/admin/content/edit/${item.id}`}
                      isIconOnly 
                      size="sm" 
                      variant="light"
                    >
                      <Icon icon="lucide:edit" className="text-blue-400" />
                    </Button>
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light"
                    >
                      <Icon icon="lucide:trash" className="text-red-400" />
                    </Button>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button 
                          isIconOnly 
                          size="sm" 
                          variant="light"
                        >
                          <Icon icon="lucide:more-vertical" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>View Details</DropdownItem>
                        <DropdownItem>Duplicate</DropdownItem>
                        <DropdownItem>Feature</DropdownItem>
                        <DropdownItem className="text-danger">Unpublish</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination
            total={totalPages}
            color="primary"
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

import { getAuth } from "firebase/auth";

const auth = getAuth();

function checkAdminAccess(user) {
    if (!user || user.role !== "admin") {
        alert("ليس لديك صلاحيات الوصول إلى لوحة الإدارة!");
        window.location.href = "/";
    }
}

auth.onAuthStateChanged((user) => {
    checkAdminAccess(user);
});
