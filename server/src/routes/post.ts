import { Router } from "express";
import {
  fetchPostsController,
  savePostController,
  addCommentController,
  getCommentsController,
  addReplyController,
  getParentRepliesController,
  incrementLikeController,
  decrementLikeController,
  // getRepliesController,
} from "../controllers/PostController";
import Multer from "multer";

const router = Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.post("/savepost", multer.single("file"), savePostController);
router.get("/fetchpost", fetchPostsController);
router.post("/incrementlike", incrementLikeController);
router.post("/decrementlike", decrementLikeController);

router.get("/fetchcomment", getCommentsController);
router.post("/addcomment", addCommentController);
router.get("/fetchparentreply", getParentRepliesController);
router.post("/addreply", addReplyController);
// router.post("/getreplies", getRepliesController);

export default router;
