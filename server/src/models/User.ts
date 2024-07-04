import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
  displayname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    default: "",
  },
  genre: {
    type: [String],
    required: false,
  },
  follower: [
    {
      uid: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    },
  ],
  following: [
    {
      uid: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    },
  ],
  heart: [
    {
      uid: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    },
  ],
  post: [
    {
      uid: {
        type: Schema.Types.ObjectId,
        ref: "Posts",
      },
    },
  ],
});

export const UserModel = model("Users", UserSchema);
