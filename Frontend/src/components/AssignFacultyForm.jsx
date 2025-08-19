import React from 'react';
import { Plus } from 'lucide-react';

export default function AssignFacultyForm({
  formData,
  handleChange,
  handleSubmit,
  editId,
  onCancel, // 👈 new prop
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 mb-8 bg-white p-4 rounded shadow"
    >
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        className="border p-2 rounded text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        type="text"
        name="semester"
        placeholder="Semester"
        value={formData.semester}
        onChange={handleChange}
        className="border p-2 rounded text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        type="text"
        name="subjectName"
        placeholder="Subject"
        value={formData.subjectName}
        onChange={handleChange}
        className="border p-2 rounded text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        type="text"
        name="facultyName"
        placeholder="Faculty"
        value={formData.facultyName}
        onChange={handleChange}
        className="border p-2 rounded text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      {/* Add + Cancel Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center gap-2"
        >
          {editId ? 'Update' : 'Add'}
        </button>

        <button
          type="button"
          onClick={onCancel} // 👈 handle cancel
          className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}