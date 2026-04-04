import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "User not valid" });
    }

    req.user = user;
    next();
  } catch (error) {
  console.error("JWT ERROR:", error.message); // 👈 ADD THIS
  res.status(401).json({ message: "Invalid token" });

  }
};