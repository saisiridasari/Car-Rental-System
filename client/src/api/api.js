// Create a reusable Axios instance for making API requests in a frontend application.
// Set the base URL to the backend API endpoint so all requests are prefixed automatically.
// Add a request interceptor that retrieves a JWT token from localStorage before each request.
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// ✅ Attach token dynamically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;