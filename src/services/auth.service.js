import User from "../models/user.js";
import bcrypt from "bcrypt";

const loginUser = async (username, password) => {
  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Userame not found");
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return user;
};
export default loginUser;
