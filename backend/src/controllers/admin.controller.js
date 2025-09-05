// controllers/user.controller.js
import { getAllUsers } from "../services/admin.service.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.json({ success: true, data: users });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
