import toast from "react-hot-toast";
import * as postApi from "../../api/postApi";
import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  VOTE_POLL_SUCCESS,
  CLEAR_POSTS,
} from "../actionTypes/postTypes";

// Get all public posts
export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_POSTS_REQUEST });

    const response = await postApi.getAllPublicPosts();

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch posts";
    dispatch({
      type: GET_POSTS_FAILURE,
      payload: errorMessage,
    });
    throw error;
  }
};

// Create new post (admin)
export const createPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    const response = await postApi.createPost(postData);

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: response.data,
    });

    toast.success("Post created successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to create post";
    dispatch({
      type: CREATE_POST_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    throw error;
  }
};

// Update post (admin)
export const updatePost = (postId, postData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });

    const response = await postApi.updatePost(postId, postData);

    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: response.data,
    });

    toast.success("Post updated successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update post";
    dispatch({
      type: UPDATE_POST_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    throw error;
  }
};

// Delete post (admin)
export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    await postApi.deletePost(postId);

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: postId,
    });

    toast.success("Post deleted successfully!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete post";
    dispatch({
      type: DELETE_POST_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    throw error;
  }
};

// Add comment to post
export const addComment = (postId, text) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COMMENT_REQUEST });

    const response = await postApi.addComment(postId, text);

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: { postId, comment: response.data },
    });

    toast.success("Comment added!");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to add comment";
    dispatch({
      type: ADD_COMMENT_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    throw error;
  }
};

// Get comments for a post
export const getComments = (postId) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENTS_REQUEST });

    const response = await postApi.getComments(postId);

    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: { postId, comments: response.data },
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch comments";
    dispatch({
      type: GET_COMMENTS_FAILURE,
      payload: errorMessage,
    });
    throw error;
  }
};

// Vote on poll (optimistic update)
export const votePoll = (postId, optionIndex) => async (dispatch, getState) => {
  try {
    // Optimistic update
    const posts = getState().posts.posts;
    const post = posts.find((p) => p._id === postId);

    if (post && post.poll) {
      const updatedPost = {
        ...post,
        poll: {
          ...post.poll,
          options: post.poll.options.map((option, index) =>
            index === optionIndex
              ? { ...option, votes: (option.votes || 0) + 1 }
              : option
          ),
        },
      };

      dispatch({
        type: VOTE_POLL_SUCCESS,
        payload: updatedPost,
      });
    }

    // Note: API endpoint for poll voting not found in Postman collection
    // This is an optimistic update only
    toast.success("Vote recorded!");
  } catch (error) {
    toast.error("Failed to vote");
    throw error;
  }
};

// Clear posts
export const clearPosts = () => ({
  type: CLEAR_POSTS,
});
