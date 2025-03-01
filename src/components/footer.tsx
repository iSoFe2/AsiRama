import React from "react";
import { Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-black/95 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FaselHD</h3>
            <p className="text-gray-400 mb-4">
              موقع فاصل يوفر لك أفضل الأفلام والمسلسلات العربية والأجنبية المترجمة بجودة عالية مجاناً.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-white hover:text-primary">
                <Icon icon="lucide:facebook" className="text-xl" />
              </Link>
              <Link href="#" className="text-white hover:text-primary">
                <Icon icon="lucide:twitter" className="text-xl" />
              </Link>
              <Link href="#" className="text-white hover:text-primary">
                <Icon icon="lucide:instagram" className="text-xl" />
              </Link>
              <Link href="#" className="text-white hover:text-primary">
                <Icon icon="lucide:youtube" className="text-xl" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link as={RouterLink} to="/" className="text-gray-400 hover:text-primary">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/movies" className="text-gray-400 hover:text-primary">
                  أفلام
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/series" className="text-gray-400 hover:text-primary">
                  مسلسلات
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/category/most-watched" className="text-gray-400 hover:text-primary">
                  الأكثر مشاهدة
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/category/latest" className="text-gray-400 hover:text-primary">
                  الأحدث
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">التصنيفات</h3>
            <ul className="space-y-2">
              <li>
                <Link as={RouterLink} to="/category/action" className="text-gray-400 hover:text-primary">
                  أكشن
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/category/comedy" className="text-gray-400 hover:text-primary">
                  كوميدي
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/category/drama" className="text-gray-400 hover:text-primary">
                  دراما
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/category/horror" className="text-gray-400 hover:text-primary">
                  رعب
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/category/sci-fi" className="text-gray-400 hover:text-primary">
                  خيال علمي
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Icon icon="lucide:mail" className="text-primary" />
                <span className="text-gray-400">support@AsiRama.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:phone" className="text-primary" />
                <span className="text-gray-400">+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:map-pin" className="text-primary" />
                <span className="text-gray-400">الموقع الإلكتروني</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Divider className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2023 FaselHD. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 text-sm hover:text-primary">سياسة الخصوصية</Link>
            <Link href="#" className="text-gray-400 text-sm hover:text-primary">شروط الاستخدام</Link>
            <Link href="#" className="text-gray-400 text-sm hover:text-primary">الأسئلة الشائعة</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}