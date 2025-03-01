import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AdminLayout } from "../../components/admin-layout";

// Sample user data
const users = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-01-15",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    id: "2",
    name: "سارة أحمد",
    email: "sara@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-02-20",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e"
  },
  {
    id: "3",
    name: "محمد علي",
    email: "mohamed@example.com",
    role: "admin",
    status: "active",
    joinDate: "2022-11-05",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f"
  },
  {
    id: "4",
    name: "فاطمة حسن",
    email: "fatma@example.com",
    role: "user",
    status: "suspended",
    joinDate: "2023-03-10",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g"
  },
  {
    id: "5",
    name: "خالد عمر",
    email: "khaled@example.com",
    role: "moderator",
    status: "active",
    joinDate: "2023-01-25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704h"
  },
  {
    id: "6",
    name: "نورا سامي",
    email: "noura@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-04-05",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704i"
  },
  {
    id: "7",
    name: "عمر حسين",
    email: "omar@example.com",
    role: "user",
    status: "inactive",
    joinDate: "2023-02-15",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704j"
  },
  {
    id: "8",
    name: "ليلى كريم",
    email: "laila@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-03-20",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704k"
  },
  {
    id: "9",
    name: "يوسف أحمد",
    email: "yousef@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-01-10",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704l"
  },
  {
    id: "10",
    name: "هدى محمود",
    email: "hoda@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-02-28",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704m"
  },
  {
    id: "11",
    name: "كريم سعيد",
    email: "kareem@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-03-15",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704n"
  },
  {
    id: "12",
    name: "رانيا خالد",
    email: "rania@example.com",
    role: "user",
    status: "suspended",
    joinDate: "2023-01-05",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704o"
  }
];

export default function AdminUsers() {
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  
  // Filter users based on search and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const rowsPerPage = 10;
  const pages = Math.ceil(filteredUsers.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredUsers.slice(start, end);
  }, [page, filteredUsers]);
  
  const handleStatusFilter = (key: React.Key) => {
    setStatusFilter(key as string);
    setPage(1);
  };
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "inactive": return "warning";
      case "suspended": return "danger";
      default: return "default";
    }
  };
  
  // Role color mapping
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "primary";
      case "moderator": return "secondary";
      default: return "default";
    }
  };
  
  return (
    <AdminLayout title="إدارة المستخدمين">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Input
              placeholder="بحث عن مستخدم..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Icon icon="lucide:search" />}
              className="w-full sm:w-64"
            />
            
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  endContent={<Icon icon="lucide:chevron-down" />}
                >
                  {statusFilter === "all" ? "جميع الحالات" : 
                   statusFilter === "active" ? "نشط" :
                   statusFilter === "inactive" ? "غير نشط" : "معلق"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Status Filter"
                onAction={handleStatusFilter}
                selectedKeys={[statusFilter]}
                selectionMode="single"
              >
                <DropdownItem key="all">جميع الحالات</DropdownItem>
                <DropdownItem key="active">نشط</DropdownItem>
                <DropdownItem key="inactive">غير نشط</DropdownItem>
                <DropdownItem key="suspended">معلق</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          
          <Button color="primary" startContent={<Icon icon="lucide:user-plus" />}>
            إضافة مستخدم
          </Button>
        </div>
        
        <Table 
          aria-label="Users Table"
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
            <TableColumn>المستخدم</TableColumn>
            <TableColumn>البريد الإلكتروني</TableColumn>
            <TableColumn>الدور</TableColumn>
            <TableColumn>الحالة</TableColumn>
            <TableColumn>تاريخ الانضمام</TableColumn>
            <TableColumn>الإجراءات</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-medium">{user.name}</p>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    color={getRoleColor(user.role) as any} 
                    variant="flat" 
                    size="sm"
                  >
                    {user.role === "admin" ? "مسؤول" : 
                     user.role === "moderator" ? "مشرف" : "مستخدم"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip 
                    color={getStatusColor(user.status) as any} 
                    variant="dot" 
                    size="sm"
                  >
                    {user.status === "active" ? "نشط" : 
                     user.status === "inactive" ? "غير نشط" : "معلق"}
                  </Chip>
                </TableCell>
                <TableCell>{new Date(user.joinDate).toLocaleDateString("ar-EG")}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button isIconOnly size="sm" color="primary" variant="light">
                      <Icon icon="lucide:edit" />
                    </Button>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <Icon icon="lucide:more-vertical" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem startContent={<Icon icon="lucide:eye" />}>
                          عرض الملف الشخصي
                        </DropdownItem>
                        <DropdownItem startContent={<Icon icon="lucide:mail" />}>
                          إرسال بريد إلكتروني
                        </DropdownItem>
                        <DropdownItem 
                          startContent={<Icon icon="lucide:shield" />}
                          description="تغيير صلاحيات المستخدم"
                        >
                          تغيير الدور
                        </DropdownItem>
                        <DropdownItem 
                          startContent={<Icon icon="lucide:ban" />}
                          className="text-danger"
                          description="منع المستخدم من الوصول"
                        >
                          تعليق الحساب
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
