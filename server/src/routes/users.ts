import { Router } from "express";
import {
  signupController,
  loginController,
  getUserController,
  logoutController,
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
router.post("/logout", logoutController);

// TODO: SEPERATE THE FILE FOR THIS ONE.
router.post("/refresh_token", refreshTokenController);

export default router;
