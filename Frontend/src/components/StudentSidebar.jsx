import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCogs,
  FaUserGraduate,
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaCheckSquare,
  FaBookOpen,
  FaFileAlt,
  FaBell,
  FaSignOutAlt,
  FaEnvelopeOpenText
} from "react-icons/fa";

import { Link } from "react-router-dom";

const SidebarItem = ({ to, label, icon: Icon, exact }) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
        isActive ? "bg-purple-600 text-white" : "text-slate-300 hover:bg-slate-700"
      }`
    }
  >
    <Icon className="text-lg" />
    <span>{label}</span>
  </NavLink>
);


  
const StudentSidebar = () => {
  
    const navigate = useNavigate(); // ✅ Import आणि वापर
    
  
  // ✅ हे function आता define केलं आहे
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login
  };


  return (
      <div className="bg-[#0d1028] text-white w-64 min-h-screen px-4 pt-6 space-y-4">
         <h2 className="text-xl font-bold text-purple-500 flex items-center gap-2">
            <FaCogs className="text-purple-500" /> 
            Student Panel
        </h2>
    
        <SidebarItem to="/students/StudentDashboardMenu" label="Student Dashboard" icon={FaTachometerAlt} exact={true} />
        <SidebarItem to="/students/StudentProfile" label="My Profile" icon={FaUser} />
        <SidebarItem to="/students/StudentTimeTable" label="Time Table" icon={FaCalendarAlt} />
        <SidebarItem to="/students/StudentAttendance" label="Attendance" icon={FaCheckSquare} />
        <SidebarItem to="/students/StudentCourses" label="Courses" icon={FaBookOpen} />
        <SidebarItem to="/students/StudentAssignments" label="Assignments" icon={FaFileAlt} />
        <SidebarItem to="/students/StudentExamMarks" label="Exam Marks" icon={ FaUserGraduate} /> 
       <SidebarItem to="/students/StudentNotices" label="Notices" icon={FaBell} />
       <SidebarItem to="/students/ManageClasses" label="Manage Class" icon={FaBookOpen} />
       <SidebarItem to="/students/leaverequests" label="Leave Requests" icon={FaEnvelopeOpenText} />
        
  <Link to="/">
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

export default StudentSidebar;