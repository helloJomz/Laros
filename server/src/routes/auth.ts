import { Router } from "express";
import {
  signupController,
  loginController,
  refreshTokenController,
} from "../controllers/AuthController";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);

router.get("/refreshtoken", refreshTokenController);

export default router;
