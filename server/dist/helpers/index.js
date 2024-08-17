"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToObjectId = exports.generateRandomAvatarGifs = exports.generateUniqueAvatarId = exports.randomVerifiedGiphyGameChannelsGif = exports.generateToken = void 0;
const constants_1 = require("../constants");
const jwt = __importStar(require("jsonwebtoken"));
const array_1 = require("./array");
const uuid_1 = require("uuid");
const mongoose_1 = __importDefault(require("mongoose"));
const generateToken = (user, tokenType, expiry = "1d") => {
    const secretType = tokenType === "access" ? constants_1.ACCESS_SECRET : constants_1.REFRESH_SECRET;
    const options = {};
    if (expiry)
        options.expiresIn = expiry;
    const accessToken = jwt.sign({ user }, secretType, options);
    return accessToken;
};
exports.generateToken = generateToken;
const randomVerifiedGiphyGameChannelsGif = () => {
    const randomIndex = Math.floor(Math.random() * array_1.verifiedGiphyGameChannels.length);
    return array_1.verifiedGiphyGameChannels[randomIndex];
};
exports.randomVerifiedGiphyGameChannelsGif = randomVerifiedGiphyGameChannelsGif;
const generateUniqueAvatarId = (filename) => {
    const uniqueString = (0, uuid_1.v4)();
    return uniqueString + "-" + filename;
};
exports.generateUniqueAvatarId = generateUniqueAvatarId;
function generateRandomAvatarGifs() {
    const randomIndex = Math.floor(Math.random() * array_1.arrayOfRandomAvatarGifs.length);
    return array_1.arrayOfRandomAvatarGifs[randomIndex];
}
exports.generateRandomAvatarGifs = generateRandomAvatarGifs;
function stringToObjectId(uid) {
    return mongoose_1.default.Types.ObjectId.createFromHexString(uid);
}
exports.stringToObjectId = stringToObjectId;
