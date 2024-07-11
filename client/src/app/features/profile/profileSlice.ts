import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface initialStateProps {
  modal: string | null;
}

const initialState: initialStateProps = {
  modal: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setModal: (state, action: PayloadAction<{ modal: string | null }>) => {
      const { modal } = action.payload;
      state.modal = modal;
    },
  },
});

export const { setModal } = profileSlice.actions;

export const useModal = (state: any) => state.profile.modal;

export default profileSlice.reducer;
