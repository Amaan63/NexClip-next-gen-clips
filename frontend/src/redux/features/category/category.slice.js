import { createSlice } from "@reduxjs/toolkit";
import { createCategoryThunk, fetchAllCategoriesThunk } from "./category.thunk";

const initialState = {
  categories: [], // keep an array to store multiple
  loading: false,
  error: null,
  message: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategoryState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE CATEGORY
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = "Category created successfully";

        // push the new category into array
        state.categories.push(action.payload);
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create category";
        state.message = null;
      })

      // ✅ FETCH ALL CATEGORIES
      .addCase(fetchAllCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchAllCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // replace array with fetched categories
        state.error = null;
        state.message = "Categories fetched successfully";
      })
      .addCase(fetchAllCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
        state.message = null;
      });
  },
});

export const { clearCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
