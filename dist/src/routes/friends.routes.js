"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const friends_controller_1 = require("../controllers/friends.controller");
const rateLimiter_1 = require("../utils/rateLimiter");
const router = (0, express_1.Router)();
router.use(rateLimiter_1.rateLimiter);
// Search for users by username (authentication required)
router.get("/search", auth_middleware_1.authenticate, friends_controller_1.searchUsers);
// Send a friend request
router.post("/send-request", auth_middleware_1.authenticate, friends_controller_1.sendRequest);
// Accept a friend request
router.post("/accept-request", auth_middleware_1.authenticate, friends_controller_1.acceptRequest);
// Cancel a friend request
router.post("/cancel-request", auth_middleware_1.authenticate, friends_controller_1.cancelRequest);
// View online friends
router.get("/online-friends", auth_middleware_1.authenticate, friends_controller_1.seeOnlineFriends);
exports.default = router;
