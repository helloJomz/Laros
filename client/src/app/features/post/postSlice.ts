import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/app/store";
import { postApiSlice } from "./postApiSlice";

interface Comment {
  _id: string;
  uid: string;
  displayname: string;
  imgURL: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  reply: any[]; // Adjust type if reply has a specific structure
}

interface Post {
  _id: string;
  postType: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  comment: Comment[];
}

const initialState: {
  post: Post[];
  preview: Partial<any>;
} = {
  post: [],
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

    setPreviewComment: (state, action) => {
      const { postId, ...commentData } = action.payload;
      const postIndex = state.post.findIndex(
        (post) => post._id === postId.toString().trim()
      );

      console.log(postIndex);

      state.post[postIndex]?.comment.push(commentData);
    },

    setPreviewReply: (state, action) => {
      const { postId, commentId, replyData } = action.payload;

      const postIndex = state.post.findIndex(
        (post) => post._id === postId.toString().trim()
      );

      const commentIndex = state.post[postIndex].comment.findIndex(
        (comment) => comment._id === commentId.toString().trim()
      );

      if (Array.isArray(replyData)) {
        state.post[postIndex].comment[commentIndex].reply.push(...replyData);
      } else {
        state.post[postIndex].comment[commentIndex].reply.push({
          ...replyData,
        });
      }
    },

    // setPreviewAuthor: (
    //   state,
    //   action: PayloadAction<{ author: AuthorProps | null }>
    // ) => {
    //   const { author } = action.payload;
    //   state.preview.author = author;
    // },
    // setPreviewGame: (
    //   state,
    //   action: PayloadAction<{ game: GameProps | null }>
    // ) => {
    //   const { game } = action.payload;
    //   state.preview.game = game;
    // },
    // setPreviewPost: (
    //   state,
    //   action: PayloadAction<{ post: initialStateForPostProps }>
    // ) => {
    //   const { post } = action.payload;
    //   state.preview = post;
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postApiSlice.endpoints.getPosts.matchFulfilled,
      (state, action) => {
        state.post = action.payload;
      }
    );
  },
});

export const {
  setPreviewContent,
  setPreviewImg,
  setPost,
  setPreviewComment,
  setPreviewReply,
} = postSlice.actions;

export const selectPost = (state: RootState) => state.post.post;

export const selectPreviewImg = (state: RootState) =>
  state.post.preview.postImgURL;
export const selectPreviewContent = (state: RootState) =>
  state.post.preview.content;

// export const selectPreviewAuthor = (state: RootState) =>
//   state.post.preview.author;
// export const selectPreviewGame = (state: RootState) => state.post.preview.game;

// export const selectPreviewPost = (state: RootState) => state.post.preview;

export default postSlice.reducer;
