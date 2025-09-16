// src/redux/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./auth.thunk";

// Helper functions for localStorage persistence
const getUserFromStorage = () => {
  try {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const getRoleFromStorage = () => {
  return sessionStorage.getItem("role") || null;
};

const getTokenFromStorage = () => {
  return sessionStorage.getItem("token") || null;
};

const initialState = {
  user: getUserFromStorage(),
  role: getRoleFromStorage(),
  token: getTokenFromStorage(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.error = null;

      // Clear all auth data from storage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("role");
    },

    // Add action to restore auth state (useful for app initialization)
    restoreAuthState: (state) => {
      state.user = getUserFromStorage();
      state.role = getRoleFromStorage();
      state.token = getTokenFromStorage();
    },

    // Clear error action
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.token = action.payload.token;

        // Store all auth data in sessionStorage
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("role", action.payload.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        // Clear any existing auth data on login failure
        state.user = null;
        state.role = null;
        state.token = null;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("role");
      });
  },
});

export const { logout, restoreAuthState, clearError } = authSlice.actions;
export default authSlice.reducer;
