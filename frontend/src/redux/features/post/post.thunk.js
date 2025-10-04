import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPost } from "./post.api";

export const createPostThunk = createAsyncThunk(
  "post/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createPost(postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
