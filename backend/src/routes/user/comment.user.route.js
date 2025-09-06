import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  addCommentController,
  getCommentsController,
} from "../../controllers/comment.controller.js";

const userCommentRouter = express.Router();

userCommentRouter.post("/addComment", authMiddleware, addCommentController);

userCommentRouter.get(
  "/getComments/:postId",
  authMiddleware,
  getCommentsController
);

export default userCommentRouter;
