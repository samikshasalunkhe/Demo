import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  getFacultyAssignments,
  addFacultyAssignment,
  updateFacultyAssignment,
  deleteFacultyAssignment,
} from '../../services/FacultyAssignApi';
import AssignFacultyForm from '../../components/AssignFacultyForm';

export default function AssignTeachers() {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');

  const [formData, setFormData] = useState({
    department: '',
    semester: '',
    subjectName: '',
    facultyName: '',
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAssignments = async () => {
    try {
      const data = await getFacultyAssignments();
      setAssignments(data);
      setFilteredAssignments(data);
      const uniqueDepts = ['All', ...new Set(data.map((a) => a.department))];
      setDepartments(uniqueDepts);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDeptChange = (e) => {
    const value = e.target.value;
    setSelectedDept(value);
    if (value === 'All') {
      setFilteredAssignments(assignments);
    } else {
      const filtered = assignments.filter((a) => a.department === value);
      setFilteredAssignments(filtered);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateFacultyAssignment(editId, formData);
      } else {
        await addFacultyAssignment(formData);
      }
      setFormData({ department: '', semester: '', subjectName: '', facultyName: '' });
      setEditId(null);
      setShowForm(false);
      fetchAssignments();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (assignment) => {
    setFormData({
      department: assignment.department,
      semester: assignment.semester,
      subjectName: assignment.subjectName,
      facultyName: assignment.facultyName,
    });
    setEditId(assignment._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFacultyAssignment(id);
      fetchAssignments();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Assign Faculty</h1>

      {/* Filter and Button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="deptFilter" className="font-medium text-gray-700">
            Select Department:
          </label>
          <select
            id="deptFilter"
            value={selectedDept}
            onChange={handleDeptChange}
            className="border p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setFormData({ department: '', semester: '', subjectName: '', facultyName: '' });
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center gap-2"
        >
         
          Assign Teacher
        </button>
      </div>

      {/* Show Form */}
      {showForm && (
        <AssignFacultyForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editId={editId}
          onCancel={() => {
            setShowForm(false);
            setFormData({ department: '', semester: '', subjectName: '', facultyName: '' });
            setEditId(null);
          }}
        />
      )}

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="py-2 px-4 text-left">Department</th>
              <th className="py-2 px-4 text-left">Semester</th>
              <th className="py-2 px-4 text-left">Subject</th>
              <th className="py-2 px-4 text-left">Faculty</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((a) => (
                <tr key={a._id} className="border-t">
                  <td className="py-2 px-4">{a.department}</td>
                  <td className="py-2 px-4">{a.semester}</td>
                  <td className="py-2 px-4">{a.subjectName}</td>
                  <td className="py-2 px-4 font-medium text-black">{a.facultyName}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}