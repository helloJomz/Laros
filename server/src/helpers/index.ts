import { arrayOfRandomAvatarGifs, verifiedGiphyGameChannels } from "./array";
import { v4 } from "uuid";
import mongoose from "mongoose";

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
