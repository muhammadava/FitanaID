import axios from "axios";

export const api = axios.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
});

export const v1 = axios.create({
  baseURL: "/api/v1",
  headers: { "Content-Type": "application/json" },
});

v1.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) window.location.href = "/";
    return Promise.reject(err);
  }
);
