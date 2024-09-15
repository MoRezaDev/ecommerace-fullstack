const verifyToken = require("../../middlewares/auth/verifyToken");
const {
  getUserOrdersController,
  getUserOrdersByStatusController,
  createOrderController,
  updateOrderController,
  createTransactionController,
  getUserOrdersByIdController,
  updateOrderStatusController,
  getAllProcessingOrdersController,
  getOrderController,
  deleteOrderController,
} = require("./order.controller");

const router = require("express").Router();

router.get("/get-user-orders", verifyToken, getUserOrdersController);
router.get(
  "/get-user-orders-by-status",
  verifyToken,
  getUserOrdersByStatusController
);
router.post("/create-order", verifyToken, createOrderController);
router.put("/update-order", verifyToken, updateOrderController);
router.post("/create-transaction", verifyToken, createTransactionController);

//Admin routes
router.post("/get-user-orders-by-id", getUserOrdersByIdController);
router.put("/update-order-status", updateOrderStatusController);
router.get("/get-all-process-orders", getAllProcessingOrdersController);
router.post("/get-order", getOrderController);
router.delete("/delete-order", deleteOrderController);

module.exports = {
  OrderRoutes: router,
};
