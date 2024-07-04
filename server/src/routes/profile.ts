import { Router } from "express";
import {
  checkProfileRelationshipStatusController,
  incrementHeartCountOnProfileController,
  incrementFollowerCountOnProfileController,
  addBioController,
} from "../controllers/ProfileController";

const router = Router();

router.post("/update-heartcount", incrementHeartCountOnProfileController);
router.post("/update-followercount", incrementFollowerCountOnProfileController);
router.post("/addbio", addBioController);
router.get(
  "/:yourUID/:otherUserUID/relationship",
  checkProfileRelationshipStatusController
);

export default router;
