import React from "react";
import PostCard from "./PostCard";

const PostGrid = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No posts found
        </h3>
        <p className="text-gray-400">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostGrid;
