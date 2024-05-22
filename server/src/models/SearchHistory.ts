import { Schema, model } from "mongoose";

const SearchHistorySchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  history: [
    {
      origin: {
        type: String,
        required: true,
      },
      query: {
        type: String,
        required: true,
      },
      trackerid: {
        type: String,
        required: false,
      },
      imageURL: {
        type: String,
        required: false,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const SearchHistoryModel = model("searchhistories", SearchHistorySchema);
