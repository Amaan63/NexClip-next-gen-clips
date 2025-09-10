import axiosClient from "./axiosClient";

// Get all public reels
export const getAllPublicReels = () => {
  return axiosClient.get("/User/Reel/getAllPublicReels");
};

// Get all reels (admin)
export const getAllReels = () => {
  return axiosClient.get("/admin/Reel/getAllReels");
};

// Create new reel (admin)
export const createReel = (reelData) => {
  return axiosClient.post("/admin/Reel/createReel", reelData);
};

// Update reel (admin)
export const updateReel = (reelId, reelData) => {
  return axiosClient.put(`/admin/Reel/updateReel/${reelId}`, reelData);
};

// Delete reel (admin)
export const deleteReel = (reelId) => {
  return axiosClient.delete(`/admin/Reel/deleteReel/${reelId}`);
};
