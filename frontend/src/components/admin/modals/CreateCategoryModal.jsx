import React, { useState } from "react";
import { useToastContext } from "../../Toast/ToastProvider";

const CreateCategoryModal = ({ onClose, editCategory = null }) => {
  const toast = useToastContext();
  const [formData, setFormData] = useState({
    name: editCategory?.name || "",
    description: editCategory?.description || "",
    color: editCategory?.color || "purple",
    icon: editCategory?.icon || "📁",
    isActive: editCategory?.isActive ?? true,
  });

  const colorOptions = [
    {
      name: "Purple",
      value: "purple",
      gradient: "from-purple-500 to-purple-700",
    },
    { name: "Pink", value: "pink", gradient: "from-pink-500 to-pink-700" },
    { name: "Blue", value: "blue", gradient: "from-blue-500 to-blue-700" },
    { name: "Green", value: "green", gradient: "from-green-500 to-green-700" },
    {
      name: "Orange",
      value: "orange",
      gradient: "from-orange-500 to-orange-700",
    },
    { name: "Red", value: "red", gradient: "from-red-500 to-red-700" },
  ];

  const iconOptions = [
    "📁",
    "🎬",
    "📝",
    "💎",
    "🔥",
    "⭐",
    "💜",
    "🎯",
    "🚀",
    "💫",
    "🎨",
    "🎪",
    "🎭",
    "🎲",
    "🎸",
    "🎤",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    // Simulate category creation/update
    if (editCategory) {
      toast.success("Category updated successfully! ✨");
    } else {
      toast.success("Category created successfully! 🎉");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-black/90 border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {editCategory ? "Edit Category" : "Create Category"}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Category Name */}
            <div>
              <label className="block text-white font-medium mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                placeholder="Enter category name..."
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-medium mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none"
                placeholder="Describe this category..."
              />
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-white font-medium mb-3">
                Choose Icon
              </label>
              <div className="grid grid-cols-8 gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                      formData.icon === icon
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 scale-110"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-white font-medium mb-3">
                Category Color
              </label>
              <div className="grid grid-cols-3 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, color: color.value })
                    }
                    className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-all ${
                      formData.color === color.value
                        ? "border-white/40 bg-white/10"
                        : "border-white/10 hover:border-white/20 bg-white/5"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-r ${color.gradient}`}
                    ></div>
                    <span className="text-white text-sm font-medium">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <label className="block text-white font-medium mb-3">
                Preview
              </label>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                    colorOptions.find((c) => c.value === formData.color)
                      ?.gradient || "from-purple-500 to-purple-700"
                  } flex items-center justify-center text-xl`}
                >
                  {formData.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {formData.name || "Category Name"}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {formData.description || "Category description"}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
              <div>
                <h4 className="text-white font-medium">Active Status</h4>
                <p className="text-gray-400 text-sm">
                  Enable this category for use
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-white/10 text-gray-300 rounded-xl font-medium hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                {editCategory ? "Update Category" : "Create Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* ✅ ADDED: Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #db2777);
        }
      `}</style>
    </div>
  );
};

export default CreateCategoryModal;
