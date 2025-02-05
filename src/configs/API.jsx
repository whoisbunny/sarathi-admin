import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("TOKEN")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")} `;
  }
  return req;
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    return Promise.reject(new Error(errorMessage));
  }
);

export default API;
