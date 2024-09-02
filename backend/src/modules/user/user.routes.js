const verifyRoleAdmin = require("../../middlewares/auth/verifyRoleAdmin");
const verifyToken = require("../../middlewares/auth/verifyToken");
const updateProfilePicMulter = require("../../middlewares/multer/profile-picture.multer");
const {
  getUserSession,
  updateUserProfilePicture,
  deleteUserProfilePicture,
  deleteUser,
} = require("./user.controller");

const router = require("express").Router();

router.get("/session", verifyToken, getUserSession);
router.post(
  "/upload-profile-pic",
  verifyToken,
  updateProfilePicMulter.single("profile-pic"),
  updateUserProfilePicture
);
router.delete("/delete-profile-pic", verifyToken, deleteUserProfilePicture);
router.delete("/delete", verifyToken, verifyRoleAdmin, deleteUser);

module.exports = {
  UserRouter: router,
};
