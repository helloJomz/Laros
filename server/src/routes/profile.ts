import { Router } from "express";
import {
  checkProfileRelationshipStatusController,
  incrementHeartCountOnProfileController,
  incrementFollowerCountOnProfileController,
  addBioController,
  addGenreController,
} from "../controllers/ProfileController";

const router = Router();

router.post("/update-heartcount", incrementHeartCountOnProfileController);
router.post("/update-followercount", incrementFollowerCountOnProfileController);
router.post("/addbio", addBioController);
router.post("/addgenre", addGenreController);
router.get(
  "/:yourUID/:otherUserUID/relationship",
  checkProfileRelationshipStatusController
);

export default router;
