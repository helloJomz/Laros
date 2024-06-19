import { ACCESS_SECRET, REFRESH_SECRET } from "../constants";
import * as jwt from "jsonwebtoken";
import { User, TokenType } from "./types";
import { verifiedGiphyGameChannels } from "./array";
import { v4 } from "uuid";

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
