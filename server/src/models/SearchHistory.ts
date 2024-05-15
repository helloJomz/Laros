import { Schema, model } from "mongoose";

const SearchHistorySchema = new Schema({
  query: {
    type: String,
    required: false,
  },
  guid: {
    type: String,
    required: false,
  },
  userid: {
    type: String,
    required: false,
  },
  origin: {
    type: String,
    required: true,
  },
});

export const SearchHistoryModel = model("searchhistories", SearchHistorySchema);
