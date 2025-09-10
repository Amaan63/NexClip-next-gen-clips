import toast from "react-hot-toast";
import * as authApi from "../../api/authApi";
import {
  AUTH_LOADING,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  CHECK_AUTH_STATUS,
} from "../actionTypes/authTypes";

// Login action
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const response = await authApi.login(credentials);
    const { token, user } = response.data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });

    toast.success("Login successful!");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    dispatch({
      type: LOGIN_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    throw error;
  }
};

// Get user profile
export const getProfile = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    const response = await authApi.getProfile();

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to get profile";
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: errorMessage,
    });

    // If unauthorized, logout user
    if (error.response?.status === 401) {
      dispatch(logout());
    }

    throw error;
  }
};

// Check auth status on app load
export const checkAuthStatus = () => (dispatch) => {
  dispatch({ type: CHECK_AUTH_STATUS });
};

// Logout action
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  toast.success("Logged out successfully");
};
