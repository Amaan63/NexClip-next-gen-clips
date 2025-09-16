import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import CreatePostModal from "../../components/admin/modals/CreatePostModal";
import CreateReelModal from "../../components/admin/modals/CreateReelModal";
import CreateCategoryModal from "../../components/admin/modals/CreateCategoryModal";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateReel, setShowCreateReel] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Posts",
      value: "1,247",
      icon: "📝",
      color: "from-blue-500 to-purple-500",
      change: "+12%",
    },
    {
      label: "Total Reels",
      value: "892",
      icon: "🎬",
      color: "from-pink-500 to-red-500",
      change: "+8%",
    },
    {
      label: "Categories",
      value: "24",
      icon: "📁",
      color: "from-green-500 to-teal-500",
      change: "+3%",
    },
    {
      label: "Active Users",
      value: "5,679",
      icon: "👥",
      color: "from-purple-500 to-pink-500",
      change: "+15%",
    },
  ];

  const quickActions = [
    {
      title: "Create New Post",
      desc: "Create posts with polls, comments & privacy settings",
      icon: "✍️",
      color: "from-blue-600 to-purple-600",
      action: () => setShowCreatePost(true),
    },
    {
      title: "Create Reel",
      desc: "Upload reels with captions & privacy controls",
      icon: "🎥",
      color: "from-pink-600 to-red-600",
      action: () => setShowCreateReel(true),
    },
    {
      title: "Add Category",
      desc: "Organize content with new categories",
      icon: "🗂️",
      color: "from-green-600 to-teal-600",
      action: () => setShowCreateCategory(true),
    },
    {
      title: "Manage Posts",
      desc: "View, edit & moderate all posts",
      icon: "⚙️",
      color: "from-yellow-600 to-orange-600",
      action: () => navigate("/admin/posts"), // ✅ FIXED: Use navigate()
    },
    {
      title: "Manage Reels", // ✅ NEW: Added
      desc: "Organize and moderate video content",
      icon: "🎬",
      color: "from-purple-600 to-indigo-600",
      action: () => navigate("/admin/reels"),
    },
    {
      title: "Manage Categories", // ✅ NEW: Added
      desc: "Edit and organize content categories",
      icon: "📁",
      color: "from-teal-600 to-cyan-600",
      action: () => navigate("/admin/categories"),
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-300 text-lg">
                Welcome back, manage your content empire 👑
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                System Online
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-xl`}
                >
                  {stat.icon}
                </div>
                <span className="text-green-400 text-sm font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="group p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-left hover:scale-105"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  {action.icon}
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {action.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                action: "New post created",
                time: "2 minutes ago",
                user: "Admin",
                type: "post",
              },
              {
                action: "Reel uploaded",
                time: "15 minutes ago",
                user: "Admin",
                type: "reel",
              },
              {
                action: "Category added",
                time: "1 hour ago",
                user: "Admin",
                type: "category",
              },
              {
                action: "Comment moderated",
                time: "2 hours ago",
                user: "System",
                type: "moderation",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "post"
                      ? "bg-blue-500/20 text-blue-400"
                      : activity.type === "reel"
                      ? "bg-pink-500/20 text-pink-400"
                      : activity.type === "category"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {activity.type === "post"
                    ? "📝"
                    : activity.type === "reel"
                    ? "🎬"
                    : activity.type === "category"
                    ? "📁"
                    : "⚡"}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} />
      )}
      {showCreateReel && (
        <CreateReelModal onClose={() => setShowCreateReel(false)} />
      )}
      {showCreateCategory && (
        <CreateCategoryModal onClose={() => setShowCreateCategory(false)} />
      )}
    </Layout>
  );
};

export default AdminDashboard;
