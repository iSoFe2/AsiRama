import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export function SiteNavbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCategorySelect = (key: React.Key) => {
    navigate(`/category/${key}`);
  };

  return (
    <Navbar maxWidth="xl" className="bg-black/90 text-white">
      <NavbarBrand>
        <Link 
          as={RouterLink} 
          to="/"
          className="font-bold text-xl text-white"
        >
          FaselHD
        </Link>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link 
            as={RouterLink} 
            to="/"
            color="foreground"
          >
            الرئيسية
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            as={RouterLink} 
            to="/movies"
            color="foreground"
          >
            أفلام
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            as={RouterLink} 
            to="/series"
            color="foreground"
          >
            مسلسلات
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button 
                disableRipple
                variant="light" 
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white"
                endContent={<Icon icon="lucide:chevron-down" className="text-sm" />}
              >
                تصنيفات
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Categories"
              onAction={handleCategorySelect}
            >
              <DropdownItem key="action">أكشن</DropdownItem>
              <DropdownItem key="comedy">كوميدي</DropdownItem>
              <DropdownItem key="drama">دراما</DropdownItem>
              <DropdownItem key="horror">رعب</DropdownItem>
              <DropdownItem key="romance">رومانسي</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem>
          <form onSubmit={handleSearch}>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="بحث..."
              size="sm"
              startContent={<Icon icon="lucide:search" size={18} />}
              type="search"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
          </form>
        </NavbarItem>
        <NavbarItem>
          <Button 
            color="primary" 
            variant="flat" 
            size="sm"
            onPress={handleLogin}
          >
            <Icon icon="lucide:user" className="mr-1" />
            دخول
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}