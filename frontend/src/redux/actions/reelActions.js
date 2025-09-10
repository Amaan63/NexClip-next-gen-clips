import toast from "react-hot-toast";
import * as reelApi from "../../api/reelApi";
import {
  GET_REELS_REQUEST,
  GET_REELS_SUCCESS,
  GET_REELS_FAILURE,
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  CREATE_REEL_FAILURE,
  UPDATE_REEL_REQUEST,
  UPDATE_REEL_SUCCESS,
  UPDATE_REEL_FAILURE,
  DELETE_REEL_REQUEST,
  DELETE_REEL_SUCCESS,
  DELETE_REEL_FAILURE,
  CLEAR_REELS,
  SET_CURRENT_REEL,
} from "../actionTypes/reelTypes";

// Get all public reels
export const getReels = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REELS_REQUEST });

    const response = await reelApi.getAllPublicReels();

    dispatch({
      type: GET_REELS_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch reels";
    dispatch({
      type: GET_REELS_FAILURE,
      payload: errorMessage,
    });
    throw error;
  }
};

// Create new reel (admin)
export const createReel = (reelData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REEL_REQUEST });

    const response = await reelApi.createReel(reelData);

    dispatch({
      type: CREATE_REEL_SUCCESS,
      payload: response.data,
    });

    toast.success("Reel created successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to create reel";
    dispatch({
      type: CREATE_REEL_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    throw error;
  }
};

// Update reel (admin)
export const updateReel = (reelId, reelData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REEL_REQUEST });

    const response = await reelApi.updateReel(reelId, reelData);

    dispatch({
      type: UPDATE_REEL_SUCCESS,
      payload: response.data,
    });

    toast.success("Reel updated successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update reel";
    dispatch({
      type: UPDATE_REEL_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    throw error;
  }
};

// Delete reel (admin)
export const deleteReel = (reelId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REEL_REQUEST });

    await reelApi.deleteReel(reelId);

    dispatch({
      type: DELETE_REEL_SUCCESS,
      payload: reelId,
    });

    toast.success("Reel deleted successfully!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete reel";
    dispatch({
      type: DELETE_REEL_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    throw error;
  }
};

// Set current playing reel
export const setCurrentReel = (reel) => ({
  type: SET_CURRENT_REEL,
  payload: reel,
});

// Clear reels
export const clearReels = () => ({
  type: CLEAR_REELS,
});
