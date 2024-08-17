"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadAvatarController = void 0;
const storage_1 = require("@google-cloud/storage");
const constants_1 = require("../constants");
const User_1 = require("../models/User");
const mongoose_1 = __importDefault(require("mongoose"));
const projectId = constants_1.GOOGLE_STORAGE_PROJECT_ID;
const keyFilename = constants_1.GOOGLE_STORAGE_KEY;
const storage = new storage_1.Storage({
    projectId,
    keyFilename,
});
const bucket = storage.bucket(constants_1.GOOGLE_STORAGE_BUCKET_NAME);
const UploadAvatarController = async (req, res) => {
    const { uid } = req.body;
    const file = req.file;
    try {
        if (uid && file) {
            //TODO: MAKE A CHECKING IF USER HAS A EXISTING IMG IN THE GOOGLECLOUD
            const blob = bucket.file(file.originalname);
            const blobStream = blob.createWriteStream();
            blobStream.on("error", () => {
                res.status(400).json({ message: "Error uploading avatar." });
            });
            blobStream.on("finish", async () => {
                const publicURL = `https://storage.googleapis.com/${bucket.name}/${file.originalname}`;
                const _id = mongoose_1.default.Types.ObjectId.createFromHexString(uid);
                await User_1.UserModel.updateOne({ _id: _id }, { $set: { imgURL: publicURL } });
                res.status(200).json({ imgURL: publicURL });
            });
            blobStream.end(file.buffer);
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.UploadAvatarController = UploadAvatarController;
