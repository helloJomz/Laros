import { Router } from "express";
import { testController } from "../controllers/AuthController";
import { AuthenticateTokenMiddleware } from "../middleware/JwtAuth";

const router = Router();

router.post("/test", AuthenticateTokenMiddleware, testController);

export default router;
