import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import Button from "../common/Button";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">NexClip</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Search
            </Link>
            <Link
              to="/reels"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Reels
            </Link>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Admin
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <div className="h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="hidden sm:block font-medium">
                {user?.username || "User"}
              </span>
            </Link>

            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
