// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useToastContext } from "../Toast/ToastProvider";

// const Header = () => {
//   const navigate = useNavigate();
//   const toast = useToastContext();

//   const handleLogout = () => {
//     // Show logout toast
//     toast.success("See you soon, beautiful! 💋", 2500);

//     // Navigate to login after a short delay
//     navigate("/");
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
//       <div className="flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <div className="flex items-center">
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Nex-Clip
//           </h1>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
//         >
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//             />
//           </svg>
//           <span>Logout</span>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/auth.slice";
import { useToastContext } from "../Toast/ToastProvider";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToastContext();

  // Get auth state
  const { user, role, token } = useSelector((state) => state.auth);
  const isAdmin = token && role === "admin";
  const isLoggedIn = !!token;

  const handleLogout = () => {
    // Show logout toast
    toast.success("See you soon, beautiful! 💋", 2500);

    // Dispatch logout action
    dispatch(logout());

    // Navigate to login after a short delay
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/60 backdrop-blur-2xl border-b border-white/10 z-50 h-20">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nex-Clip
              </h1>
              {isAdmin && (
                <span className="text-xs text-yellow-400 font-medium">
                  Admin Panel
                </span>
              )}
            </div>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {/* Admin Badge */}
          {isAdmin && (
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl">
              <span className="text-yellow-400 text-sm">👑</span>
              <span className="text-yellow-300 text-sm font-medium">Admin</span>
            </div>
          )}

          {/* User Info */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.username?.charAt(0) || "U"}
              </span>
            </div>
            <div className="hidden lg:block">
              <p className="text-white text-sm font-medium">
                {user?.username || "User"}
              </p>
              <p className="text-gray-400 text-xs">
                {`${user?.username}@nexclip.com` || "user@example.com"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 hover:border-red-400/50 text-red-300 hover:text-red-200 rounded-xl transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </header>
  );
};

export default Header;
