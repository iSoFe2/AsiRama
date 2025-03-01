import React from "react";
import { Navbar, NavbarBrand, NavbarContent, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl">
      {/* Admin Navbar */}
      <Navbar maxWidth="xl" className="bg-black/90 text-white">
        <NavbarBrand>
          <Link 
            as={RouterLink} 
            to="/admin"
            className="font-bold text-xl text-white"
          >
            <span className="text-primary">FaselHD</span> <span className="text-sm">لوحة التحكم</span>
          </Link>
        </NavbarBrand>
        
        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button 
                variant="light" 
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white"
                endContent={<Icon icon="lucide:chevron-down" className="text-sm" />}
                startContent={
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Icon icon="lucide:user" />
                  </div>
                }
              >
                المدير
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
              <DropdownItem key="profile" startContent={<Icon icon="lucide:user" />}>
                الملف الشخصي
              </DropdownItem>
              <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" />}>
                الإعدادات
              </DropdownItem>
              <DropdownItem key="website" startContent={<Icon icon="lucide:external-link" />}>
                زيارة الموقع
              </DropdownItem>
              <DropdownItem 
                key="logout" 
                color="danger" 
                startContent={<Icon icon="lucide:log-out" />}
                onPress={() => navigate("/")}
              >
                تسجيل الخروج
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 min-h-[calc(100vh-64px)] p-4 hidden md:block">
          <nav className="space-y-1">
            <Link 
              as={RouterLink} 
              to="/admin" 
              className={`flex items-center gap-2 p-3 rounded-md ${isActive("/admin") ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <Icon icon="lucide:layout-dashboard" />
              <span>لوحة التحكم</span>
            </Link>
            
            <Link 
              as={RouterLink} 
              to="/admin/movies" 
              className={`flex items-center gap-2 p-3 rounded-md ${isActive("/admin/movies") ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <Icon icon="lucide:film" />
              <span>الأفلام</span>
            </Link>
            
            <Link 
              as={RouterLink} 
              to="/admin/series" 
              className={`flex items-center gap-2 p-3 rounded-md ${isActive("/admin/series") ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <Icon icon="lucide:tv" />
              <span>المسلسلات</span>
            </Link>
            
            <Link 
              as={RouterLink} 
              to="/admin/users" 
              className={`flex items-center gap-2 p-3 rounded-md ${isActive("/admin/users") ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <Icon icon="lucide:users" />
              <span>المستخدمين</span>
            </Link>
            
            <Link 
              as={RouterLink} 
              to="/admin/add-content" 
              className={`flex items-center gap-2 p-3 rounded-md ${isActive("/admin/add-content") ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <Icon icon="lucide:plus-circle" />
              <span>إضافة محتوى</span>
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-700">
              <Link 
                as={RouterLink} 
                to="/" 
                className="flex items-center gap-2 p-3 rounded-md text-gray-300 hover:bg-gray-700"
              >
                <Icon icon="lucide:external-link" />
                <span>زيارة الموقع</span>
              </Link>
              
              <Link 
                as={RouterLink} 
                to="/" 
                className="flex items-center gap-2 p-3 rounded-md text-gray-300 hover:bg-gray-700"
              >
                <Icon icon="lucide:log-out" />
                <span>تسجيل الخروج</span>
              </Link>
            </div>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          
          {children}
        </main>
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
