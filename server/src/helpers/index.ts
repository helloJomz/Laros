import { ACCESS_SECRET, REFRESH_SECRET } from "../constants";
import * as jwt from "jsonwebtoken";
import { User, TokenType } from "./types";
import { arrayOfRandomAvatarGifs, verifiedGiphyGameChannels } from "./array";
import { v4 } from "uuid";
import mongoose from "mongoose";

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

export const randomVerifiedGiphyGameChannelsGif = () => {
  const randomIndex = Math.floor(
    Math.random() * verifiedGiphyGameChannels.length
  );
  return verifiedGiphyGameChannels[randomIndex];
};

export const generateUniqueAvatarId = (filename: string): string => {
  const uniqueString = v4();
  return uniqueString + "-" + filename;
};

export function generateRandomAvatarGifs() {
  const randomIndex = Math.floor(
    Math.random() * arrayOfRandomAvatarGifs.length
  );
  return arrayOfRandomAvatarGifs[randomIndex];
}

export function stringToObjectId(uid: string) {
  return mongoose.Types.ObjectId.createFromHexString(uid);
}
