"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UploadController_1 = require("../controllers/UploadController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const multer = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
router.post("/avatar", multer.single("imgfile"), UploadController_1.UploadAvatarController);
exports.default = router;
