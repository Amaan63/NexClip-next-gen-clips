import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentReel } from "../../redux/actions/reelActions";
import ReelPlayer from "./ReelPlayer";

const ReelCard = ({ reel, isActive = false }) => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      dispatch(setCurrentReel(reel));
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isActive, reel, dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 max-w-sm mx-auto"
    >
      {/* Video Player */}
      <div className="relative">
        <ReelPlayer
          reel={reel}
          isPlaying={isActive && isPlaying}
          onPlayingChange={setIsPlaying}
        />

        {/* Play/Pause Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying && isActive && (
            <div className="bg-white bg-opacity-90 rounded-full p-3">
              <svg
                className="w-8 h-8 text-gray-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* User Info */}
        <div className="flex items-center mb-3">
          <div className="h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            {reel.createdBy?.username?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900 text-sm">
              {reel.createdBy?.username || "Admin"}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(reel.createdAt)}
            </p>
          </div>
        </div>

        {/* Caption */}
        <p className="text-gray-800 text-sm leading-relaxed">{reel.caption}</p>

        {/* Engagement Actions */}
        <div className="flex items-center space-x-4 mt-3 pt-3 border-t">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm">Like</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm">Comment</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
