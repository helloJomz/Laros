import { apiSlice } from "../../services/api";
import type { CredentialsType, UserInformationType } from "./authTypes";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: CredentialsType) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    signup: builder.mutation({
      query: (information: UserInformationType) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...information },
      }),
    }),

    test: builder.mutation<any, void>({
      query: () => ({
        url: "/users/test",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useTestMutation } =
  authApiSlice;
