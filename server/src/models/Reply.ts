import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReplySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
      required: true,
    },
    parentReply: {
      type: Schema.Types.ObjectId,
      ref: "Replies", // Reference to another reply
      default: null,
    },
    content: {
      type: String,
      required: true,
    },
    hearts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ReplyModel = model("Replies", ReplySchema);
