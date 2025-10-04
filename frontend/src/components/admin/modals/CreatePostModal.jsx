import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToastContext } from "../../Toast/ToastProvider";
import Select from "react-select";
import styles from "./ModalScrollBar.module.css";
import { uploadToCloudinary } from "../../../utils/cloudinaryUpload";
import { createPostThunk } from "../../../redux/features/post/post.thunk";

const CreatePostModal = ({ onClose }) => {
  const toast = useToastContext();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  // Assuming a structure like { category: { categories: [...] } } in your Redux store
  const { categories } = useSelector(
    (state) => state.category || { categories: [] }
  );
  const [formData, setFormData] = useState({
    caption: "",
    content: "", // optional
    categories: [], // allow multiple categories
    mediaUrl: "",
    isPublic: true,
    allowComments: true,
    hasPoll: false,
    pollQuestion: "",
    pollOptions: ["", ""],
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ✅ Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = () => setDragActive(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast.error("Only images or videos are allowed");
      return;
    }

    try {
      setUploading(true);
      const { url } = await uploadToCloudinary(file, "posts");
      setPreview(url);
      setFormData((prev) => ({ ...prev, mediaUrl: url }));
      if (errors.mediaUrl) setErrors((prev) => ({ ...prev, mediaUrl: null }));
    } catch (err) {
      console.error("Upload failed:", err);
      setPreview(null);
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Poll Handlers
  const addPollOption = () => {
    setFormData({ ...formData, pollOptions: [...formData.pollOptions, ""] });
  };

  const removePollOption = (index) => {
    if (formData.pollOptions.length > 2) {
      setFormData({
        ...formData,
        pollOptions: formData.pollOptions.filter((_, i) => i !== index),
      });
    }
  };

  const updatePollOption = (index, value) => {
    const newOptions = [...formData.pollOptions];
    newOptions[index] = value;
    setFormData({ ...formData, pollOptions: newOptions });
  };

  // ✅ Validation Logic
  const validateForm = () => {
    const newErrors = {};
    if (!formData.caption.trim()) {
      newErrors.caption = "Caption is required.";
    }
    if (formData.categories.length === 0) {
      newErrors.categories = "Please select at least one category.";
    }
    if (!formData.mediaUrl) {
      newErrors.mediaUrl = "An image or video is required.";
    }
    if (formData.hasPoll) {
      if (!formData.pollQuestion.trim()) {
        newErrors.pollQuestion = "Poll question cannot be empty.";
      }
      const filledOptions = formData.pollOptions.filter(
        (opt) => opt.trim() !== ""
      );
      if (filledOptions.length < 2) {
        newErrors.pollOptions = "Please provide at least two poll options.";
      }
    }
    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // build payload
    const payload = {
      caption: formData.caption,
      mediaUrl: formData.mediaUrl,
      categories: formData.categories,
      poll: formData.hasPoll
        ? {
            question: formData.pollQuestion,
            options: formData.pollOptions
              .filter((opt) => opt.trim() !== "")
              .map((opt) => ({ text: opt })),
          }
        : null,
      visibility: formData.isPublic ? "public" : "private",
      allowComments: formData.allowComments,
    };

    try {
      dispatch(createPostThunk(payload)).unwrap();
      toast.success("Post created successfully! ✨");
      onClose();
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-black/90 border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Create New Post
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
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
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Caption */}
            <div>
              <label className="block text-white font-medium mb-2">
                Caption *
              </label>
              <input
                type="text"
                value={formData.caption}
                onChange={(e) => {
                  setFormData({ ...formData, caption: e.target.value });
                  // Clear error when user starts typing
                  if (errors.caption) {
                    setErrors((prev) => ({ ...prev, caption: null }));
                  }
                }}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.caption
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-white/20 focus:border-purple-400 focus:ring-purple-400/20"
                }`}
                placeholder="Enter caption..."
              />
              {errors.caption && (
                <p className="text-red-500 text-sm mt-1">{errors.caption}</p>
              )}
            </div>

            {/* Media Upload */}
            <div className="space-y-4">
              <label className="block text-white font-medium">
                Upload File *
              </label>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-purple-400 bg-purple-400/10"
                    : uploading
                    ? "border-yellow-400 bg-yellow-400/10"
                    : errors.mediaUrl
                    ? "border-red-500 bg-red-500/5"
                    : preview
                    ? "border-green-400 bg-green-400/10"
                    : "border-white/20 hover:border-purple-400/50 hover:bg-purple-400/5"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  hidden
                  id="mediaUpload"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />

                {!preview ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <p className="text-white font-medium">
                      Drop your file here
                    </p>
                    <p className="text-gray-400 text-sm">
                      or click to browse files
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-medium"
                    >
                      Choose File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Preview */}
                    {formData.mediaUrl?.includes("video") ? (
                      <video
                        src={preview}
                        controls
                        className="w-48 mx-auto rounded-xl border border-white/20"
                      />
                    ) : (
                      <img
                        src={preview}
                        alt="preview"
                        className="w-32 h-32 object-cover mx-auto rounded-xl border border-white/20"
                      />
                    )}

                    <div>
                      <p className="text-green-400 font-medium">
                        {formData.mediaUrl.split("/").pop()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors text-sm"
                    >
                      Change File
                    </button>
                  </div>
                )}

                {dragActive && (
                  <div className="absolute inset-0 bg-purple-600/20 border-purple-400 rounded-2xl flex items-center justify-center">
                    <p className="text-purple-300 font-medium">
                      Drop file here!
                    </p>
                  </div>
                )}
              </div>

              {errors.mediaUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.mediaUrl}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-white font-medium mb-2">
                Category *
              </label>

              <Select
                isMulti
                name="categories"
                options={categories.map((cat) => ({
                  value: cat.name,
                  label: cat.name,
                }))}
                value={categories
                  .filter((cat) => formData.categories.includes(cat.name))
                  .map((cat) => ({
                    value: cat.name,
                    label: cat.name,
                  }))}
                onChange={(selectedOptions) => {
                  const selectedNames = selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : [];
                  setFormData((prev) => ({
                    ...prev,
                    categories: selectedNames,
                  }));
                  // Clear error when user selects a category
                  if (errors.categories) {
                    setErrors((prev) => ({ ...prev, categories: null }));
                  }
                }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#1f2937",
                    borderColor: errors.categories
                      ? "#ef4444"
                      : state.isFocused
                      ? "#a855f7"
                      : "#7e22ce",
                    borderRadius: "0.75rem",
                    boxShadow: state.isFocused
                      ? errors.categories
                        ? "0 0 0 1px #ef4444"
                        : "0 0 0 1px #a855f7"
                      : "none",
                    "&:hover": {
                      borderColor: errors.categories ? "#ef4444" : "#a855f7",
                    },
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#7e22ce",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "white",
                    fontWeight: 500,
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#1f2937",
                  }),
                  option: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected
                      ? "#9333ea"
                      : isFocused
                      ? "#6b21a8"
                      : "#1f2937",
                    color: "white",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "white",
                  }),
                }}
                className="text-white"
                classNamePrefix="select"
                placeholder="Select categories..."
              />
              {errors.categories && (
                <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
              )}
            </div>

            {/* Privacy & Comments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-medium mb-3">Privacy</h3>
                <label className="flex items-center space-x-3 cursor-pointer mb-2">
                  <input
                    type="radio"
                    name="privacy"
                    checked={formData.isPublic}
                    onChange={() =>
                      setFormData({ ...formData, isPublic: true })
                    }
                    className="form-radio h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
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
                    className="form-radio h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-300">🔒 Private</span>
                </label>
              </div>
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
                    className="form-checkbox h-5 w-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-300">💬 Allow Comments</span>
                </label>
              </div>
            </div>

            {/* Poll Section */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasPoll}
                    onChange={(e) =>
                      setFormData({ ...formData, hasPoll: e.target.checked })
                    }
                    className="form-checkbox h-5 w-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-white font-medium">📊 Add Poll</span>
                </label>
              </div>

              {formData.hasPoll && (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.pollQuestion}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pollQuestion: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400"
                    placeholder="Poll question..."
                  />
                  {errors.pollQuestion && (
                    <p className="text-red-500 text-sm">
                      {errors.pollQuestion}
                    </p>
                  )}

                  <div className="space-y-2">
                    {formData.pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updatePollOption(index, e.target.value)
                          }
                          className="flex-1 bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-white placeholder-gray-400"
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
                    {errors.pollOptions && (
                      <p className="text-red-500 text-sm">
                        {errors.pollOptions}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={addPollOption}
                      className="text-purple-400 text-sm hover:text-purple-300"
                    >
                      + Add Option
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
                className="flex-1 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
