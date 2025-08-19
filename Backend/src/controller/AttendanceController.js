// backend/controller/AttendanceController.js
import Attendance from '../models/AttendanceModel.js';

export const markAttendance = async (req, res) => {
  try {
    const { date, subject, students } = req.body;
    const newAttendance = new Attendance({ date, subject, students });
    await newAttendance.save();
    res.status(200).json({ message: 'Attendance saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving attendance', error });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().sort({ createdAt: -1 });
    res.status(200).json({ attendance: records });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error });
  }
};