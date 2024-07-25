import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    hearts: { type: Number, default: 0 },
    replies: [
      {
        userid: {
          type: Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        content: String,
      },
    ],
  },
  { timestamps: true }
);

export const CommentModel = model("Comments", CommentSchema);
