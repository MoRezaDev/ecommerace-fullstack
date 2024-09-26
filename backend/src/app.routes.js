const { AuthRoutes } = require("./modules/auth/auth.routes");
const { CartRoutes } = require("./modules/cart/cart.routes");
const { CategoryRoutes } = require("./modules/category/category.routes");
const { CommentRoutes } = require("./modules/comment/comment.routes");
const { OrderRoutes } = require("./modules/order/order.routes");
const { ProductRoutes } = require("./modules/product/product.routes");
const { UserRouter } = require("./modules/user/user.routes");

const router = require("express").Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRouter);
router.use("/product", ProductRoutes);
router.use("/category", CategoryRoutes);
router.use("/order", OrderRoutes);
router.use("/cart", CartRoutes);
router.use("/comment", CommentRoutes);

module.exports = {
  MainRouter: router,
};
