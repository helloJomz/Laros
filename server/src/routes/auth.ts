import { Router } from "express";
import {
  signupController,
  loginController,
  logoutController,
  refreshTokenController,
  isDisplayNameExistsController,
  isEmailExistsController,
} from "../controllers/AuthController";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

router.post("/checkemailexists", isEmailExistsController);
router.post("/checkdisplaynameexists", isDisplayNameExistsController);

router.get("/refreshtoken", refreshTokenController);

export default router;
