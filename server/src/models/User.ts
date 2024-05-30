import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
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
});

export const UserModel = model("users", UserSchema);
