import axios from "axios";
import { toast } from "react-toastify";

// Create an Axios instance with base URL from environment variables
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT token (if available)
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add a response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (typeof window !== "undefined") {
      if (error.response && (error.response.status === 401 || error.response.status==403)) {
        localStorage.removeItem("token"); // Clear the expired token
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login"; // Redirect to the login page
      }
    }
    return Promise.reject(error);
  }
);

export default API;
