import express from "express";
import { getAllPublicPostsController } from "../../controllers/post.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const userPostRouter = express.Router();

userPostRouter.get(
  "/getAllPublicPosts",
  authMiddleware,
  getAllPublicPostsController
);

export default userPostRouter;
