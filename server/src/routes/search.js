"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SearchController_1 = require("../controllers/SearchController");
const router = (0, express_1.Router)();
// GET LIST OF GAMES BASED ON THE QUERY OF THE USER
router.get("/", SearchController_1.searchQueryController);
// FOR CREATING SEARCH HISTORY
router.post("/recent_history", SearchController_1.addRecentHistoryController);
// FOR GETTING THE RECENT HISTORY
router.get("/recent_history", SearchController_1.getAllRecentHistoryController);
// FOR DELETING ONE RECENT HISTORY
router.delete("/recent_history/one_target", SearchController_1.deleteOneRecentHistoryController);
// FOR DELETING / CLEAR ALL OF THE RECENT HISTORY
router.delete("/recent_history/all_target", SearchController_1.deleteAllRecentHistoryController);
exports.default = router;
