import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(403).json({
        message: "Please Login to access this resource",
      });
    }

    // Verify token
    const decodedData = jwt.verify(token, process.env.Jwt_Secret);

    // Fetch user and attach to request, excluding password for security
    req.user = await User.findById(decodedData._id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    // Standard 401 for expired or invalid tokens
    return res.status(401).json({
      message: "Session expired or invalid. Please login again.",
    });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    // We assume isAuth has already run, so req.user exists
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied: Admin privileges required",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};