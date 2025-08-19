import axios from "axios";
const BASE = "http://localhost:5000/api/assignments";

export const createAssignmentAPI = (formData) => axios.post(`${BASE}/create`, formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

export const fetchAssignmentsForStudent = async (semester, year, branch, subject = "") => {
  const params = { semester, year, branch };
  if (subject) params.subject = subject;

  const res = await axios.get("http://localhost:5000/api/assignments", { params });
  return res.data; // Array of assignments
};

export const fetchAssignmentsForFaculty = async (facultyId) => {
  const res = await axios.get(`${BASE}/faculty/${facultyId}`);
  return res.data.assignments || [];
};