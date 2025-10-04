import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPost, getAllPosts } from "./post.api";

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

export const getAllPostsThunk = createAsyncThunk(
  "post/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPosts();
      console.log("Fetched posts:", response);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
