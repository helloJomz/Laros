import { Router } from "express";
import {
  checkProfileRelationshipStatusController,
  incrementHeartCountOnProfileController,
  incrementFollowerCountOnProfileController,
  addBioController,
  addGenreController,
  getUserFollowingController,
  unfollowUserController,
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
router.get("/getfollowing", getUserFollowingController);
router.post("/unfollow", unfollowUserController);

export default router;
