import axiosClient from "./axiosClient";

// Get all public posts
export const getAllPublicPosts = () => {
  return axiosClient.get("/User/Post/getAllPublicPosts");
};

// Get all posts (admin)
export const getAllPosts = () => {
  return axiosClient.get("/admin/Post/getAllPosts");
};

// Create new post (admin)
export const createPost = (postData) => {
  return axiosClient.post("/admin/Post/createPost", postData);
};

// Update post (admin)
export const updatePost = (postId, postData) => {
  return axiosClient.put(`/admin/Post/updatePost/${postId}`, postData);
};

// Delete post (admin)
export const deletePost = (postId) => {
  return axiosClient.delete(`/admin/Post/deletePost/${postId}`);
};

// Add comment to post
export const addComment = (postId, text) => {
  return axiosClient.post("/user/Comment/addComment", {
    postId,
    text,
  });
};

// Get comments for a post
export const getComments = (postId) => {
  return axiosClient.get(`/user/Comment/getComments/${postId}`);
};

// Search posts and users
export const search = (searchQuery) => {
  return axiosClient.get(
    `/User/search?searchQuery=${encodeURIComponent(searchQuery)}`
  );
};
