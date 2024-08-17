"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const ReplySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "Comments",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
}, { timestamps: true });
exports.ReplyModel = model("Replies", ReplySchema);
