// src/dashboard/faculty/FacultySidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  Eye,
  Clock,
  Users,
  Bell,
  KeyRound,
  PlaneTakeoff,
  BarChart2,
  Folder,
  CalendarDays,
  FileBarChart,
  BookOpen,
  ClipboardList
} from "lucide-react";
  import {FaSignOutAlt} from "react-icons/fa";
const FacultySidebar = () => {
  const location = useLocation();
 // ✅ हे function आता define केलं आहे
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login
  };
  const links = [
    { path: "/faculty/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/faculty/profile", label: "Profile", icon: <User size={18} /> },
    { path: "/faculty/mark-attendance", label: "Mark Attendance", icon: <CalendarCheck size={18} /> },
    { path: "/faculty/view-attendance", label: "View Attendance", icon: <Eye size={18} /> },

    { path: "/faculty/students", label: "Students List", icon: <Users size={18} /> },
    { path: "/faculty/notices", label: "Notices", icon: <Bell size={18} /> },
    { path: "/faculty/leaverequests", label: "Leave Requests", icon: <PlaneTakeoff size={18} /> },
    { path: "/faculty/attendance-report", label: "Attendance Report", icon: <BarChart2 size={18} /> },
    { path: "/faculty/timetable", label: "Faculty Timetable", icon: <CalendarDays size={18} /> },
    { path: "/faculty/exam-marks", label: "Exam Marks", icon: <FileBarChart size={18} /> },
    { path: "/faculty/courses", label: "Courses", icon: <BookOpen size={18} /> },
    { path: "/faculty/assignments", label: "Assignments", icon: <ClipboardList size={18} /> },
    { path: "/faculty/manageclass", label: "Manage Class", icon: <Clock size={18} /> }
  ];

  return (
    <div className="w-64 min-h-screen bg-[#1e1b4b] text-white p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Faculty Panel</h2>
      {links.map((link, idx) => (
        <Link
          key={idx}
          to={link.path}
          className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
            location.pathname === link.path
              ? "bg-purple-600"
              : "hover:bg-purple-800"
          }`}
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}<Link to="/">
              {/* ✅ Logout Button */}
              <button
                onClick={logoutHandler}
                className="mt-4 flex items-center gap-3 px-4 py-3 rounded-md transition-all bg-red-500 hover:bg-red-700 text-white"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
              </Link>

    </div>
  );
};

export default FacultySidebar;
