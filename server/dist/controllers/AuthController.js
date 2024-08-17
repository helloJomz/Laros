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
exports.refreshTokenController = exports.isDisplayNameExistsController = exports.isEmailExistsController = exports.logoutController = exports.loginController = exports.signupController = void 0;
const User_1 = require("../models/User");
const constants_1 = require("../constants");
const index_1 = require("../helpers/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const index_2 = require("../helpers/index");
const signupController = async (req, res) => {
    const { displayname, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, constants_1.SALT);
        const randomGif = (0, index_2.generateRandomAvatarGifs)();
        const newUser = {
            displayname: displayname,
            email: email,
            password: hashedPassword,
            imgURL: randomGif,
        };
        const user = await User_1.UserModel.create(newUser);
        if (user) {
            const userObj = {
                _id: user._id,
                displayname: user.displayname,
                email: user.email,
                imgURL: randomGif,
            };
            const accessToken = (0, index_1.generateToken)(userObj, "access", "30m");
            const refreshToken = (0, index_1.generateToken)(userObj, "refresh", "1d");
            res.cookie(constants_1.ACCESS_TOKEN_STRING, accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 60 * 1000,
            });
            res.cookie(constants_1.REFRESH_TOKEN_STRING, refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({
                gqeRxt3B9mZ2i: {
                    ks23kfm: accessToken,
                    sdCXkm122: refreshToken,
                },
                userObj,
            });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.signupController = signupController;
const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.UserModel.findOne({ email: email });
    if (!user)
        return res.status(400).json({ error: "Invalid email or Password." });
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
    }
    const userObj = {
        _id: user._id,
        displayname: user.displayname,
        email: user.email,
        ...(user.imgURL !== undefined && { imgURL: user.imgURL }),
    };
    const accessToken = (0, index_1.generateToken)(userObj, "access", "30m");
    const refreshToken = (0, index_1.generateToken)(userObj, "refresh", "1d");
    res.cookie(constants_1.ACCESS_TOKEN_STRING, accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 60 * 1000,
    });
    res.cookie(constants_1.REFRESH_TOKEN_STRING, refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        gqeRxt3B9mZ2i: {
            ks23kfm: accessToken,
            sdCXkm122: refreshToken,
        },
        userObj,
    });
};
exports.loginController = loginController;
const logoutController = async (req, res) => {
    res.clearCookie("gqeRxt3B9mZ2i");
    res.clearCookie("ui9832mmXk21");
    return res.status(200).json({
        message: "Successfully logged out!",
    });
};
exports.logoutController = logoutController;
const isEmailExistsController = async (req, res) => {
    try {
        const { email } = req.body;
        const isExistingEmail = await User_1.UserModel.findOne({ email: email });
        if (isExistingEmail)
            return res.status(400).json({ error: "Email is already taken." });
        return res.status(200).json({ success: "Email is available." });
    }
    catch (error) {
        console.error(error);
    }
};
exports.isEmailExistsController = isEmailExistsController;
const isDisplayNameExistsController = async (req, res) => {
    try {
        const { displayname } = req.body;
        const isExistingDisplayName = await User_1.UserModel.findOne({
            displayname: displayname,
        });
        if (isExistingDisplayName)
            return res.status(400).json({ error: "Display name is already taken." });
        return res.status(200).json({ success: "Display name is available." });
    }
    catch (error) {
        console.error(error);
    }
};
exports.isDisplayNameExistsController = isDisplayNameExistsController;
const refreshTokenController = async (req, res) => {
    const { gqeRxt3B9mZ2i: accessToken, ui9832mmXk21: refreshToken } = req.cookies;
    if (!accessToken || !refreshToken)
        return res.status(401).json({ message: "Forbidden Access!" });
    jwt.verify(refreshToken, constants_1.REFRESH_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: "Forbidden Access!" });
        const data = decoded.user;
        const newUserObj = {
            _id: data._id,
            displayname: data.displayname,
            email: data.email,
        };
        const accessToken = (0, index_1.generateToken)(newUserObj, "access", "30m");
        return res
            .status(200)
            .cookie(constants_1.ACCESS_TOKEN_STRING, accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 60 * 1000,
        })
            .json({ gqeRxt3B9mZ2i: accessToken });
    });
};
exports.refreshTokenController = refreshTokenController;
