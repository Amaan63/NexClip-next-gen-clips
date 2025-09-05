import { getUserProfile } from "../services/user.service.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // extracted from JWT by authMiddleware
    const user = await getUserProfile(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message || "Failed to fetch profile",
    });
  }
};
