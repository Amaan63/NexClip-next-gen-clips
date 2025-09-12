// src/components/Toast/ToastProvider.jsx
import React, { createContext, useCallback, useContext } from "react";
import { createPortal } from "react-dom";
import { useToast as useToastBase } from "./useToast.jsx";
import Toast from "./Toast.jsx";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  // ToastProvider.jsx
  const toast = useToastBase();
  const { toasts, hideToast } = toast;

  const stableHide = useCallback((id) => hideToast(id), [hideToast]);

  // 2. Portal container – fixed to viewport, stacks flex-col
  const PortalContainer = () =>
    createPortal(
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            isVisible={t.isVisible}
            duration={t.duration}
            onClose={() => stableHide(t.id)}
          />
        ))}
      </div>,
      document.body
    );

  return (
    // 3. Provide the toast object (with showToast, success, error, etc.)
    <ToastContext.Provider value={toast}>
      {children}
      {/* 4. Render the portal container here */}
      <PortalContainer />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within ToastProvider");
  }
  return context;
};
