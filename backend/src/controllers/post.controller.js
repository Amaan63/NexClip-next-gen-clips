import {
  createPost,
  deletePost,
  getAllPostsForAdmin,
  getAllPublicPosts,
  updatePost,
} from "../services/post.service.js";
import { validatePost } from "../validations/validatePost.js";

export const createPostController = async (req, res) => {
  try {
    // Destructure fields from req.body
    const { caption, mediaUrl, categories, poll, visibility, allowComments } =
      req.body;

    // Validate incoming data
    const errors = validatePost(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Call service to create post
    const post = await createPost({
      caption,
      mediaUrl,
      categories,
      poll,
      visibility,
      allowComments,
    });

    // Respond with created post
    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Controller for users → only fetch public posts
export const getAllPublicPostsController = async (req, res) => {
  try {
    const posts = await getAllPublicPosts();
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller for admin → fetch all posts
export const getAllPostsForAdminController = async (req, res) => {
  try {
    const posts = await getAllPostsForAdmin();
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Controller to update post
export const updatePostController = async (req, res) => {
  try {
    // Validate incoming data
    const errors = validatePost(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const updatedPost = await updatePost(req.params.postId, req.body);

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Controller to delete post
export const deletePostController = async (req, res) => {
  try {
    const result = await deletePost(req.params.postId);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.post,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
