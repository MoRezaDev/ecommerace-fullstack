const verifyToken = require("../../middlewares/auth/verifyToken");
const { getUserSession } = require("./user.controller");

const router = require("express").Router();

router.get("/session", verifyToken, getUserSession);

module.exports = {
  UserRouter: router,
};
