import { Router } from "express";
import { UploadAvatarController } from "../controllers/UploadController";
import Multer from "multer";

const router = Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.post("/avatar", multer.single("imgfile"), UploadAvatarController);

export default router;
