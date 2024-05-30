import { ACCESS_SECRET, REFRESH_SECRET } from "../constants";
import * as jwt from "jsonwebtoken";
import { User, TokenType } from "./types";
import { Types } from "mongoose";
import { TokenModel } from "../models/Tokens";
import { Response } from "express";

export const generateToken = (
  user: User,
  tokenType: TokenType,
  expiry: string = "1d"
) => {
  const secretType = tokenType === "access" ? ACCESS_SECRET! : REFRESH_SECRET!;
  const options: jwt.SignOptions = {};
  if (expiry) options.expiresIn = expiry;
  const accessToken = jwt.sign({ user }, secretType, options);
  return accessToken;
};
