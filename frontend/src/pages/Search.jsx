import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categoryActions";
import SearchBar from "../components/search/SearchBar";
import PostCard from "../components/posts/PostCard";
import CategoryCard from "../components/search/CategoryCard";
import { Spinner } from "../components/common/Loader";

const Search = () => {
  const dispatch = useDispatch();
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    // Load categories for browsing
    dispatch(getCategories());
  }, [dispatch]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleCategoryClick = (category) => {
    // Filter search results by category or set as search query
    setSearchQuery(category.name);
    setActiveTab("posts");
  };

  // Separate search results by type (assuming API returns mixed results)
  const posts = searchResults.filter((item) => item.caption || item.poll);
  const users = searchResults.filter((item) => item.username && !item.caption);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Search</h2>
          <SearchBar
            onResults={handleSearchResults}
            placeholder="Search posts, users, and content..."
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            {/* Search Tabs */}
            <div className="flex space-x-6 border-b mb-4">
              <button
                onClick={() => setActiveTab("posts")}
                className={`pb-2 font-medium transition-colors ${
                  activeTab === "posts"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Posts ({posts.length})
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`pb-2 font-medium transition-colors ${
                  activeTab === "users"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Users ({users.length})
              </button>
            </div>

            {/* Search Results Content */}
            <div className="space-y-4">
              {activeTab === "posts" && (
                <>
                  {posts.length > 0 ? (
                    posts.map((post) => <PostCard key={post._id} post={post} />)
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <svg
                        className="w-12 h-12 mx-auto mb-3"
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
                      <p>No posts found for "{searchQuery}"</p>
                    </div>
                  )}
                </>
              )}

              {activeTab === "users" && (
                <>
                  {users.length > 0 ? (
                    <div className="grid gap-4">
                      {users.map((user) => (
                        <div
                          key={user._id || user.username}
                          className="bg-white rounded-lg shadow p-4"
                        >
                          <div className="flex items-center">
                            <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                              {user.username?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div className="ml-4">
                              <h3 className="font-semibold text-gray-900">
                                {user.username}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {user.email || "User"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <svg
                        className="w-12 h-12 mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <p>No users found for "{searchQuery}"</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Browse Categories */}
        {!searchQuery && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Browse Categories
            </h3>

            {categoriesLoading ? (
              <div className="flex justify-center py-8">
                <Spinner size="lg" />
              </div>
            ) : categories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <CategoryCard
                    key={category._id}
                    category={category}
                    onClick={handleCategoryClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2.828 0l-7-7A1.414 1.414 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <p>No categories available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
