// src/api/newsApi.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://fake-news-backend-production.up.railway.app",
  timeout: 15000,
});

export const checkNews = (text) => api.post("/predict", { text });
export const searchNews = (keyword, limit = 10) =>
  api.get(`/search/${encodeURIComponent(keyword)}`, { params: { limit } });
export const getHistory = (limit = 50) => api.get("/history", { params: { limit } });
export const getStats = () => api.get("/stats");
export const healthCheck = () => api.get("/health");

export default api;
