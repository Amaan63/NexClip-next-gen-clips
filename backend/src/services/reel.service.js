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

    return { success: true, data: savedReel };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
