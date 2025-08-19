// // import express from 'express';
// // import { createFaculty } from '../controller/FacultyController.js';

// // src/routes/facultyRoutes.js
// import express from "express";
// import {
//   createFaculty,
//   getAllFaculty,
//   getFacultyById,
//   updateFaculty,
//   deleteFaculty
// } from "../controller/ManageFacultyController.js";

// const manageFacultyRouter = express.Router();

// // ✅ Create Faculty
// manageFacultyRouter.post("/create-managefaculty", createFaculty);

// // ✅ Get All Faculties
// manageFacultyRouter.get("/get-managefaculty", getAllFaculty);

// // ✅ Get Faculty by ID (Using Path param for clarity)
// manageFacultyRouter.get("/get-managefaculty/:id", getFacultyById);

// // ✅ Update Faculty by ID (Using Path param)
// manageFacultyRouter.put("/update-managefaculty/:id", updateFaculty);

// // ✅ Delete Faculty by ID (Using Path param)
// manageFacultyRouter.delete("/delete-managefaculty/:id", deleteFaculty);

// export default manageFacultyRouter;

// src/routes/facultyRoutes.js
import express from "express";
import {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty
} from "../controller/ManageFacultyController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const manageFacultyRouter = express.Router();


// ✅ Create Faculty (फक्त admin)
manageFacultyRouter.post("/create-managefaculty", isAuthenticated, isAdmin, createFaculty);


// ✅ Get All Faculties (कोणताही logged-in user पाहू शकतो)
manageFacultyRouter.get("/get-managefaculty", isAuthenticated, getAllFaculty);

// ✅ Get Faculty by ID (कोणताही logged-in user पाहू शकतो)
manageFacultyRouter.get("/get-managefaculty/:id", isAuthenticated, getFacultyById);


// ✅ Update Faculty by ID (फक्त admin)
manageFacultyRouter.put("/update-managefaculty/:id", isAuthenticated, isAdmin, updateFaculty);

// ✅ Delete Faculty by ID (फक्त admin)
manageFacultyRouter.delete("/delete-managefaculty/:id", isAuthenticated, isAdmin, deleteFaculty);

export default manageFacultyRouter;
