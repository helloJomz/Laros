import { Router } from "express";
import { getGameByGuidController } from "../controllers/GameController";

const router = Router();

router.get("/", getGameByGuidController);

export default router;
