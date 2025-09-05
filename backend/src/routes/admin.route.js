import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllUsersController } from "../controllers/admin.controller.js";
import { authorizeRoles } from "../middlewares/authorize.role.js";
import categoryRoute from "./category.route.js";
import { ROLES } from "../utils/roles.js";

const adminRoute = express.Router();

adminRoute.get(
  "/getAllUsers",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  getAllUsersController
);
adminRoute.use("/Category", categoryRoute);

export default adminRoute;
