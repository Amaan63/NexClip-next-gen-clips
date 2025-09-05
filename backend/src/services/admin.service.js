// services/user.service.js
import User from "../models/user.js";

export const getAllUsers = async () => {
  const users = await User.find().select("-password"); // exclude password field

  if (!users || users.length === 0) {
    throw new Error("No users found");
  }

  return users;
};
