import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/app/store";

interface initialState {
  replyId: string | null;
  loadMoreReply: boolean;
}

const initialState: initialState = {
  replyId: null,
  loadMoreReply: false,
};

export const PostUISlice = createSlice({
  name: "postUI",
  initialState: initialState,
  reducers: {
    setReplyId: (state, action: PayloadAction<{ replyId: string | null }>) => {
      const { replyId } = action.payload;
      if (state.replyId === replyId) {
        state.replyId = null;
      } else {
        state.replyId = replyId;
      }
    },

    setLoadMoreReply: (state, action) => {
      state.loadMoreReply = action.payload;
    },
  },
});

export const { setReplyId, setLoadMoreReply } = PostUISlice.actions;

export const selectReplyId = (state: RootState) => state.postUI.replyId;
export const selectLoadMoreReply = (state: RootState) =>
  state.postUI.loadMoreReply;

export default PostUISlice.reducer;
