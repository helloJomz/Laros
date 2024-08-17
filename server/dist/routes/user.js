"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.post("/getuserbydisplayname", UserController_1.getUserByDisplayNameController);
router.get("/getuser", UserController_1.getUserByIdController);
exports.default = router;
