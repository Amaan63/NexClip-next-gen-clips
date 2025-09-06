import express from "express";
import { createPostController } from "../../controllers/post.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/authorize.role.js";
import { ROLES } from "../../constants/roles.js";

const postAdminRouter = express.Router();

postAdminRouter.post(
  "/createPost",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  createPostController
);

export default postAdminRouter;
