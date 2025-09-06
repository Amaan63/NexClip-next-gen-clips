import mongoose from "mongoose";
import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const addComment = async ({ postId, userId, text }) => {
  // Validate post existence
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Check if comments are allowed
  if (!post.allowComments) {
    throw new Error("Comments are disabled for this post");
  }

  const comment = new Comment({
    post: postId,
    user: userId,
    text: text.trim(),
  });

  await comment.save();
  return comment;
};

export const getCommentsByPost = async (postId) => {
  // Validate postId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new Error("Invalid post ID");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Check if comments are allowed
  if (!post.allowComments) {
    throw new Error("Comments are not allowed for this post");
  }

  // Fetch all comments for this post
  const comments = await Comment.find({ post: postId })
    .populate("user", "username role") // populate username and role
    .sort({ createdAt: -1 }); // latest comments first

  if (!comments || comments.length === 0) {
    throw new Error("No comments found for this post");
  }

  return comments;
};
