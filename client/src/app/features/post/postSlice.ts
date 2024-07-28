import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/app/store";
import { postApiSlice } from "./postApiSlice";

interface Comment {
  _id: string;
  userid: string;
  postId: string;
  content: string;
  hearts: number;
}

interface Post {
  _id: string;
  userid: string;
  postType: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  userLiked: boolean;
}

interface ParentReply {
  _id: string;
  userId: string;
  commentId: string;
  parentReply: string | null;
  content: string;
  hearts: number;
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
  parentReply: ParentReply[];
  preview: Partial<any>;
}

const initialState: initialState = {
  isCommentLoading: true,
  isCommentError: false,

  isParentReplyLoading: true,
  isParentReplyError: false,

  post: [],
  comment: [],
  parentReply: [],
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
      const postIndex = state.post.findIndex(
        (post) => post._id === postId.toString().trim()
      );

      if (Array.isArray(commentData)) {
        state.comment.push(...commentData);
      } else {
        state.comment.push({ ...commentData });
      }
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

    // setPreviewReply: (state, action) => {
    //   const { postId, commentId, replyData } = action.payload;

    //   const postIndex = state.post.findIndex(
    //     (post) => post._id === postId.toString().trim()
    //   );

    //   const commentIndex = state.post[postIndex].comment.findIndex(
    //     (comment) => comment._id === commentId.toString().trim()
    //   );

    //   if (Array.isArray(replyData)) {
    //     state.post[postIndex].comment[commentIndex].reply.push(...replyData);
    //   } else {
    //     state.post[postIndex].comment[commentIndex].reply.push({
    //       ...replyData,
    //     });
    //   }
    // },
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
      })

      // FOR PARENT REPLIES
      .addMatcher(
        postApiSlice.endpoints.getParentReplies.matchPending,
        (state) => {
          state.isParentReplyLoading = true;
        }
      )
      .addMatcher(
        postApiSlice.endpoints.getParentReplies.matchFulfilled,
        (state, action) => {
          state.isParentReplyLoading = false;
          state.parentReply = action.payload;
        }
      )
      .addMatcher(
        postApiSlice.endpoints.getParentReplies.matchRejected,
        (state) => {
          state.isParentReplyError = true;
        }
      );
  },
});

export const {
  setPreviewContent,
  setPreviewImg,
  setPost,
  setComment,
  setLikeCount,
  // setPreviewReply,
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
export const selectParentReply = (state: RootState) => state.post.parentReply;

export const selectPreviewImg = (state: RootState) =>
  state.post.preview.postImgURL;
export const selectPreviewContent = (state: RootState) =>
  state.post.preview.content;

// export const selectPreviewAuthor = (state: RootState) =>
//   state.post.preview.author;
// export const selectPreviewGame = (state: RootState) => state.post.preview.game;

// export const selectPreviewPost = (state: RootState) => state.post.preview;

export default postSlice.reducer;
