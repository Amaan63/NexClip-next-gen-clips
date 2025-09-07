import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { getAllPublicReelsController } from "../../controllers/reel.controller.js";

const reelUserRoute = express.Router();

reelUserRoute.get(
  "/getAllPublicReels",
  authMiddleware,
  getAllPublicReelsController
);

export default reelUserRoute;
