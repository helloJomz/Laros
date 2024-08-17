"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHistoryModel = void 0;
const mongoose_1 = require("mongoose");
const SearchHistorySchema = new mongoose_1.Schema({
    userid: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    anon: {
        query: String,
    },
    user: {
        displayname: String,
        img_url: String,
    },
    game: {
        guid: String,
        gamename: String,
        icon_url: String,
    },
}, { timestamps: true });
exports.SearchHistoryModel = (0, mongoose_1.model)("searchhistories", SearchHistorySchema);
