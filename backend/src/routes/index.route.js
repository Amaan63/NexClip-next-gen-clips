import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import adminRoute from "./admin.route.js";
const router = express.Router();

// Auth route
router.use("/auth", authRoute);
// User route
router.use("/user", userRoute);
// Admin route
router.use("/admin", adminRoute);

export default router;
