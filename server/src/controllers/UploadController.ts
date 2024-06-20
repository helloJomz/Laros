import { Request, Response, json } from "express";
import axios from "axios";
import { Storage } from "@google-cloud/storage";

let projectId = "ancient-sunspot-426802-r0";
let keyFilename = "cloudkey.json";

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket("laros-cloud-storage");

export const UploadAvatarController = async (req: Request, res: Response) => {
  try {
    const blob = bucket.file(req.file!.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", () => {
      res.status(400).json({ message: "Error uploading avatar." });
    });

    blobStream.on("finish", () => {
      res.status(200).json({ message: "Successfully uploaded an avatar." });
    });

    blobStream.end(req.file!.buffer);
  } catch (error) {
    console.error(error);
  }
};
