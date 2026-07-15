import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const predictStudent = async (studentData) => {

  const response = await axios.post(
    `${API_URL}/predict`,
    studentData
  );

  return response.data;
};