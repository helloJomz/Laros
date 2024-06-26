import { Router } from "express";
import { getUserByDisplayNameController } from "../controllers/UserController";

const router = Router();

router.post("/getuserbydisplayname", getUserByDisplayNameController);

export default router;
