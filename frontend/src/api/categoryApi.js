import axiosClient from "./axiosClient";

// Get all categories
export const getAllCategories = () => {
  return axiosClient.get("/user/getAllCategory");
};

// Create new category (admin)
export const createCategory = (categoryData) => {
  return axiosClient.post("/admin/Category/createCategory", categoryData);
};

// Update category (admin)
export const updateCategory = (categoryId, categoryData) => {
  return axiosClient.put(
    `/admin/Category/updateCategory/${categoryId}`,
    categoryData
  );
};

// Delete category (admin)
export const deleteCategory = (categoryId) => {
  return axiosClient.delete(`/admin/Category/deleteCategory/${categoryId}`);
};
