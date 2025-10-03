import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCategory } from "./category.api";

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
