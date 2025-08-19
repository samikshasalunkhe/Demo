// backend/routes/AttendanceRoutes.js
import express from 'express';
import { markAttendance, getAllAttendance } from '../controller/AttendanceController.js';

const router = express.Router();

router.post('/mark', markAttendance);
router.get('/all', getAllAttendance);

export default router;