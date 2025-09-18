import React, { useState } from "react";
import { useToastContext } from "../../Toast/ToastProvider";
import styles from "./ModalScrollBar.module.css";

const CreatePostModal = ({ onClose }) => {
  const toast = useToastContext();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    isPublic: true,
    allowComments: true,
    hasPoll: false,
    pollQuestion: "",
    pollOptions: ["", ""],
  });

  const categories = [
    "General",
    "Exclusive",
    "Behind the Scenes",
    "Personal",
    "Updates",
    "Announcements",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate post creation
    toast.success("Post created successfully! ✨");
    onClose();
  };

  const addPollOption = () => {
    setFormData({
      ...formData,
      pollOptions: [...formData.pollOptions, ""],
    });
  };

  const removePollOption = (index) => {
    if (formData.pollOptions.length > 2) {
      const newOptions = formData.pollOptions.filter((_, i) => i !== index);
      setFormData({ ...formData, pollOptions: newOptions });
    }
  };

  const updatePollOption = (index, value) => {
    const newOptions = [...formData.pollOptions];
    newOptions[index] = value;
    setFormData({ ...formData, pollOptions: newOptions });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-black/90 border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Create New Post
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

        {/* Form */}
        <div
          className={`flex-1 overflow-y-auto p-6 space-y-6 ${styles.customScrollbar}`}
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-white font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                placeholder="Enter post title..."
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-white font-medium mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none"
                placeholder="Write your content here..."
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-white font-medium mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-gray-800"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Settings Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Privacy Setting */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-medium mb-3">Privacy Setting</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="privacy"
                      checked={formData.isPublic}
                      onChange={() =>
                        setFormData({ ...formData, isPublic: true })
                      }
                      className="w-4 h-4 text-purple-400 bg-transparent border-2 border-gray-400 focus:ring-purple-400"
                    />
                    <span className="text-gray-300">🌐 Public</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="privacy"
                      checked={!formData.isPublic}
                      onChange={() =>
                        setFormData({ ...formData, isPublic: false })
                      }
                      className="w-4 h-4 text-purple-400 bg-transparent border-2 border-gray-400 focus:ring-purple-400"
                    />
                    <span className="text-gray-300">🔒 Private</span>
                  </label>
                </div>
              </div>

              {/* Comments Setting */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-medium mb-3">Interaction</h3>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowComments}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        allowComments: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-purple-400 bg-transparent border-2 border-gray-400 rounded focus:ring-purple-400"
                  />
                  <span className="text-gray-300">💬 Allow Comments</span>
                </label>
              </div>
            </div>

            {/* Poll Section */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  checked={formData.hasPoll}
                  onChange={(e) =>
                    setFormData({ ...formData, hasPoll: e.target.checked })
                  }
                  className="w-4 h-4 text-purple-400 bg-transparent border-2 border-gray-400 rounded focus:ring-purple-400"
                />
                <span className="text-white font-medium">📊 Add Poll</span>
              </div>

              {formData.hasPoll && (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.pollQuestion}
                    onChange={(e) =>
                      setFormData({ ...formData, pollQuestion: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="Poll question..."
                  />

                  <div className="space-y-2">
                    {formData.pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updatePollOption(index, e.target.value)
                          }
                          className="flex-1 bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                          placeholder={`Option ${index + 1}`}
                        />
                        {formData.pollOptions.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removePollOption(index)}
                            className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500/30"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addPollOption}
                      className="text-purple-400 text-sm hover:text-purple-300 flex items-center space-x-1"
                    >
                      <span>+ Add Option</span>
                    </button>
                  </div>
                </div>
              )}
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
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
