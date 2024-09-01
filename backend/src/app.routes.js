const { AuthRoutes } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");

const router = require("express").Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRouter);

module.exports = {
  MainRouter: router,
};
