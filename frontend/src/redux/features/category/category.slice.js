import { createSlice } from "@reduxjs/toolkit";
import { createCategoryThunk } from "./category.thunk";

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
      });
  },
});

export const { clearCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
