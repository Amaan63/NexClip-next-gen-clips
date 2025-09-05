import express from "express";
import { createCategoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.role.js";
import { ROLES } from "../utils/roles.js";

const categoryRoute = express.Router();

// Route to create a new category
categoryRoute.post(
  "/createCategory",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  createCategoryController
); // POST /api/categories

export default categoryRoute;
