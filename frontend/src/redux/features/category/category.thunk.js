import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCategory, getAllCategories } from "./category.api";

export const createCategoryThunk = createAsyncThunk(
  "category/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const data = await createCategory(categoryData);
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data.categories;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const fetchAllCategoriesThunk = createAsyncThunk(
  "category/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllCategories();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data.categories;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);
