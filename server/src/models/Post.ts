import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    uid: String,
    displayname: String,
    imgURL: String,
    comment: String,

    reply: [
      {
        uid: String,
        displayname: String,
        imgURL: String,
        content: String,
      },
    ],
  },
  { timestamps: true }
);

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
    comment: [CommentSchema], // Comments are nested here
  },
  { timestamps: true } // Apply timestamps to post content
);

const PostSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "Users", // Reference to the User model
    required: true,
  },
  post: [PostContentSchema], // Posts are nested here
});

export const PostModel = model("Posts", PostSchema);
