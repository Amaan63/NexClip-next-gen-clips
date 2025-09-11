import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
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
    }, 3000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            top: "20%",
            left: "20%",
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"
          style={{
            bottom: "20%",
            right: "20%",
            transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
          }}
        ></div>
        <div
          className="absolute w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-2000"
          style={{
            top: "60%",
            left: "60%",
            transform: `translate(${mousePos.y}px, ${mousePos.x}px)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Glitch effect 404 */}
        <div className="relative mb-8">
          <h1
            className={`text-8xl md:text-[11rem] font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent select-none relative ${
              glitchActive ? "animate-pulse" : ""
            }`}
            style={{
              textShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
              filter: glitchActive ? "hue-rotate(180deg)" : "none",
            }}
          >
            404
          </h1>

          {/* Glitch layers */}
          <h1
            className={`absolute top-0 left-0 text-8xl md:text-[11rem] font-bold text-red-400 opacity-30 select-none ${
              glitchActive ? "animate-ping" : ""
            }`}
            style={{
              transform: glitchActive
                ? "translate(4px, 2px)"
                : "translate(2px, 1px)",
              transition: "transform 0.1s",
            }}
          >
            404
          </h1>
          <h1
            className={`absolute top-0 left-0 text-8xl md:text-[11rem] font-bold text-cyan-400 opacity-30 select-none ${
              glitchActive ? "animate-ping" : ""
            }`}
            style={{
              transform: glitchActive
                ? "translate(-4px, -2px)"
                : "translate(-2px, -1px)",
              transition: "transform 0.1s",
            }}
          >
            404
          </h1>
        </div>

        {/* Error message with intimate touch */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Lost in the <span className="text-purple-400">digital maze</span>?
          </h2>
          <p className="text-gray-300 text-lg max-w-lg mx-auto leading-relaxed">
            This page seems to have slipped away into the shadows. Don't worry,
            we'll guide you back to your{" "}
            <span className="text-pink-400">private sanctuary</span>.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            to="/"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black shadow-lg shadow-purple-500/25 overflow-hidden"
          >
            <span className="relative z-10">
              {isHovered ? "🏠 Return to Sanctuary" : "Back to Login"}
            </span>

            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-purple-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 backdrop-blur-sm"
          >
            ← Previous Page
          </button>
        </div>

        {/* Features section with intimate touch */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm mb-8">
          <h3 className="text-white font-semibold text-lg mb-4">
            While you're here, remember what awaits
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
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

        {/* Floating elements */}
        <div className="flex justify-center space-x-8 mb-6">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce animation-delay-400"></div>
        </div>

        {/* Error code with intimate message */}
        <div className="text-gray-500 text-xs font-mono">
          ERROR_CODE: SANCTUARY_PAGE_NOT_FOUND
        </div>
        <div className="text-gray-600 text-xs mt-2">
          Discretion guaranteed • Your privacy matters
        </div>
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168, 85, 247, 0.1) 2px, rgba(168, 85, 247, 0.1) 4px)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default NotFound;
