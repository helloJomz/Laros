import { Router } from "express";
import {
  getUserByDisplayNameController,
  getUserByIdController,
} from "../controllers/UserController";

const router = Router();

router.post("/getuserbydisplayname", getUserByDisplayNameController);

router.get("/getuser", getUserByIdController);

export default router;
