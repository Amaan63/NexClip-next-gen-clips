import User from "../models/user.js";

/**
 * Fetch a user's profile by ID.
 * @param {string} userId - MongoDB user _id
 * @returns {Object} user object (without password)
 */
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password"); // exclude password
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
