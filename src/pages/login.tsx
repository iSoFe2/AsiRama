import React from "react";
import { Card, CardBody, CardHeader, Input, Button, Link, Divider, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    navigate("/");
  };
  
  const handleAdminLogin = () => {
    // In a real app, you would handle admin authentication
    navigate("/admin");
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md bg-gray-800 text-white">
        <CardHeader className="flex flex-col items-center gap-1 pb-0">
          <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
          <p className="text-gray-400">مرحبًا بك مجددًا في FaselHD</p>
        </CardHeader>
        <CardBody className="py-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="البريد الإلكتروني"
              placeholder="أدخل بريدك الإلكتروني"
              variant="bordered"
              isRequired
              classNames={{
                inputWrapper: "bg-gray-700/50 border-gray-600",
              }}
            />
            
            <Input
              label="كلمة المرور"
              placeholder="أدخل كلمة المرور"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              isRequired
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon icon="lucide:eye-off" className="text-gray-400" />
                  ) : (
                    <Icon icon="lucide:eye" className="text-gray-400" />
                  )}
                </button>
              }
              classNames={{
                inputWrapper: "bg-gray-700/50 border-gray-600",
              }}
            />
            
            <div className="flex items-center justify-between">
              <Checkbox defaultSelected color="primary">
                <span className="text-sm">تذكرني</span>
              </Checkbox>
              <Link href="#" size="sm" className="text-primary">
                نسيت كلمة المرور؟
              </Link>
            </div>
            
            <Button type="submit" color="primary" className="w-full">
              تسجيل الدخول
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative flex items-center justify-center">
              <Divider className="flex-1" />
              <span className="px-2 text-sm text-gray-400">أو</span>
              <Divider className="flex-1" />
            </div>
            
            <div className="mt-4 space-y-3">
              <Button 
                className="w-full" 
                variant="bordered"
                startContent={<Icon icon="flat-color-icons:google" />}
              >
                تسجيل الدخول باستخدام Google
              </Button>
              
              <Button 
                className="w-full" 
                variant="bordered"
                startContent={<Icon icon="lucide:facebook" className="text-blue-500" />}
              >
                تسجيل الدخول باستخدام Facebook
              </Button>
              
              <Button 
                className="w-full" 
                variant="flat"
                color="primary"
                onPress={handleAdminLogin}
              >
                دخول كمسؤول
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ليس لديك حساب؟{" "}
              <Link href="#" className="text-primary">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
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
