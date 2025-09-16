import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADDED: Missing import
import Layout from "../../components/Layout/Layout";
import { useToastContext } from "../../components/Toast/ToastProvider";

const ManageReels = () => {
  const navigate = useNavigate(); // ✅ ADDED: Missing navigate hook
  const toast = useToastContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Mock data for reels
  const [reels, setReels] = useState([
    {
      id: 1,
      caption: "Behind the scenes of my latest photoshoot ✨",
      thumbnail: "/api/placeholder/300/400",
      duration: "0:45",
      isPublic: true,
      createdAt: "2024-01-15",
      views: 3247,
      likes: 189,
      shares: 23,
      size: "15.2 MB",
      format: "MP4",
    },
    {
      id: 2,
      caption: "Private moment just for my VIPs 💋",
      thumbnail: "/api/placeholder/300/400",
      duration: "1:23",
      isPublic: false,
      createdAt: "2024-01-14",
      views: 892,
      likes: 256,
      shares: 12,
      size: "28.7 MB",
      format: "MP4",
    },
    {
      id: 3,
      caption: "Dancing in my favorite dress 💃",
      thumbnail: "/api/placeholder/300/400",
      duration: "2:15",
      isPublic: true,
      createdAt: "2024-01-13",
      views: 5681,
      likes: 423,
      shares: 67,
      size: "42.1 MB",
      format: "MP4",
    },
    {
      id: 4,
      caption: "Exclusive content for my subscribers only 🔥",
      thumbnail: "/api/placeholder/300/400",
      duration: "0:58",
      isPublic: false,
      createdAt: "2024-01-12",
      views: 1234,
      likes: 178,
      shares: 5,
      size: "19.8 MB",
      format: "MP4",
    },
  ]);

  const handleDeleteReel = (reelId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this reel? This action cannot be undone."
      )
    ) {
      setReels(reels.filter((reel) => reel.id !== reelId));
      toast.success("Reel deleted successfully");
    }
  };

  const handleToggleVisibility = (reelId) => {
    setReels(
      reels.map((reel) =>
        reel.id === reelId ? { ...reel, isPublic: !reel.isPublic } : reel
      )
    );
    toast.success("Reel visibility updated");
  };

  const filteredReels = reels.filter((reel) => {
    const matchesSearch = reel.caption
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "public" && reel.isPublic) ||
      (selectedStatus === "private" && !reel.isPublic);

    return matchesSearch && matchesStatus;
  });

  const formatDuration = (duration) => duration;
  const formatViews = (views) => views.toLocaleString();

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
          <span className="text-white">Manage Reels</span>
        </div>

        {/* Header */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Manage Reels
              </h1>
              <p className="text-gray-300">
                Upload, organize and manage your video content
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-3">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl text-purple-300 text-sm">
                {reels.length} Total Reels
              </span>
              <button
                onClick={() => navigate("/admin")} // ✅ FIXED: Use navigate instead of window.location.href
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                + Upload New
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
              onClick={() => navigate("/admin/categories")}
              className="px-3 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-sm"
            >
              📁 Manage Categories
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reels by caption..."
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
              <option value="public" className="bg-gray-800">
                Public Only
              </option>
              <option value="private" className="bg-gray-800">
                Private Only
              </option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-white/5 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
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
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Reels Display */}
        {filteredReels.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No reels found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredReels.map((reel) => (
              <div
                key={reel.id}
                className={`bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/5 transition-all group ${
                  viewMode === "list" ? "flex items-center p-4" : ""
                }`}
              >
                {viewMode === "grid" ? (
                  /* Grid View */
                  <>
                    {/* Thumbnail */}
                    <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl text-white/60">🎬</div>
                      </div>

                      {/* Duration */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {reel.duration}
                      </div>

                      {/* Privacy Badge */}
                      <div
                        className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-full ${
                          reel.isPublic
                            ? "bg-green-500/80 text-white"
                            : "bg-red-500/80 text-white"
                        }`}
                      >
                        {reel.isPublic ? "🌐" : "🔒"}
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <svg
                            className="w-8 h-8 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-white font-medium mb-2 line-clamp-2 text-sm">
                        {reel.caption}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span>{formatViews(reel.views)} views</span>
                        <span>
                          {new Date(reel.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-xs text-gray-400 mb-4">
                        <span className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3"
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
                          <span>{reel.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                            />
                          </svg>
                          <span>{reel.shares}</span>
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleVisibility(reel.id)}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                            reel.isPublic
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          }`}
                        >
                          {reel.isPublic ? "Make Private" : "Make Public"}
                        </button>

                        <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
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
                          onClick={() => handleDeleteReel(reel.id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
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
                  </>
                ) : (
                  /* List View */
                  <>
                    {/* Thumbnail */}
                    <div className="w-24 h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl flex-shrink-0 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl text-white/60">🎬</div>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {reel.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 ml-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-white font-medium">
                              {reel.caption}
                            </h3>
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full ${
                                reel.isPublic
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {reel.isPublic ? "🌐 Public" : "🔒 Private"}
                            </span>
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-400 mb-2">
                            <span>{formatViews(reel.views)} views</span>
                            <span>{reel.likes} likes</span>
                            <span>{reel.shares} shares</span>
                            <span>{reel.size}</span>
                          </div>

                          <p className="text-xs text-gray-500">
                            {new Date(reel.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleToggleVisibility(reel.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              reel.isPublic
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            }`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              {reel.isPublic ? (
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

                          <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
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
                            onClick={() => handleDeleteReel(reel.id)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
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
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageReels;
