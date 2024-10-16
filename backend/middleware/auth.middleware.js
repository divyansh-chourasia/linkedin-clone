import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-linkedin"];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized- No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protected middleware ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
