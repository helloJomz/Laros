"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBgGifController = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
const randomBgGifController = async (req, res) => {
    try {
        const gameChannelUsername = (0, helpers_1.randomVerifiedGiphyGameChannelsGif)();
        const response = await axios_1.default.get("https://api.giphy.com/v1/gifs/random/", {
            params: {
                api_key: constants_1.GIPHY_APIKEY,
                tag: gameChannelUsername,
            },
        });
        const responseData = response.data.data;
        const giphyResultObject = {
            mp4_link: responseData.images.hd
                ? responseData.images.hd.mp4
                : responseData.images.original_mp4.mp4,
            user: {
                avatar_url: responseData.user.avatar_url,
                display_name: responseData.user.display_name,
                username: responseData.user.username,
                profile_url: responseData.user.profile_url,
            },
        };
        return res.status(200).json(giphyResultObject);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.randomBgGifController = randomBgGifController;
