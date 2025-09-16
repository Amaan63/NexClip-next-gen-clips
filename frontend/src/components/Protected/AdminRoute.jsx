// src/components/Protected/AdminRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * AdminRoute checks if the logged-in user has admin privileges.
 * If yes, it renders the children (the admin page).
 * If not logged in, redirects to login page.
 * If logged in but not admin, redirects to unauthorized page.
 */
const AdminRoute = ({ children }) => {
  const { role, token } = useSelector((state) => state.auth);

  // Not logged in - redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Logged in but not admin - redirect to unauthorized
  if (role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is admin - render the protected content
  return children;
};

export default AdminRoute;
