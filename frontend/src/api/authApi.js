import axiosClient from "./axiosClient";

// Login user
export const login = (credentials) => {
  return axiosClient.post("/auth/login", credentials);
};

// Get user profile
export const getProfile = () => {
  return axiosClient.get("/user/profile");
};

// Note: Registration endpoint not found in Postman collection
// Only login flow is implemented as per requirements
