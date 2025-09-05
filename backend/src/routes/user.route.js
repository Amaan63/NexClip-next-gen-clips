import express from "express";
import { getProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import categoryUserRoute from "./user/category.user.route.js";

const userRoute = express.Router();

userRoute.get("/profile", authMiddleware, getProfile);
userRoute.use("/", categoryUserRoute); // GET /api/users/profile

export default userRoute;
