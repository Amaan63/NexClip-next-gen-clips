import React from "react";
import toast from "react-hot-toast";

// Toast utility functions
export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  loading: (message) => toast.loading(message),
  promise: (promise, messages) => toast.promise(promise, messages),
};

// Custom toast component (if needed for specific styling)
export const CustomToast = ({ message, type = "info", onClose }) => {
  const typeStyles = {
    success: "bg-green-100 text-green-800 border-green-200",
    error: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg border shadow-lg z-50 ${typeStyles[type]}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

// Hook for easy toast usage
export const useToast = () => {
  return showToast;
};

// Default export for backward compatibility
const Toast = showToast;

export default Toast;
