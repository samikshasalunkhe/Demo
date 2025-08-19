import express from "express";
import {
  createOrUpdateSchedule,
  getAllSchedules,
  getScheduleByDeptYear,
} from "../controller/ScheduleController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// फक्त admin ला create/update करण्याची परवानगी
router.post("/", protect, adminOnly, createOrUpdateSchedule);

// logged-in कोणताही user schedule पाहू शकतो
router.get("/", protect, getAllSchedules);

// logged-in कोणताही user specific schedule पाहू शकतो
router.get("/:department/:year", protect, getScheduleByDeptYear);

export default router;