import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/app/store";
import { postApiSlice } from "./postApiSlice";

const initialState: {
  post: any[];
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

export const { setPreviewContent, setPreviewImg } = postSlice.actions;

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
