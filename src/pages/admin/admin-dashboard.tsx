import React from "react";
import { Card, CardBody, CardHeader, Button, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  const stats = [
    { title: "Total Movies", value: 42, icon: "lucide:film", color: "bg-blue-500" },
    { title: "Total Series", value: 18, icon: "lucide:tv", color: "bg-purple-500" },
    { title: "Total Users", value: 1254, icon: "lucide:users", color: "bg-green-500" },
    { title: "Storage Used", value: "128 GB", icon: "lucide:hard-drive", color: "bg-amber-500" }
  ];

  const recentActivity = [
    { id: 1, action: "Added new movie", title: "The Matrix Resurrections", time: "2 hours ago", user: "admin" },
    { id: 2, action: "Updated series", title: "Stranger Things", time: "5 hours ago", user: "admin" },
    { id: 3, action: "Deleted movie", title: "Bad Movie", time: "Yesterday", user: "moderator" },
    { id: 4, action: "Added new episode", title: "Breaking Bad S05E09", time: "2 days ago", user: "admin" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-16 pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your content, users, and settings</p>
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
              to="/"
              variant="bordered" 
              color="default"
            >
              View Site
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800 border-none">
              <CardBody className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon icon={stat.icon} className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-800 border-none mb-8">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <Button variant="light" color="default" size="sm">View All</Button>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 border-b border-gray-700 pb-3">
                  <div className="bg-gray-700 p-2 rounded-lg">
                    <Icon 
                      icon={
                        activity.action.includes("Added") ? "lucide:plus-circle" :
                        activity.action.includes("Updated") ? "lucide:edit" :
                        "lucide:trash"
                      } 
                      className="text-white text-xl" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full text-gray-300">
                        {activity.user}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-800 border-none">
            <CardHeader>
              <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            </CardHeader>
            <CardBody className="grid grid-cols-2 gap-3">
              <Button 
                as={Link}
                to="/admin/content/movies"
                variant="flat" 
                color="default"
                startContent={<Icon icon="lucide:film" />}
                className="justify-start"
              >
                Manage Movies
              </Button>
              <Button 
                as={Link}
                to="/admin/content/series"
                variant="flat" 
                color="default"
                startContent={<Icon icon="lucide:tv" />}
                className="justify-start"
              >
                Manage Series
              </Button>
              <Button 
                as={Link}
                to="/admin/users"
                variant="flat" 
                color="default"
                startContent={<Icon icon="lucide:users" />}
                className="justify-start"
              >
                Manage Users
              </Button>
              <Button 
                as={Link}
                to="/admin/settings"
                variant="flat" 
                color="default"
                startContent={<Icon icon="lucide:settings" />}
                className="justify-start"
              >
                Site Settings
              </Button>
              <Button 
                as={Link}
                to="/admin/reports"
                variant="flat" 
                color="default"
                startContent={<Icon icon="lucide:bar-chart" />}
                className="justify-start"
              >
                Analytics
              </Button>
              <Button 
                as={Link}
                to="/admin/backups"
                variant="flat" 
                color="default"
                startContent={<Icon icon="lucide:database" />}
                className="justify-start"
              >
                Backups
              </Button>
            </CardBody>
          </Card>

          <Card className="bg-gray-800 border-none">
            <CardHeader>
              <h2 className="text-xl font-bold text-white">System Status</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">CPU Usage</span>
                    <span className="text-white">28%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">Memory Usage</span>
                    <span className="text-white">64%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">Disk Usage</span>
                    <span className="text-white">42%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-gray-400 text-sm">Last backup: 2 days ago</p>
                  <p className="text-gray-400 text-sm">Server uptime: 24 days</p>
                </div>
              </div>
            </CardBody>
          </Card>
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
