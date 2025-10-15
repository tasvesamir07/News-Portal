import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchAllNews = () => API.get("/news");
export const fetchNewsByCategory = (category) => API.get(`/news/${category}`);
export const fetchTopNews = () => API.get("/news/top-news");
