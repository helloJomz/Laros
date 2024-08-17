"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollowUserController = exports.getUserFollowingController = exports.checkProfileRelationshipStatusController = exports.addGenreController = exports.addBioController = exports.getAllFollowersController = exports.minusFollowController = exports.addFollowController = exports.getAllHeartController = exports.minusHeartController = exports.addHeartController = void 0;
const User_1 = require("../models/User");
const index_1 = require("../helpers/index");
const addHeartController = async (req, res) => {
    const { yourUID, otherUserUID } = req.body;
    try {
        if (yourUID && otherUserUID) {
            const transformedYourUID = (0, index_1.stringToObjectId)(yourUID);
            const transformedOtherUserUID = (0, index_1.stringToObjectId)(otherUserUID);
            const addToYourGivenHeart = await User_1.UserModel.updateOne({ _id: transformedYourUID }, { $push: { "heart.given": { uid: transformedOtherUserUID } } });
            const addToOtherUserReceived = await User_1.UserModel.updateOne({ _id: transformedOtherUserUID }, { $push: { "heart.received": { uid: transformedYourUID } } });
            if (addToYourGivenHeart && addToOtherUserReceived) {
                return res.status(200).json({ message: "Successfully given heart." });
            }
            else {
                return res
                    .status(400)
                    .json({ message: "There is an error adding heart." });
            }
        }
        else {
            res.status(400).json({ message: "No UIDs were sent!" });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.addHeartController = addHeartController;
const minusHeartController = async (req, res) => {
    const { yourUID, otherUserUID } = req.body;
    try {
        if (yourUID && otherUserUID) {
            const transformedYourUID = (0, index_1.stringToObjectId)(yourUID);
            const transformedOtherUserUID = (0, index_1.stringToObjectId)(otherUserUID);
            const minusToYourGivenHeart = await User_1.UserModel.updateOne({ _id: transformedYourUID }, { $pull: { "heart.given": { uid: transformedOtherUserUID } } });
            const minusToOtherUserReceived = await User_1.UserModel.updateOne({ _id: transformedOtherUserUID }, { $pull: { "heart.received": { uid: transformedYourUID } } });
            if (minusToYourGivenHeart && minusToOtherUserReceived) {
                return res
                    .status(200)
                    .json({ message: "Successfully deducting heart." });
            }
            else {
                return res
                    .status(400)
                    .json({ message: "There is an error subtracting heart." });
            }
        }
        else {
            res.status(400).json({ message: "No UIDs were sent!" });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.minusHeartController = minusHeartController;
const getAllHeartController = async (req, res) => {
    const { uid } = req.query;
    try {
        if (uid) {
            const transformedUID = (0, index_1.stringToObjectId)(uid);
            const user = await User_1.UserModel.findOne({ _id: transformedUID }, { "heart.received.uid": 1 });
            if (!user)
                return res.status(400).json({ message: "User not found!" });
            const userList = user.heart?.received;
            const enrichedUserList = await User_1.UserModel.find({ _id: { $in: userList?.map((h) => h.uid) } }, "displayname imgURL");
            return res.status(200).json(enrichedUserList);
        }
        else {
            return res.status(400).json({ message: "No userid was found!" });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.getAllHeartController = getAllHeartController;
const addFollowController = async (req, res) => {
    const { yourUID, otherUserUID } = req.body;
    try {
        if (yourUID && otherUserUID) {
            const transformedYourUID = (0, index_1.stringToObjectId)(yourUID);
            const transformedOtherUserUID = (0, index_1.stringToObjectId)(otherUserUID);
            const setFollowerToOtherUser = await User_1.UserModel.findByIdAndUpdate(transformedOtherUserUID, { $set: { follower: { uid: transformedYourUID } } });
            const setFollowingToYou = await User_1.UserModel.findByIdAndUpdate(transformedYourUID, { $set: { following: { uid: transformedOtherUserUID } } });
            if (setFollowerToOtherUser && setFollowingToYou) {
                return res.status(200).json({ message: "Success on adding follow." });
            }
            else {
                return res
                    .status(200)
                    .json({ message: "There is an error adding follow." });
            }
        }
        else {
            res.status(400).json({ message: "No UIDs were sent!" });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.addFollowController = addFollowController;
const minusFollowController = async (req, res) => {
    const { yourUID, otherUserUID } = req.body;
    try {
        if (yourUID && otherUserUID) {
            const transformedYourUID = (0, index_1.stringToObjectId)(yourUID);
            const transformedOtherUserUID = (0, index_1.stringToObjectId)(otherUserUID);
            const setFollowerToOtherUser = await User_1.UserModel.findByIdAndUpdate(transformedOtherUserUID, { $pull: { follower: { uid: transformedYourUID } } });
            const setFollowingToYou = await User_1.UserModel.findByIdAndUpdate(transformedYourUID, { $pull: { following: { uid: transformedOtherUserUID } } });
            if (setFollowerToOtherUser && setFollowingToYou) {
                return res
                    .status(200)
                    .json({ message: "Success on deducting follow." });
            }
            else {
                return res
                    .status(200)
                    .json({ message: "There is an error deducting follow." });
            }
        }
        else {
            res.status(400).json({ message: "No UIDs were sent!" });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.minusFollowController = minusFollowController;
const getAllFollowersController = async (req, res) => {
    const { uid } = req.query;
    try {
        if (uid) {
            const transformedUID = (0, index_1.stringToObjectId)(uid);
            const user = await User_1.UserModel.findOne({ _id: transformedUID }, { "follower.uid": 1 });
            if (!user)
                return res.status(400).json({ message: "User not found!" });
            const userList = user.follower;
            const enrichedUserList = await User_1.UserModel.find({ _id: { $in: userList?.map((f) => f.uid) } }, "displayname imgURL");
            return res.status(200).json(enrichedUserList);
        }
        else {
            return res.status(400).json({ message: "No userid was found!" });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.getAllFollowersController = getAllFollowersController;
const addBioController = async (req, res) => {
    try {
        const { yourUID, bio } = req.body;
        if (yourUID) {
            const transformedYourUID = (0, index_1.stringToObjectId)(yourUID);
            const user = await User_1.UserModel.updateOne({ _id: transformedYourUID }, { $set: { bio: bio } });
            if (user) {
                return res.status(200).json({ bio: bio });
            }
            else {
                return res.status(400).json({ message: "Error adding bio." });
            }
        }
        else {
            return res.status(400).json({ message: "Cannot proceed on adding bio." });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.addBioController = addBioController;
const addGenreController = async (req, res) => {
    try {
        const { yourUID, genre } = req.body;
        if (yourUID) {
            const transformedYourUID = (0, index_1.stringToObjectId)(yourUID);
            const user = await User_1.UserModel.findByIdAndUpdate(transformedYourUID, {
                genre: genre,
            });
            if (user) {
                return res.status(200).json(user.genre);
            }
            else {
                return res.status(200).json({ message: "Error adding genre!" });
            }
        }
        else {
            return res
                .status(400)
                .json({ message: "Cannot proceed on adding genre." });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.addGenreController = addGenreController;
const checkProfileRelationshipStatusController = async (req, res) => {
    try {
        const { yourUID, otherUserUID } = req.params;
        if (yourUID && otherUserUID) {
            const transformedYourUID = (0, index_1.stringToObjectId)(yourUID);
            const transformedOtherUserUID = (0, index_1.stringToObjectId)(otherUserUID);
            const isHeart = await User_1.UserModel.findOne({
                _id: transformedOtherUserUID,
                "heart.received.uid": transformedYourUID,
            });
            const user = await User_1.UserModel.findById(transformedYourUID, {
                following: 1,
            });
            const isFollowing = user?.following.some((f) => f.uid.toString() === otherUserUID);
            return res.status(200).json({ heart: !!isHeart, following: isFollowing });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.checkProfileRelationshipStatusController = checkProfileRelationshipStatusController;
const getUserFollowingController = async (req, res) => {
    try {
        const { uid } = req.query;
        if (uid) {
            const transformedUID = (0, index_1.stringToObjectId)(uid);
            const user = await User_1.UserModel.findOne({ _id: transformedUID }).populate("following", "displayname");
            if (!user) {
                return res.status(400).send("User not found");
            }
            const followingList = user.following;
            const enrichedFollowingList = await User_1.UserModel.find({
                _id: { $in: followingList.map((f) => f.uid) },
            }, "displayname imgURL following");
            // Check if the current user is in the following list of each followed user
            const enrichedFollowingWithMutual = await Promise.all(enrichedFollowingList.map(async (followedUser) => {
                const isMutual = followedUser.following.some((f) => f.uid.toString() === uid);
                return {
                    ...followedUser.toObject(),
                    isMutual,
                };
            }));
            res.json(enrichedFollowingWithMutual);
        }
        else {
            return res
                .status(400)
                .json({ message: "There is wrong fetching following." });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.getUserFollowingController = getUserFollowingController;
const unfollowUserController = async (req, res) => {
    try {
        const { yourUID, otherUserUID } = req.body;
        if (!yourUID || !otherUserUID)
            return res.status(400).json({ message: "Cannot process this action." });
        const transformedYourUID = (0, index_1.stringToObjectId)(yourUID);
        const transformedOtherUserUID = (0, index_1.stringToObjectId)(otherUserUID);
        const user = await User_1.UserModel.findByIdAndUpdate(transformedYourUID, {
            $pull: { following: { uid: transformedOtherUserUID } },
        });
        if (!user)
            return res.status(400).json({ message: "Cannot find the user." });
        res.status(200).json({ isUnfollowed: !!user });
    }
    catch (error) {
        console.error(error);
    }
};
exports.unfollowUserController = unfollowUserController;
