import apiClient from "../../../api/apiClient";

export const createCategory = async (categoryData) => {
  const { data } = await apiClient.post(
    `admin/Category/createCategory`,
    categoryData
  );
  return data;
};
