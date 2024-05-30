import { Router } from "express";
import {
  signupController,
  loginController,
  getUserController,
} from "../controllers/AuthController";
import { refreshTokenController } from "../controllers/TokenController";
import {
  AuthenticateTokenMiddleware,
  // AuthenticateTokenExpiry,
} from "../middleware/JwtAuth";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/get_user", AuthenticateTokenMiddleware, getUserController);
router.post("/refresh_token", refreshTokenController);

export default router;
