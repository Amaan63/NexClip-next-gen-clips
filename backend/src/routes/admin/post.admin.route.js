import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsForAdminController,
  updatePostController,
} from "../../controllers/post.controller.js";
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

postAdminRouter.get(
  "/getAllPosts",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  getAllPostsForAdminController
);

postAdminRouter.put(
  "/updatePost/:postId",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  updatePostController
);

postAdminRouter.delete(
  "/deletePost/:postId",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN),
  deletePostController
);

export default postAdminRouter;
