// src/components/admin/categories/CategoryFilters.jsx
import React from "react";

const CategoryFilters = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
          />
          <svg
            className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400"
        >
          <option value="all" className="bg-gray-800">
            All Status
          </option>
          <option value="active" className="bg-gray-800">
            Active Only
          </option>
          <option value="inactive" className="bg-gray-800">
            Inactive Only
          </option>
        </select>
      </div>
    </div>
  );
};

export default CategoryFilters;
