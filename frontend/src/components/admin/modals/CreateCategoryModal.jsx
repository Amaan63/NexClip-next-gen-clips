import React, { useState, useRef } from "react";
import { useToastContext } from "../../Toast/ToastProvider";
import { useDispatch } from "react-redux";
import { uploadToCloudinary } from "../../../utils/cloudinaryUpload";
import { createCategoryThunk } from "../../../redux/features/category/category.thunk";
import styles from "./ModalScrollBar.module.css"; // ✅ custom scrollbar

const CreateCategoryModal = ({ onClose, editCategory = null }) => {
  const toast = useToastContext();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: editCategory?.name || "",
    description: editCategory?.description || "",
    file: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  // When file selected -> upload immediately
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      await uploadFile(file);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFormData({ ...formData, file: files[0] });
      await uploadFile(files[0]);
    }
  };

  // Separate upload logic
  const uploadFile = async (file) => {
    try {
      setUploading(true);
      const { url } = await uploadToCloudinary(file, "categories");
      setUploadedUrl(url);
    } catch (err) {
      setUploadedUrl(null);
    } finally {
      setUploading(false);
    }
  };

  // Submit only after uploadedUrl exists
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    if (!uploadedUrl) {
      toast.error("Please upload a file first");
      return;
    }

    try {
      await dispatch(
        createCategoryThunk({
          name: formData.name,
          description: formData.description,
          avatarUrl: uploadedUrl, // 🔥 use uploaded URL
        })
      ).unwrap();

      toast.success(
        editCategory
          ? "Category updated successfully! ✨"
          : "Category created successfully! 🎉"
      );
      onClose();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
      onClick={handleBackdropClick}
    >
      <div className="bg-black/90 border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {editCategory ? "Edit Category" : "Create Category"}
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

        {/* Content */}
        <div
          className={`flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar ${styles.customScrollbar}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* File Upload */}
            <div className="space-y-4">
              <label className="block text-white font-medium">
                Upload File *
              </label>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-purple-400 bg-purple-400/10"
                    : formData.file
                    ? "border-green-400 bg-green-400/10"
                    : "border-white/20 hover:border-purple-400/50 hover:bg-purple-400/5"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {!formData.file ? (
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
                    {/* {formData.file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(formData.file)}
                        alt="preview"
                        className="w-32 h-32 object-cover mx-auto rounded-xl border border-white/20"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(formData.file)}
                        controls
                        className="w-48 mx-auto rounded-xl border border-white/20"
                      />
                    )} */}
                    {uploadedUrl ? (
                      formData.file?.type.startsWith("image/") ? (
                        <img
                          src={uploadedUrl}
                          alt="preview"
                          className="w-32 h-32 object-cover mx-auto rounded-xl border border-white/20"
                        />
                      ) : (
                        <video
                          src={uploadedUrl}
                          controls
                          className="w-48 mx-auto rounded-xl border border-white/20"
                        />
                      )
                    ) : formData.file ? (
                      formData.file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(formData.file)}
                          alt="preview"
                          className="w-32 h-32 object-cover mx-auto rounded-xl border border-white/20"
                        />
                      ) : (
                        <video
                          src={URL.createObjectURL(formData.file)}
                          controls
                          className="w-48 mx-auto rounded-xl border border-white/20"
                        />
                      )
                    ) : null}

                    <div>
                      <p className="text-green-400 font-medium">
                        {formData.file.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formatFileSize(formData.file.size)}
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
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-black/50">
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            {/* <button
              onClick={handleSubmit}
              disabled={!formData.file || !formData.name.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editCategory ? "Update Category" : "Create Category"}
            </button> */}
            <button
              onClick={handleSubmit}
              disabled={!uploadedUrl || !formData.name.trim() || uploading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading
                ? "Uploading..."
                : editCategory
                ? "Update Category"
                : "Create Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
