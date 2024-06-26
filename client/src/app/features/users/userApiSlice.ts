import { apiSlice } from "../../services/api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserByDisplayName: builder.mutation({
      query: (displayname: string) => ({
        url: "/user/getuserbydisplayname",
        method: "POST",
        body: { displayname },
      }),
    }),
  }),
});

export const { useGetUserByDisplayNameMutation } = authApiSlice;
