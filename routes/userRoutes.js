const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validInfo = require("../utils/UservalidInfo");

router.post("/signup", validInfo, userController.signup);
router.post("/login", validInfo, userController.login);

// get user posts on users profile --FA
router.get("/get-user-posts/:userId", userController.getUserPosts);

module.exports = router;
