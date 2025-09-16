import React, { useState, useRef } from "react";
import { useToastContext } from "../../Toast/ToastProvider";

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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Upload Reel
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Video Upload */}
          <div>
            <label className="block text-white font-medium mb-3">
              Video File *
            </label>
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                dragActive
                  ? "border-purple-400 bg-purple-400/10"
                  : "border-white/20 hover:border-white/40"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.videoFile ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {formData.videoFile.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formatFileSize(formData.videoFile.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, videoFile: null })
                    }
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                    <svg
                      className="w-8 h-8 text-gray-400"
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
                    <p className="text-gray-400 text-sm mb-4">
                      or click to browse files
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
                    >
                      Choose File
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs">
                    Supported formats: MP4, MOV, AVI (Max 100MB)
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-white font-medium mb-2">Caption</label>
            <textarea
              value={formData.caption}
              onChange={(e) =>
                setFormData({ ...formData, caption: e.target.value })
              }
              rows={4}
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none"
              placeholder="Write a caption for your reel..."
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-gray-500 text-xs">
                Share what makes this moment special
              </p>
              <span className="text-gray-500 text-xs">
                {formData.caption.length}/500
              </span>
            </div>
          </div>

          {/* Privacy Setting */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-medium mb-3">Privacy Setting</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  checked={formData.isPublic}
                  onChange={() => setFormData({ ...formData, isPublic: true })}
                  className="w-4 h-4 text-purple-400 bg-transparent border-2 border-gray-400 focus:ring-purple-400"
                />
                <div>
                  <span className="text-gray-300 block">🌐 Public</span>
                  <span className="text-gray-500 text-xs">
                    Everyone can see this reel
                  </span>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  checked={!formData.isPublic}
                  onChange={() => setFormData({ ...formData, isPublic: false })}
                  className="w-4 h-4 text-purple-400 bg-transparent border-2 border-gray-400 focus:ring-purple-400"
                />
                <div>
                  <span className="text-gray-300 block">🔒 Private</span>
                  <span className="text-gray-500 text-xs">
                    Only you can see this reel
                  </span>
                </div>
              </label>
            </div>
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
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!formData.videoFile}
            >
              Upload Reel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReelModal;
