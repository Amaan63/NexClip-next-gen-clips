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
