import { Schema, model } from "mongoose";

const SearchHistorySchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    anon: {
      query: String,
    },
    user: {
      displayname: String,
      img_url: String,
    },
    game: {
      guid: String,
      gamename: String,
      icon_url: String,
    },
  },
  { timestamps: true }
);

export const SearchHistoryModel = model("searchhistories", SearchHistorySchema);
