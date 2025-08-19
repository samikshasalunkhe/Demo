import { Assignment } from "../models/AssignmentModel.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

export const createAssignment = async (req, res) => {
  try {
    // form fields come in req.body (text) and file buffer in req.file (multer memory)
    const {
      title, description, dueDate, type,
      semester, year, branch, subject, resourceLink, facultyId
    } = req.body;

    if (!facultyId) {
      return res.status(400).json({ success: false, message: "facultyId required" });
    }

    let fileUrl = "";
    let filePublicId = "";

    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloudinary(req.file.buffer, "assignments");
      fileUrl = result.secure_url;
      filePublicId = result.public_id;
    }

    const newAssignment = new Assignment({
      title, description,
      dueDate: dueDate ? new Date(dueDate) : null,
      type, semester, year, branch, subject,
      resourceLink,
      fileUrl,
      filePublicId,
      facultyId
    });

    await newAssignment.save();
    return res.status(201).json({ success: true, assignment: newAssignment });
  } catch (err) {
    console.error("Error creating assignment:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


export const getAssignmentsForStudent = async (req, res) => {
  try {
    const { semester, branch, subject } = req.query;

    if (!semester || !branch) {
      return res.status(400).json({ message: "Semester and branch are required" });
    }

    const query = { semester, branch };

    if (subject) {
      query.subject = subject;
    }

    const assignments = await Assignment.find(query).sort({ createdAt: -1 });

    res.json(assignments);
  } catch (err) {
    console.error("Error fetching assignments for student:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Optionally: get assignments for faculty

export const getAssignmentsForFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const assignments = await Assignment.find({ facultyId }).sort({ createdAt: -1 });
    return res.json({ success: true, assignments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};