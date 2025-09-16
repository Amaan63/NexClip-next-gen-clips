import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADDED: Missing import
import Layout from "../../components/Layout/Layout";
import { useToastContext } from "../../components/Toast/ToastProvider";
import CreateCategoryModal from "../../components/admin/modals/CreateCategoryModal";

const ManageCategories = () => {
  const navigate = useNavigate(); // ✅ ADDED: Missing navigate hook
  const toast = useToastContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data for categories
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Personal",
      description: "Intimate and personal content",
      color: "purple",
      icon: "💜",
      isActive: true,
      postCount: 45,
      reelCount: 12,
      createdAt: "2024-01-10",
      lastUsed: "2024-01-15",
    },
    {
      id: 2,
      name: "Exclusive",
      description: "Premium content for VIP members",
      color: "pink",
      icon: "💎",
      isActive: true,
      postCount: 28,
      reelCount: 8,
      createdAt: "2024-01-08",
      lastUsed: "2024-01-14",
    },
    {
      id: 3,
      name: "Behind the Scenes",
      description: "Candid moments and backstage content",
      color: "blue",
      icon: "🎬",
      isActive: true,
      postCount: 67,
      reelCount: 23,
      createdAt: "2024-01-05",
      lastUsed: "2024-01-13",
    },
    {
      id: 4,
      name: "Announcements",
      description: "Important updates and news",
      color: "orange",
      icon: "📢",
      isActive: true,
      postCount: 15,
      reelCount: 3,
      createdAt: "2024-01-03",
      lastUsed: "2024-01-12",
    },
    {
      id: 5,
      name: "Archive",
      description: "Older content for reference",
      color: "red",
      icon: "📁",
      isActive: false,
      postCount: 89,
      reelCount: 45,
      createdAt: "2023-12-01",
      lastUsed: "2023-12-15",
    },
  ]);

  const colorGradients = {
    purple: "from-purple-500 to-purple-700",
    pink: "from-pink-500 to-pink-700",
    blue: "from-blue-500 to-blue-700",
    green: "from-green-500 to-green-700",
    orange: "from-orange-500 to-orange-700",
    red: "from-red-500 to-red-700",
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category.postCount > 0 || category.reelCount > 0) {
      toast.error("Cannot delete category with existing content");
      return;
    }

    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
      toast.success("Category deleted successfully");
    }
  };

  const handleToggleStatus = (categoryId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
      )
    );
    toast.success("Category status updated");
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowCreateModal(true);
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && category.isActive) ||
      (selectedStatus === "inactive" && !category.isActive);

    return matchesSearch && matchesStatus;
  });

  const totalPosts = categories.reduce((sum, cat) => sum + cat.postCount, 0);
  const totalReels = categories.reduce((sum, cat) => sum + cat.reelCount, 0);
  const activeCategories = categories.filter((cat) => cat.isActive).length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* ✅ ADDED: Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <button
            onClick={() => navigate("/admin")}
            className="hover:text-purple-400 transition-colors"
          >
            Admin Dashboard
          </button>
          <span>›</span>
          <span className="text-white">Manage Categories</span>
        </div>

        {/* Header */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Manage Categories
              </h1>
              <p className="text-gray-300">
                Organize your content with custom categories
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-3">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl text-purple-300 text-sm">
                {categories.length} Categories
              </span>
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setShowCreateModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                + New Category
              </button>
            </div>
          </div>
        </div>

        {/* ✅ ADDED: Quick Navigation */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate("/admin")}
              className="px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
            >
              🏠 Dashboard
            </button>
            <button
              onClick={() => navigate("/admin/posts")}
              className="px-3 py-2 bg-yellow-600/20 text-yellow-400 rounded-lg hover:bg-yellow-600/30 transition-colors text-sm"
            >
              📝 Manage Posts
            </button>
            <button
              onClick={() => navigate("/admin/reels")}
              className="px-3 py-2 bg-pink-600/20 text-pink-400 rounded-lg hover:bg-pink-600/30 transition-colors text-sm"
            >
              🎬 Manage Reels
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-xl">📝</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{totalPosts}</h3>
                <p className="text-gray-400 text-sm">Total Posts</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-700 rounded-xl flex items-center justify-center">
                <span className="text-xl">🎬</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{totalReels}</h3>
                <p className="text-gray-400 text-sm">Total Reels</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {activeCategories}
                </h3>
                <p className="text-gray-400 text-sm">Active Categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
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

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No categories found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or create a new category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition-all group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                        colorGradients[category.color]
                      } flex items-center justify-center text-xl`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {category.name}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          category.isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="Edit Category"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Delete Category"
                      disabled={
                        category.postCount > 0 || category.reelCount > 0
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-white">
                      {category.postCount}
                    </div>
                    <div className="text-xs text-gray-400">Posts</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-white">
                      {category.reelCount}
                    </div>
                    <div className="text-xs text-gray-400">Reels</div>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span>
                    Created: {new Date(category.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    Used: {new Date(category.lastUsed).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleStatus(category.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                      category.isActive
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    }`}
                  >
                    {category.isActive ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    onClick={() => handleEditCategory(category)}
                    className="flex-1 py-2 px-3 bg-purple-600/20 text-purple-400 rounded-xl text-sm font-medium hover:bg-purple-600/30 transition-colors"
                  >
                    Edit
                  </button>
                </div>

                {/* Usage Indicator */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Usage</span>
                    <span>
                      {(
                        ((category.postCount + category.reelCount) /
                          (totalPosts + totalReels)) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full bg-gradient-to-r ${
                        colorGradients[category.color]
                      }`}
                      style={{
                        width: `${Math.min(
                          ((category.postCount + category.reelCount) /
                            (totalPosts + totalReels)) *
                            100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <CreateCategoryModal
            onClose={() => {
              setShowCreateModal(false);
              setEditingCategory(null);
            }}
            editCategory={editingCategory}
          />
        )}
      </div>
    </Layout>
  );
};

export default ManageCategories;
