import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <div className="space-y-6">
        {/* Search Header */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Discover Your Desires
          </h2>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for exclusive content..."
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
            />
            <svg
              className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Search Results */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Search Results</h3>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400">
              Start typing to discover amazing content...
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
