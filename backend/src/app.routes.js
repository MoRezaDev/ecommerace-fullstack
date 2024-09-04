const { AuthRoutes } = require("./modules/auth/auth.routes");
const { ProductRoutes } = require("./modules/product/product.routes");
const { UserRouter } = require("./modules/user/user.routes");

const router = require("express").Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRouter);
router.use("/product", ProductRoutes);

module.exports = {
  MainRouter: router,
};
