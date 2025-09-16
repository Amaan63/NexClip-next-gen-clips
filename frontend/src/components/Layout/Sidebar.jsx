import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // Get auth state from Redux
  const { user, role, token } = useSelector((state) => state.auth);
  const isAdmin = token && role === "admin";
  const isLoggedIn = !!token;

  const navItems = [
    {
      id: "home",
      icon: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Home",
      path: "/home",
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "search",
      icon: (
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      label: "Search",
      path: "/search",
      color: "from-green-500 to-teal-500",
    },
    {
      id: "reel",
      icon: (
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
      ),
      label: "Reels",
      path: "/reels",
      color: "from-pink-500 to-red-500",
    },
    {
      id: "profile",
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: "Profile",
      path: "/profile",
      color: "from-purple-500 to-pink-500",
    },
  ];

  // Admin-specific navigation items (only show if user is admin)
  const adminItems = [
    {
      id: "admin-dashboard",
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      label: "Admin",
      path: "/admin",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  // Combine nav items based on user role
  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems;

  const handleNavClick = (path) => {
    navigate(path);
  };

  // Don't show sidebar if user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {/* Narrow Sidebar */}
      <aside
        className={`fixed left-0 top-20 bottom-0 bg-black/60 backdrop-blur-2xl border-r border-white/20 hidden lg:block z-40 transition-all duration-500 ${
          isExpanded ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Unique gradient border */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-pink-500/10 rounded-r-3xl"></div>

        {/* Admin Badge */}
        {isAdmin && (
          <div className="absolute -right-2 top-4 z-50">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
        )}

        {/* Admin Info Panel (when expanded) */}
        {isAdmin && isExpanded && (
          <div className="absolute top-4 left-4 right-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-2xl p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-yellow-300 text-xs">Administrator</p>
              </div>
            </div>
          </div>
        )}

        <nav className={`relative p-4 ${isAdmin ? "pt-24" : "pt-8"}`}>
          <ul className="space-y-6">
            {allItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={item.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative group">
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className={`relative w-12 h-12 rounded-2xl transition-all duration-300 flex items-center justify-center group-hover:scale-110 ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} shadow-lg shadow-purple-500/25`
                          : "bg-white/5 hover:bg-white/10 group-hover:shadow-lg"
                      }`}
                    >
                      {/* Icon */}
                      <span
                        className={`transition-all duration-300 ${
                          isActive
                            ? "text-white scale-110"
                            : "text-gray-400 group-hover:text-white group-hover:scale-110"
                        }`}
                      >
                        {item.icon}
                      </span>

                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
                      )}

                      {/* Admin special indicator */}
                      {item.id === "admin-dashboard" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                      )}
                    </button>

                    {/* Tooltip */}
                    <div
                      className={`absolute left-16 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                        isExpanded
                          ? "opacity-0 invisible"
                          : "opacity-0 group-hover:opacity-100 invisible group-hover:visible"
                      }`}
                    >
                      <div className="bg-black/90 text-white px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap shadow-xl border border-white/10">
                        {item.label}
                        {item.id === "admin-dashboard" && (
                          <span className="ml-2 text-yellow-400">👑</span>
                        )}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/90 rotate-45 border-l border-b border-white/10"></div>
                      </div>
                    </div>

                    {/* Expanded label */}
                    <div
                      className={`absolute left-20 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                        isExpanded
                          ? "opacity-100 visible translate-x-0"
                          : "opacity-0 invisible -translate-x-4"
                      }`}
                    >
                      <span className="text-white font-medium text-sm whitespace-nowrap flex items-center">
                        {item.label}
                        {item.id === "admin-dashboard" && (
                          <span className="ml-2 text-yellow-400">👑</span>
                        )}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Floating orb decoration */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                isAdmin
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                  : "bg-gradient-to-r from-purple-400 to-pink-400"
              }`}
            ></div>
          </div>
        </nav>
      </aside>

      {/* Mobile overlay when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
