import { createReel } from "../services/reel.service.js";
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
