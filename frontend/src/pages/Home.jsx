import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/postActions";
import { getCategories } from "../redux/actions/categoryActions";
import PostCard from "../components/posts/PostCard";
import CategoryCard from "../components/search/CategoryCard";
import { PostSkeleton } from "../components/common/Loader";
import { showToast } from "../components/common/Toast";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const { categories } = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter posts by selected category
  const filteredPosts = selectedCategory
    ? posts.filter((post) =>
        post.categories?.some((cat) =>
          typeof cat === "string"
            ? cat === selectedCategory.name
            : cat.name === selectedCategory.name
        )
      )
    : posts;

  useEffect(() => {
    // Load posts and categories on component mount
    dispatch(getPosts()).catch(() => {
      showToast.error("Failed to load posts");
    });

    dispatch(getCategories()).catch(() => {
      showToast.error("Failed to load categories");
    });
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(
      selectedCategory?.name === category.name ? null : category
    );
  };

  const handleRefresh = () => {
    dispatch(getPosts());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedCategory
              ? `${selectedCategory.name} Posts`
              : "Latest Posts"}
          </h2>

          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Show all posts
            </button>
          )}
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  onClick={handleCategoryClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))
          ) : filteredPosts.length > 0 ? (
            // Posts list
            filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            // Empty state
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedCategory
                  ? "No posts in this category"
                  : "No posts available"}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedCategory
                  ? "Try selecting a different category or check back later."
                  : "Posts will appear here once they are created."}
              </p>
              <button
                onClick={handleRefresh}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
