import React, { useState } from "react";
import { PlusCircle, Pencil, Trash2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const initialCourses = [
  { id: 1, name: "Mathematics", department: "Science" },
  { id: 2, name: "History", department: "Arts" },
  { id: 3, name: "Computer Science", department: "Engineering" },
];

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [newCourse, setNewCourse] = useState({ name: "", department: "" });
  const [showModal, setShowModal] = useState(false);

  const departments = ["All", "Science", "Arts", "Engineering"];

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.department) {
      const newId = courses.length + 1;
      setCourses([...courses, { ...newCourse, id: newId }]);
      setNewCourse({ name: "", department: "" });
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "All" || course.department === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="p-6 text-white bg-gradient-to-br from-purple-900 via-[#1e1b4b] to-gray-900 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-blue-400" />
        <h2 className="text-3xl font-bold text-indigo-300">Courses</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="p-2 rounded bg-gray-800 text-white w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 rounded bg-gray-800 text-white w-full md:w-1/4"
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white transition"
        >
          <PlusCircle size={18} /> Add Course
        </button>
      </div>

      {/* Course Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-gray-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Course Name</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, index) => (
              <tr key={course.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{course.name}</td>
                <td className="px-4 py-2">{course.department}</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-yellow-400 hover:text-yellow-300 mr-2">
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-300"
                    onClick={() => handleDelete(course.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCourses.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No matching courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal to Add Course */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-purple-400">
              Add New Course
            </h3>
            <input
              type="text"
              placeholder="Course Name"
              className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
            />
            <select
              className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
              value={newCourse.department}
              onChange={(e) =>
                setNewCourse({ ...newCourse, department: e.target.value })
              }
            >
              <option value="">Select Department</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
              <option value="Engineering">Engineering</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCourse}
                className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 text-white"
              >
                Add Course
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Courses;
