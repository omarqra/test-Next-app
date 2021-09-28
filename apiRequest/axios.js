import axios from "axios";

const API = axios.create({ baseURL: "/api/" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export const auth = () => API.get("writers/auht");
export const getAllWriters = () => API.get("writers");
export const addWriter = (data) => API.post("writers", data);
export const UploadImage = (data) =>
  API.post("image", data, {
    headers: { "content-type": "multipart/form-data" },
  });
export const deteteWriter = (WriterID) => API.delete(`writers/${WriterID}`);

export const addarticle = (data) => API.post("articles", data);

export const login = (data) => axios.patch("/api/writers/login", data);
