import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "../components/Toast/ToastProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const naviagte = useNavigate();
  // Initialize toast
  const toast = useToastContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      // Success toast with intimate messaging
      toast.success("Welcome to your private sanctuary! 💋", 3000);
      // Navigate to home page after successful login
      naviagte("/home"); // Note: you have "naviagte" typo in your original code, keep it as is
    } else {
      // Error toast
      toast.error("Please enter your credentials to continue", 4000);
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4 overflow-hidden">
        {/* Background ambient elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Main login container */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Nex-Clip
              </h1>
              <p className="text-gray-300 text-sm">
                Your private sanctuary awaits
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username field */}
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  // required
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:left-3 peer-focus:text-purple-400 peer-focus:text-xs peer-valid:-top-2 peer-valid:left-3 peer-valid:text-purple-400 peer-valid:text-xs bg-black/80 px-1">
                  Username
                </label>
              </div>

              {/* Password field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-transparent focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  // required
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:left-3 peer-focus:text-purple-400 peer-focus:text-xs peer-valid:-top-2 peer-valid:left-3 peer-valid:text-purple-400 peer-valid:text-xs bg-black/80 px-1">
                  Password
                </label>

                {/* Password visibility toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.985 9.985 0 012.824-4.425m2.806-2.625A9.965 9.965 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.965 9.965 0 01-1.631 3.3M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3l18 18"
                      />
                    </svg>
                  ) : (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Login button */}
              <button
                type="submit"
                // onClick={() => naviagte("/home")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                {isHovered ? "Enter Your World" : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-white/10"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            {/* Features section with intimate touches */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <h3 className="text-white font-semibold text-center mb-4">
                What awaits you inside
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2 text-gray-300">
                  <span className="text-pink-400">💋</span>
                  <span>Exclusive Content</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <span className="text-purple-400">🔥</span>
                  <span>Personal Reels</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <span className="text-red-400">❤️</span>
                  <span>Private Messages</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <span className="text-yellow-400">✨</span>
                  <span>VIP Access</span>
                </div>
              </div>
            </div>

            {/* Bottom text with intimate touch */}
            <p className="text-center text-gray-500 text-xs mt-6">
              Discretion guaranteed • Your privacy matters
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
