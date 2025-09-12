// useToast.jsx
import { useState } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, isVisible: true, duration };

    // add toast
    setToasts((prev) => [...prev, newToast]);

    // remove after duration (no dependency on "toasts")
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration + 500); // +500 for exit animation
  };

  const hideToast = (id) => {
    // mark as invisible, then remove after fade-out
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isVisible: false } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 500);
  };

  return {
    toasts,
    showToast,
    hideToast,
    success: (msg, d) => showToast(msg, "success", d),
    error: (msg, d) => showToast(msg, "error", d),
    info: (msg, d) => showToast(msg, "info", d),
    warning: (msg, d) => showToast(msg, "warning", d),
  };
};
