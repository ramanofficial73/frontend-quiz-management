import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081",
});

// Add Admin Token for admin APIs
API.interceptors.request.use((config) => {
  if (config.url.startsWith("/api/admin")) {
    config.headers["X-ADMIN-TOKEN"] = "secret123";
    console.log("Sending Header:", config.headers); // DEBUG
  }
  return config;
});

export default API;
