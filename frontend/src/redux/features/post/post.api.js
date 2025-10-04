import apiClient from "../../../api/apiClient";

export const createPost = async (postData) => {
  const { data } = apiClient.post(`admin/Post/createPost`, postData);
  return data;
};

export const getAllPosts = async () => {
  const { data } = await apiClient.get(`admin/Post/getAllPosts`);
  return data;
};
