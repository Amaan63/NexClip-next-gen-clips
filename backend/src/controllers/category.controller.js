import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  updateCategoryById,
} from "../services/category.service.js";
import {
  validateCategory,
  validateUpdateCategory,
} from "../validations/validateCategory.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name, description, avatarUrl } = req.body;
    const errors = validateCategory(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const category = await createCategory(name, description, avatarUrl);
    return res.status(201).json({ success: true, categories: category });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json({ success: true, categories: categories });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

// Update Category
export const updateCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, avatarUrl } = req.body;

    const errors = validateUpdateCategory(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const updatedCategory = await updateCategoryById(categoryId, {
      name,
      description,
      avatarUrl,
    });

    res.status(200).json({ success: true, categories: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Category
export const deleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const result = await deleteCategoryById(categoryId);

    res.status(200).json({ success: true, categories: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
