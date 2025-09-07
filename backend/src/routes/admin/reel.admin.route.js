import express from "express";
import {
  createReelController,
  deleteReelController,
  getAllReelsController,
  updateReelController,
} from "../../controllers/reel.controller.js";
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

reelAdminRouter.get(
  "/getAllReels",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  getAllReelsController
);

reelAdminRouter.put(
  "/updateReel/:reelId",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  updateReelController
);

reelAdminRouter.delete(
  "/deleteReel/:reelId",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  deleteReelController
);

export default reelAdminRouter;
