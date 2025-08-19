// src/services/ScheduleAPI.js
import axios from "axios";

const API = "http://localhost:5000/api/v1/schedule";

// ✅ Add Student Schedule
export const addStudentSchedule = async (scheduleData) => {
  try {
    const res = await axios.post(`${API}`, scheduleData);
    return res.data;
  } catch (error) {
    console.error("Error saving student schedule:", error);
    throw error;
  }
};

// ✅ Get all Student Schedules
export const getStudentSchedules = async () => {
  try {
    const res = await axios.get(`${API}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching student schedules:", error);
    throw error;
  }
};

// ✅ Get Student Schedule by Dept & Year
export const getScheduleByDeptYear = async (department, year) => {
  try {
    const res = await axios.get(`${API}/${department}/${year}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching dept/year schedule:", error);
    throw error;
  }
};