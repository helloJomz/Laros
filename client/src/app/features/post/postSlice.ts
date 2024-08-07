import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/app/store";
import { postApiSlice } from "./postApiSlice";

interface Post {
  _id: string;
  userid: string;
  postType: string;
  content: string;
  postImgURL: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  userLiked: boolean;
}

interface Reply {
  _id: string;
  userId: string;
  commentId: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  user: {
    _id: string;
    displayname: string;
    imgURL: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  _id: string; // MongoDB ObjectId as a string
  content: string;
  likeCount: number;
  isLiked: boolean;
  user: {
    _id: string;
    displayname: string;
    imgURL: string;
  };
  replyCount: number;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

interface initialState {
  isCommentLoading: boolean;
  isCommentError: boolean;

  isParentReplyLoading: boolean;
  isParentReplyError: boolean;

  post: Post[];
  comment: Comment[];
  preview: Partial<any>;
}

const initialState: initialState = {
  isCommentLoading: true,
  isCommentError: false,

  isParentReplyLoading: true,
  isParentReplyError: false,

  post: [],
  comment: [],
  preview: {},
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setPreviewImg: (state, action: PayloadAction<{ url: string | null }>) => {
      const { url } = action.payload;
      state.preview.postImgURL = url;
    },

    setPreviewContent: (
      state,
      action: PayloadAction<{ content: string | null }>
    ) => {
      const { content } = action.payload;
      state.preview.content = content;
    },

    setPost: (state, action) => {
      void state.post.unshift(action.payload);
    },

    setComment: (state, action) => {
      const { postId, commentData } = action.payload;
      void state.comment.unshift({ ...commentData });

      const postIndex = state.post.findIndex(
        (p) => p._id.toString() === postId
      );

      state.post[postIndex].commentCount += 1;
    },

    setDeleteComment: (state, action) => {
      const { postId, commentId } = action.payload;

      state.comment = state.comment.filter((c) => c._id !== commentId);

      const postIndex = state.post.findIndex(
        (p) => p._id.toString() === postId
      );

      state.post[postIndex].commentCount -= 1;
    },

    setLikeCount: (
      state,
      action: PayloadAction<{ postId: string; opt: boolean }>
    ) => {
      const { postId, opt } = action.payload;

      const postIndex = state.post.findIndex(
        (i) => i._id === postId.toString().trim()
      );

      if (!opt) {
        state.post[postIndex].likeCount += 1;
        state.post[postIndex].userLiked = true;
      } else {
        state.post[postIndex].likeCount -= 1;
        state.post[postIndex].userLiked = false;
      }
    },

    setCommentLikeCount: (
      state,
      action: PayloadAction<{ commentId: string; opt: boolean }>
    ) => {
      const { commentId, opt } = action.payload;

      const commentIndex = state.comment.findIndex(
        (c) => c._id.toString() === commentId
      );

      if (!opt) {
        state.comment[commentIndex].likeCount += 1;
        state.comment[commentIndex].isLiked = true;
      } else {
        state.comment[commentIndex].likeCount -= 1;
        state.comment[commentIndex].isLiked = false;
      }
    },

    setReply: (state, action) => {
      const { commentId, replyData } = action.payload;

      const commentIndex = state.comment.findIndex(
        (c) => c._id.toString() === commentId
      );

      if (Array.isArray(replyData)) {
        state.comment[commentIndex].replies?.push(...replyData);
        state.comment[commentIndex].replyCount -= 5;
      } else {
        state.comment[commentIndex].replies?.push(replyData);
        if (state.comment[commentIndex].replies?.length !== 1) {
          state.comment[commentIndex].replyCount += 1;
        }
      }
    },

    setReplyHide: (state, action) => {
      const { commentId, skipCount } = action.payload;

      const commentIndex = state.comment.findIndex(
        (c) => c._id.toString() === commentId
      );

      if (commentIndex !== -1) {
        if (skipCount === 0) {
          state.comment[commentIndex].replyCount =
            state.comment[commentIndex].replies.length;
        } else {
          state.comment[commentIndex].replyCount += skipCount;
        }
        state.comment[commentIndex].replies = [];
      }
    },

    setReplyLikeCount: (
      state,
      action: PayloadAction<{
        commentId: string;
        replyId: string;
        opt: boolean;
      }>
    ) => {
      const { commentId, replyId, opt } = action.payload;

      const commentIndex = state.comment.findIndex(
        (c) => c._id.toString() === commentId
      );

      const replyIndex = state.comment[commentIndex].replies.findIndex(
        (r) => r._id.toString() === replyId
      );

      if (!opt) {
        state.comment[commentIndex].replies[replyIndex].likeCount += 1;
        state.comment[commentIndex].replies[replyIndex].isLiked = true;
      } else {
        state.comment[commentIndex].replies[replyIndex].likeCount -= 1;
        state.comment[commentIndex].replies[replyIndex].isLiked = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        postApiSlice.endpoints.getPosts.matchFulfilled,
        (state, action) => {
          state.post = action.payload;
        }
      )

      // FOR COMMENT
      .addMatcher(postApiSlice.endpoints.getComments.matchPending, (state) => {
        state.isCommentLoading = true;
      })
      .addMatcher(
        postApiSlice.endpoints.getComments.matchFulfilled,
        (state, action) => {
          state.isCommentLoading = false;
          state.comment = action.payload;
        }
      )
      .addMatcher(postApiSlice.endpoints.getComments.matchRejected, (state) => {
        state.isCommentLoading = false;
        state.isCommentError = true;
      });
  },
});

export const {
  setPreviewContent,
  setPreviewImg,
  setPost,
  setComment,
  setDeleteComment,
  setLikeCount,
  setCommentLikeCount,
  setReply,
  setReplyHide,
  setReplyLikeCount,
} = postSlice.actions;

export const selectIsCommentLoading = (state: RootState) =>
  state.post.isCommentLoading;
export const selectIsCommentError = (state: RootState) =>
  state.post.isCommentError;

export const selectIsParentReplyLoading = (state: RootState) =>
  state.post.isParentReplyLoading;
export const selectIsParentReplyError = (state: RootState) =>
  state.post.isParentReplyError;

export const selectPost = (state: RootState) => state.post.post;
export const selectSinglePost = (state: RootState, postId: string) =>
  state.post.post.find((post) => post._id.toString() === postId);

export const selectComment = (state: RootState) => state.post.comment;

export const selectReplies = (state: RootState, commentId: string) =>
  state.post.comment.find((c) => c._id.toString() === commentId)?.replies;

export const selectPreviewImg = (state: RootState) =>
  state.post.preview.postImgURL;
export const selectPreviewContent = (state: RootState) =>
  state.post.preview.content;

export default postSlice.reducer;
