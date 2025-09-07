import express from "express";
import { createReelController } from "../../controllers/reel.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/authorize.role.js";
import { ROLES } from "../../constants/roles.js";

const reelAdminRouter = express.Router();

reelAdminRouter.post(
  "/createReel",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  createReelController
);

export default reelAdminRouter;
