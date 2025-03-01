import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

export function MobileTabBar() {
  const location = useLocation();
  
  const tabs = [
    { path: "/", label: "Home", icon: "lucide:home" },
    { path: "/movies", label: "Movies", icon: "lucide:film" },
    { path: "/series", label: "TV Shows", icon: "lucide:tv" },
    { path: "/my-list", label: "My List", icon: "lucide:bookmark" },
    { path: "/more", label: "More", icon: "lucide:menu" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive ? "text-red-600" : "text-white/70"
              }`}
            >
              <Icon icon={tab.icon} className="text-2xl" />
              <span className="text-xs mt-1">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}