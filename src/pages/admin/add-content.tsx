import React from "react";
import { Card, CardBody, CardHeader, Button, Input, Textarea, Divider, Select, SelectItem, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AdminLayout } from "../../components/admin-layout";

export default function AdminAddContent() {
  const [contentType, setContentType] = React.useState("movie");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("تم إضافة المحتوى بنجاح!");
  };
  
  const categories = [
    { value: "action", label: "أكشن" },
    { value: "comedy", label: "كوميدي" },
    { value: "drama", label: "دراما" },
    { value: "horror", label: "رعب" },
    { value: "romance", label: "رومانسي" },
    { value: "adventure", label: "مغامرة" },
    { value: "sci-fi", label: "خيال علمي" },
    { value: "thriller", label: "إثارة" },
    { value: "animation", label: "رسوم متحركة" },
    { value: "documentary", label: "وثائقي" }
  ];
  
  return (
    <AdminLayout title="إضافة محتوى جديد">
      <Tabs aria-label="Content Type" color="primary" variant="underlined" selectedKey={contentType} onSelectionChange={setContentType as any}>
        <Tab key="movie" title="فيلم" />
        <Tab key="series" title="مسلسل" />
      </Tabs>
      
      <Card className="mt-4">
        <CardHeader className="flex flex-col gap-1">
          <h4 className="text-lg font-medium">
            {contentType === "movie" ? "إضافة فيلم جديد" : "إضافة مسلسل جديد"}
          </h4>
          <p className="text-small text-default-500">
            أدخل بيانات {contentType === "movie" ? "الفيلم" : "المسلسل"} بالتفصيل
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="العنوان"
                placeholder="أدخل عنوان المحتوى"
                isRequired
              />
              
              <Input 
                label="سنة الإنتاج"
                placeholder="مثال: 2023"
                type="number"
                isRequired
              />
              
              <Select 
                label="التصنيف"
                placeholder="اختر تصنيف المحتوى"
                isRequired
              >
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
              
              <Input 
                label="اللغة"
                placeholder="مثال: العربية"
                isRequired
              />
              
              <Input 
                label="المخرج"
                placeholder="أدخل اسم المخرج"
                isRequired
              />
              
              <Input 
                label="الممثلين"
                placeholder="أدخل أسماء الممثلين مفصولة بفواصل"
                isRequired
              />
              
              <Input 
                label="التقييم"
                placeholder="مثال: 8.5"
                type="number"
                min="0"
                max="10"
                step="0.1"
                isRequired
              />
              
              {contentType === "movie" ? (
                <Input 
                  label="المدة"
                  placeholder="مثال: 2h 15m"
                  isRequired
                />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="عدد المواسم"
                    placeholder="مثال: 3"
                    type="number"
                    min="1"
                    isRequired
                  />
                  <Input 
                    label="عدد الحلقات"
                    placeholder="مثال: 24"
                    type="number"
                    min="1"
                  />
                </div>
              )}
            </div>
            
            <Textarea 
              label="الوصف"
              placeholder="أدخل وصفًا تفصيليًا للمحتوى"
              minRows={4}
              isRequired
            />
            
            <Input 
              label="رابط الإعلان"
              placeholder="أدخل رابط الإعلان (YouTube)"
            />
            
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <Icon icon="lucide:upload-cloud" className="text-4xl text-gray-500 mx-auto mb-2" />
              <p className="mb-2">اسحب وأفلت صورة الغلاف هنا</p>
              <p className="text-small text-default-500 mb-4">أو</p>
              <Button color="primary" variant="flat">
                اختر ملفًا
              </Button>
              <input type="file" className="hidden" />
            </div>
            
            {contentType === "series" && (
              <Card>
                <CardHeader>
                  <h4 className="text-lg font-medium">إضافة حلقات</h4>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium">الموسم 1</h5>
                      <Button color="primary" size="sm" variant="flat" startContent={<Icon icon="lucide:plus" />}>
                        إضافة موسم
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                        <span className="font-medium">الحلقة 1</span>
                        <Input 
                          placeholder="عنوان الحلقة"
                          size="sm"
                          className="flex-1"
                        />
                        <Button isIconOnly color="danger" variant="light" size="sm">
                          <Icon icon="lucide:trash-2" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                        <span className="font-medium">الحلقة 2</span>
                        <Input 
                          placeholder="عنوان الحلقة"
                          size="sm"
                          className="flex-1"
                        />
                        <Button isIconOnly color="danger" variant="light" size="sm">
                          <Icon icon="lucide:trash-2" />
                        </Button>
                      </div>
                      
                      <Button color="primary" size="sm" variant="flat" startContent={<Icon icon="lucide:plus" />}>
                        إضافة حلقة
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
            
            <div className="flex justify-end gap-3">
              <Button color="danger" variant="flat">
                إلغاء
              </Button>
              <Button color="primary" type="submit">
                {contentType === "movie" ? "إضافة الفيلم" : "إضافة المسلسل"}
              </Button>
            </div>
          </form>
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
