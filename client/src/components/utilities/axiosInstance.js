import axios from "axios";

const DB_URL = import.meta.env.VITE_DB_URI;

const axiosInstance = axios.create({
  baseURL: "https://whatsapp-server-taupe.vercel.app/",
  withCredentials: true,
  headers: {
    ContentType: "application/json",
  },
});

export default axiosInstance;
