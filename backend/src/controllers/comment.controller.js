import { addComment } from "../services/comment.service.js";
import { validateComment } from "../validations/validateComment.js";

export const addCommentController = async (req, res) => {
  try {
    const { postId, text } = req.body;

    // Get userId from JWT (set by auth middleware)
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    // Validate comment
    const errors = validateComment({ text });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const comment = await addComment({ postId, userId, text });

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
