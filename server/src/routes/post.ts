import { Router } from "express";
import {
  fetchPostsController,
  savePostController,
  addCommentController,
  getCommentsController,
  addReplyController,
  deleteCommentController,
  incrementLikeController,
  decrementLikeController,
  incrementCommentLikeController,
  decrementCommentLikeController,
  getRepliesController,
  decrementReplyLikeController,
  incrementReplyLikeController,
  fetchHomePostsController,
} from "../controllers/PostController";
import Multer from "multer";

const router = Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.post("/savepost", multer.single("file"), savePostController);
router.get("/fetchpost", fetchPostsController);
router.get("/fetchhomepost", fetchHomePostsController);
router.post("/incrementlike", incrementLikeController);
router.post("/decrementlike", decrementLikeController);

router.get("/fetchcomment", getCommentsController);
router.post("/addcomment", addCommentController);
router.post("/deletecomment", deleteCommentController);
router.post("/incrementcommentlike", incrementCommentLikeController);
router.post("/decrementcommentlike", decrementCommentLikeController);

router.post("/getreplies", getRepliesController);
router.post("/addreply", addReplyController);
router.post("/incrementreplylike", incrementReplyLikeController);
router.post("/decrementreplylike", decrementReplyLikeController);

export default router;
