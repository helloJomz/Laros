import { Request, Response } from "express";
import { Storage } from "@google-cloud/storage";
import {
  GOOGLE_STORAGE_BUCKET_NAME,
  GOOGLE_STORAGE_KEY,
  GOOGLE_STORAGE_PROJECT_ID,
} from "../constants";
import { stringToObjectId } from "../helpers";
import { PostModel } from "../models/Post";

const projectId = GOOGLE_STORAGE_PROJECT_ID;
const keyFilename = GOOGLE_STORAGE_KEY;

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket(GOOGLE_STORAGE_BUCKET_NAME);

export const savePostController = async (req: any, res: Response) => {
  const { uid, content, game } = req.body;
  const file = req.file;
  try {
    if (uid) {
      const _id = stringToObjectId(uid);
      if (file) {
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on("error", () => {
          res.status(400).json({ message: "Error uploading avatar." });
        });

        blobStream.on("finish", async () => {
          const publicURL = `https://storage.googleapis.com/${bucket.name}/${file.originalname}`;

          const post = await PostModel.updateOne(
            { _id: _id },
            {
              $set: { userid: _id },
              $push: {
                post: {
                  postType: "post",
                  content: content,
                  imgURL: publicURL,
                  // game: null,
                },
              },
            },
            { upsert: true }
          );

          if (post) {
            res.status(200).json({ message: "Successfully posted." });
          } else {
            res
              .status(400)
              .json({ message: "There was an error posting the post." });
          }
        });
        blobStream.end(file.buffer);
      } else {
        const post = await PostModel.updateOne(
          { _id: _id },
          {
            $set: { userid: _id },
            $push: {
              post: {
                postType: "post",
                content: content,
                // game: null,
              },
            },
          },
          { upsert: true }
        );

        if (post) {
          res.status(200).json({ message: "Successfully posted." });
        } else {
          res
            .status(400)
            .json({ message: "There was an error posting the post." });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchPostsController = async (req: any, res: Response) => {
  const { uid, offset, limit } = req.query;
  try {
    if (uid) {
      const objectId = stringToObjectId(uid);

      const posts = await PostModel.aggregate([
        { $match: { _id: objectId } }, // Match the document by _id
        { $unwind: "$post" }, // Deconstruct the post array
        { $sort: { "post.createdAt": -1 } }, // Sort posts by createdAt in descending order
        { $skip: parseInt(offset) }, // Skip documents based on offset
        { $limit: parseInt(limit) }, // Limit the number of documents returned
        { $group: { _id: "$_id", post: { $push: "$post" } } }, // Group back into original structure
      ]);

      if (posts.length > 0) {
        return res.status(200).json(posts[0].post); // Return the posts array directly
      } else {
        return res.status(200).json([]); // Return an empty array if no posts found
      }
    }
  } catch (error) {
    console.error(error);
  }
};
