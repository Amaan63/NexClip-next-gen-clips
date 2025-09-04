import { verifyToken } from "../utils/jwt.util.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // format: Bearer <token>
  const token = authHeader && authHeader.split(" ")[1];

  const result = verifyToken(token);

  if (!result.success) {
    return res.status(401).json({ success: false, error: result.error });
  }

  req.user = result.data; // attach decoded data (e.g., { username })
  next();
};
