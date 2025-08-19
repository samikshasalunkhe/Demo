
// // import LeaveRequest from "../models/LeaveRequestModel.js";
// // import { User } from "../models/AuthModel.js";

// // // 📌 Faculty creates a leave request
// // export const createLeaveRequest = async (req, res) => {
// //   try {
// //     const {
// //       leaveType,
// //       fromDate,
// //       toDate,
// //       dayType,
// //       reason,
// //       notes,
// //       contactInfo,
// //       department,
// //       delegationFaculty,
// //     } = req.body;

// //     if (!leaveType || !fromDate || !toDate || !reason) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "All required fields must be filled",
// //       });
// //     }

// //     const leaveRequest = await LeaveRequest.create({
// //       leaveType,
// //       fromDate,
// //       toDate,
// //       dayType,
// //       reason,
// //       notes,
// //       contactInfo,
// //       department,
// //       delegationFaculty,
// //       userId: req.user._id, // ✅ fixed: match with schema
// //       name: req.user.name,
// //     });

// //     res.status(201).json({ success: true, data: leaveRequest });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // };

// // // 📌 Faculty fetch own leave requests
// // export const getFacultyLeaveRequests = async (req, res) => {
// //   try {
// //     const requests = await LeaveRequest.find({ userId: req.user._id }).sort({
// //       createdAt: -1,
// //     });
// //     res.json({ success: true, data: requests });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // };

// // // 📌 Student fetch own leave requests (if students also use same model)
// // export const getStudentLeaveRequests = async (req, res) => {
// //   try {
// //     const requests = await LeaveRequest.find({ userId: req.user._id }).sort({
// //       createdAt: -1,
// //     });
// //     res.json({ success: true, data: requests });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // };

// // // 📌 Admin fetch all faculty requests
// // export const getAdminFacultyRequests = async (req, res) => {
// //   try {
// //     const requests = await LeaveRequest.find()
// //       .populate("userId", "name email role department")
// //       .sort({ createdAt: -1 });

// //     res.json({ success: true, data: requests });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // };

// // // 📌 Update request
// // export const updateLeaveRequest = async (req, res) => {
// //   try {
// //     const updated = await LeaveRequest.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );
// //     if (!updated)
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Request not found" });
// //     res.json({ success: true, data: updated });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // };

// // // 📌 Delete request
// // export const deleteLeaveRequest = async (req, res) => {
// //   try {
// //     const deleted = await LeaveRequest.findByIdAndDelete(req.params.id);
// //     if (!deleted)
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Request not found" });
// //     res.json({ success: true, message: "Deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // };



// import LeaveRequest from "../models/LeaveRequestModel.js";
// import { User } from "../models/AuthModel.js";

// /* ------------------ 📌 STUDENT CONTROLLERS ------------------ */

// // Student creates a leave request
// export const createStudentLeaveRequest = async (req, res) => {
//   try {
//     const { fromDate, toDate, dayType, reason, notes, contactInfo } = req.body;

//     if (!fromDate || !toDate || !reason) {
//       return res.status(400).json({
//         success: false,
//         message: "From, To & Reason are required",
//       });
//     }

//     const leaveRequest = await LeaveRequest.create({
//       fromDate,
//       toDate,
//       dayType,
//       reason,
//       notes,
//       contactInfo,
//       userId: req.user._id, // ✅ student id
//       name: req.user.name,
//       role: "student",      // ✅ tag for filtering
//       status: "Pending",
//     });

//     res.status(201).json({ success: true, data: leaveRequest });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while creating student request",
//       error: error.message,
//     });
//   }
// };

// // Student fetch own leave requests
// export const getStudentLeaveRequests = async (req, res) => {
//   try {
//     const requests = await LeaveRequest.find({
//       userId: req.user._id,
//       role: "student",
//     }).sort({ createdAt: -1 });

//     res.json({ success: true, data: requests });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching student requests",
//       error: error.message,
//     });
//   }
// };

// /* ------------------ 📌 FACULTY CONTROLLERS ------------------ */

// // Faculty creates a leave request
// export const createFacultyLeaveRequest = async (req, res) => {
//   try {
//     const {
//       leaveType,
//       fromDate,
//       toDate,
//       dayType,
//       reason,
//       notes,
//       contactInfo,
//       department,
//       delegationFaculty,
//     } = req.body;

//     if (!leaveType || !fromDate || !toDate || !reason) {
//       return res.status(400).json({
//         success: false,
//         message: "All required fields must be filled",
//       });
//     }

//     const leaveRequest = await LeaveRequest.create({
//       leaveType,
//       fromDate,
//       toDate,
//       dayType,
//       reason,
//       notes,
//       contactInfo,
//       department,
//       delegationFaculty,
//       userId: req.user._id, // ✅ faculty id
//       name: req.user.name,
//       role: "faculty",      // ✅ tag for filtering
//       status: "Pending",
//     });

//     res.status(201).json({ success: true, data: leaveRequest });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while creating faculty request",
//       error: error.message,
//     });
//   }
// };

// // Faculty fetch own leave requests
// export const getFacultyLeaveRequests = async (req, res) => {
//   try {
//     const requests = await LeaveRequest.find({
//       userId: req.user._id,
//       role: "faculty",
//     }).sort({ createdAt: -1 });

//     res.json({ success: true, data: requests });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching faculty requests",
//       error: error.message,
//     });
//   }
// };

// /* ------------------ 📌 ADMIN CONTROLLERS ------------------ */

// // Admin fetch all faculty requests
// export const getAdminFacultyRequests = async (req, res) => {
//   try {
//     const requests = await LeaveRequest.find({ role: "faculty" })
//       .populate("userId", "name email role department")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, data: requests });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching all requests",
//       error: error.message,
//     });
//   }
// };

// // Update leave status (Admin)
// export const updateLeaveStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const leave = await LeaveRequest.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!leave) {
//       return res.status(404).json({ success: false, message: "Leave not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Leave status updated",
//       leave,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ------------------ 📌 COMMON CONTROLLERS ------------------ */

// // Delete request (only owner can delete)
// export const deleteLeaveRequest = async (req, res) => {
//   try {
//     const deleted = await LeaveRequest.findById(req.params.id);
//     if (!deleted)
//       return res
//         .status(404)
//         .json({ success: false, message: "Request not found" });

//     if (deleted.userId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     await deleted.deleteOne();
//     res.json({ success: true, message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while deleting request",
//       error: error.message,
//     });
//   }
// };






import LeaveRequest from "../models/LeaveRequestModel.js";

/* ------------------ 📌 STUDENT CONTROLLERS ------------------ */

// Student creates a leave request
export const createStudentLeaveRequest = async (req, res) => {
  try {
    const { fromDate, toDate, dayType, reason, notes, contactInfo, leaveType } = req.body;

    if (!fromDate || !toDate || !reason) {
      return res.status(400).json({ success: false, message: "From, To & Reason are required" });
    }

    const leaveRequest = await LeaveRequest.create({
      leaveType: leaveType || "General",
      fromDate,
      toDate,
      dayType,
      reason,
      notes,
      contactInfo,
      userId: req.user._id,
      name: req.user.name,
      role: "student",
      status: "Pending",
    });

    res.status(201).json({ success: true, data: leaveRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Student fetch own leave requests
export const getStudentLeaveRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ userId: req.user._id, role: "student" }).sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------------ 📌 FACULTY CONTROLLERS ------------------ */

// Faculty creates a leave request
export const createFacultyLeaveRequest = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, dayType, reason, notes, contactInfo, department, delegationFaculty } = req.body;

    if (!leaveType || !fromDate || !toDate || !reason) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const leaveRequest = await LeaveRequest.create({
      leaveType,
      fromDate,
      toDate,
      dayType,
      reason,
      notes,
      contactInfo,
      department,
      delegationFaculty,
      userId: req.user._id,
      name: req.user.name,
      role: "faculty",
      status: "Pending",
    });

    res.status(201).json({ success: true, data: leaveRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Faculty fetch own leave requests
export const getFacultyLeaveRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ userId: req.user._id, role: "faculty" }).sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Faculty fetch all student leave requests
export const getFacultyStudentRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ role: "student" })
      .populate("userId", "name email class rollNo")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------------ 📌 ADMIN CONTROLLERS ------------------ */

// Admin fetch all faculty leave requests
export const getAdminFacultyRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ role: "faculty" })
      .populate("userId", "name email department")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin fetch all leave requests (student + faculty)
export const getAdminAllRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find()
      .populate("userId", "name email role department")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin update leave status
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await LeaveRequest.findByIdAndUpdate(id, { status }, { new: true });

    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    res.status(200).json({ success: true, message: "Leave status updated", leave });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ------------------ 📌 COMMON CONTROLLERS ------------------ */

// Delete request (only owner can delete)
export const deleteLeaveRequest = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    if (leave.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await leave.deleteOne();
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------------ 📌 AUTO HANDLER ------------------ */
export const createLeaveRequest = async (req, res) => {
  if (req.user.role === "student") {
    return createStudentLeaveRequest(req, res);
  } else if (req.user.role === "faculty") {
    return createFacultyLeaveRequest(req, res);
  } else {
    return res.status(400).json({ success: false, message: "Invalid role" });
  }
};
