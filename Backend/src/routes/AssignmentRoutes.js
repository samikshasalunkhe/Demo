import express from "express";
import { uploadMemory } from "../middleware/upload.js";
import { createAssignment, getAssignmentsForStudent, getAssignmentsForFaculty } from "../controller/AssignmentController.js";
import { protect, facultyOnly, studentOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// POST /api/assignments/create  (Faculty only)
router.post("/create", protect, facultyOnly, uploadMemory.single("file"), createAssignment);

// GET for student (Student only)
router.get("/student", protect, studentOnly, getAssignmentsForStudent);

// GET for faculty (Faculty only)
router.get("/faculty/:facultyId", protect, facultyOnly, getAssignmentsForFaculty);

export default router;