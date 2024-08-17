"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const PostSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "Users", // Reference to the User model
        required: true,
    },
    postType: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    postImgURL: {
        type: String,
        required: false,
    },
    game: {
        guid: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        imgURL: {
            type: String,
            required: false,
        },
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
    // shares: [{ stype: Schema.Types.ObjectId, ref: "shares" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
}, { timestamps: true });
exports.PostModel = model("Posts", PostSchema);
