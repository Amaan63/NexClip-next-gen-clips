import express from "express";
import { getProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import categoryUserRoute from "./user/category.user.route.js";
import userPostRouter from "./user/post.user.route.js";
import userCommentRouter from "./user/comment.user.route.js";
import reelUserRoute from "./user/reel.user.route.js";

const userRoute = express.Router();

userRoute.get("/profile", authMiddleware, getProfile);
userRoute.use("/", categoryUserRoute); // GET /api/users/profile
userRoute.use("/Post", userPostRouter); // GET /api/users/Post/getAllPublicPosts
userRoute.use("/Comment", userCommentRouter); // POST /api/users/Comment/addComment
userRoute.use("/Reel", reelUserRoute); // GET /api/users/Reel/getAllPublicReels

export default userRoute;
