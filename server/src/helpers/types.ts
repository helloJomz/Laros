import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  displayname: string;
  email: string;
  imgURL: string;
}

export type TokenType = "access" | "refresh";
