import { Response } from "express";
import { Storage } from "@google-cloud/storage";
import {
  GOOGLE_STORAGE_KEY,
  GOOGLE_STORAGE_PROJECT_ID,
  GOOGLE_STORAGE_BUCKET_NAME,
} from "../constants";
import { UserModel } from "../models/User";
import mongoose from "mongoose";

const projectId = GOOGLE_STORAGE_PROJECT_ID;
const keyFilename = "/etc/secrets/cloudkey.json";

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket(GOOGLE_STORAGE_BUCKET_NAME);

export const UploadAvatarController = async (req: any, res: Response) => {
  const { uid } = req.body;
  const file = req.file;

  try {
    if (uid && file) {
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream();
      blobStream.on("error", () => {
        res.status(400).json({ message: "Error uploading avatar." });
      });
      blobStream.on("finish", async () => {
        const publicURL = `https://storage.googleapis.com/${bucket.name}/${file.originalname}`;

        const _id = mongoose.Types.ObjectId.createFromHexString(uid);

        await UserModel.updateOne(
          { _id: _id },
          { $set: { imgURL: publicURL } }
        );

        res.status(200).json({ imgURL: publicURL });
      });
      blobStream.end(file.buffer);
    }
  } catch (error) {
    console.error(error);
  }
};
