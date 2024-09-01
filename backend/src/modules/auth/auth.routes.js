const authController = require("./auth.controller");

const router = require("express").Router();

router.post("/login", authController.login);
router.post("/send-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);
router.get("/logout", authController.logout);

module.exports = {
  AuthRoutes: router,
};
