import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjects,
} from "../../services/ManageSubjectApi";
import ManageSubjectForm from "../../components/ManageSubjectForm";

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedDept, setSelectedDept] = useState("All");

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleEdit = (subject) => {
    setEditData(subject);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteSubject(id);
    fetchSubjects();
  };

  const departments = [
    "All", "Computer", "IT", "Civil", "Electrical", "Mechanical", "Automobile", "E&TC"
  ];

  const filteredSubjects =
    selectedDept === "All"
      ? subjects
      : subjects.filter((subj) => subj.department === selectedDept);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">📚 Manage Subjects</h2>

      {/* Department Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Select Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-gray-800"
          >
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Add Subject Button */}
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditData(null);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Add Subject
          </button>
        )}
      </div>

      {/* Subject Form */}
     {showForm && (
  <ManageSubjectForm
    fetchSubjects={fetchSubjects}
    editData={editData} // ← pass as-is (null if adding)
    closeForm={() => {
      setShowForm(false);
      setEditData(null);
    }}
  />
)}


      {/* Subjects Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full table-auto border border-gray-300 rounded-lg bg-white shadow-sm">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="p-2">Subject</th>
              <th className="p-2">Code</th>
              <th className="p-2">Semester</th>
              <th className="p-2">Department</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredSubjects) && filteredSubjects.length > 0 ? (
              filteredSubjects.map((subj) => (
                <tr key={subj._id} className="text-center hover:bg-gray-50 transition text-gray-700">
                  <td className="p-2">{subj.subjectName}</td>
                  <td className="p-2">{subj.subjectCode}</td>
                  <td className="p-2">{subj.semester}</td>
                  <td className="p-2">{subj.department}</td>
                  
                  <td className="p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(subj)}
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(subj._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No subjects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
