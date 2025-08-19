import mongoose from "mongoose";

const examMarkSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  enrollment: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  unitTest1: { type: Number, default: 0 },
  unitTest2: { type: Number, default: 0 },
  practical: { type: Number, default: 0 },
  assignment: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("ExamMark", examMarkSchema);