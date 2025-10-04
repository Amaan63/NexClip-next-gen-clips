import React from "react";

const PostCard = ({ post }) => {
  const {
    _id,
    caption,
    mediaUrl,
    categories = [],
    poll,
    visibility,
    allowComments,
    createdAt,
  } = post;

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Image */}
        {mediaUrl && (
          <img
            src={mediaUrl}
            alt={caption}
            className="w-full lg:w-48 h-48 object-cover rounded-xl border border-white/10"
          />
        )}

        {/* Content */}
        <div className="flex-1">
          {/* Caption + Visibility */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-semibold text-white">
                {caption || "Untitled Post"}
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  visibility === "public"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {visibility === "public" ? "🌐 Public" : "🔒 Private"}
              </span>
            </div>
          </div>

          {/* Poll */}
          {poll && (
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 mb-3">
              <p className="text-sm text-purple-300 font-medium">
                Poll: {poll.question}
              </p>
              <ul className="mt-1 text-gray-300 text-sm list-disc pl-5">
                {poll.options.map((opt) => (
                  <li key={opt._id}>{opt.text}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <span
                  key={cat._id}
                  className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-lg"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Info Row */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">
              {new Date(createdAt).toLocaleDateString()}
            </span>
            <span className="text-gray-500">•</span>
            {allowComments ? (
              <span className="text-green-400 text-xs">💬 Comments On</span>
            ) : (
              <span className="text-red-400 text-xs">🚫 Comments Off</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex lg:flex-col items-center lg:items-end space-x-2 lg:space-x-0 lg:space-y-2">
          <button
            className={`p-2 rounded-xl transition-colors ${
              visibility === "public"
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
            }`}
            title={visibility === "public" ? "Make Private" : "Make Public"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {visibility === "public" ? (
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
  );
};

export default PostCard;
