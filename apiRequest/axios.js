import axios from "axios";

const API = axios.create({ baseURL: "/api/" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    if (localStorage.getItem("token_1")) {
      req.headers.Authorization_1 = `Bearer ${localStorage.getItem("token_1")}`;
    }
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
export const get_Article = (articleID) => API.get(`articles/${articleID}`);
export const addarticle = (data) => API.post("articles", data);
export const updatearticle = (data, articleID) =>
  API.put(`articles/${articleID}`, data);
export const deleteArticle = (articleID) => API.delete(`articles/${articleID}`);

export const getSections = () => API.get("sections");
export const addSection = (data) => API.post("sections", data);
export const deleteSection = (SectionID) => API.delete(`sections/${SectionID}`);
export const updateSection = (SectionID, date) =>
  API.put(`sections/${SectionID}`, date);
