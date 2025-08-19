import express from "express";
import {
  addExamMark,
  getExamMarks,
  updateExamMark,
  deleteExamMark,
} from "../controller/ExamMarkController.js";

const router = express.Router();

router.post("/add", addExamMark);
router.get("/all", getExamMarks);
router.put("/update/:id", updateExamMark);
router.delete("/delete/:id", deleteExamMark);

export default router;