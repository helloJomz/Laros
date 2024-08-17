"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GiphyController_1 = require("../controllers/GiphyController");
const router = (0, express_1.Router)();
router.get("/random_bg_gif", GiphyController_1.randomBgGifController);
exports.default = router;
