import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = JSON.parse(localStorage.getItem("tokens"));

        const response = await axios.post(
          "http://127.0.0.1:8000/api/accounts/token/refresh/",
          { refresh: tokens.refresh }
        );

        tokens.access = response.data.access;
        localStorage.setItem("tokens", JSON.stringify(tokens));

        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("tokens");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
