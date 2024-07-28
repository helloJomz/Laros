import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
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
    content: {
      type: String,
      required: true,
    },
    hearts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CommentSchema.index({ postId: 1 });
CommentSchema.index({ userId: 1 });

export const CommentModel = model("Comments", CommentSchema);
