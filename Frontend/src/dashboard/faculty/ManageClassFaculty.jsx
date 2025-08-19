import React, { useState, useEffect } from "react";
import {
  getAllClasses,
  addClass,
  deleteClass,
  updateClass,
} from "../../services/ManageClassApi";
import ManageClassForm from "../../components/ManageClassForm";

const ManageClassFaculty = () => {
  const [showForm, setShowForm] = useState(false);
  const [classList, setClassList] = useState([]);
  const [editingClass, setEditingClass] = useState(null);

  // 🔹 Example role (tula actual login user data madhun ghevy lagel)
  const currentUserRole = localStorage.getItem("role"); // "faculty" | "admin" | "student"

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const res = await getAllClasses();
    if (res) setClassList(res);
  };

  const handleAddOrUpdateClass = async (data) => {
    if (editingClass) {
      await updateClass(editingClass._id, data);
      setEditingClass(null);
    } else {
      await addClass(data);
    }
    fetchClasses();
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await deleteClass(id);
    fetchClasses();
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      {/* 🔹 Faculty lach Add button */}
      {currentUserRole === "faculty" && (
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) setEditingClass(null);
          }}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showForm ? "Close Form" : "Add Class"}
        </button>
      )}

      {showForm && currentUserRole === "faculty" && (
        <ManageClassForm
          onSubmit={handleAddOrUpdateClass}
          initialData={editingClass}
        />
      )}

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Class List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Year</th>
              <th className="border px-2 py-1">Sem</th>
              <th className="border px-2 py-1">Time</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Day</th>
              <th className="border px-2 py-1">Prev Lecture</th>
              <th className="border px-2 py-1">Prev Staff</th>
              <th className="border px-2 py-1">Lecture</th>
              <th className="border px-2 py-1">Staff</th>
              {currentUserRole === "faculty" && (
                <th className="border px-2 py-1">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {classList.map((cls) => (
              <tr key={cls._id}>
                <td className="border px-2 py-1">{cls.year}</td>
                <td className="border px-2 py-1">{cls.semester}</td>
                <td className="border px-2 py-1">{cls.time}</td>
                <td className="border px-2 py-1">{cls.date}</td>
                <td className="border px-2 py-1">{cls.day}</td>
                <td className="border px-2 py-1">{cls.previousLecture}</td>
                <td className="border px-2 py-1">{cls.previousStaff}</td>
                <td className="border px-2 py-1">{cls.manageLecture}</td>
                <td className="border px-2 py-1">{cls.manageStaff}</td>
                {currentUserRole === "faculty" && (
                  <td className="border px-2 py-1 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleDelete(cls._id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-800 text-xl"
                      >
                        🗑
                      </button>
                      <button
                        onClick={() => handleEdit(cls)}
                        title="Edit"
                        className="text-blue-600 hover:text-blue-800 text-xl"
                      >
                        ✏
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {classList.length === 0 && (
              <tr>
                <td colSpan={currentUserRole === "faculty" ? 10 : 9} className="text-center py-4">
                  No Classes Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClassFaculty;