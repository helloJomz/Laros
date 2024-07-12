import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { modal: string | null } = {
  modal: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setModal: (state, action: PayloadAction<{ modal: string | null }>) => {
      const { modal } = action.payload;
      state.modal = modal;
    },
  },
});

export const { setModal } = modalSlice.actions;
export const selectModal = (state: any) => state.modal.modal;

export default modalSlice.reducer;
