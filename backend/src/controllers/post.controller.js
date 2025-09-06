import {
  createPost,
  getAllPostsForAdmin,
  getAllPublicPosts,
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

