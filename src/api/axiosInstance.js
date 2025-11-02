import axios from "axios";
export const baseURL= "http://localhost:8000"
// ✅ Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // your FastAPI base
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: 10s timeout
});

// ✅ Automatically attach JWT token (if present)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized, logging out...");
      localStorage.removeItem("access_token");
      // Optionally redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosInstance;
