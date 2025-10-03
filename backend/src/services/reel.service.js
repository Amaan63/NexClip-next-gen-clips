import mongoose from "mongoose";
import Reel from "../models/reel.js";

// Service Method to Create Reel
export const createReel = async (reelData) => {
  try {
    // Create new reel
    const reel = new Reel({
      caption: reelData.caption.trim(),
      mediaUrl: reelData.mediaUrl.trim(),
      isVisible: reelData.isVisible !== undefined ? reelData.isVisible : true,
    });

    const savedReel = await reel.save();

    return { success: true, reels: savedReel };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Get all reels (Admin)
export const getAllReels = async () => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    return { success: true, reels: reels };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Get all public reels (isVisible: true)
export const getAllPublicReels = async () => {
  try {
    const reels = await Reel.find({ isVisible: true }); // only visible reels
    return { success: true, reels: reels };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Update a reel by ID
export const updateReel = async (reelId, updateData) => {
  try {
    const reel = await Reel.findByIdAndUpdate(reelId, updateData, {
      new: true, // return updated doc
      runValidators: true, // enforce schema validation
      upsert: false, // do NOT create if not found
    });

    if (!reel) {
      return { success: false, message: "Reel not found" };
    }
    return { success: true, reels: reel };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Delete a reel by ID
export const deleteReel = async (reelId) => {
  try {
    const reel = await Reel.findByIdAndDelete(reelId);
    if (!reel) {
      return { success: false, message: "Reel not found" };
    }
    return { success: true, message: "Reel deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
