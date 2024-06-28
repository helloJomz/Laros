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
    required: false,
  },
  follower: [
    {
      uid: Schema.Types.ObjectId,
    },
  ],
  following: [
    {
      uid: Schema.Types.ObjectId,
    },
  ],
  heartcount: [
    {
      uid: Schema.Types.ObjectId,
    },
  ],
});

export const UserModel = model("users", UserSchema);
