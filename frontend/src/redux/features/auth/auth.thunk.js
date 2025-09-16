// src/redux/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "./auth.api";

/**
 * loginUser
 * -----------
 * This is an **async thunk** for Redux Toolkit.
 * - The first argument ("auth/loginUser") is ONLY the Redux action type.
 *   ➡️ It has nothing to do with your backend endpoint.
 *   ➡️ Redux Toolkit will create:
 *        • "auth/loginUser/pending"
 *        • "auth/loginUser/fulfilled"
 *        • "auth/loginUser/rejected"
 * - The thunk calls `login()` from authAPI.js, which sends a POST request
 *   to `${VITE_API_URL}/auth/login` on your server.
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser", // <-- Action type for Redux, not the HTTP path!
  async (credentials, { rejectWithValue }) => {
    try {
      // Call the API helper that does the actual HTTP request
      const data = await login(credentials);

      // If the backend says success: false, reject with its message
      if (!data.success) {
        return rejectWithValue(data.message);
      }

      // Save the token (example: sessionStorage; could also use cookies)
      sessionStorage.setItem("token", data.generatedToken);

      // Return values to be stored in Redux state by authSlice
      return {
        user: data.user,
        role: data.user.role,
        token: data.generatedToken,
      };
    } catch (err) {
      // Catch network / server errors
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);
