import axios from "axios";

const API = axios.create({ baseURL: "/api/" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export const login = (data) => axios.patch("/api/writers/login", data);
export const auth = () => API.get("writers/auht");

export const getAllWriters = () => API.get("writers");
export const addWriter = (data) => API.post("writers", data);
export const updateWriter = (data, update) =>
  API.put(`writers/${update}`, data);
export const deteteWriter = (WriterID) => API.delete(`writers/${WriterID}`);

export const UploadImage = (data) =>
  API.put("image", data, {
    headers: { "content-type": "multipart/form-data" },
  });

export const get_All_Article = () => API.get("articles");
export const addarticle = (data) => API.post("articles", data);
