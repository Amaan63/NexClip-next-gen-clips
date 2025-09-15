import React from "react";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "../Toast/ToastProvider";

const Header = () => {
  const navigate = useNavigate();
  const toast = useToastContext();

  const handleLogout = () => {
    // Show logout toast
    toast.success("See you soon, beautiful! 💋", 2500);

    // Navigate to login after a short delay
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nex-Clip
          </h1>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
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
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
