"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GameController_1 = require("../controllers/GameController");
const router = (0, express_1.Router)();
router.get("/", GameController_1.getGameByGuidController);
exports.default = router;
