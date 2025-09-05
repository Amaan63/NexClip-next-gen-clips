import { verifyToken } from "../utils/jwt.util.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const result = verifyToken(token);

    if (!result.success) {
      return res.status(401).json({ success: false, error: result.error });
    }

    req.user = result.data; // attach decoded data (username, role, etc.)
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
