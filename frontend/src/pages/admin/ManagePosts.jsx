import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useToastContext } from "../../components/Toast/ToastProvider";

const ManagePosts = () => {
  const navigate = useNavigate();
  const toast = useToastContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to My Exclusive World",
      content: "This is my first post sharing intimate moments...",
      category: "Personal",
      isPublic: true,
      allowComments: true,
      hasPoll: false,
      createdAt: "2024-01-15",
      views: 1247,
      likes: 89,
      comments: 23,
    },
    {
      id: 2,
      title: "Behind the Scenes Magic",
      content: "Take a peek behind the curtain of my creative process...",
      category: "Behind the Scenes",
      isPublic: false,
      allowComments: true,
      hasPoll: true,
      pollQuestion: "Which outfit do you prefer?",
      createdAt: "2024-01-14",
      views: 892,
      likes: 156,
      comments: 45,
    },
    {
      id: 3,
      title: "Exclusive Announcement",
      content: "Something special is coming your way...",
      category: "Announcements",
      isPublic: true,
      allowComments: false,
      hasPoll: false,
      createdAt: "2024-01-13",
      views: 2341,
      likes: 234,
      comments: 0,
    },
  ]);

  const categories = [
    "All",
    "Personal",
    "Exclusive",
    "Behind the Scenes",
    "Announcements",
    "Updates",
  ];

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully");
    }
  };

  const handleToggleVisibility = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, isPublic: !post.isPublic } : post
      )
    );
    toast.success("Post visibility updated");
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
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
                  key={category}
                  value={category.toLowerCase()}
                  className="bg-gray-800"
                >
                  {category}
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

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6">
          {filteredPosts.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No posts found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Post Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-white">
                          {post.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            post.isPublic
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {post.isPublic ? "🌐 Public" : "🔒 Private"}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {post.content}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span>{post.views.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
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
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
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
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{post.comments}</span>
                      </span>
                      {post.hasPoll && (
                        <span className="flex items-center space-x-1 text-purple-400">
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
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          <span>Poll</span>
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-center space-x-2 text-sm">
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-lg">
                        {post.category}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      {post.allowComments && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className="text-green-400 text-xs">
                            💬 Comments On
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col items-center lg:items-end space-x-2 lg:space-x-0 lg:space-y-2">
                    <button
                      onClick={() => handleToggleVisibility(post.id)}
                      className={`p-2 rounded-xl transition-colors ${
                        post.isPublic
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      }`}
                      title={post.isPublic ? "Make Private" : "Make Public"}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {post.isPublic ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.985 9.985 0 012.824-4.425m2.806-2.625A9.965 9.965 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.965 9.965 0 01-1.631 3.3M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        )}
                      </svg>
                    </button>

                    <button
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors"
                      title="Edit Post"
                    >
                      <svg
                        className="w-5 h-5"
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
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                      title="Delete Post"
                    >
                      <svg
                        className="w-5 h-5"
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
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ManagePosts;
