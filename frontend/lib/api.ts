import axios from "axios";

export const apiClient = axios.create({
  baseURL: "",  // base URL kosong, path lengkap diberikan per request
  headers: { "Content-Type": "application/json" },
});

// Shortcut untuk endpoint v1
export const v1Client = axios.create({
  baseURL: "/api/v1",
  headers: { "Content-Type": "application/json" },
});

v1Client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);
