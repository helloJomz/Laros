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

    addComment: builder.mutation({
      query: ({
        uid,
        imgURL,
        displayname,
        postId,
        comment,
      }: {
        uid: string;
        imgURL: string;
        displayname: string;
        postId: string;
        comment: string;
      }) => ({
        url: "/post/addpost",
        method: "POST",
        body: { uid, imgURL, displayname, postId, comment },
      }),
    }),

    getComments: builder.query({
      query: ({ postId }: { postId: string }) =>
        `/post/getcomments?postId=${postId}&skip=${0}&limit=${5}`,
    }),
  }),
});

export const {
  useSavePostMutation,
  useGetPostsQuery,
  useAddCommentMutation,
  useGetCommentsQuery,
} = postApiSlice;
