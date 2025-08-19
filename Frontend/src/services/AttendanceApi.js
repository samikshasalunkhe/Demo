// src/services/AttendanceApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const submitAttendance = (data) => axios.post(`${BASE_URL}/attendance/mark`, data);

export const getAllStudents = () => axios.get(`${BASE_URL}/students/all`);

export const fetchAttendanceRecords = () => axios.get(`${BASE_URL}/attendance/all`);