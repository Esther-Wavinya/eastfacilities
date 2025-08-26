import httpClient from "../services/httpClient";

const authApi = {
  register: (data) => httpClient.post("/auth/register", data),
  login: (data) => httpClient.post("/auth/login", data),
  logout: () => httpClient.post("/auth/logout"),
  refresh: () => httpClient.post("/auth/refresh"),
  socialLogin: (provider, token) => 
    httpClient.post(`/auth/${provider}`, { token }), // expects { token } from backend
};

export default authApi;
