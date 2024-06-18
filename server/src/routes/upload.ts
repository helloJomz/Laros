import { Router } from "express";
import { UploadAvatarController } from "../controllers/UploadController";

const router = Router();

router.post("/avatar", UploadAvatarController);

export default router;
