"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Posts",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
    replies: [{ type: Schema.Types.ObjectId, ref: "replies" }],
}, { timestamps: true });
CommentSchema.index({ postId: 1 });
CommentSchema.index({ userId: 1 });
exports.CommentModel = model("Comments", CommentSchema);
