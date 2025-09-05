import { createCategory } from "../services/category.service.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name, description, avatarUrl } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (
      avatarUrl !== undefined &&
      (typeof avatarUrl !== "string" || avatarUrl.trim() === "")
    ) {
      return res.status(400).json({
        success: false,
        message: "Avatar URL must be a non-empty string if provided",
      });
    }

    const category = await createCategory(name, description, avatarUrl);
    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
