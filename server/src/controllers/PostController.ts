import { Request, Response } from "express";
import { Storage } from "@google-cloud/storage";
import {
  GOOGLE_STORAGE_BUCKET_NAME,
  GOOGLE_STORAGE_KEY,
  GOOGLE_STORAGE_PROJECT_ID,
} from "../constants";
import { stringToObjectId } from "../helpers";
import { PostModel } from "../models/Post";
import mongoose from "mongoose";

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
      const postId = new mongoose.Types.ObjectId();

      if (file) {
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on("error", () => {
          res.status(400).json({ message: "Error uploading avatar." });
        });

        blobStream.on("finish", async () => {
          const publicURL = `https://storage.googleapis.com/${bucket.name}/${file.originalname}`;

          await PostModel.findOneAndUpdate(
            { _id: _id },
            {
              $set: { userid: _id },
              $push: {
                post: {
                  _id: postId,
                  postType: "post",
                  content: content,
                  imgURL: publicURL,
                  // game: null,
                },
              },
            },
            { upsert: true, new: true }
          );

          const post = await PostModel.findById(_id, {
            post: { $elemMatch: { _id: postId } },
          });

          if (post) {
            res.status(200).json(post);
          } else {
            res
              .status(400)
              .json({ message: "There was an error posting the post." });
          }
        });
        blobStream.end(file.buffer);
      } else {
        await PostModel.updateOne(
          { _id: _id },
          {
            $set: { userid: _id },
            $push: {
              post: {
                _id: postId,
                postType: "post",
                content: content,
                // game: null,
              },
            },
          },
          { upsert: true, new: true }
        );

        const post = await PostModel.findById(_id, {
          post: { $elemMatch: { _id: postId } },
        });

        if (post) {
          res.status(200).json(post);
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
      const commentLimit = 3;
      const replyLimit = 1;

      const postsWithComments = await PostModel.aggregate([
        { $match: { userid: objectId } },
        {
          $unwind: "$post", // Flatten the array of post contents
        },
        {
          $sort: { "post.createdAt": -1 }, // Sort posts by createdAt
        },
        {
          $addFields: {
            "post.comment": {
              $slice: ["$post.comment", commentLimit], // Limit the number of comments per post
            },
          },
        },
        {
          $addFields: {
            "post.comment": {
              $map: {
                input: "$post.comment",
                as: "comment",
                in: {
                  $mergeObjects: [
                    "$$comment",
                    {
                      reply: {
                        $slice: ["$$comment.reply", replyLimit], // Limit the number of replies per comment
                      },
                      replyLength: {
                        $size: { $ifNull: ["$$comment.reply", []] },
                      }, // Calculate reply length
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            post: { $push: "$post" },
          },
        },
      ]);

      if (postsWithComments.length > 0) {
        return res.status(200).json(postsWithComments[0].post); // Return the posts array directly
      } else {
        return res.status(200).json([]); // Return an empty array if no posts found
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const addCommentController = async (req: any, res: Response) => {
  try {
    const { uid, postId, comment, displayname, imgURL } = req.body;

    if (postId && comment && displayname && imgURL) {
      const transformedUID = stringToObjectId(uid);
      const transformedPostId = stringToObjectId(postId);

      const post = await PostModel.findOneAndUpdate(
        { "post._id": transformedPostId },
        {
          $push: {
            "post.$.comment": {
              uid: uid,
              imgURL: imgURL,
              displayname: displayname,
              comment: comment,
            },
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      const updatedPost = await PostModel.findOne(
        { "post._id": transformedPostId },
        { "post.$": 1 }
      );

      const updatedComment = updatedPost?.post[0]?.comment.slice(-1)[0];

      return res.status(200).json(updatedComment);
    } else {
      res.status(400).json({ message: "Cannot add comment." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsController = async (req: any, res: Response) => {
  try {
    const { postId, skip, limit } = req.query;
    if (postId) {
      const transformedPostId = stringToObjectId(postId);
      const post = await PostModel.findById({ _id: transformedPostId });
    } else {
      res.status(400).json({ message: "Cannot retrieved comments" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const addReplyController = async (req: any, res: Response) => {
  try {
    const { senderObject, authorId, postId, commentId, replyData } = req.body;

    if (senderObject && authorId && postId && commentId && replyData) {
      const objectAuthorId = stringToObjectId(authorId);
      const objectPostId = stringToObjectId(postId);
      const objectCommentId = stringToObjectId(commentId);
      const { senderUserId, senderDisplayname, senderImgURL } = senderObject;

      const newReplyObjectId = new mongoose.Types.ObjectId();

      const updatedPost = await PostModel.findOneAndUpdate(
        {
          _id: objectAuthorId,
          "post._id": objectPostId,
          "post.comment._id": objectCommentId,
        },
        {
          $push: {
            "post.$[post].comment.$[comment].reply": {
              _id: newReplyObjectId,
              uid: senderUserId,
              displayname: senderDisplayname,
              imgURL: senderImgURL,
              content: replyData,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        {
          arrayFilters: [
            { "post._id": objectPostId },
            { "comment._id": objectCommentId },
          ],
          new: true,
        }
      ).exec();

      if (updatedPost) {
        const specificPost = updatedPost.post.find(
          (p) => p._id?.toString() === objectPostId.toString()
        );

        const specificComment = specificPost?.comment.find(
          (c) => c._id?.toString() === objectCommentId.toString()
        );

        const specificReply = specificComment?.reply.find(
          (r) => r._id?.toString() === newReplyObjectId.toString()
        );

        if (specificReply) {
          return res.status(200).json(specificReply);
        } else {
          return res
            .status(400)
            .json({ message: "There was an error retrieving reply." });
        }
      } else {
        return res
          .status(400)
          .json({ message: "There was an error adding a reply." });
      }
    } else {
      res.status(400).json({ message: "Cannot add a reply." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getRepliesController = async (req: any, res: Response) => {
  const { postId, commentId, skip, limit } = req.body;

  try {
    const objectPostId = stringToObjectId(postId);
    const objectCommentId = stringToObjectId(commentId);

    const pipeline = [
      {
        $match: { "post._id": objectPostId },
      },
      {
        $unwind: "$post",
      },
      {
        $unwind: "$post.comment",
      },
      {
        $match: { "post.comment._id": objectCommentId },
      },
      {
        $project: {
          _id: 0,
          replies: {
            $slice: ["$post.comment.reply", skip, limit],
          },
        },
      },
    ];

    const result = await PostModel.aggregate(pipeline);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
};
