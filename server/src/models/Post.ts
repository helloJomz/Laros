import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "Users", // Reference to the User model
      required: true,
    },
    postType: {
      type: String,
      required: true,
    },
    bg: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    postImgURL: {
      type: String,
      required: false,
    },
    game: {
      guid: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
      imgURL: {
        type: String,
        required: false,
      },
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
    // shares: [{ stype: Schema.Types.ObjectId, ref: "shares" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
  },
  { timestamps: true }
);

export const PostModel = model("Posts", PostSchema);
