// Toast.jsx
import { useEffect } from "react";
import styles from "./Toast.module.css"; // Import CSS module

const Toast = ({ message, type, isVisible, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onClose(); // still fine: captured when mounted
    }, duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, duration]); // <-- don't put onClose here

  if (!isVisible) return null;

  const getToastStyles = () => {
    const baseClasses =
      // "fixed top-6 right-6 z-50 min-w-[350px] max-w-[450px] backdrop-blur-xl border rounded-2xl p-4 shadow-2xl transform transition-all duration-500 ease-out"
      "min-w-[350px] max-w-[450px] backdrop-blur-xl border rounded-2xl p-4 shadow-2xl transform transition-all duration-500 ease-out";

    switch (type) {
      case "success":
        return `${baseClasses} bg-black/80 border-purple-400/60 text-purple-100 shadow-purple-500/25`;
      case "error":
        return `${baseClasses} bg-black/80 border-pink-400/60 text-pink-100 shadow-pink-500/25`;
      case "info":
        return `${baseClasses} bg-black/80 border-violet-400/60 text-violet-100 shadow-violet-500/25`;
      case "warning":
        return `${baseClasses} bg-black/80 border-yellow-400/60 text-yellow-100 shadow-yellow-500/25`;
      default:
        return `${baseClasses} bg-black/80 border-white/20 text-white shadow-gray-500/25`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
      case "error":
        return (
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        );
      case "info":
        return (
          <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-violet-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case "warning":
        return (
          <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div
      className={`${getToastStyles()} ${
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Progress bar with CSS Module class */}
      <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${
            type === "success"
              ? "from-purple-400 to-purple-500"
              : type === "error"
              ? "from-pink-400 to-pink-500"
              : type === "info"
              ? "from-violet-400 to-violet-500"
              : type === "warning"
              ? "from-yellow-400 to-yellow-500"
              : "from-gray-400 to-gray-500"
          } rounded-full ${styles.animateToastProgress}`} // Use CSS module
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

export default Toast;
