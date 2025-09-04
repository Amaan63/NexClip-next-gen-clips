import loginUser from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js"; // <-- import token generator

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await loginUser(username, password);

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
      },
      generatedToken: token, // <-- send token to frontend
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default login;
