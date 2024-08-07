import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReplySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

export const ReplyModel = model("Replies", ReplySchema);
