// import express from "express";
// import {
//   getAdminProfile,
//   createAdminProfile,
//   updateAdminProfile,
// } from "../controller/AdminProfileController.js";

// const adminProfileRouter = express.Router();
// //create admin profile
// adminProfileRouter.post("/create-adminprofile", createAdminProfile);
// //get admin profile
// adminProfileRouter.get("/get-adminprofile", getAdminProfile);
// //update admin profile
// adminProfileRouter.put("/update-adminprofile", updateAdminProfile);

// export default adminProfileRouter;


import express from "express";
import {
  getAdminProfile,
  createAdminProfile,
  updateAdminProfile,
} from "../controller/AdminProfileController.js";

// 🛡️ Middleware आयात कर
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const adminProfileRouter = express.Router();

// ✅ Middleware सर्व admin profile routes ला लागू कर
adminProfileRouter.use(isAuthenticated, isAdmin);

// 📌 Create admin profile
adminProfileRouter.post("/create-adminprofile", createAdminProfile);

// 📌 Get admin profile
adminProfileRouter.get("/get-adminprofile", getAdminProfile);

// 📌 Update admin profile
adminProfileRouter.put("/update-adminprofile", updateAdminProfile);

export default adminProfileRouter;
