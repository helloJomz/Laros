import { Router } from "express";
import {
  fetchPostsController,
  savePostController,
  addCommentController,
  getCommentsController,
} from "../controllers/PostController";
import Multer from "multer";

const router = Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.post("/savepost", multer.single("file"), savePostController);
router.get("/fetchpost", fetchPostsController);
router.post("/addpost", addCommentController);
router.get("/getcomments", getCommentsController);

export default router;
