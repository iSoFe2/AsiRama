import React from "react";
import { Card, CardBody, Avatar, Switch, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export function MorePage() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [autoplay, setAutoplay] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [dataUsage, setDataUsage] = React.useState("wifi-only");

  const menuItems = [
    { icon: "lucide:user", label: "Account", link: "/account" },
    { icon: "lucide:settings", label: "Settings", link: "/settings" },
    { icon: "lucide:help-circle", label: "Help Center", link: "/help" },
    { icon: "lucide:info", label: "About", link: "/about" },
    { icon: "lucide:log-out", label: "Sign Out", link: "/logout", danger: true }
  ];

  return (
    <div className="min-h-screen bg-black pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-16 pt-20">
        <h1 className="text-3xl font-bold text-white mb-6">More</h1>
        
        <Card className="bg-gray-900 border-0 mb-6">
          <CardBody>
            <div className="flex items-center gap-4">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="lg"
                color="danger"
              />
              <div>
                <h3 className="text-white font-bold text-lg">User Name</h3>
                <p className="text-white/70">user@example.com</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gray-900 border-0 mb-6">
          <CardBody className="gap-4">
            <h3 className="text-white font-bold">App Settings</h3>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Icon icon="lucide:moon" className="text-white/70 text-xl" />
                <span className="text-white">Dark Mode</span>
              </div>
              <Switch 
                isSelected={darkMode}
                onValueChange={setDarkMode}
                color="danger"
              />
            </div>
            
            <Divider className="bg-white/10" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Icon icon="lucide:play" className="text-white/70 text-xl" />
                <span className="text-white">Autoplay</span>
              </div>
              <Switch 
                isSelected={autoplay}
                onValueChange={setAutoplay}
                color="danger"
              />
            </div>
            
            <Divider className="bg-white/10" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Icon icon="lucide:bell" className="text-white/70 text-xl" />
                <span className="text-white">Notifications</span>
              </div>
              <Switch 
                isSelected={notifications}
                onValueChange={setNotifications}
                color="danger"
              />
            </div>
            
            <Divider className="bg-white/10" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Icon icon="lucide:wifi" className="text-white/70 text-xl" />
                <span className="text-white">Data Usage</span>
              </div>
              <select 
                value={dataUsage}
                onChange={(e) => setDataUsage(e.target.value)}
                className="bg-gray-800 text-white rounded-md px-3 py-1 border-0"
              >
                <option value="wifi-only">Wi-Fi Only</option>
                <option value="save-data">Save Data</option>
                <option value="maximum">Maximum Quality</option>
              </select>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gray-900 border-0">
          <CardBody className="gap-2">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <Link 
                  to={item.link}
                  className={`flex items-center gap-3 py-3 ${item.danger ? 'text-red-500' : 'text-white'}`}
                >
                  <Icon icon={item.icon} className="text-xl" />
                  <span>{item.label}</span>
                </Link>
                {index < menuItems.length - 1 && <Divider className="bg-white/10" />}
              </React.Fragment>
            ))}
          </CardBody>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">App Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}