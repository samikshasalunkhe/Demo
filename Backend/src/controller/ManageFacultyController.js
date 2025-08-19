import { User } from '../models/AuthModel.js';
import { manageFacultyModel} from '../models/ManageFacultyModel.js';

// ✅ CREATE Faculty
export const createFaculty = async (req, res) => {
  try {
    const {
      name,
      employeeId,
      department,
      qualifications,
      yearsOfExperience,
      phone,
      dob,
      gender,
      address,
    } = req.body;

    if (
      !name || !employeeId || !department || !qualifications ||
      yearsOfExperience == null || !phone || !dob || !gender || !address
    ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const email = `${name}@faculty.com`;
    const password = 'faculty@123';

    const newUser = new User({ name, email, password, role: 'faculty' });
    await newUser.save();

    const facultyExist = await manageFacultyModel.findOne({ user: newUser._id });
    if (facultyExist) {
      return res.status(400).json({ success: false, message: 'Faculty Profile Already Exists' });
    }
  const nameExist=await manageFacultyModel.findOne({name});
  if(nameExist){
    return res.status(400).json({message:"Faculty Name already exist"})
  }

  const employeeIdExist=await manageFacultyModel.findOne({employeeId});
  if(employeeIdExist){
    return res.status(400).json({message:"EmployeeId already exist "})

  }

  const phonenoExist=await manageFacultyModel.findOne({phone});
  if(phonenoExist){
    return res.status(400).json({message:"Phone Number already exist "})
    
  }
    

    const newFaculty = new manageFacultyModel({
      user: newUser._id,
      name,
      employeeId,
      department,
      qualifications,
      yearsOfExperience,
      phone,
      dob,
      gender,
      address,
    });

    const SavedFaculty = await newFaculty.save();

    res.status(201).json({
      success: true,
      message: "Faculty Profile created successfully",
      Faculty: SavedFaculty,
    });

  } catch (error) {
    console.error("Error creating faculty", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// ✅ GET all faculty
export const getAllFaculty = async (req, res) => {
  try {
    const faculties = await manageFacultyModel.find().populate("user", "name email role");
    res.status(200).json({ success: true, faculties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// ✅ GET single faculty by ID
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await manageFacultyModel.findById(req.params.id).populate("user", "name email role");
    if (!faculty) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }
    res.status(200).json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// ✅ UPDATE Faculty
export const updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await manageFacultyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedFaculty) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }

    res.status(200).json({ success: true, message: "Faculty updated", updatedFaculty });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// ✅ DELETE Faculty
export const deleteFaculty = async (req, res) => {
  try {
    const deleted = await manageFacultyModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }

    // Optional: for delete  User profile 
    await User.findByIdAndDelete(deleted.user);

    res.status(200).json({ success: true, message: "Faculty deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};