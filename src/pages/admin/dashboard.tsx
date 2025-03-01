import React from "react";
import { Card, CardBody, CardHeader, Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLayout } from "../../components/admin-layout";

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  return (
    <AdminLayout title="لوحة التحكم">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-primary-900">
          <CardBody className="flex justify-between items-center">
            <div>
              <p className="text-white/70">إجمالي الأفلام</p>
              <p className="text-2xl font-bold text-white">120</p>
            </div>
            <div className="w-12 h-12 bg-primary-800 rounded-full flex items-center justify-center">
              <Icon icon="lucide:film" className="text-2xl text-white" />
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-secondary-900">
          <CardBody className="flex justify-between items-center">
            <div>
              <p className="text-white/70">إجمالي المسلسلات</p>
              <p className="text-2xl font-bold text-white">45</p>
            </div>
            <div className="w-12 h-12 bg-secondary-800 rounded-full flex items-center justify-center">
              <Icon icon="lucide:tv" className="text-2xl text-white" />
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-success-900">
          <CardBody className="flex justify-between items-center">
            <div>
              <p className="text-white/70">إجمالي المستخدمين</p>
              <p className="text-2xl font-bold text-white">1,250</p>
            </div>
            <div className="w-12 h-12 bg-success-800 rounded-full flex items-center justify-center">
              <Icon icon="lucide:users" className="text-2xl text-white" />
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-warning-900">
          <CardBody className="flex justify-between items-center">
            <div>
              <p className="text-white/70">إجمالي المشاهدات</p>
              <p className="text-2xl font-bold text-white">25,430</p>
            </div>
            <div className="w-12 h-12 bg-warning-800 rounded-full flex items-center justify-center">
              <Icon icon="lucide:eye" className="text-2xl text-white" />
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card className="mb-6">
        <CardHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-medium">إجراءات سريعة</h4>
          <p className="text-small text-default-500">أدوات سريعة لإدارة المحتوى</p>
        </CardHeader>
        <Divider />
        <CardBody className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            color="primary" 
            startContent={<Icon icon="lucide:plus" />}
            onPress={() => navigate("/admin/add-content")}
            className="h-auto py-3"
          >
            <div className="flex flex-col">
              <span>إضافة محتوى جديد</span>
              <span className="text-xs opacity-70">فيلم أو مسلسل</span>
            </div>
          </Button>
          
          <Button 
            color="secondary" 
            startContent={<Icon icon="lucide:users" />}
            onPress={() => navigate("/admin/users")}
            className="h-auto py-3"
          >
            <div className="flex flex-col">
              <span>إدارة المستخدمين</span>
              <span className="text-xs opacity-70">عرض وتعديل</span>
            </div>
          </Button>
          
          <Button 
            color="success" 
            startContent={<Icon icon="lucide:bar-chart" />}
            className="h-auto py-3"
          >
            <div className="flex flex-col">
              <span>تقارير وإحصائيات</span>
              <span className="text-xs opacity-70">تحليل البيانات</span>
            </div>
          </Button>
          
          <Button 
            color="warning" 
            startContent={<Icon icon="lucide:settings" />}
            className="h-auto py-3"
          >
            <div className="flex flex-col">
              <span>إعدادات الموقع</span>
              <span className="text-xs opacity-70">تخصيص وضبط</span>
            </div>
          </Button>
        </CardBody>
      </Card>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-medium">آخر النشاطات</h4>
          <p className="text-small text-default-500">أحدث التغييرات والإضافات</p>
        </CardHeader>
        <Divider />
        <CardBody className="p-0">
          <div className="divide-y divide-gray-800">
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Icon icon="lucide:plus" className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">تمت إضافة فيلم جديد</p>
                <p className="text-small text-default-500">تمت إضافة "الحارس" إلى قائمة الأفلام</p>
              </div>
              <p className="text-small text-default-500">منذ 2 ساعة</p>
            </div>
            
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
                <Icon icon="lucide:edit" className="text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">تم تحديث مسلسل</p>
                <p className="text-small text-default-500">تم تحديث بيانات "الطريق" وإضافة موسم جديد</p>
              </div>
              <p className="text-small text-default-500">منذ 5 ساعات</p>
            </div>
            
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
                <Icon icon="lucide:user-plus" className="text-success" />
              </div>
              <div className="flex-1">
                <p className="font-medium">مستخدم جديد</p>
                <p className="text-small text-default-500">انضم "أحمد محمد" إلى الموقع</p>
              </div>
              <p className="text-small text-default-500">منذ 8 ساعات</p>
            </div>
            
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-warning-100 flex items-center justify-center">
                <Icon icon="lucide:flag" className="text-warning" />
              </div>
              <div className="flex-1">
                <p className="font-medium">تم الإبلاغ عن مشكلة</p>
                <p className="text-small text-default-500">مشكلة في تشغيل "الليلة الأخيرة"</p>
              </div>
              <p className="text-small text-default-500">منذ 12 ساعة</p>
            </div>
          </div>
        </CardBody>
      </Card>
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
