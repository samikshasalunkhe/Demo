// frontend/src/components/MarkAttendance.jsx
import React, { useState, useEffect } from 'react';
import { submitAttendance, getAllStudents } from '../../services/AttendanceApi';


export default function MarkAttendance() {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getAllStudents();
        const studentData = res.data.map((stu) => ({
          studentId: stu._id,
          name: stu.name,
          present: false,
        }));
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleCheckbox = (index) => {
    const updated = [...students];
    updated[index].present = !updated[index].present;
    setStudents(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitAttendance({ date, subject, students });
      alert('Attendance Submitted');
    } catch (err) {
      alert('Error submitting attendance');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>📋 Mark Attendance</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ marginRight: '20px', padding: '5px' }}
          />

          <label>Subject: </label>
          <input
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={{ padding: '5px' }}
          />
        </div>

        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            marginBottom: '20px',
            textAlign: 'left',
          }}
        >
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu, index) => (
              <tr key={stu.studentId}>
                <td>{index + 1}</td>
                <td>{stu.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={stu.present}
                    onChange={() => handleCheckbox(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ✅ Submit Attendance
        </button>
      </form>
    </div>
  );
}