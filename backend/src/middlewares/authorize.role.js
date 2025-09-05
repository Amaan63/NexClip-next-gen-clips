// middlewares/authorizeRoles.js
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: No role found" });
    }

    const role = req.user.role;

    // If no roles are passed, just verify JWT and allow
    if (allowedRoles.length === 0) {
      return next();
    }

    // If specific roles are required (e.g. ["admin"])
    if (allowedRoles.includes(role)) {
      return next();
    }

    return res
      .status(403)
      .json({ success: false, message: "Forbidden: Access denied" });
  };
};
