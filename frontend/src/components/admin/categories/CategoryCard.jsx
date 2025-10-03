// src/components/admin/categories/CategoryCard.jsx
import React from "react";

const CategoryCard = ({ category, onEdit, onDelete, onToggle }) => {
  return (
    <div
      key={category._id}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
            <img
              src={category.avatarUrl}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">
              {category.name}
            </h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(category)}
            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
            title="Edit Category"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            title="Delete Category"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {category.description}
      </p>

      {/* Dates */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
        <span>
          Created: {new Date(category.createdAt).toLocaleDateString()}
        </span>
        <span>
          Updated: {new Date(category.updatedAt).toLocaleDateString()}
        </span>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onToggle(category._id)}
          className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
            category.isActive
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
          }`}
        >
          {category.isActive ? "Deactivate" : "Activate"}
        </button>

        <button
          onClick={() => onEdit(category)}
          className="flex-1 py-2 px-3 bg-purple-600/20 text-purple-400 rounded-xl text-sm font-medium hover:bg-purple-600/30 transition-colors"
        >
          Edit
        </button>
      </div>

      {/* ID Display */}
      <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400">
        ID: {category._id}
      </div>
    </div>
  );
};

export default CategoryCard;
