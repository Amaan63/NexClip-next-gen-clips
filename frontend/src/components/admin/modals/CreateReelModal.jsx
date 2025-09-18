import React, { useState, useRef } from "react";
import { useToastContext } from "../../Toast/ToastProvider";
import styles from "./ModalScrollBar.module.css";

const CreateReelModal = ({ onClose }) => {
  const toast = useToastContext();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    caption: "",
    isPublic: true,
    videoFile: null,
  });
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.videoFile) {
      toast.error("Please select a video file");
      return;
    }
    // Simulate reel creation
    toast.success("Reel uploaded successfully! 🎬");
    onClose();
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

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("video/")) {
        setFormData({ ...formData, videoFile: file });
      } else {
        toast.error("Please select a video file");
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, videoFile: file });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // ✅ FIXED: Proper z-index and positioning
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
      onClick={handleBackdropClick}
    >
      {/* ✅ FIXED: Scrollable container with proper max-height */}
      <div className="bg-black/90 border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create Reel
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Share your moments with style
            </p>
          </div>
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

        {/* ✅ FIXED: Scrollable Content Area */}
        <div
          className={`flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar ${styles.customScrollbar}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Upload Section */}
            <div className="space-y-4">
              <label className="block text-white font-medium">
                Video Upload *
              </label>

              {/* Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-purple-400 bg-purple-400/10"
                    : formData.videoFile
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
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {!formData.videoFile ? (
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
                    <div>
                      <p className="text-white font-medium mb-2">
                        Drop your video here
                      </p>
                      <p className="text-gray-400 text-sm">
                        or click to browse files
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        Supported formats: MP4, MOV, AVI (Max 100MB)
                      </p>
                    </div>
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
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-400 font-medium">
                        {formData.videoFile.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formatFileSize(formData.videoFile.size)}
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

                {/* Drag overlay */}
                {dragActive && (
                  <div className="absolute inset-0 bg-purple-600/20 border-purple-400 rounded-2xl flex items-center justify-center">
                    <p className="text-purple-300 font-medium">
                      Drop video here!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Caption Section */}
            <div className="space-y-4">
              <label className="block text-white font-medium">
                Caption
                <span className="text-gray-400 text-sm font-normal ml-2">
                  (Optional)
                </span>
              </label>
              <div className="relative">
                <textarea
                  value={formData.caption}
                  onChange={(e) =>
                    setFormData({ ...formData, caption: e.target.value })
                  }
                  placeholder="Share what makes this moment special..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {formData.caption.length}/500
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-4">
              <label className="block text-white font-medium">
                Privacy Setting
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    checked={formData.isPublic}
                    onChange={() =>
                      setFormData({ ...formData, isPublic: true })
                    }
                    className="text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
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
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Public</p>
                      <p className="text-gray-400 text-sm">
                        Everyone can see this reel
                      </p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="privacy"
                    value="private"
                    checked={!formData.isPublic}
                    onChange={() =>
                      setFormData({ ...formData, isPublic: false })
                    }
                    className="text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Private</p>
                      <p className="text-gray-400 text-sm">
                        Only you can see this reel
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer - Fixed */}
        <div className="p-6 border-t border-white/10 bg-black/50">
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.videoFile}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload Reel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReelModal;
