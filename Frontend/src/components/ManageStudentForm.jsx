import React, { useState, useEffect } from 'react';

const ManageStudentForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [student, setStudent] = useState({
    user: '',
    name: '',
    enrollmentNo: '',
    course: '',
    semester: '',
    department: '',
    className: '',
    batch: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    ...initialData,
  });

  // ✅ DOB fix - format to yyyy-MM-dd
  useEffect(() => {
    if (initialData.dob) {
      const formattedDOB = new Date(initialData.dob).toISOString().split('T')[0];
      setStudent((prev) => ({ ...prev, dob: formattedDOB }));
    }
  }, [initialData.dob]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...student, semester: Number(student.semester) }); // convert semester to number
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-6 grid grid-cols-1 gap-4"
    >
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        placeholder="Enter Student Name"
        required
        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      <input
        type="text"
        name="enrollmentNo"
        placeholder="Enrollment No"
        value={student.enrollmentNo}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      <input
        name="course"
        placeholder="Course"
        value={student.course}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      <input
        name="semester"
        type="number"
        placeholder="Semester"
        value={student.semester}
        onChange={handleChange}
        required
        min="1"
        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      <select
        name="department"
        value={student.department}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <option value="">Select Department</option>
        <option value="Computer">Computer</option>
        <option value="IT">IT</option>
        <option value="ENTC">ENTC</option>
        <option value="Mechanical">Mechanical</option>
        <option value="Civil">Civil</option>
        <option value="Auto Mobile">Auto Mobile</option>
        <option value="Electrical">Electrical</option>
      </select>

      <select
        name="className"
        value={student.className}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <option value="">Select Class</option>
        <option value="FY">FY</option>
        <option value="SY">SY</option>
        <option value="TY">TY</option>
      </select>

      <input
        name="batch"
        placeholder="Batch"
        value={student.batch}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={student.phone}
        onChange={handleChange}
        required
        pattern="^\d{10}$"
        title="Enter a valid 10-digit phone number"
        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      <input
        name="dob"
        type="date"
        value={student.dob}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      <select
        name="gender"
        value={student.gender}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        name="address"
        placeholder="Address"
        value={student.address}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md p-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2 rounded-md shadow"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md shadow"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ManageStudentForm;
