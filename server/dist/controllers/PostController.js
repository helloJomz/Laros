"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrementReplyLikeController = exports.incrementReplyLikeController = exports.getRepliesController = exports.addReplyController = exports.decrementCommentLikeController = exports.incrementCommentLikeController = exports.getCommentsController = exports.deleteCommentController = exports.addCommentController = exports.decrementLikeController = exports.incrementLikeController = exports.fetchHomePostsController = exports.fetchPostsController = exports.savePostController = void 0;
const storage_1 = require("@google-cloud/storage");
const constants_1 = require("../constants");
const index_1 = require("../helpers/index");
const Post_1 = require("../models/Post");
const Comment_1 = require("../models/Comment");
const Reply_1 = require("../models/Reply");
const mongoose_1 = __importDefault(require("mongoose"));
const projectId = constants_1.GOOGLE_STORAGE_PROJECT_ID;
const keyFilename = constants_1.GOOGLE_STORAGE_KEY;
const storage = new storage_1.Storage({
    projectId,
    keyFilename,
});
const bucket = storage.bucket(constants_1.GOOGLE_STORAGE_BUCKET_NAME);
const savePostController = async (req, res) => {
    const { uid, content, game } = req.body;
    const file = req.file;
    try {
        if (uid) {
            const _id = (0, index_1.stringToObjectId)(uid);
            const postId = new mongoose_1.default.Types.ObjectId();
            if (file) {
                const blob = bucket.file(file.originalname);
                const blobStream = blob.createWriteStream();
                blobStream.on("error", () => {
                    res.status(400).json({ message: "Error uploading avatar." });
                });
                blobStream.on("finish", async () => {
                    const publicURL = `https://storage.googleapis.com/${bucket.name}/${file.originalname}`;
                    await Post_1.PostModel.create({
                        _id: postId,
                        userid: _id,
                        content: content,
                        postType: "post",
                        postImgURL: publicURL,
                        //   game: game,
                    });
                    const post = await Post_1.PostModel.findById(postId)
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
                    }
                    else {
                        res
                            .status(400)
                            .json({ message: "There was an error posting the post." });
                    }
                });
                blobStream.end(file.buffer);
            }
            else {
                await Post_1.PostModel.create({
                    _id: postId,
                    userid: _id,
                    content: content,
                    postType: "post",
                    //   game: game,
                });
                const post = await Post_1.PostModel.findById(postId, {
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
                }
                else {
                    res
                        .status(400)
                        .json({ message: "There was an error posting the post." });
                }
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.savePostController = savePostController;
const fetchPostsController = async (req, res) => {
    const { uid, vieweruid } = req.query;
    try {
        if (vieweruid !== null && vieweruid !== undefined && vieweruid !== "null") {
            const objectId = (0, index_1.stringToObjectId)(uid);
            const objectViewerUID = (0, index_1.stringToObjectId)(vieweruid);
            const skip = 0;
            const limit = 5;
            const posts = await Post_1.PostModel.aggregate([
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
        else {
            const objectId = (0, index_1.stringToObjectId)(uid);
            const skip = 0;
            const limit = 5;
            const posts = await Post_1.PostModel.aggregate([
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
    }
    catch (error) {
        console.error(error);
    }
};
exports.fetchPostsController = fetchPostsController;
const fetchHomePostsController = async (req, res) => {
    const { vieweruid } = req.query;
    try {
        if (vieweruid !== null && vieweruid !== undefined && vieweruid !== "null") {
            const objectViewerUID = (0, index_1.stringToObjectId)(vieweruid.toString());
            const skip = 0;
            const limit = 5;
            const posts = await Post_1.PostModel.aggregate([
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
        else {
            const skip = 0;
            const limit = 5;
            const posts = await Post_1.PostModel.aggregate([
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
    }
    catch (error) {
        console.error(error);
    }
};
exports.fetchHomePostsController = fetchHomePostsController;
const incrementLikeController = async (req, res) => {
    const { postId, userId } = req.body;
    try {
        if (postId && userId) {
            const objectPostId = (0, index_1.stringToObjectId)(postId);
            const objectUserId = (0, index_1.stringToObjectId)(userId);
            const isExistingLike = await Post_1.PostModel.findOne({
                _id: objectPostId,
                likes: { $in: [objectUserId] },
            });
            if (!isExistingLike) {
                const liked = await Post_1.PostModel.findOneAndUpdate({ _id: objectPostId }, { $push: { likes: objectUserId } }, { new: true });
                if (liked) {
                    return res
                        .status(200)
                        .json({ message: "Successfully liked a post." });
                }
                else {
                    return res
                        .status(400)
                        .json({ message: "Unsuccessful liking a post." });
                }
            }
            else {
                return res.status(400).json({ message: "Already liked this post." });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.incrementLikeController = incrementLikeController;
const decrementLikeController = async (req, res) => {
    const { postId, userId } = req.body;
    try {
        if (postId && userId) {
            const objectPostId = (0, index_1.stringToObjectId)(postId);
            const objectUserId = (0, index_1.stringToObjectId)(userId);
            const isExistingLike = await Post_1.PostModel.findOne({
                _id: objectPostId,
                likes: { $in: [objectUserId] },
            });
            if (isExistingLike) {
                const liked = await Post_1.PostModel.findOneAndUpdate({ _id: objectPostId }, { $pull: { likes: objectUserId } }, { new: true });
                if (liked) {
                    return res
                        .status(200)
                        .json({ message: "Successfully unliked a post." });
                }
                else {
                    return res
                        .status(400)
                        .json({ message: "Unsuccessful unliking a post." });
                }
            }
            else {
                return res
                    .status(400)
                    .json({ message: "You have not liked this post yet." });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.decrementLikeController = decrementLikeController;
const addCommentController = async (req, res) => {
    try {
        const { uid, postId, comment } = req.body;
        if (uid && postId && comment) {
            const objectUID = (0, index_1.stringToObjectId)(uid);
            const objectPostId = (0, index_1.stringToObjectId)(postId);
            const newComment = await Comment_1.CommentModel.create({
                userId: objectUID,
                postId: objectPostId,
                content: comment,
            });
            await Post_1.PostModel.findByIdAndUpdate(objectPostId, { $push: { comments: newComment._id } }, { new: true, useFindAndModify: false });
            const commentFinalResult = await Comment_1.CommentModel.findById(newComment._id)
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
        }
        else {
            res.status(400).json({ message: "Cannot add comment." });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.addCommentController = addCommentController;
const deleteCommentController = async (req, res) => {
    const { uid, postId, commentId } = req.body;
    try {
        if (uid && postId && commentId) {
            const objectCommentId = (0, index_1.stringToObjectId)(commentId);
            const objectPostId = (0, index_1.stringToObjectId)(postId);
            const objectUserId = (0, index_1.stringToObjectId)(uid);
            const deleteComment = await Comment_1.CommentModel.deleteOne({
                _id: objectCommentId,
                postId: objectPostId,
            });
            const deleteRepliesReferencedToComment = await Reply_1.ReplyModel.deleteMany({
                commentId: objectCommentId,
            });
            const deleteCommentsToPost = await Post_1.PostModel.findOneAndUpdate({ _id: objectPostId }, { $pull: { comments: objectCommentId } });
            if (deleteComment &&
                deleteRepliesReferencedToComment &&
                deleteCommentsToPost) {
                return res
                    .status(200)
                    .json({ message: "Delete a comment successfully" });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.deleteCommentController = deleteCommentController;
const getCommentsController = async (req, res) => {
    try {
        const { userid, postid, skip, limit } = req.query;
        if (userid !== null && userid !== undefined && userid !== "null") {
            const objectUserId = (0, index_1.stringToObjectId)(userid);
            const objectPostId = (0, index_1.stringToObjectId)(postid);
            const post = await Post_1.PostModel.findById(objectPostId);
            if (!post) {
                return res
                    .status(400)
                    .json({ message: "There was no post retrieved." });
            }
            const comments = await Comment_1.CommentModel.aggregate([
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
        }
        else {
            const objectPostId = (0, index_1.stringToObjectId)(postid);
            const post = await Post_1.PostModel.findById(objectPostId);
            if (!post) {
                return res
                    .status(400)
                    .json({ message: "There was no post retrieved." });
            }
            const comments = await Comment_1.CommentModel.aggregate([
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
    }
    catch (error) {
        console.error(error);
    }
};
exports.getCommentsController = getCommentsController;
const incrementCommentLikeController = async (req, res) => {
    const { postId, commentId, userId } = req.body;
    try {
        if (postId && userId && commentId) {
            const objectCommentId = (0, index_1.stringToObjectId)(commentId);
            const objectPostId = (0, index_1.stringToObjectId)(postId);
            const objectUserId = (0, index_1.stringToObjectId)(userId);
            const isExistingLike = await Comment_1.CommentModel.findOne({
                _id: objectCommentId,
                postId: objectPostId,
                likes: objectUserId,
            });
            if (!isExistingLike) {
                await Comment_1.CommentModel.findOneAndUpdate({ postId: objectPostId, _id: commentId }, {
                    $push: { likes: objectUserId },
                });
                return res
                    .status(200)
                    .json({ message: "Successfully liked a comment." });
            }
        }
        else {
            res.status(400).json({ message: "Post id and User Id is missing." });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.incrementCommentLikeController = incrementCommentLikeController;
const decrementCommentLikeController = async (req, res) => {
    const { postId, commentId, userId } = req.body;
    try {
        if (postId && userId && commentId) {
            const objectCommentId = (0, index_1.stringToObjectId)(commentId);
            const objectPostId = (0, index_1.stringToObjectId)(postId);
            const objectUserId = (0, index_1.stringToObjectId)(userId);
            const isExistingLike = await Comment_1.CommentModel.findOne({
                _id: objectCommentId,
                postId: objectPostId,
                likes: objectUserId,
            });
            if (isExistingLike) {
                await Comment_1.CommentModel.findOneAndUpdate({ postId: objectPostId, _id: commentId }, {
                    $pull: { likes: objectUserId },
                });
                return res
                    .status(200)
                    .json({ message: "Successfully unliked a comment." });
            }
        }
        else {
            res.status(400).json({ message: "Post id and User Id is missing." });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.decrementCommentLikeController = decrementCommentLikeController;
const addReplyController = async (req, res) => {
    try {
        const { userId, commentId, replyData } = req.body;
        if (userId && commentId && replyData) {
            const objectUserId = (0, index_1.stringToObjectId)(userId);
            const objectCommentId = (0, index_1.stringToObjectId)(commentId);
            const newReply = await Reply_1.ReplyModel.create({
                userId: objectUserId,
                commentId: objectCommentId,
                content: replyData,
            });
            const updateComment = await Comment_1.CommentModel.findOneAndUpdate({ _id: objectCommentId }, {
                $push: { replies: newReply._id },
            });
            if (updateComment) {
                const commentReply = await Reply_1.ReplyModel.findOne({
                    _id: newReply._id,
                })
                    .populate("userId", "displayname imgURL")
                    .lean();
                return res
                    .status(200)
                    .json({ ...commentReply, likeCount: 0, isLiked: false });
            }
        }
        else {
            res.status(400).json({ message: "Cannot add a reply." });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.addReplyController = addReplyController;
const getRepliesController = async (req, res) => {
    const { userId, commentId, skip, limit } = req.body;
    try {
        if (userId !== null && userId !== undefined && userId !== "null") {
            const objectUserId = (0, index_1.stringToObjectId)(userId);
            const objectCommentId = (0, index_1.stringToObjectId)(commentId);
            const replies = await Reply_1.ReplyModel.find({ commentId: objectCommentId })
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
        }
        else {
            const objectCommentId = (0, index_1.stringToObjectId)(commentId);
            const replies = await Reply_1.ReplyModel.find({ commentId: objectCommentId })
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
    }
    catch (error) {
        console.error(error);
    }
};
exports.getRepliesController = getRepliesController;
const incrementReplyLikeController = async (req, res) => {
    const { commentId, replyId, userId } = req.body;
    try {
        if (commentId && replyId && userId) {
            const objectReplyId = (0, index_1.stringToObjectId)(replyId);
            const objectCommentId = (0, index_1.stringToObjectId)(commentId);
            const objectUserId = (0, index_1.stringToObjectId)(userId);
            const isExistingLike = await Reply_1.ReplyModel.findOne({
                _id: objectReplyId,
                commentId: objectCommentId,
                likes: objectUserId,
            });
            if (!isExistingLike) {
                await Reply_1.ReplyModel.findOneAndUpdate({ commentId: objectCommentId, _id: objectReplyId }, {
                    $push: { likes: objectUserId },
                });
                return res.status(200).json({ message: "Successfully liked a reply." });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.incrementReplyLikeController = incrementReplyLikeController;
const decrementReplyLikeController = async (req, res) => {
    const { commentId, replyId, userId } = req.body;
    try {
        if (commentId && replyId && userId) {
            const objectReplyId = (0, index_1.stringToObjectId)(replyId);
            const objectCommentId = (0, index_1.stringToObjectId)(commentId);
            const objectUserId = (0, index_1.stringToObjectId)(userId);
            const isExistingLike = await Reply_1.ReplyModel.findOne({
                _id: objectReplyId,
                commentId: objectCommentId,
                likes: objectUserId,
            });
            if (isExistingLike) {
                await Reply_1.ReplyModel.findOneAndUpdate({ commentId: objectCommentId, _id: objectReplyId }, {
                    $pull: { likes: objectUserId },
                });
                return res
                    .status(200)
                    .json({ message: "Successfully unliked a reply." });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.decrementReplyLikeController = decrementReplyLikeController;
