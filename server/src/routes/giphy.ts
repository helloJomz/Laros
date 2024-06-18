import { Router } from "express";
import { randomBgGifController } from "../controllers/GiphyController";

const router = Router();

router.get("/random_bg_gif", randomBgGifController);

export default router;
