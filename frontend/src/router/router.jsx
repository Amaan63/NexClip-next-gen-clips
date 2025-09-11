import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // show login at root
  },
  {
    path: "*", // catch-all 404
    element: <NotFound />,
  },
]);

export default router;
