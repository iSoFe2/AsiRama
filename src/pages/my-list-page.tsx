import React from "react";

export function MyListPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-8">My List</h1>
        
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-white text-xl">Your list is empty</p>
          <p className="text-white/70 mt-2">Add movies and TV shows to your list to watch later</p>
        </div>
      </div>
    </div>
  );
}