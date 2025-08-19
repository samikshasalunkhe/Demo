import React, { useState } from "react";
import axios from "axios";

const FacultyAssignmentForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    semester: "",
    branch: "",
    subject: "",
    type: "assignment",
    resourceLink: "",
  });
  const [file, setFile] = useState(null);

  const faculty = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append("facultyId", faculty._id);
      if (file) {
        data.append("file", file);
      }

      await axios.post(
        "http://localhost:5000/api/assignments/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}`,
          },
        }
      );

      alert("Assignment added successfully!");

      // form reset
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        semester: "",
        branch: "",
        subject: "",
        type: "assignment",
        resourceLink: "",
      });
      setFile(null);

      // ✅ Backend save complete झाल्यावर list refresh करणे
      if (onSuccess) {
        setTimeout(() => {
          onSuccess(); // Delay ने call करा जेणेकरून नवीन data मिळेल
        }, 300);
      }

    } catch (err) {
      console.error("Error adding assignment:", err);
      alert("Failed to add assignment. Please check your login or server.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 mb-4 rounded shadow">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="border p-2 mb-2 w-full"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      ></textarea>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="semester"
        placeholder="Semester"
        value={formData.semester}
        onChange={handleChange}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="branch"
        placeholder="Branch"
        value={formData.branch}
        onChange={handleChange}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
        className="border p-2 mb-2 w-full"
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      >
        <option value="assignment">Assignment</option>
        <option value="study-material">Study Material</option>
      </select>
      <input
        type="url"
        name="resourceLink"
        placeholder="Optional Resource Link"
        value={formData.resourceLink}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 mb-2 w-full"
        accept=".pdf"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Assignment
      </button>
    </form>
  );
};

export default FacultyAssignmentForm;