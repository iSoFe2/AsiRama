import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AdminLayout } from "../../components/admin-layout";
import { popularSeries } from "../../data/movies";

export default function AdminSeries() {
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filteredSeries = popularSeries.filter(series => 
    series.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const rowsPerPage = 10;
  const pages = Math.ceil(filteredSeries.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredSeries.slice(start, end);
  }, [page, filteredSeries]);
  
  return (
    <AdminLayout title="إدارة المسلسلات">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Input
              placeholder="بحث عن مسلسل..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Icon icon="lucide:search" />}
              className="w-full sm:max-w-[44%]"
            />
          </div>
          <Button color="primary" startContent={<Icon icon="lucide:plus" />}>
            إضافة مسلسل
          </Button>
        </div>
        
        <Table 
          aria-label="Series Table"
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
            <TableColumn>المواسم</TableColumn>
            <TableColumn>الإجراءات</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(series) => (
              <TableRow key={series.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img 
                      src={series.imageUrl} 
                      alt={series.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{series.title}</p>
                      <p className="text-small text-default-500">{series.director}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{series.year}</TableCell>
                <TableCell>{series.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:star" className="text-yellow-500" />
                    <span>{series.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip color="secondary" size="sm">{series.seasons} مواسم</Chip>
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
