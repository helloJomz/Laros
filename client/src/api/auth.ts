import axios, { AxiosError } from "axios";

type UserObject = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export const createUser = async (userObj: UserObject) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/signup",
      userObj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError.response;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError.response;
  }
};
