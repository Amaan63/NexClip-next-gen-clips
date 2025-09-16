// src/redux/features/auth/authAPI.js
import axios from "axios";

export const login = async (credentials) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    credentials
  );
  return data;
};
