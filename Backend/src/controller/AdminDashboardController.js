import { User } from '../models/AuthModel.js';
import { manageStudentModel } from '../models/ManageStudentModel.js';
// import { Attendance } from '../models/AttendanceModel.js';
// import { Class } from '../models/ClassModel.js'; // if exists

export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalFaculty = await User.countDocuments({ role: 'faculty' });
    // const scheduledClasses = await Class?.countDocuments() || 0;
    // const totalAttendance = await Attendance?.countDocuments() || 0;

    // const today = new Date().toISOString().split("T")[0];

    // const presentToday = await Attendance.countDocuments({ status: "Present", date: today });
    // const absentToday = await Attendance.countDocuments({ status: "Absent", date: today });

    // const lowAttendance = await Student.countDocuments({ attendancePercentage: { $lt: 75 } });

    // Dummy monthlyAttendance (replace with actual later)
    // const monthlyAttendance = [0, 0, 0, 0, 0, 0];

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStudents,
        totalFaculty,
        // scheduledClasses,
        // totalAttendance,
        // presentToday,
        // absentToday,
        // lowAttendance,
        // monthlyAttendance,
      },
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching stats",
    });
  }
};
