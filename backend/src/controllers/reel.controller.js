import {
  createReel,
  getAllPublicReels,
  getAllReels,
} from "../services/reel.service.js";
import { validateReel } from "../validations/validateReel.js";

export const createReelController = async (req, res) => {
  try {
    // ✅ First validate
    const errors = validateReel(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // ✅ Then save
    const result = await createReel(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all reels (Admin)
export const getAllReelsController = async (req, res) => {
  try {
    const result = await getAllReels();

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all public reels (isVisible: true)
export const getAllPublicReelsController = async (req, res) => {
  try {
    const result = await getAllPublicReels();

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
