import React from "react";
import Layout from "../components/Layout/Layout";

const Reels = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Reels Header */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Personal Reels
          </h2>
          <p className="text-gray-300 text-lg">
            Behind-the-scenes moments and intimate stories, just for you.
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((reel) => (
            <div
              key={reel}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="aspect-[9/16] bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center relative">
                <div className="text-white/60 text-center">
                  <div className="text-4xl mb-2">🎬</div>
                  <p>Reel {reel}</p>
                </div>

                {/* Play Button */}
                <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </div>

              <div className="p-4">
                <h4 className="text-white font-medium mb-2">
                  Intimate Moment {reel}
                </h4>
                <p className="text-gray-400 text-sm">
                  A special glimpse into my world...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reels;
