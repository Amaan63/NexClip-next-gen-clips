import React, { useRef, useEffect, useState } from "react";

const ReelPlayer = ({ reel, isPlaying = false, onPlayingChange }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle play/pause
    if (isPlaying) {
      video.play().catch((err) => {
        console.error("Error playing video:", err);
        onPlayingChange?.(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying, onPlayingChange]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => setLoading(true);
    const handleCanPlay = () => setLoading(false);
    const handleError = () => {
      setError(true);
      setLoading(false);
    };
    const handlePlay = () => onPlayingChange?.(true);
    const handlePause = () => onPlayingChange?.(false);

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [onPlayingChange]);

  if (error) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>Failed to load video</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 bg-black rounded-t-lg overflow-hidden">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={reel.mediaUrl}
        loop
        muted
        playsInline
        preload="metadata"
      />

      {/* Video Controls Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
          </div>
          <span className="text-sm font-medium">Live</span>
        </div>

        {/* Volume indicator (muted) */}
        <div className="bg-white bg-opacity-20 rounded-full p-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ReelPlayer;
