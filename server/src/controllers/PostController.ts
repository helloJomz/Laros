import { Request, Response } from "express";
import { Storage } from "@google-cloud/storage";
import {
  GOOGLE_STORAGE_BUCKET_NAME,
  GOOGLE_STORAGE_KEY,
  GOOGLE_STORAGE_PROJECT_ID,
} from "../constants";
import { stringToObjectId } from "../helpers";
import { PostModel } from "../models/Post";
import { CommentModel } from "../models/Comment";
import { ReplyModel } from "../models/Reply";
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

          await PostModel.create({
            _id: postId,
            userid: _id,
            content: content,
            postType: "post",
            postImgURL: publicURL,
            //   game: game,
          });

          const post = await PostModel.findById(postId);

          if (post) {
            res
              .status(200)
              .json({ ...post.toObject(), userLiked: false, likeCount: 0 });
          } else {
            res
              .status(400)
              .json({ message: "There was an error posting the post." });
          }
        });
        blobStream.end(file.buffer);
      } else {
        await PostModel.create({
          _id: postId,
          userid: _id,
          content: content,
          postType: "post",
          //   game: game,
        });

        const post = await PostModel.findById(postId, {
          likes: 0,
          comments: 0,
        });

        if (post) {
          res
            .status(200)
            .json({ ...post.toObject(), userLiked: false, likeCount: 0 });
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
  const { uid, vieweruid } = req.query;

  try {
    if (uid) {
      const objectId = stringToObjectId(uid);
      const objectViewerUID = stringToObjectId(vieweruid);
      const skip = 0;
      const limit = 5;

      const posts = await PostModel.aggregate([
        { $match: { userid: objectId } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $addFields: {
            likeCount: { $size: { $ifNull: ["$likes", []] } }, // Use $ifNull to handle missing fields
            shareCount: { $size: { $ifNull: ["$shares", []] } }, // Use $ifNull to handle missing fields
            commentCount: { $size: { $ifNull: ["$comments", []] } }, // Use $ifNull to handle missing fields
            userLiked: {
              $cond: [
                { $in: [objectViewerUID, { $ifNull: ["$likes", []] }] },
                true,
                false,
              ],
            },
          },
        },
        {
          $project: {
            comments: 0,
            likes: 0,
            shares: 0,
          },
        },
      ]);

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.error(error);
  }
};

export const incrementLikeController = async (req: any, res: Response) => {
  const { postId, userId } = req.body;
  try {
    if (postId && userId) {
      const objectPostId = stringToObjectId(postId);
      const objectUserId = stringToObjectId(userId);

      const isExistingLike = await PostModel.findOne({
        _id: objectPostId,
        likes: { $in: [objectUserId] },
      });

      if (!isExistingLike) {
        const liked = await PostModel.findOneAndUpdate(
          { _id: objectPostId },
          { $push: { likes: objectUserId } },
          { new: true }
        );

        if (liked) {
          return res
            .status(200)
            .json({ message: "Successfully liked a post." });
        } else {
          return res
            .status(400)
            .json({ message: "Unsuccessful liking a post." });
        }
      } else {
        return res.status(400).json({ message: "Already liked this post." });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const decrementLikeController = async (req: any, res: Response) => {
  const { postId, userId } = req.body;
  try {
    if (postId && userId) {
      const objectPostId = stringToObjectId(postId);
      const objectUserId = stringToObjectId(userId);

      const isExistingLike = await PostModel.findOne({
        _id: objectPostId,
        likes: { $in: [objectUserId] },
      });

      if (isExistingLike) {
        const liked = await PostModel.findOneAndUpdate(
          { _id: objectPostId },
          { $pull: { likes: objectUserId } },
          { new: true }
        );

        if (liked) {
          return res
            .status(200)
            .json({ message: "Successfully unliked a post." });
        } else {
          return res
            .status(400)
            .json({ message: "Unsuccessful unliking a post." });
        }
      } else {
        return res
          .status(400)
          .json({ message: "You have not liked this post yet." });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const addCommentController = async (req: any, res: Response) => {
  try {
    const { uid, postId, comment } = req.body;

    if (uid && postId && comment) {
      const objectUID = stringToObjectId(uid);
      const objectPostId = stringToObjectId(postId);

      const newComment = await CommentModel.create({
        userId: objectUID,
        postId: objectPostId,
        content: comment,
      });

      await PostModel.findByIdAndUpdate(
        objectPostId,
        { $push: { comments: newComment._id } },
        { new: true, useFindAndModify: false }
      );

      const commentFinalResult = await CommentModel.findById(
        newComment._id
      ).populate("userId", "_id displayname imgURL");

      return res.status(200).json(commentFinalResult);
    } else {
      res.status(400).json({ message: "Cannot add comment." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsController = async (req: any, res: Response) => {
  try {
    const { postid, skip, limit } = req.query;

    if (postid) {
      const objectPostId = stringToObjectId(postid);

      const comments = await CommentModel.find({ postId: objectPostId })
        .skip(skip)
        .limit(limit)
        .populate("userId", "_id displayname imgURL")
        .exec();

      return res.status(200).json(comments);
    } else {
      res.status(400).json({ message: "Cannot retrieved comments" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const addReplyController = async (req: any, res: Response) => {
  try {
    const { userId, commentId, replyData } = req.body;

    if (userId && commentId && replyData) {
      const objectUserId = stringToObjectId(userId);
      const objectCommentId = stringToObjectId(commentId);

      const newReplyObjectId = new mongoose.Types.ObjectId();

      await ReplyModel.create({
        _id: newReplyObjectId,
        userId: objectUserId,
        commentId: objectCommentId,
        content: replyData,
      });

      const commentReply = await ReplyModel.findOne({ _id: newReplyObjectId });

      return res.status(200).json(commentReply);
    } else {
      res.status(400).json({ message: "Cannot add a reply." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getParentRepliesController = async (req: any, res: Response) => {
  const { commentid, skip, limit } = req.query;

  try {
    if (commentid) {
      const objectCommentId = stringToObjectId(commentid);

      const parentReplies = await ReplyModel.find({
        $and: [
          { commentId: objectCommentId }, // Match the specific commentId
          {
            $or: [
              { parentReply: { $exists: false } }, // Field does not exist
              { parentReply: null }, // Field is explicitly set to null
            ],
          },
        ],
      })
        .skip(skip)
        .limit(limit)
        .populate("userId", "_id displayname imgURL");

      return res.status(200).json(parentReplies);
    }
  } catch (error) {
    console.error(error);
  }
};
