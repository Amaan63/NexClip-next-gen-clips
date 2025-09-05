import express from "express";
import { getAllCategoriesController } from "../../controllers/category.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const categoryUserRoute = express.Router();

// Logged-in users can get all categories
categoryUserRoute.get(
  "/getAllCategory",
  authMiddleware, // optional, if only logged-in users can access
  getAllCategoriesController
);

export default categoryUserRoute;
