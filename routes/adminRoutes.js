const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const validInfo = require("../utils/UservalidInfo");

// get all web posts
router.get("/getAllWebPosts", adminController.getAllWebPosts);

// get number of users
router.get("/get-users", adminController.getUser);
router.get("/get-aboutus", adminController.getAboutUsContent);
router.get("/get-contactus", adminController.getContactUsContent);
router.get("/users-messages", adminController.getUsersMessages);

router.post("/login", adminController.login);
router.delete("/delete-post/:postId", adminController.deletePost);
router.delete("/delete-user/:userId", adminController.deleteUser);
router.patch("/confirm-post/:postId", adminController.confirmPost);
// update
router.patch("/update-aboutus-content", adminController.updateAboutUsContent);
router.patch(
  "/update-contactus-content",
  adminController.updateContactUsContent
);
router.post("/add-new-admin", adminController.addNewAdmin);

module.exports = router;
