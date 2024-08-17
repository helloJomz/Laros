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

    getHomePosts: builder.query({
      query: ({ viewerUID }) => `/post/fetchhomepost?vieweruid=${viewerUID}`,
    }),

    getComments: builder.query({
      query: ({
        userId,
        postId,
        skip,
        limit,
      }: {
        userId: string;
        postId: string;
        skip: number;
        limit: number;
      }) =>
        `/post/fetchcomment?userid=${userId}&postid=${postId}&skip=${skip}&limit=${limit}`,
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

    deleteComment: builder.mutation({
      query: ({
        uid,
        postId,
        commentId,
      }: {
        uid: string;
        postId: string;
        commentId: string;
      }) => ({
        url: "/post/deletecomment",
        method: "POST",
        body: { uid, postId, commentId },
      }),
    }),

    addReply: builder.mutation({
      query: ({
        userId,
        commentId,
        replyData,
      }: {
        userId: string;
        commentId: string;
        replyData: string;
      }) => ({
        url: "/post/addreply",
        method: "POST",
        body: { userId, commentId, replyData },
      }),
    }),

    loadMoreReply: builder.mutation({
      query: ({
        userId,
        commentId,
        skip,
        limit,
      }: {
        userId: string;
        commentId: string;
        skip: number;
        limit: number;
      }) => ({
        url: "/post/getreplies",
        method: "POST",
        body: { userId, commentId, skip, limit },
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

    incrementCommentLikeCount: builder.mutation({
      query: ({ postId, commentId, userId }) => ({
        url: "/post/incrementcommentlike",
        method: "POST",
        body: { postId, commentId, userId },
      }),
    }),

    decrementCommentLikeCount: builder.mutation({
      query: ({ postId, commentId, userId }) => ({
        url: "/post/decrementcommentlike",
        method: "POST",
        body: { postId, commentId, userId },
      }),
    }),

    incrementReplyLikeCount: builder.mutation({
      query: ({ commentId, replyId, userId }) => ({
        url: "/post/incrementreplylike",
        method: "POST",
        body: { commentId, replyId, userId },
      }),
    }),

    decrementReplyLikeCount: builder.mutation({
      query: ({ commentId, replyId, userId }) => ({
        url: "/post/decrementreplylike",
        method: "POST",
        body: { commentId, replyId, userId },
      }),
    }),
  }),
});

export const {
  useSavePostMutation,
  useGetPostsQuery,
  useGetHomePostsQuery,
  useIncrementLikeCountMutation,
  useDecrementLikeCountMutation,
  useGetCommentsQuery,
  useIncrementCommentLikeCountMutation,
  useDecrementCommentLikeCountMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useAddReplyMutation,
  useLoadMoreReplyMutation,
  useLoadMoreCommentMutation,
  useIncrementReplyLikeCountMutation,
  useDecrementReplyLikeCountMutation,
} = postApiSlice;
