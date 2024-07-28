import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

const initialState: { modal: string | null; helper: any } = {
  modal: null,
  helper: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setModal: (state, action: PayloadAction<{ modal: string | null }>) => {
      const { modal } = action.payload;
      state.modal = modal;
    },

    setHelper: (state, action: PayloadAction<{ helper: any }>) => {
      const { helper } = action.payload;
      state.helper = helper;
    },
  },
});

export const { setModal, setHelper } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal.modal;
export const selectHelper = (state: RootState) => state.modal.helper;

export default modalSlice.reducer;
