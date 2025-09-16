import { createBrowserRouter } from "react-router-dom";

// Pages
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

import Home from "../pages/Home";
import Search from "../pages/Search";
import Reels from "../pages/Reels";
import Profile from "../pages/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManagePosts from "../pages/admin/ManagePosts";
import ManageReels from "../pages/admin/ManageReels";
import ManageCategories from "../pages/admin/ManageCategories";

// Route guard
import AdminRoute from "../components/Protected/AdminRoute";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/search", element: <Search /> },
  { path: "/reels", element: <Reels /> },
  { path: "/profile", element: <Profile /> },

  // Unauthorized page
  { path: "/unauthorized", element: <Unauthorized /> },

  // Admin Routes (Protected)
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/posts",
    element: (
      <AdminRoute>
        <ManagePosts />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/reels",
    element: (
      <AdminRoute>
        <ManageReels />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/categories",
    element: (
      <AdminRoute>
        <ManageCategories />
      </AdminRoute>
    ),
  },

  // Catch-all 404
  { path: "*", element: <NotFound /> },
]);

export default router;
