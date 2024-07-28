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
      query: ({ uid, viewerUID }: { uid: string; viewerUID: string }) =>
        `/post/fetchpost?uid=${uid}&vieweruid=${viewerUID}`,
    }),

    getComments: builder.query({
      query: ({
        postId,
        skip,
        limit,
      }: {
        postId: string;
        skip: number;
        limit: number;
      }) => `/post/fetchcomment?postid=${postId}&skip=${skip}&limit=${limit}`,
    }),

    getParentReplies: builder.query({
      query: ({
        commentId,
        skip,
        limit,
      }: {
        commentId: string;
        skip: number;
        limit: number;
      }) =>
        `/post/fetchparentreply?commentid=${commentId}&skip=${skip}&limit=${limit}`,
    }),

    addComment: builder.mutation({
      query: ({
        uid,
        postId,
        comment,
      }: {
        uid: string;
        postId: string;
        comment: string;
      }) => ({
        url: "/post/addcomment",
        method: "POST",
        body: { uid, postId, comment },
      }),
    }),

    addReply: builder.mutation({
      query: ({
        userId,
        postId,
        commentId,
        replyData,
      }: {
        userId: string;
        postId: string;
        commentId: string;
        replyData: string;
      }) => ({
        url: "/post/addreply",
        method: "POST",
        body: { userId, postId, commentId, replyData },
      }),
    }),

    loadMoreReply: builder.mutation({
      query: ({
        postId,
        commentId,
        skip,
        limit,
      }: {
        postId: string;
        commentId: string;
        skip: number;
        limit: number;
      }) => ({
        url: "/post/getreplies",
        method: "POST",
        body: { postId, commentId, skip, limit },
      }),
    }),

    loadMoreComment: builder.mutation({
      query: ({
        postId,
        skip,
        limit,
      }: {
        postId: string;
        skip: number;
        limit: number;
      }) => ({
        url: "/post/getcomments",
        method: "POST",
        body: { postId, skip, limit },
      }),
    }),

    incrementLikeCount: builder.mutation({
      query: ({ postId, userId }) => ({
        url: "/post/incrementlike",
        method: "POST",
        body: { postId, userId },
      }),
    }),

    decrementLikeCount: builder.mutation({
      query: ({ postId, userId }) => ({
        url: "/post/decrementlike",
        method: "POST",
        body: { postId, userId },
      }),
    }),
  }),
});

export const {
  useSavePostMutation,
  useGetPostsQuery,
  useIncrementLikeCountMutation,
  useDecrementLikeCountMutation,
  useGetCommentsQuery,
  useGetParentRepliesQuery,
  useAddCommentMutation,
  useAddReplyMutation,
  useLoadMoreReplyMutation,
  useLoadMoreCommentMutation,
} = postApiSlice;
