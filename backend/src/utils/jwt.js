import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "z9hHQq69SsRdIq+Lh4oEXvZeJbyDgjY+R8aAxnmfv5U3lRthpodroFH6dxk6C9Sc";

const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "1d"; // default 1 day

/**
 * Generate a JWT token for a given user.
 * @param {Object} user - user object (must contain username at least).
 * @returns {string} - signed JWT token.
 */
export const generateToken = (user) => {
  if (!user || !user.username) {
    throw new Error("Invalid user object for token generation");
  }

  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES,
    }
  );
};

/**
 * Verify and decode a JWT token.
 * @param {string} token - JWT token string.
 * @returns {Object} - { success, data?, error? }
 */
export const verifyToken = (token) => {
  if (!token) {
    return { success: false, error: "No token provided" };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { success: true, data: decoded };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return { success: false, error: "Token expired" };
    } else if (err.name === "JsonWebTokenError") {
      return { success: false, error: "Invalid token" };
    }
    return { success: false, error: "Token verification failed" };
  }
};
