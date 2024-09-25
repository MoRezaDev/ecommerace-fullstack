const verifyToken = require("../../middlewares/auth/verifyToken");
const {
  addCartItemController,
  updateCartQuantityController,
  removeCartItemController,
  removeAllItemsController,
} = require("./cart.controller");

const router = require("express").Router();

router.post("/add", verifyToken, addCartItemController);
router.put("/update", verifyToken, updateCartQuantityController);
router.delete("/remove", verifyToken, removeCartItemController);
router.delete("/remove-all", verifyToken, removeAllItemsController);

module.exports = {
  CartRoutes: router,
};
