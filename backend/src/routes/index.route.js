import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
const router = express.Router();

// Auth route
router.use("/auth", authRoute);
// User route
router.use("/user", userRoute);

export default router;
