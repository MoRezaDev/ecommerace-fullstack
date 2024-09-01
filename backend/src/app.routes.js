const { AuthRoutes } = require("./modules/auth/auth.routes");

const router = require("express").Router();

router.use("/auth", AuthRoutes);

module.exports = {
  MainRouter: router,
};
