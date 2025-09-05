import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllUsersController } from "../controllers/admin.controller.js";
import { authorizeRoles } from "../middlewares/authorize.role.js";

const adminRoute = express.Router();

adminRoute.get(
  "/getAllUsers",
  authMiddleware,
  authorizeRoles("admin"),
  getAllUsersController
);

export default adminRoute;
