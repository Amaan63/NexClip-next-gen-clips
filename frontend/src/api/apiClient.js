// src/api/axiosClient.js
import axios from "axios";
import { store } from "../redux/store"; // or pass store later

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
