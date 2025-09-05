import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
} from "../../controllers/category.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/authorize.role.js";
import { ROLES } from "../../utils/roles.js";

const categoryAdminRoute = express.Router();

// Route to create a new category
categoryAdminRoute.post(
  "/createCategory",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  createCategoryController
); // POST /api/categories

// Update
categoryAdminRoute.put(
  "/updateCategory/:categoryId",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  updateCategoryController
);


export default categoryAdminRoute;
