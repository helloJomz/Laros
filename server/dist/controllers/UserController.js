"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdController = exports.getUserByDisplayNameController = void 0;
const User_1 = require("../models/User");
const index_1 = require("../helpers/index");
const getUserByDisplayNameController = async (req, res) => {
    const { displayname } = req.body;
    const user = await User_1.UserModel.findOne({ displayname: displayname });
    if (user && displayname !== "") {
        const userObj = {
            userid: user._id,
            displayname: user.displayname,
            email: user.email,
            imgURL: user.imgURL,
            bio: user.bio,
            genre: user.genre,
            heartcount: user.heart?.received.length,
            follower: user.follower.length,
            following: user.following.length,
        };
        return res.status(200).json({ ...userObj });
    }
    else {
        return res.status(400).json({ message: "User not found" });
    }
};
exports.getUserByDisplayNameController = getUserByDisplayNameController;
const getUserByIdController = async (req, res) => {
    const { userid } = req.query;
    if (userid) {
        const objectUID = (0, index_1.stringToObjectId)(userid);
        const user = await User_1.UserModel.findById(objectUID);
        if (user) {
            const userObj = {
                userid: user._id,
                displayname: user.displayname,
                email: user.email,
                imgURL: user.imgURL,
                heartcount: user.heart?.received.length,
                follower: user.follower.length,
                following: user.following.length,
            };
            return res.status(200).json(userObj);
        }
        else {
            return res.status(400).json({ message: "No user found" });
        }
    }
    else {
        return res.status(400).json({ message: "User not found" });
    }
};
exports.getUserByIdController = getUserByIdController;
