import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import MovieDetailPage from "./pages/movie-detail";
import SeriesDetailPage from "./pages/series-detail";
import MoviesPage from "./pages/movies";
import SeriesPage from "./pages/series";
import CategoryPage from "./pages/category";
import SearchPage from "./pages/search";
import WatchPage from "./pages/watch";
import LoginPage from "./pages/login";
import AdminDashboard from "./pages/admin/dashboard";
import AdminMovies from "./pages/admin/movies";
import AdminSeries from "./pages/admin/series";
import AdminUsers from "./pages/admin/users";
import AdminAddContent from "./pages/admin/add-content";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/series/:id" element={<SeriesDetailPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/movies" element={<AdminMovies />} />
        <Route path="/admin/series" element={<AdminSeries />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/add-content" element={<AdminAddContent />} />
      </Routes>
    </Router>
  );
}

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("تم تسجيل الدخول بنجاح:", result.user);
        })
        .catch((error) => {
            console.error("خطأ أثناء تسجيل الدخول:", error.message);
        });
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
