import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/classes";

export const addClass = async (classData) => {
  try {
    const res = await axios.post(`${BASE_URL}`/add, classData);
    return res.data;
  } catch (error) {
    console.error("Error adding class:", error);
  }
};

export const getAllClasses = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/all`);
    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
  }
};

export const deleteClass = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting class:", error);
  }
};

export const updateClass = async (id, updatedData) => {
  try {
    const res = await axios.put(`${BASE_URL}/update/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error updating class:", error);
  }
};