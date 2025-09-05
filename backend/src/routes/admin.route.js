import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllUsersController } from "../controllers/admin.controller.js";
import { authorizeRoles } from "../middlewares/authorize.role.js";
import { ROLES } from "../utils/roles.js";
import categoryAdminRoute from "./admin/category.admin.route.js";

const adminRoute = express.Router();

adminRoute.get(
  "/getAllUsers",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  getAllUsersController
);
adminRoute.use("/Category", categoryAdminRoute);

export default adminRoute;
