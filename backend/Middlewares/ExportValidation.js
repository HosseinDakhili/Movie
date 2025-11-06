import User from "../Models/UserMd.js";
import jwt from "jsonwebtoken";

const exportValidation = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) throw new Error("Token missing");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    
    const user = await User.findById(req.userId);
    if (!user) throw new Error("User not found");
    req.role = user.role;
  } catch (err) {
    req.userId = null;
    req.role = null;
  }
  next();
};

export default exportValidation;
