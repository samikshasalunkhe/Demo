// import jwt from "jsonwebtoken";
// import { User } from "../models/AuthModel.js";

// export const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Token madhun user ghe
//     const user = await User.findById(decoded.UserId).select("-password");
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user; // ✅ DB madhun fetched user store
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// export const isAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied: Not an Admin" });
//   }
//   next();
// };

// // ✅ Alias export for backward compatibility
// export { isAuthenticated as protect };






import jwt from "jsonwebtoken";
import { User } from "../models/AuthModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // इथे UserId वापरायचं (कारण token मध्ये तसंच store करतोस)
    const user = await User.findById(decoded.UserId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Not an Admin" });
  }
  next();
};

export { isAuthenticated as protect };
