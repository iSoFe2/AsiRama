import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AdminLayout } from "../../components/admin-layout";
import { allMovies } from "../../data/movies";

export default function AdminMovies() {
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filteredMovies = allMovies.filter(movie => 
    !movie.isSeries && movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const rowsPerPage = 10;
  const pages = Math.ceil(filteredMovies.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredMovies.slice(start, end);
  }, [page, filteredMovies]);
  
  return (
    <AdminLayout title="إدارة الأفلام">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Input
              placeholder="بحث عن فيلم..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Icon icon="lucide:search" />}
              className="w-full sm:max-w-[44%]"
            />
          </div>
          <Button color="primary" startContent={<Icon icon="lucide:plus" />}>
            إضافة فيلم
          </Button>
        </div>
        
        <Table 
          aria-label="Movies Table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn>العنوان</TableColumn>
            <TableColumn>السنة</TableColumn>
            <TableColumn>التصنيف</TableColumn>
            <TableColumn>التقييم</TableColumn>
            <TableColumn>الحالة</TableColumn>
            <TableColumn>الإجراءات</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(movie) => (
              <TableRow key={movie.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img 
                      src={movie.imageUrl} 
                      alt={movie.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{movie.title}</p>
                      <p className="text-small text-default-500">{movie.director}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>{movie.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:star" className="text-yellow-500" />
                    <span>{movie.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {movie.isNew ? (
                    <Chip color="success" size="sm">جديد</Chip>
                  ) : (
                    <Chip color="default" size="sm">عادي</Chip>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button isIconOnly size="sm" color="primary" variant="light">
                      <Icon icon="lucide:edit" />
                    </Button>
                    <Button isIconOnly size="sm" color="danger" variant="light">
                      <Icon icon="lucide:trash" />
                    </Button>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <Icon icon="lucide:more-vertical" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem startContent={<Icon icon="lucide:eye" />}>
                          عرض التفاصيل
                        </DropdownItem>
                        <DropdownItem startContent={<Icon icon="lucide:copy" />}>
                          نسخ الرابط
                        </DropdownItem>
                        <DropdownItem 
                          startContent={<Icon icon="lucide:flag" />}
                          className="text-danger"
                        >
                          تعطيل
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
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
