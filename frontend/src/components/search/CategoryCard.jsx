import React from "react";

const CategoryCard = ({ category, onClick }) => {
  const handleClick = () => {
    onClick?.(category);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
    >
      {/* Category Image */}
      <div className="relative h-32 bg-gradient-to-br from-blue-400 to-purple-500">
        {category.avatarUrl ? (
          <img
            src={category.avatarUrl}
            alt={category.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-white text-2xl font-bold">
              {category.name?.charAt(0).toUpperCase() || "?"}
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Category Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 truncate">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {category.description}
          </p>
        )}

        {/* Post Count (if available) */}
        {category.postCount !== undefined && (
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <span>
              {category.postCount} {category.postCount === 1 ? "post" : "posts"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
