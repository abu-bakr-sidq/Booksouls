import axios from "axios";
import { clearStoredAuth, getStoredToken } from "./auth";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredAuth();
      if (window.location.hash !== "#/login") {
        window.location.hash = "#/login";
      }
    }

    return Promise.reject(error);
  }
);

export const getUploadUrl = (fileName) =>
  fileName ? `${API_BASE_URL}/uploads/${fileName}` : "";
