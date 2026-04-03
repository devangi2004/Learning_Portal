import axios from "axios";

const client = axios.create({
  baseURL: "http://10.0.2.2:5000/api",
});

let authToken = null;
export const setAuthToken = (token) => {
  authToken = token;
};

client.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default client;
