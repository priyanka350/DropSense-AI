import axios from "axios";

export const uploadDataset = async (file) => {

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axios.post(
      "http://127.0.0.1:5000/predict-batch",
      formData
    );

  return response.data;
};