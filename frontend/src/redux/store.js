// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import categoryReducer from "./features/category/category.slice";
import postReducer from "./features/post/post.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    post: postReducer,
  },
});
