import { customAxios } from "@/api/token";
import { getUserDetails } from "../api/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useGetUser = async () => {
  const response = await getUserDetails();

  console.log("response", response);

  customAxios.interceptors.request.use((req) => {
    console.log("axios", req);
    if (req.data === undefined && req.url === "/get_user") {
      console.log("axios", req);
      return Promise.reject(new Error("Request data is undefined"));
    }
    return req;
  });

  return {
    response,
  };
};
