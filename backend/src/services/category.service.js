import Category from "../models/category.js";

// Service to create a new category
export const createCategory = async (name, description, avatarUrl) => {
  const trimmedName = name.trim();

  // Check if category already exists
  const existingCategory = await Category.findOne({ name: trimmedName });
  if (existingCategory) {
    throw new Error("Category with this name already exists");
  }

  // Normalize description: null if empty, whitespace, undefined, or null
  const normalizedDescription =
    !description || description.trim() === "" ? null : description.trim();

  // Create new category
  const category = new Category({
    name: trimmedName,
    description: normalizedDescription,
    avatarUrl,
  });

  await category.save();
  return category;
};

// Service to get all categories
export const getAllCategories = async () => {
  const categories = await Category.find()
    .select("-__v")
    .sort({ createdAt: -1 });

  if (!categories || categories.length === 0) {
    throw new Error("No categories found");
  }

  return categories;
};

// Update Category by ID
export const updateCategoryById = async (
  categoryId,
  { name, description, avatarUrl }
) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }

  if (name) {
    const existingCategory = await Category.findOne({
      name: name.trim(),
      _id: { $ne: categoryId },
    });
    if (existingCategory) {
      throw new Error("Another category with this name already exists");
    }
    category.name = name.trim();
  }

  category.description = description?.trim() || null;
  category.avatarUrl = avatarUrl?.trim() || null;

  await category.save();
  return category;
};

// Delete Category by ID
export const deleteCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }

  await Category.findByIdAndDelete(categoryId);
  return { message: "Category deleted successfully" };
};
