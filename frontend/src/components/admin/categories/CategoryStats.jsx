// src/components/admin/categories/CategoryStats.jsx
import React from "react";

const CategoryStats = ({ totalPosts, totalReels, activeCategories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
          📝
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">{totalPosts}</h3>
          <p className="text-gray-400 text-sm">Total Posts</p>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-700 rounded-xl flex items-center justify-center">
          🎬
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">{totalReels}</h3>
          <p className="text-gray-400 text-sm">Total Reels</p>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-700 rounded-xl flex items-center justify-center">
          ✅
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">{activeCategories}</h3>
          <p className="text-gray-400 text-sm">Active Categories</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryStats;
