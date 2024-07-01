import { Router } from "express";
import {
  getUserByDisplayNameController,
  incrementHeartCountOnProfileController,
  getUserByIdController,
} from "../controllers/UserController";

const router = Router();

router.post("/getuserbydisplayname", getUserByDisplayNameController);
router.post("/getuserbyid", getUserByIdController);
router.post(
  "/incrementanddecrementheartcount",
  incrementHeartCountOnProfileController
);

export default router;
