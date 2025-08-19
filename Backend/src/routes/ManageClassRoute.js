// import express from "express";
// import {
//   createManageClass,
//   deleteClass,
//   getAllClasses,
//   updateClass
// } from "../controller/ManageClassController.js";

// const manageClassRouter = express.Router();

// // ✅ Create class
// manageClassRouter.post("/create-manageclass", createManageClass);

// // ✅ Get all classes
// manageClassRouter.get("/getall-manageclass", getAllClasses);

// // ✅ Update class by ID (path param)
// manageClassRouter.put("/update-manageclass/:id", updateClass);

// // ✅ Delete class by ID (path param)
// manageClassRouter.delete("/delete-manageclass/:id", deleteClass);

// export default manageClassRouter;

import express from "express";
import {
  createManageClass,
  deleteClass,
  getAllClasses,
  updateClass
} from "../controller/ManageClassController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const manageClassRouter = express.Router();

// ✅ Create class - फक्त admin
manageClassRouter.post("/create-manageclass", isAuthenticated, isAdmin, createManageClass);


// ✅ Get all classes - कोणताही logged-in user पाहू शकतो
manageClassRouter.get("/getall-manageclass", isAuthenticated, getAllClasses);


// ✅ Update class by ID - फक्त admin
manageClassRouter.put("/update-manageclass/:id", isAuthenticated, isAdmin, updateClass);

// ✅ Delete class by ID - फक्त admin
manageClassRouter.delete("/delete-manageclass/:id", isAuthenticated, isAdmin, deleteClass);

export default manageClassRouter;
