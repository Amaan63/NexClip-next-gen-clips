import { createSlice } from "@reduxjs/toolkit";
import { createPostThunk, getAllPostsThunk } from "./post.thunk";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearPostState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 👉 Create Post
      .addCase(createPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        // If the backend returns the full updated posts array
        if (Array.isArray(action.payload?.posts)) {
          state.posts = action.payload.posts;
        } else if (action.payload?.post) {
          // Or if it returns a single post
          state.posts.unshift(action.payload.post);
        }
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      })

      // 👉 Get All Posts
      .addCase(getAllPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPostsThunk.fulfilled, (state, action) => {
        console.log("Fetched posts payload:", action.payload); // 🔍
        state.loading = false;
        state.posts = action.payload?.posts || [];
        state.error = null;
      })
      .addCase(getAllPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch posts";
      });
  },
});

export const { clearPostState } = postSlice.actions;
export default postSlice.reducer;
