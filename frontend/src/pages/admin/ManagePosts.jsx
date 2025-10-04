import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useToastContext } from "../../components/Toast/ToastProvider";
import PostGrid from "../../components/admin/post/PostGrid";
import { useSelector } from "react-redux";

const ManagePosts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const { categories } = useSelector((state) => state.category);
  const { posts } = useSelector((state) => state.post);
  console.log(posts);
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      (post.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (post.content?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      post.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "public" && post.isPublic) ||
      (selectedStatus === "private" && !post.isPublic);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <button
            onClick={() => navigate("/admin")}
            className="hover:text-purple-400 transition-colors"
          >
            Admin Dashboard
          </button>
          <span>›</span>
          <span className="text-white">Manage Posts</span>
        </div>

        {/* Header */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Manage Posts
              </h1>
              <p className="text-gray-300">
                View, edit, and organize your content
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-3">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl text-purple-300 text-sm">
                {posts.length} Total Posts
              </span>
              <button
                onClick={() => navigate("/admin")}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                + Create New
              </button>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate("/admin")}
              className="px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
            >
              🏠 Dashboard
            </button>
            <button
              onClick={() => navigate("/admin/reels")}
              className="px-3 py-2 bg-pink-600/20 text-pink-400 rounded-lg hover:bg-pink-600/30 transition-colors text-sm"
            >
              🎬 Manage Reels
            </button>
            <button
              onClick={() => navigate("/admin/categories")}
              className="px-3 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-sm"
            >
              📁 Manage Categories
            </button>
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
                placeholder="Search posts..."
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

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400"
            >
              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category.name}
                  className="bg-gray-800"
                >
                  {category.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400"
            >
              <option value="all" className="bg-gray-800">
                All Status
              </option>
              <option value="public" className="bg-gray-800">
                Public Only
              </option>
              <option value="private" className="bg-gray-800">
                Private Only
              </option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <PostGrid posts={posts} />
      </div>
    </Layout>
  );
};

export default ManagePosts;
