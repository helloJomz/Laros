import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

export const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    if (error.response && error.response.status === 403) {
      await customAxios.post("http://localhost:5000/api/users/refresh_token");
    }
    // Rejects other type of error
    return Promise.reject(error);
  }
);
