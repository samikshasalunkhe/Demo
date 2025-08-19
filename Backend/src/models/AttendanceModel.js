// backend/models/AttendanceModel.js
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  subject: { type: String, required: true },
  students: [
    {
      studentId: { type: String },
      name: { type: String },
      present: { type: Boolean },
    },
  ],
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);