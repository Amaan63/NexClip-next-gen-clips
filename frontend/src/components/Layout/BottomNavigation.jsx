import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get auth state from Redux
  const { user, role, token } = useSelector((state) => state.auth);
  const isAdmin = token && role === "admin";
  const isLoggedIn = !!token;

  const navItems = [
    {
      id: "home",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Home",
      path: "/home",
    },
    {
      id: "search",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      label: "Search",
      path: "/search",
    },
    {
      id: "reel",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      label: "Reels",
      path: "/reels",
    },
    {
      id: "profile",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      label: "Profile",
      path: "/profile",
    },
  ];

  // Admin item for mobile (only show if user is admin)
  const adminItem = {
    id: "admin",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    label: "Admin",
    path: "/admin",
  };

  // Adjust navigation items based on admin status for mobile
  let displayItems = [...navItems];

  if (isAdmin) {
    // For admin on mobile, replace profile with admin (or add admin if space allows)
    // You can customize this logic based on your preference
    displayItems = [
      navItems[0], // Home
      navItems[1], // Search
      navItems[2], // Reels
      adminItem, // Admin (replaces Profile)
    ];
  }

  const handleNavClick = (path) => {
    navigate(path);
  };

  // Don't show bottom navigation if user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10 lg:hidden z-50">
      <div className="flex items-center justify-around px-2 py-3">
        {displayItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isAdminItem = item.id === "admin";

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`relative flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? isAdminItem
                    ? "text-yellow-400"
                    : "text-purple-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {/* Admin Badge */}
              {isAdminItem && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              )}

              <span
                className={`transition-colors relative ${
                  isActive
                    ? isAdminItem
                      ? "text-yellow-400"
                      : "text-purple-400"
                    : "text-gray-400"
                }`}
              >
                {item.icon}

                {/* Admin Crown Overlay */}
                {isAdminItem && (
                  <div className="absolute -top-1 -right-1 text-xs">👑</div>
                )}
              </span>

              <span
                className={`text-xs font-medium transition-colors ${
                  isActive
                    ? isAdminItem
                      ? "text-yellow-400"
                      : "text-purple-400"
                    : "text-gray-400"
                }`}
              >
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <div
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                    isAdminItem
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                      : "bg-gradient-to-r from-purple-400 to-pink-400"
                  }`}
                ></div>
              )}
            </button>
          );
        })}

        {/* Profile access for admin users (floating button) */}
        {isAdmin && (
          <button
            onClick={() => handleNavClick("/profile")}
            className="absolute -top-12 right-4 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
            title="Profile"
          >
            <svg
              className="w-5 h-5 text-white"
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
          </button>
        )}
      </div>

      {/* Admin indicator bar */}
      {isAdmin && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"></div>
      )}
    </nav>
  );
};

export default BottomNavigation;
