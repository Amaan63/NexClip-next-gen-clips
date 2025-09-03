import loginUser from "../services/auth.service.js";

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await loginUser(username, password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default login;
