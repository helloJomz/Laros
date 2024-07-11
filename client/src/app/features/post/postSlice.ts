import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  game: {
    guid: null;
    name: null;
    imgURL: null;
  };
  content: null;
  image: null;
}
