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

    getUserById: builder.mutation({
      query: (uid: string) => ({
        url: "/user/getuserbyid",
        method: "POST",
        body: { uid },
      }),
    }),

    incrementAndDecrementHeartCount: builder.mutation({
      query: ({
        yourUID,
        otherUserUID,
      }: {
        yourUID: string;
        otherUserUID: string;
      }) => ({
        url: "/user/incrementanddecrementheartcount",
        method: "POST",
        body: { yourUID, otherUserUID },
      }),
    }),
  }),
});

export const {
  useGetUserByDisplayNameMutation,
  useGetUserByIdMutation,
  useIncrementAndDecrementHeartCountMutation,
} = authApiSlice;
