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
      time: {
        type: Date,
        default: Date.now,
      },
      data: {
        query: {
          type: String,
          required: true,
        },
        trackerid: {
          type: String,
          required: false,
        },
      },
    },
  ],
});

export const SearchHistoryModel = model("searchhistories", SearchHistorySchema);
