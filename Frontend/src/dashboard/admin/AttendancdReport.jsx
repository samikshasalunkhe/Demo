import React, { useState } from "react";

const departments = ["Computer Science", "Mechanical", "Electrical"];

// Sample Faculty Data
const facultyData = [
  {
    id: 1,
    name: "Prof. Sharma",
    email: "sharma@cs.com",
    department: "Computer Science",
    regularAttendance: "95%",
  },
  {
    id: 2,
    name: "Prof. Joshi",
    email: "joshi@cs.com",
    department: "Computer Science",
    regularAttendance: "90%",
  },
  {
    id: 3,
    name: "Prof. Kulkarni",
    email: "kulkarni@mech.com",
    department: "Mechanical",
    regularAttendance: "92%",
  },
];

// Sample Student Data
const studentData = [
  {
    id: 101,
    name: "Amit Patil",
    department: "Computer Science",
    semester: "4",
    regularAttendance: "88%",
  },
  {
    id: 102,
    name: "Sneha Joshi",
    department: "Computer Science",
    semester: "6",
    regularAttendance: "92%",
  },
  {
    id: 103,
    name: "Rahul Deshmukh",
    department: "Computer Science",
    semester: "4",
    regularAttendance: "85%",
  },
  {
    id: 201,
    name: "Rohit Patil",
    department: "Mechanical",
    semester: "6",
    regularAttendance: "90%",
  },
];

export default function AttendanceReport() {
  const [view, setView] = useState("faculty");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const filteredFaculty = facultyData.filter(
    (f) => department === "" || f.department === department
  );

  const filteredStudents = studentData.filter(
    (s) =>
      (department === "" || s.department === department) &&
      (semester === "" || s.semester === semester)
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        Attendance Report
      </h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setView("faculty")}
          className={`px-6 py-2 rounded font-semibold transition border ${
            view === "faculty"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
          }`}
        >
          Faculty
        </button>
        <button
          onClick={() => setView("student")}
          className={`px-6 py-2 rounded font-semibold transition border ${
            view === "student"
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-white text-emerald-600 border-emerald-600 hover:bg-emerald-50"
          }`}
        >
          Student
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setSemester("");
          }}
          className="border border-gray-400 rounded px-4 py-2 bg-white text-gray-900"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {view === "student" && (
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border border-gray-400 rounded px-4 py-2 bg-white text-gray-900"
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={String(sem)}>
                {sem}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Data Table */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {view === "faculty" ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              Faculty Attendance
            </h2>
            {filteredFaculty.length === 0 ? (
              <p className="text-gray-500 text-center">No faculty records found.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-blue-100 text-blue-800 uppercase font-semibold text-sm">
                  <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Regular Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFaculty.map((f) => (
                    <tr key={f.id} className="even:bg-blue-50 hover:bg-blue-100 transition">
                      <td className="border px-4 py-2 text-gray-800">{f.name}</td>
                      <td className="border px-4 py-2 text-gray-800">{f.email}</td>
                      <td className="border px-4 py-2 text-gray-800">{f.department}</td>
                      <td className="border px-4 py-2 font-semibold text-green-700">
                        {f.regularAttendance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-emerald-700">
              Student Attendance
            </h2>
            {filteredStudents.length === 0 ? (
              <p className="text-gray-500 text-center">No student records found.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-emerald-100 text-emerald-800 uppercase font-semibold text-sm">
                  <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Semester</th>
                    <th className="border px-4 py-2">Regular Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="even:bg-emerald-50 hover:bg-emerald-100 transition">
                      <td className="border px-4 py-2 text-gray-800">{s.name}</td>
                      <td className="border px-4 py-2 text-gray-800">{s.department}</td>
                      <td className="border px-4 py-2 text-gray-800">{s.semester}</td>
                      <td className="border px-4 py-2 font-semibold text-green-700">
                        {s.regularAttendance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}
