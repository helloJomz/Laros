"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const multer = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
router.post("/savepost", multer.single("file"), PostController_1.savePostController);
router.get("/fetchpost", PostController_1.fetchPostsController);
router.get("/fetchhomepost", PostController_1.fetchHomePostsController);
router.post("/incrementlike", PostController_1.incrementLikeController);
router.post("/decrementlike", PostController_1.decrementLikeController);
router.get("/fetchcomment", PostController_1.getCommentsController);
router.post("/addcomment", PostController_1.addCommentController);
router.post("/deletecomment", PostController_1.deleteCommentController);
router.post("/incrementcommentlike", PostController_1.incrementCommentLikeController);
router.post("/decrementcommentlike", PostController_1.decrementCommentLikeController);
router.post("/getreplies", PostController_1.getRepliesController);
router.post("/addreply", PostController_1.addReplyController);
router.post("/incrementreplylike", PostController_1.incrementReplyLikeController);
router.post("/decrementreplylike", PostController_1.decrementReplyLikeController);
exports.default = router;
