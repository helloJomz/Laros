import { apiSlice } from "../../services/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserByDisplayName: builder.mutation({
      query: (displayname: string) => ({
        url: "/user/getuserbydisplayname",
        method: "POST",
        body: { displayname },
      }),
    }),

    getUserById: builder.query({
      query: (uid: string) => `/user/getuser?userid=${uid}`,
    }),
  }),
});

export const { useGetUserByDisplayNameMutation, useGetUserByIdQuery } =
  userApiSlice;
