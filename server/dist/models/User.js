"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    displayname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        default: "",
    },
    genre: {
        type: [String],
        required: false,
    },
    follower: [
        {
            uid: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Users",
            },
        },
    ],
    following: [
        {
            uid: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Users",
            },
        },
    ],
    heart: {
        given: [
            {
                uid: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "Users",
                },
            },
        ],
        received: [
            {
                uid: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "Users",
                },
            },
        ],
    },
});
exports.UserModel = (0, mongoose_1.model)("Users", exports.UserSchema);
