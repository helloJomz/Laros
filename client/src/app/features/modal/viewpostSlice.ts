import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

interface initialState {
  viewPostState: "withComment" | "noComment";
}

const initialState: initialState = {
  viewPostState: "noComment",
};

export const viewPostSlice = createSlice({
  name: "viewpostmodal",
  initialState: initialState,
  reducers: {
    setViewPostState: (
      state,
      action: PayloadAction<{ viewPostState: "withComment" | "noComment" }>
    ) => {
      const { viewPostState } = action.payload;
      state.viewPostState = viewPostState;
    },
  },
});

export const { setViewPostState } = viewPostSlice.actions;

export const selectViewPostState = (state: RootState) =>
  state.viewpostmodal.viewPostState;

export default viewPostSlice.reducer;
