import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {
  const tokens = localStorage.getItem("tokens");
  if (tokens) {
    config.headers.Authorization = `Bearer ${JSON.parse(tokens).access}`;
  }
  return config;
});

export default api;
