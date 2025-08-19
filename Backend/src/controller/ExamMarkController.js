import ExamMark from "../models/ExamMarkModel.js";

// ➕ Add Exam Mark
export const addExamMark = async (req, res) => {
  try {
    const examMark = new ExamMark(req.body);
    await examMark.save();
    res.status(201).json(examMark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📜 Get All Exam Marks
export const getExamMarks = async (req, res) => {
  try {
    const marks = await ExamMark.find();
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏ Update Exam Mark
export const updateExamMark = async (req, res) => {
  try {
    const updatedMark = await ExamMark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedMark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Exam Mark
export const deleteExamMark = async (req, res) => {
  try {
    await ExamMark.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Exam mark deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};