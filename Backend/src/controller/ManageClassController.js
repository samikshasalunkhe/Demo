import {manageClassModel} from '../models/ManageClassModel.js'

//create class
export const createManageClass = async (req, res) => {
  try {
    const {
      department,
      semester,
      date,
      day,
      time,
      previousLecture,
      previousStaff,
      manageLecture,
      manageStaff,
    } = req.body;

    if (
      !department ||
      !semester ||
      !date ||
      !day ||
      !time ||
      !previousLecture ||
      !previousStaff ||
      !manageLecture ||
      !manageStaff
    ) {
      return res.status(400).json({ message: "All fields are required !" });
    }

    const timeExist = await manageClassModel.findOne({ time });
    if (timeExist) {
      return res.status(409).json({ message: "time already exist" }); // ✅ Fixed: Added return
    }

    const newManageClass = new manageClassModel({
      department,
      semester,
      date,
      day,
      time,
      previousLecture,
      previousStaff,
      manageLecture,
      manageStaff,
    });

    await newManageClass.save();
    // console.log("Incoming ManageClass data:", req.body);

    return res.status(201).json({
      message: "Manage class created successfully !",
      ManageClass: {
        department: newManageClass.department,
        semester: newManageClass.semester,
        date: newManageClass.date,
        day: newManageClass.day,
        time: newManageClass.time,
        previousLecture: newManageClass.previousLecture,
        previousStaff: newManageClass.previousStaff,
        manageLecture: newManageClass.manageLecture,
        manageStaff: newManageClass.manageStaff,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to Manage Class" });
  }
};


// ✅ Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await manageClassModel.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes", error: error.message });
  }
};

// Update Class
export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClass = await manageClassModel.findByIdAndUpdate(id, req.body, { new: true });
    
    
    if (!updatedClass) 
      return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ message: "Class updated",  updatedClass });
  } catch (error) {
    res.status(500).json({ message: "Error updating class", error: error.message });
  }
};

// Delete Class
export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClass = await manageClassModel.findByIdAndDelete(id);
   
   
    if (!deletedClass) return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error: error.message });
  }
};