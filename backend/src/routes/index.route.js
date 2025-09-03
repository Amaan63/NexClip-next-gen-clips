import express from "express";
import authRoute from "./auth.route.js";

const router = express.Router();

// Auth route
router.use("/auth", authRoute);

export default router;
