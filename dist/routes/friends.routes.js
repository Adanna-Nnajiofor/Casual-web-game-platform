"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const friends_controller_1 = require("../controllers/friends.controller");
const router = (0, express_1.Router)();
// Search for users by username (authentication may or may not be required for this)
router.get("/search", auth_middleware_1.authenticate, friends_controller_1.searchUsers);
// Send a friend request (authentication required)
router.post("/send-request", auth_middleware_1.authenticate, friends_controller_1.sendRequest);
// Accept a friend request (authentication required)
router.post("/accept-request", auth_middleware_1.authenticate, friends_controller_1.acceptRequest);
exports.default = router;
