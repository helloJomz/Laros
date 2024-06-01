import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

export const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
