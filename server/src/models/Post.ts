import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostContentSchema = new Schema(
  {
    postType: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    imgURL: {
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
  },
  { timestamps: true }
);

const PostSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "Users", // Reference to the User model
      required: true,
    },
    post: [PostContentSchema],
  },
  { timestamps: true }
);

export const PostModel = model("Posts", PostSchema);
