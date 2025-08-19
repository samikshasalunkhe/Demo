
import React, { useState, useEffect } from "react";
import { getExamMarks, addExamMark, updateExamMark, deleteExamMark } from "../../services/ExamMarkApi";
import { useAuth } from "../../context/AuthContext";

const ExamMarks = () => {
  const [marks, setMarks] = useState([]);
  const [formData, setFormData] = useState({
    studentName: "",
    enrollment: "",
    department: "",
    semester: "",
    subject: "",
    unitTest1: 0,
    unitTest2: 0,
    practical: 0,
    assignment: 0,
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    const data = await getExamMarks();
    setMarks(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateExamMark(editingId, formData);
      setEditingId(null);
    } else {
      await addExamMark(formData);
    }
    setFormData({
      studentName: "",
      enrollment: "",
      department: "",
      semester: "",
      subject: "",
      unitTest1: 0,
      unitTest2: 0,
      practical: 0,
      assignment: 0,
    });
    fetchMarks();
  };

  const handleEdit = (mark) => {
    setFormData(mark);
    setEditingId(mark._id);
  };

  const handleDelete = async (id) => {
    await deleteExamMark(id);
    fetchMarks();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Exam Marks</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type={typeof formData[key] === "number" ? "number" : "text"}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key}
            className="border p-1 rounded"
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded col-span-4">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            {Object.keys(formData).map((key) => (
              <th key={key} className="border px-2 py-1">{key}</th>
            ))}
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            <tr key={mark._id}>
              {Object.keys(formData).map((key) => (
                <td key={key} className="border px-2 py-1">{mark[key]}</td>
              ))}
              <td className="border px-2 py-1 flex gap-2">
                <button onClick={() => handleEdit(mark)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(mark._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamMarks;