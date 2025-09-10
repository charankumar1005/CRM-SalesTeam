// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/^Bearer\s*/, "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const permit = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
