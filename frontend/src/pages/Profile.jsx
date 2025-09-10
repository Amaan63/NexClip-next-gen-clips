import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../redux/actions/authActions";
import { getPosts } from "../redux/actions/postActions";
import { getReels } from "../redux/actions/reelActions";
import PostCard from "../components/posts/PostCard";
import ReelCard from "../components/reels/ReelCard";
import Button from "../components/common/Button";
import { Spinner } from "../components/common/Loader";
import { showToast } from "../components/common/Toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const { reels } = useSelector((state) => state.reels);
  const [activeTab, setActiveTab] = useState("posts");
  const [userPosts, setUserPosts] = useState([]);
  const [userReels, setUserReels] = useState([]);

  useEffect(() => {
    // Load user profile
    if (!user) {
      dispatch(getProfile()).catch(() => {
        showToast.error("Failed to load profile");
      });
    }

    // Load posts and reels to filter user's content
    dispatch(getPosts());
    dispatch(getReels());
  }, [dispatch, user]);

  useEffect(() => {
    // Filter posts and reels by current user
    if (user && posts.length > 0) {
      const filtered = posts.filter(
        (post) =>
          post.createdBy?.username === user.username ||
          post.createdBy?._id === user._id
      );
      setUserPosts(filtered);
    }

    if (user && reels.length > 0) {
      const filtered = reels.filter(
        (reel) =>
          reel.createdBy?.username === user.username ||
          reel.createdBy?._id === user._id
      );
      setUserReels(filtered);
    }
  }, [user, posts, reels]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Avatar */}
            <div className="h-24 w-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {user?.username || "User"}
              </h1>

              {user?.email && (
                <p className="text-gray-600 mb-4">{user.email}</p>
              )}

              {/* Stats */}
              <div className="flex justify-center sm:justify-start space-x-6 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {userPosts.length}
                  </div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {userReels.length}
                  </div>
                  <div className="text-sm text-gray-600">Reels</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button variant="secondary" size="sm">
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "posts"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
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
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <span>Posts ({userPosts.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("reels")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "reels"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
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
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span>Reels ({userReels.length})</span>
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "posts" && (
              <div className="space-y-6">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <svg
                      className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No posts yet
                    </h3>
                    <p className="text-gray-600">
                      Your posts will appear here once you create them.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reels" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userReels.length > 0 ? (
                  userReels.map((reel) => (
                    <ReelCard key={reel._id} reel={reel} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <svg
                      className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No reels yet
                    </h3>
                    <p className="text-gray-600">
                      Your reels will appear here once you create them.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
