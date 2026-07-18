import axios from "axios";

const API_URL = "https://dropsense-ai.onrender.com";

export const predictStudent = async (studentData) => {

  const response = await axios.post(
    `${API_URL}/predict`,
    studentData
  );

  return response.data;
};
