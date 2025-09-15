import { createBrowserRouter } from "react-router-dom";

// Existing pages
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

// New pages
import Home from "../pages/Home";
import Search from "../pages/Search";
import Reels from "../pages/Reels";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Login page at root
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/reels",
    element: <Reels />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*", // catch-all 404
    element: <NotFound />,
  },
]);

export default router;
