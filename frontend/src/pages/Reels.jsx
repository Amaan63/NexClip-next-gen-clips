import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReels } from "../redux/actions/reelActions";
import ReelCard from "../components/reels/ReelCard";
import { ReelSkeleton } from "../components/common/Loader";
import { showToast } from "../components/common/Toast";

const Reels = () => {
  const dispatch = useDispatch();
  const { reels, loading } = useSelector((state) => state.reels);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load reels on component mount
    dispatch(getReels()).catch(() => {
      showToast.error("Failed to load reels");
    });
  }, [dispatch]);

  useEffect(() => {
    // Handle scroll to determine current active reel
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / containerHeight);

      if (
        newIndex >= 0 &&
        newIndex < reels.length &&
        newIndex !== currentIndex
      ) {
        setCurrentIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [reels.length, currentIndex]);

  const handleRefresh = () => {
    dispatch(getReels());
  };

  if (loading && reels.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-sm mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <ReelSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto mb-4 text-gray-400"
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
          <h3 className="text-xl font-semibold mb-2">No Reels Available</h3>
          <p className="text-gray-400 mb-6">
            Reels will appear here once they are created. Check back later!
          </p>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Reels Container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reels.map((reel, index) => (
          <div
            key={reel._id}
            className="h-screen snap-start flex items-center justify-center"
          >
            <ReelCard reel={reel} isActive={index === currentIndex} />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {reels.length > 1 && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2 z-10">
          {reels.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = containerRef.current;
                if (container) {
                  container.scrollTo({
                    top: index * container.clientHeight,
                    behavior: "smooth",
                  });
                }
              }}
              className={`w-2 h-6 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="fixed top-20 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors z-10"
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
  );
};

export default Reels;
