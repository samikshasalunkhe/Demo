import axios from "axios";

const API_URL = "http://localhost:5000/api/exammarks";

export const getExamMarks = async () => {
  const res = await axios.get(`${API_URL}/all`);
  return res.data;
};

export const addExamMark = async (data) => {
  const res = await axios.post(`${API_URL}/add`, data);
  return res.data;
};

export const updateExamMark = async (id, data) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data);
  return res.data;
};

export const deleteExamMark = async (id) => {
  const res = await axios.delete(`${API_URL}/delete/${id}`);
  return res.data;
};