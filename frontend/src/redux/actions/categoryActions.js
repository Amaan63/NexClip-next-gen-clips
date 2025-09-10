import toast from "react-hot-toast";
import * as categoryApi from "../../api/categoryApi";
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  CLEAR_CATEGORIES,
} from "../actionTypes/categoryTypes";

// Get all categories
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });

    const response = await categoryApi.getAllCategories();

    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch categories";
    dispatch({
      type: GET_CATEGORIES_FAILURE,
      payload: errorMessage,
    });
    throw error;
  }
};

// Create new category (admin)
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    const response = await categoryApi.createCategory(categoryData);

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: response.data,
    });

    toast.success("Category created successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to create category";
    dispatch({
      type: CREATE_CATEGORY_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    throw error;
  }
};

// Update category (admin)
export const updateCategory =
  (categoryId, categoryData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CATEGORY_REQUEST });

      const response = await categoryApi.updateCategory(
        categoryId,
        categoryData
      );

      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: response.data,
      });

      toast.success("Category updated successfully!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update category";
      dispatch({
        type: UPDATE_CATEGORY_FAILURE,
        payload: errorMessage,
      });
      toast.error(errorMessage);
      throw error;
    }
  };

// Delete category (admin)
export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    await categoryApi.deleteCategory(categoryId);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: categoryId,
    });

    toast.success("Category deleted successfully!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete category";
    dispatch({
      type: DELETE_CATEGORY_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    throw error;
  }
};

// Clear categories
export const clearCategories = () => ({
  type: CLEAR_CATEGORIES,
});
