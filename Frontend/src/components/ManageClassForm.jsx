import React, { useState, useEffect } from "react";

const ManageClassForm = ({ onSubmit, selectedClass, editMode, setEditMode, setSelectedClass }) => {
  const [formData, setFormData] = useState({
    year: "",
    semester: "",
    time: "",
    date: "",
    day: "",
    previousLecture: "",
    previousStaff: "",
    manageLecture: "",
    manageStaff: "",
  });

  useEffect(() => {
    if (editMode && selectedClass) {
      setFormData(selectedClass);
    }
  }, [editMode, selectedClass]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // updateClass किंवा addClass call होईल
    setFormData({
      year: "",
      semester: "",
      time: "",
      date: "",
      day: "",
      previousLecture: "",
      previousStaff: "",
      manageLecture: "",
      manageStaff: "",
    });
    setEditMode(false);
    setSelectedClass(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Manage Class Form</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year (FY/SY/TY)"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />
        <input
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          placeholder="Semester"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />
        <input
          name="time"
          value={formData.time}
          onChange={handleChange}
          placeholder="Time"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />
        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />
        <input
          name="day"
          value={formData.day}
          onChange={handleChange}
          placeholder="Day"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />
        <input
          name="previousLecture"
          value={formData.previousLecture}
          onChange={handleChange}
          placeholder="Previous Lecture"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />
        <input
          name="previousStaff"
          value={formData.previousStaff}
          onChange={handleChange}
          placeholder="Previous Staff"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />
        <input
          name="manageLecture"
          value={formData.manageLecture}
          onChange={handleChange}
          placeholder="Manage Lecture"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />
        <input
          name="manageStaff"
          value={formData.manageStaff}
          onChange={handleChange}
          placeholder="Manage Staff"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {editMode ? "Update Class" : "Add Class"}
        </button>
      </div>
    </form>
  );
};

export default ManageClassForm;