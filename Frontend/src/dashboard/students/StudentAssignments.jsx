import React, { useState } from "react";

const assignmentsData = {
  "Operating System": [
    { title: "Process Management Assignment", dueDate: "2025-08-01" },
    { title: "Memory Allocation Techniques", dueDate: "2025-08-08" },
  ],
  "Software Engineering": [
    { title: "SDLC Models Report", dueDate: "2025-08-03" },
    { title: "Requirement Analysis", dueDate: "2025-08-10" },
  ],
  "Advanced Database Management": [
    { title: "Normalization Case Study", dueDate: "2025-08-04" },
    { title: "PL/SQL Procedures", dueDate: "2025-08-11" },
  ],
  "Entrepreneurship Development and Startups": [
    { title: "Business Plan Proposal", dueDate: "2025-08-06" },
    { title: "Startup Funding Models", dueDate: "2025-08-12" },
  ],
  "Seminar and Project Initiation Course": [
    { title: "Seminar Abstract Submission", dueDate: "2025-08-05" },
    { title: "Project Problem Statement", dueDate: "2025-08-13" },
  ],
};

const StudentAssignments = () => {
  const [selectedSubject, setSelectedSubject] = useState("Operating System");

  const subjects = Object.keys(assignmentsData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-[#1e1b4b] to-gray-900 text-white flex flex-col md:flex-row p-6">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0 md:mr-6">
        <div className="backdrop-blur-lg bg-white/30 border border-white/40 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            📚 Subjects
          </h2>
          <ul className="space-y-3">
            {subjects.map((subject) => (
              <li
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`cursor-pointer p-3 rounded-xl text-sm text-center font-medium transition-all ${
                  selectedSubject === subject
                    ? "bg-white/60 text-indigo-700 shadow-md"
                    : "bg-white/30 text-gray-800 hover:bg-white/50"
                }`}
              >
                {subject}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Assignments */}
      <div className="flex-1">
        <div className="backdrop bg-white/30 border border-white/40 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {selectedSubject} Assignments
          </h2>
          <div className="space-y-6">
            {assignmentsData[selectedSubject].map((assignment, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur p-5 rounded-xl border border-white/40 shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {assignment.title}
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  Due Date: {assignment.dueDate}
                  <br />
                  <span className="text-red-500">
                    Work can’t be turned in after the due date
                  </span>
                </p>
                <button className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition">
                  Add your work here
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-gray-600 mt-10">
            © {new Date().getFullYear()} | Student Assignment Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;