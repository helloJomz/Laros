"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllRecentHistoryController = exports.deleteOneRecentHistoryController = exports.getAllRecentHistoryController = exports.addRecentHistoryController = exports.searchQueryController = exports.getGameListByQueryController = void 0;
const constants_1 = require("../constants");
const axios_1 = __importDefault(require("axios"));
const SearchHistory_1 = require("../models/SearchHistory");
const index_1 = require("../helpers/index");
const User_1 = require("../models/User");
const getGameListByQueryController = async (req, res) => {
    const { query } = req.params;
    try {
        if (query !== "null") {
            const response = await axios_1.default.get("https://www.giantbomb.com/api/games/", {
                params: {
                    api_key: constants_1.APIKEY,
                    field_list: "name,image,platforms,guid,deck",
                    filter: `name:${query.toLowerCase()}`,
                    format: "json",
                    limit: 5,
                },
            });
            return res.status(200).json(response.data.results);
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.getGameListByQueryController = getGameListByQueryController;
const searchQueryController = async (req, res) => {
    const { query } = req.query;
    if (query) {
        const gameResponse = await axios_1.default.get("https://www.giantbomb.com/api/games/", {
            params: {
                api_key: constants_1.APIKEY,
                field_list: "name,image,guid",
                filter: `name:${query.toString().toLowerCase()}`,
                format: "json",
                limit: 5,
            },
        });
        const userResponse = await User_1.UserModel.find({
            displayname: { $regex: query, $options: "i" },
        }, { displayname: 1, _id: 1, imgURL: 1 }).limit(5);
        return res.status(200).json({
            game: gameResponse.data.results,
            user: [...userResponse],
        });
    }
};
exports.searchQueryController = searchQueryController;
const addRecentHistoryController = async (req, res) => {
    try {
        const { userid, ...rest } = req.body;
        if (!userid)
            return res.status(400).json({ message: "Userid is required." });
        const HistoryParams = {
            userid,
            ...rest,
        };
        const createdHistory = await SearchHistory_1.SearchHistoryModel.create({
            ...HistoryParams,
        });
        return res.status(200).json(createdHistory);
    }
    catch (error) {
        console.error(error);
    }
};
exports.addRecentHistoryController = addRecentHistoryController;
const getAllRecentHistoryController = async (req, res) => {
    const { userid } = req.query;
    if (userid !== null && userid !== undefined && userid !== "null")
        return res
            .status(400)
            .json({ message: "UserId is required to get the recent history." });
    const objectUserId = (0, index_1.stringToObjectId)(userid);
    const histories = await SearchHistory_1.SearchHistoryModel.find({
        userid: objectUserId,
    }).sort({ createdAt: -1 });
    return res.status(200).json(histories);
};
exports.getAllRecentHistoryController = getAllRecentHistoryController;
const deleteOneRecentHistoryController = async (req, res) => {
    const { userId, historyId } = req.body;
    if (!userId && !historyId)
        return res
            .status(400)
            .json({ message: "Userid and historyid is required." });
    const objectUserId = (0, index_1.stringToObjectId)(userId);
    const objectHistoryId = (0, index_1.stringToObjectId)(historyId);
    const deletedHistory = await SearchHistory_1.SearchHistoryModel.findOneAndDelete({
        userid: objectUserId,
        _id: objectHistoryId,
    });
    console.log(deletedHistory);
    return res.status(200).json(deletedHistory);
};
exports.deleteOneRecentHistoryController = deleteOneRecentHistoryController;
const deleteAllRecentHistoryController = async (req, res) => {
    const { userid } = req.body;
    if (!userid)
        return res
            .status(400)
            .json({ message: "UserId is required to get the recent history." });
    const objectUserId = (0, index_1.stringToObjectId)(userid);
    const response = await SearchHistory_1.SearchHistoryModel.deleteMany({
        userid: objectUserId,
    });
    return res.status(200).json(response);
};
exports.deleteAllRecentHistoryController = deleteAllRecentHistoryController;
