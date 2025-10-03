import {
  createReel,
  deleteReel,
  getAllPublicReels,
  getAllReels,
  updateReel,
} from "../services/reel.service.js";
import {
  validateReel,
  validateUpdateReel,
} from "../validations/validateReel.js";

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
      return res.status(400).json({ success: false, reels: result });
    }

    res.status(201).json({ success: true, reels: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all reels (Admin)
export const getAllReelsController = async (req, res) => {
  try {
    const result = await getAllReels();

    if (!result.success) {
      return res.status(400).json({ success: false, reels: result });
    }

    return res.status(200).json({ success: true, reels: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all public reels (isVisible: true)
export const getAllPublicReelsController = async (req, res) => {
  try {
    const result = await getAllPublicReels();

    if (!result.success) {
      return res.status(400).json({ success: false, reels: result });
    }

    return res.status(200).json({ success: true, reels: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update reel controller
export const updateReelController = async (req, res) => {
  const { reelId } = req.params;
  const errors = validateUpdateReel(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const result = await updateReel(reelId, req.body);
  if (!result.success) {
    return res.status(404).json({ success: false, reels: result });
  }

  res.status(200).json({ success: true, reels: result });
};

// ✅ Delete reel controller
export const deleteReelController = async (req, res) => {
  const { reelId } = req.params;
  const result = await deleteReel(reelId);

  if (!result.success) {
    return res.status(404).json({ success: false, reels: result });
  }

  res.status(200).json({ success: true, reels: result });
};
