import { Schema, model } from "mongoose";

const TokenSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
  },
});

TokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 3600 });

export const TokenModel = model("tokens", TokenSchema);
