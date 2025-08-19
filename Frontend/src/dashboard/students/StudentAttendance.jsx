import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const StudentAttendance = () => {
  const attendanceData = [
    { subject: "Operating System", total: 30, attended: 26 },
    { subject: "Software Engineering", total: 28, attended: 24 },
    { subject: "Advanced DBMS", total: 26, attended: 22 },
    { subject: "Entrepreneurship", total: 20, attended: 19 },
    { subject: "Project Initiation", total: 15, attended: 14 },
  ];

  const getColor = (percentage) => {
    if (percentage >= 90) return "#22c55e"; // green
    if (percentage >= 75) return "#eab308"; // yellow
    if (percentage >= 50) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        🎯 Student Attendance Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {attendanceData.map((item, index) => {
          const percentage = ((item.attended / item.total) * 100).toFixed(1);
          return (
            <div
              key={index}
              className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center"
            >
              <div className="w-28 h-28 mb-4">
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    pathColor: getColor(percentage),
                    textColor: "#374151",
                    trailColor: "#e5e7eb",
                  })}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 text-center">{item.subject}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Attended: {item.attended} / {item.total}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-12 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} | Student Attendance Dashboard
      </p>
    </div>
  );
};

export default StudentAttendance;

