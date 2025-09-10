import React from "react";

// Spinner loader
export const Spinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div
      className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]} ${className}`}
    ></div>
  );
};

// Skeleton loader for posts
export const PostSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 animate-pulse">
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div className="ml-3">
          <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
      <div className="h-48 bg-gray-300 rounded mb-3"></div>
      <div className="flex space-x-4">
        <div className="h-8 bg-gray-300 rounded w-16"></div>
        <div className="h-8 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );
};

// Skeleton loader for reels
export const ReelSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow mb-4 animate-pulse">
      <div className="h-96 bg-gray-300 rounded-t-lg"></div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="ml-2 h-4 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

// Generic page loader
export const PageLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

const Loader = Spinner;

export default Loader;
