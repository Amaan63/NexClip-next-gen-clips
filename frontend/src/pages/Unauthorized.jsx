import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background ambient elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 left-3/4 w-64 h-64 bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            transform: `translate(${mousePos.y}px, ${mousePos.x}px)`,
            animationDelay: "4s",
          }}
        ></div>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500 to-transparent h-1 animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 403 Text with glitch effect */}
        <div className="relative mb-8">
          <h1
            className={`text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4 select-none ${
              glitchActive ? "animate-pulse" : ""
            }`}
            style={{
              filter: glitchActive ? "hue-rotate(180deg)" : "none",
              transform: glitchActive ? "scale(1.02)" : "scale(1)",
              transition: "all 0.1s ease-out",
            }}
          >
            403
          </h1>

          {/* Glitch duplicate layers */}
          {glitchActive && (
            <>
              <h1
                className="absolute top-0 left-0 text-8xl md:text-9xl font-bold text-red-500 opacity-70"
                style={{
                  transform: "translate(-2px, 0)",
                  clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                }}
              >
                403
              </h1>
              <h1
                className="absolute top-0 left-0 text-8xl md:text-9xl font-bold text-orange-500 opacity-70"
                style={{
                  transform: "translate(2px, 0)",
                  clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                }}
              >
                403
              </h1>
            </>
          )}
        </div>

        {/* Access Denied message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Access Denied
          </h2>
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              You don't have permission to access this area. This section is
              restricted to administrators only.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/home"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
          >
            <span className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Return to Safety</span>
            </span>
          </Link>

          <Link
            to="/"
            className="group px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-xl"
          >
            <span className="flex items-center space-x-2">
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Login as Admin</span>
            </span>
          </Link>
        </div>

        {/* Help text */}
        <p className="text-gray-500 text-sm mt-8">
          Need admin access? Contact your system administrator for assistance.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
