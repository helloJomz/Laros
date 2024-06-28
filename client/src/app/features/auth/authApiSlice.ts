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

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    signup: builder.mutation({
      query: (information: UserInformationType) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...information },
      }),
    }),

    checkIfEmailExists: builder.mutation({
      query: (email: any) => ({
        url: "/auth/checkemailexists",
        method: "POST",
        body: { email },
      }),
    }),

    checkIfDisplayNameExists: builder.mutation({
      query: (displayname: any) => ({
        url: "/auth/checkdisplaynameexists",
        method: "POST",
        body: { displayname },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useCheckIfDisplayNameExistsMutation,
  useCheckIfEmailExistsMutation,
} = authApiSlice;
