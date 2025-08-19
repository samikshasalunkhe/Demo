// src/services/FacultyScheduleAPI.js
import axios from "axios";

const API = "http://localhost:5000/api/v1/faculty-schedule";

// ✅ Add Faculty Schedule
export const addFacultySchedule = async (scheduleData) => {
  try {
    const res = await axios.post(`${API}`, scheduleData);
    return res.data;
  } catch (error) {
    console.error("Error saving faculty schedule:", error);
    throw error;
  }
};

// ✅ Get all Faculty Schedules
export const getFacultySchedules = async () => {
  try {
    const res = await axios.get(`${API}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching faculty schedules:", error);
    throw error;
  }
};

// ✅ Update Faculty Schedule
export const updateFacultySchedule = async (id, updatedData) => {
  try {
    const res = await axios.put(`${API}/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error updating faculty schedule:", error);
    throw error;
  }
};

// ✅ Delete Faculty Schedule
export const deleteFacultySchedule = async (id) => {
  try {
    const res = await axios.delete(`${API}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting faculty schedule:", error);
    throw error;
  }
};