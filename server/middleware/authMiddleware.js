import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const protect = async (req, res, next) => {
  let token;

  // Check for Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
        error: error.message,
      });
    }
  } else {
    return res.status(401).json({ message: "Nottt authorized, no token" });
  }
};
