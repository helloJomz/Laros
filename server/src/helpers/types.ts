import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
}

export type TokenType = "access" | "refresh";
