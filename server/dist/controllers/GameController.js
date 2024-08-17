"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameByGuidController = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const getGameByGuidController = async (req, res) => {
    const { guid } = req.query;
    try {
        if (!guid)
            return res.status(400).json({ message: "No guid found!" });
        const gameResponse = await axios_1.default.get(`https://www.giantbomb.com/api/game/${guid.toString()}/?api_key=${constants_1.APIKEY}`, {
            params: {
                format: "json",
            },
        });
        res.status(200).json(gameResponse.data.results);
    }
    catch (error) {
        console.error(error);
    }
};
exports.getGameByGuidController = getGameByGuidController;
