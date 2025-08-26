import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const authApi = {
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
};

export default authApi;
