import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  updateCategoryById,
} from "../services/category.service.js";

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

export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

// Update Category
export const updateCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, avatarUrl } = req.body;

    const updatedCategory = await updateCategoryById(categoryId, {
      name,
      description,
      avatarUrl,
    });

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Category
export const deleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const result = await deleteCategoryById(categoryId);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
