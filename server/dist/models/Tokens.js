"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = void 0;
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    _userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    refreshToken: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
    },
});
TokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 3600 });
exports.TokenModel = (0, mongoose_1.model)("tokens", TokenSchema);
