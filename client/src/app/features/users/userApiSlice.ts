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

    getUserById: builder.mutation({
      query: (uid: string) => ({
        url: "/user/getuserbyid",
        method: "POST",
        body: { uid },
      }),
    }),
  }),
});

export const { useGetUserByDisplayNameMutation, useGetUserByIdMutation } =
  userApiSlice;
