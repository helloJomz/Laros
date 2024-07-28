import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/app/store";

interface initialState {
  replyId: string | null;
}

const initialState: initialState = {
  replyId: null,
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
  },
});

export const { setReplyId } = PostUISlice.actions;

export const selectReplyId = (state: RootState) => state.postUI.replyId;

export default PostUISlice.reducer;
