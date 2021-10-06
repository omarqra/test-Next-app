import axios from "axios";

export const getAllWriters = () => axios.get("/api/writers");
export const addWriter = (data) => axios.post("/api/writers", data);
export const UploadImage = (data) =>
  axios.post("/api/image", data, {
    headers: { "content-type": "multipart/form-data" },
  });
export const deteteWriter = (WriterID) =>
  axios.delete(`/api/writers/${WriterID}`);