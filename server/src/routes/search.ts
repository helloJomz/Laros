import { Router } from "express";
import {
  deleteAllRecentHistoryController,
  deleteOneRecentHistoryController,
  getAllRecentHistoryController,
  getGameListByQueryController,
  upsertRecentHistoryController,
} from "../controllers/SearchController";

const router = Router();

// GET LIST OF GAMES BASED ON THE QUERY OF THE USER
router.get("/games/:query?", getGameListByQueryController);

// FOR CREATING SEARCH HISTORY
router.post("/recent_history", upsertRecentHistoryController);

// FOR GETTING THE RECENT HISTORY
router.get("/recent_history/:userid", getAllRecentHistoryController);

// FOR DELETING ONE RECENT HISTORY
router.delete("/recent_history/one_target", deleteOneRecentHistoryController);

// FOR DELETING / CLEAR ALL OF THE RECENT HISTORY
router.delete("/recent_history/all_target", deleteAllRecentHistoryController);

export default router;
