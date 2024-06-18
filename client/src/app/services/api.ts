import { BASE_API_URL } from "@/app/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, destroyUserSession } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL!,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state: any = getState();
    const token: string | null = state.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    const refreshResult = await baseQuery(
      "/auth/refreshtoken",
      api,
      extraOptions
    );
    if (refreshResult.data) {
      const user = api.getState().auth.user;
      const data = refreshResult.data as { gqeRxt3B9mZ2i: string };
      // store new token
      api.dispatch(
        setCredentials({
          accessToken: data.gqeRxt3B9mZ2i,
          user: { ...user },
        })
      );
      result = await baseQuery(args, api, extraOptions);
    }
  }

  if (result.error && result.error.status === 401) {
    api.dispatch(destroyUserSession());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
