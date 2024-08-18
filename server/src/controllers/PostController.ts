import { Request, Response } from "express";
import { Storage } from "@google-cloud/storage";
import {
  GOOGLE_STORAGE_BUCKET_NAME,
  GOOGLE_STORAGE_KEY,
  GOOGLE_STORAGE_PROJECT_ID,
} from "../constants";
import { stringToObjectId } from "../helpers/index";
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
  const { uid, content, game, bg } = req.body;
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
            bg: bg,
          });

          const post = await PostModel.findById(postId)
            .populate("userid", "_id displayname imgURL")
            .lean();

          if (post) {
            const { userid, ...rest } = post;

            res.status(200).json({
              ...rest,
              user: {
                ...userid,
              },
              userLiked: false,
              likeCount: 0,
              commentCount: 0,
            });
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
          bg: bg,
        });

        const post = await PostModel.findById(postId, {
          likes: 0,
          comments: 0,
        })
          .populate("userid", "_id displayname imgURL")
          .lean();

        if (post) {
          const { userid, ...rest } = post;

          res.status(200).json({
            ...rest,
            user: {
              ...userid,
            },
            userLiked: false,
            likeCount: 0,
            commentCount: 0,
          });
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
    if (vieweruid !== null && vieweruid !== undefined && vieweruid !== "null") {
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
            likeCount: { $size: { $ifNull: ["$likes", []] } },
            shareCount: { $size: { $ifNull: ["$shares", []] } },
            commentCount: { $size: { $ifNull: ["$comments", []] } },
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
          $lookup: {
            from: "users",
            localField: "userid",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            _id: 1,
            userid: 1,
            bg: 1,
            postType: 1,
            content: 1,
            postImgURL: 1,
            createdAt: 1,
            updatedAt: 1,
            likeCount: 1,
            shareCount: 1,
            commentCount: 1,
            userLiked: 1,
            user: {
              _id: 1,
              displayname: 1,
              imgURL: 1,
            },
          },
        },
        {
          $unwind: "$user",
        },
      ]);

      return res.status(200).json(posts);
    } else {
      const objectId = stringToObjectId(uid);
      const skip = 0;
      const limit = 5;

      const posts = await PostModel.aggregate([
        { $match: { userid: objectId } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $addFields: {
            likeCount: { $size: { $ifNull: ["$likes", []] } },
            shareCount: { $size: { $ifNull: ["$shares", []] } },
            commentCount: { $size: { $ifNull: ["$comments", []] } },
            userLiked: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userid",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            _id: 1,
            userid: 1,
            postType: 1,
            content: 1,
            postImgURL: 1,
            createdAt: 1,
            updatedAt: 1,
            likeCount: 1,
            shareCount: 1,
            commentCount: 1,
            userLiked: 1,
            user: {
              _id: 1,
              displayname: 1,
              imgURL: 1,
            },
          },
        },
        {
          $unwind: "$user",
        },
      ]);

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchHomePostsController = async (req: any, res: Response) => {
  const { vieweruid } = req.query;

  try {
    if (vieweruid !== null && vieweruid !== undefined && vieweruid !== "null") {
      const objectViewerUID = stringToObjectId(vieweruid.toString());

      const skip = 0;
      const limit = 5;

      const posts = await PostModel.aggregate([
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
          $lookup: {
            from: "users",
            localField: "userid",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            _id: 1,
            userid: 1,
            bg: 1,
            postType: 1,
            content: 1,
            postImgURL: 1,
            createdAt: 1,
            updatedAt: 1,
            likeCount: 1,
            shareCount: 1,
            commentCount: 1,
            userLiked: 1,
            user: {
              _id: 1,
              displayname: 1,
              imgURL: 1,
            },
          },
        },
        {
          $unwind: "$user",
        },
      ]);

      return res.status(200).json(posts);
    } else {
      const skip = 0;
      const limit = 5;

      const posts = await PostModel.aggregate([
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $addFields: {
            likeCount: { $size: { $ifNull: ["$likes", []] } }, // Use $ifNull to handle missing fields
            shareCount: { $size: { $ifNull: ["$shares", []] } }, // Use $ifNull to handle missing fields
            commentCount: { $size: { $ifNull: ["$comments", []] } }, // Use $ifNull to handle missing fields
            userLiked: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userid",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            _id: 1,
            userid: 1,
            postType: 1,
            content: 1,
            postImgURL: 1,
            createdAt: 1,
            updatedAt: 1,
            likeCount: 1,
            shareCount: 1,
            commentCount: 1,
            userLiked: 1,
            user: {
              _id: 1,
              displayname: 1,
              imgURL: 1,
            },
          },
        },
        {
          $unwind: "$user",
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

      const commentFinalResult = await CommentModel.findById(newComment._id)
        .populate("userId", "_id displayname imgURL")
        .lean();

      if (!commentFinalResult)
        return res
          .status(400)
          .json({ message: "There is an error occured on adding comment." });

      const { userId: user, ...rest } = commentFinalResult;

      return res.status(200).json({
        ...rest,
        user,
        isLiked: false,
        likeCount: 0,
        likes: undefined,
        postId: undefined,
      });
    } else {
      res.status(400).json({ message: "Cannot add comment." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteCommentController = async (req: any, res: Response) => {
  const { uid, postId, commentId } = req.body;
  try {
    if (uid && postId && commentId) {
      const objectCommentId = stringToObjectId(commentId);
      const objectPostId = stringToObjectId(postId);
      const objectUserId = stringToObjectId(uid);

      const deleteComment = await CommentModel.deleteOne({
        _id: objectCommentId,
        postId: objectPostId,
      });

      const deleteRepliesReferencedToComment = await ReplyModel.deleteMany({
        commentId: objectCommentId,
      });

      const deleteCommentsToPost = await PostModel.findOneAndUpdate(
        { _id: objectPostId },
        { $pull: { comments: objectCommentId } }
      );

      if (
        deleteComment &&
        deleteRepliesReferencedToComment &&
        deleteCommentsToPost
      ) {
        return res
          .status(200)
          .json({ message: "Delete a comment successfully" });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsController = async (req: any, res: Response) => {
  try {
    const { userid, postid, skip, limit } = req.query;

    if (userid !== null && userid !== undefined && userid !== "null") {
      const objectUserId = stringToObjectId(userid);
      const objectPostId = stringToObjectId(postid);

      const post = await PostModel.findById(objectPostId);

      if (!post) {
        return res
          .status(400)
          .json({ message: "There was no post retrieved." });
      }

      const comments = await CommentModel.aggregate([
        { $match: { _id: { $in: post.comments } } },

        {
          $addFields: {
            replyCount: { $size: "$replies" },
          },
        },

        {
          $addFields: {
            isSpecificUser: {
              $cond: [{ $eq: ["$userId", objectUserId] }, 1, 0],
            },
          },
        },

        {
          $addFields: {
            likeCount: { $size: "$likes" },
          },
        },

        {
          $addFields: {
            isLiked: {
              $cond: [{ $in: [objectUserId, "$likes"] }, true, false],
            },
          },
        },
        {
          $addFields: {
            replies: [],
          },
        },

        { $sort: { isSpecificUser: -1, createdAt: -1 } },

        { $skip: parseInt(skip) },
        { $limit: parseInt(limit) },

        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },

        {
          $project: {
            _id: 1,
            content: 1,
            createdAt: 1,
            likeCount: 1,
            isLiked: 1,
            replyCount: 1,
            replies: 1,
            user: {
              _id: 1,
              displayname: 1,
              imgURL: 1,
            },
          },
        },
        {
          $unwind: "$user",
        },
      ]).exec();

      return res.status(200).json(comments);
    } else {
      const objectPostId = stringToObjectId(postid);

      const post = await PostModel.findById(objectPostId);

      if (!post) {
        return res
          .status(400)
          .json({ message: "There was no post retrieved." });
      }

      const comments = await CommentModel.aggregate([
        { $match: { _id: { $in: post.comments } } },

        {
          $addFields: {
            replyCount: { $size: "$replies" },
          },
        },

        {
          $addFields: {
            isSpecificUser: false,
          },
        },

        {
          $addFields: {
            likeCount: { $size: "$likes" },
          },
        },

        {
          $addFields: {
            isLiked: false,
          },
        },
        {
          $addFields: {
            replies: [],
          },
        },

        { $sort: { isSpecificUser: -1, createdAt: -1 } },

        { $skip: parseInt(skip) },
        { $limit: parseInt(limit) },

        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },

        {
          $project: {
            _id: 1,
            content: 1,
            createdAt: 1,
            likeCount: 1,
            isLiked: 1,
            replyCount: 1,
            replies: 1,
            user: {
              _id: 1,
              displayname: 1,
              imgURL: 1,
            },
          },
        },
        {
          $unwind: "$user",
        },
      ]).exec();

      return res.status(200).json(comments);
    }
  } catch (error) {
    console.error(error);
  }
};

export const incrementCommentLikeController = async (
  req: any,
  res: Response
) => {
  const { postId, commentId, userId } = req.body;
  try {
    if (postId && userId && commentId) {
      const objectCommentId = stringToObjectId(commentId);
      const objectPostId = stringToObjectId(postId);
      const objectUserId = stringToObjectId(userId);

      const isExistingLike = await CommentModel.findOne({
        _id: objectCommentId,
        postId: objectPostId,
        likes: objectUserId,
      });

      if (!isExistingLike) {
        await CommentModel.findOneAndUpdate(
          { postId: objectPostId, _id: commentId },
          {
            $push: { likes: objectUserId },
          }
        );
        return res
          .status(200)
          .json({ message: "Successfully liked a comment." });
      }
    } else {
      res.status(400).json({ message: "Post id and User Id is missing." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const decrementCommentLikeController = async (
  req: any,
  res: Response
) => {
  const { postId, commentId, userId } = req.body;

  try {
    if (postId && userId && commentId) {
      const objectCommentId = stringToObjectId(commentId);
      const objectPostId = stringToObjectId(postId);
      const objectUserId = stringToObjectId(userId);

      const isExistingLike = await CommentModel.findOne({
        _id: objectCommentId,
        postId: objectPostId,
        likes: objectUserId,
      });

      if (isExistingLike) {
        await CommentModel.findOneAndUpdate(
          { postId: objectPostId, _id: commentId },
          {
            $pull: { likes: objectUserId },
          }
        );

        return res
          .status(200)
          .json({ message: "Successfully unliked a comment." });
      }
    } else {
      res.status(400).json({ message: "Post id and User Id is missing." });
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

      const newReply = await ReplyModel.create({
        userId: objectUserId,
        commentId: objectCommentId,
        content: replyData,
      });

      const updateComment = await CommentModel.findOneAndUpdate(
        { _id: objectCommentId },
        {
          $push: { replies: newReply._id },
        }
      );

      if (updateComment) {
        const commentReply = await ReplyModel.findOne({
          _id: newReply._id,
        })
          .populate("userId", "displayname imgURL")
          .lean();

        return res
          .status(200)
          .json({ ...commentReply, likeCount: 0, isLiked: false });
      }
    } else {
      res.status(400).json({ message: "Cannot add a reply." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getRepliesController = async (req: any, res: Response) => {
  const { userId, commentId, skip, limit } = req.body;
  try {
    if (userId !== null && userId !== undefined && userId !== "null") {
      const objectUserId = stringToObjectId(userId);
      const objectCommentId = stringToObjectId(commentId);

      const replies = await ReplyModel.find({ commentId: objectCommentId })
        .skip(parseInt(skip, 10))
        .limit(parseInt(limit, 10))
        .populate("userId", "displayname imgURL")
        .exec();

      const repliesWithAdditionalFields = replies.map((reply) => ({
        ...reply.toObject(),
        likeCount: reply.likes.length,
        isLiked: reply.likes.includes(objectUserId),
      }));

      return res.status(200).json(repliesWithAdditionalFields);
    } else {
      const objectCommentId = stringToObjectId(commentId);

      const replies = await ReplyModel.find({ commentId: objectCommentId })
        .skip(parseInt(skip, 10))
        .limit(parseInt(limit, 10))
        .populate("userId", "displayname imgURL")
        .exec();

      const repliesWithAdditionalFields = replies.map((reply) => ({
        ...reply.toObject(),
        likeCount: reply.likes.length,
        isLiked: false,
      }));

      return res.status(200).json(repliesWithAdditionalFields);
    }
  } catch (error) {
    console.error(error);
  }
};

export const incrementReplyLikeController = async (req: any, res: Response) => {
  const { commentId, replyId, userId } = req.body;
  try {
    if (commentId && replyId && userId) {
      const objectReplyId = stringToObjectId(replyId);
      const objectCommentId = stringToObjectId(commentId);
      const objectUserId = stringToObjectId(userId);

      const isExistingLike = await ReplyModel.findOne({
        _id: objectReplyId,
        commentId: objectCommentId,
        likes: objectUserId,
      });

      if (!isExistingLike) {
        await ReplyModel.findOneAndUpdate(
          { commentId: objectCommentId, _id: objectReplyId },
          {
            $push: { likes: objectUserId },
          }
        );
        return res.status(200).json({ message: "Successfully liked a reply." });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const decrementReplyLikeController = async (req: any, res: Response) => {
  const { commentId, replyId, userId } = req.body;

  try {
    if (commentId && replyId && userId) {
      const objectReplyId = stringToObjectId(replyId);
      const objectCommentId = stringToObjectId(commentId);
      const objectUserId = stringToObjectId(userId);

      const isExistingLike = await ReplyModel.findOne({
        _id: objectReplyId,
        commentId: objectCommentId,
        likes: objectUserId,
      });

      if (isExistingLike) {
        await ReplyModel.findOneAndUpdate(
          { commentId: objectCommentId, _id: objectReplyId },
          {
            $pull: { likes: objectUserId },
          }
        );
        return res
          .status(200)
          .json({ message: "Successfully unliked a reply." });
      }
    }
  } catch (error) {
    console.error(error);
  }
};
