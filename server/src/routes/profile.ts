import { Router } from "express";
import {
  checkProfileRelationshipStatusController,
  addHeartController,
  minusHeartController,
  getAllHeartController,
  addFollowController,
  minusFollowController,
  getAllFollowersController,
  addBioController,
  addGenreController,
  getUserFollowingController,
  unfollowUserController,
} from "../controllers/ProfileController";

const router = Router();

router.post("/addHeart", addHeartController);
router.post("/minusHeart", minusHeartController);
router.get("/heart", getAllHeartController);

router.post("/addFollow", addFollowController);
router.post("/minusFollow", minusFollowController);
router.get("/follow", getAllFollowersController);

router.post("/addbio", addBioController);
router.post("/addgenre", addGenreController);
router.get(
  "/:yourUID/:otherUserUID/relationship",
  checkProfileRelationshipStatusController
);
router.get("/getfollowing", getUserFollowingController);
router.post("/unfollow", unfollowUserController);

export default router;
