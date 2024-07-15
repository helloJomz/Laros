import { apiSlice } from "@/app/services/api";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    savePost: builder.mutation({
      query: (formData: any) => ({
        url: "/post/savepost",
        method: "POST",
        body: formData,
      }),
    }),

    getPosts: builder.query({
      query: ({
        uid,
        //TODO: Maybe put these into the redux slice have the uid the sole params
        offset,
        limit,
      }: {
        uid: string;
        offset: number;
        limit: number;
      }) => `/post/fetchpost?uid=${uid}&offset=${offset}&limit=${limit}`,
    }),
  }),
});

export const { useSavePostMutation, useGetPostsQuery } = postApiSlice;
