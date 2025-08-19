// frontend/src/components/ViewAttendance.jsx
import React, { useEffect, useState } from 'react';
import { fetchAttendanceRecords } from '../../services/AttendanceApi';

export default function ViewAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchAttendanceRecords();
        setAttendanceData(response.data.attendance);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <h2>View Attendance</h2>
      {attendanceData.map((record, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h4>Date: {record.date} | Subject: {record.subject}</h4>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Present</th>
              </tr>
            </thead>
            <tbody>
              {record.students.map((stu, i) => (
                <tr key={i}>
                  <td>{stu.name}</td>
                  <td>{stu.present ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}