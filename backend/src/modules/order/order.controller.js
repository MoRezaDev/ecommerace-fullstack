const autoBind = require("auto-bind");
const orderServices = require("./order.services");

class OrderController {
  #services;
  constructor() {
    autoBind(this);
    this.#services = orderServices;
  }

  async getUserOrdersController(req, res, next) {
    const userId = req.userId;
    try {
      const orders = await this.#services.getUserOrdersService(userId);
      return res.json({ message: "success", orders });
    } catch (err) {
      next(err);
    }
  }

  async getUserOrdersByStatusController(req, res, next) {
    const userId = req.userId;
    const status = req.query.status;
    try {
      const orders = await this.#services.getUserOrdersByStatusService(
        userId,
        status
      );
      return res.json({ message: "success", orders });
    } catch (err) {
      next(err);
    }
  }

  async createOrderController(req, res, next) {
    const userId = req.userId;
    const { products, address, location, deliver_date } = req.body;
    try {
      const order = await this.#services.createOrderService(userId, {
        products,
        address,
        location,
        deliver_date,
      });
      return res.json({ message: "success", order });
    } catch (err) {
      next(err);
    }
  }

  async updateOrderController(req, res, next) {
    const { address, deliver_date, location, orderId } = req.body;
    try {
      const order = await this.#services.updateOrderService(orderId, {
        address,
        deliver_date,
        location,
      });
      return res.json({ message: "success", order });
    } catch (err) {
      next(err);
    }
  }

  async createTransactionController(req, res, next) {
    const { orderId, status, tracking_number } = req.body;
    try {
      const transaction = await this.#services.createTransactionService(
        orderId,
        { status, tracking_number }
      );
      return res.json({ message: "success", transaction });
    } catch (err) {
      next(err);
    }
  }

  //Admin Controllers
  async getUserOrdersByIdController(req, res, next) {
    const { userId } = req.body;
    try {
      const orders = await this.#services.getUserOrdersService(userId);
      return res.json({ message: "success", orders });
    } catch (err) {
      next(err);
    }
  }

  async updateOrderStatusController(req, res, next) {
    const { orderId, status } = req.body;
    try {
      const order = await this.#services.updateOrderStatusService(
        orderId,
        status
      );
      return res.json({ message: "success", order });
    } catch (err) {
      next(err);
    }
  }

  async getAllProcessingOrdersController(req, res, next) {
    try {
      const orders = await this.#services.getAllProcessingOrdersService();
      return res.json({ message: "success", orders });
    } catch (err) {
      next(err);
    }
  }

  async getOrderController(req, res, next) {
    const { orderNumber } = req.body;
    try {
      const order = await this.#services.getOrderService(orderNumber);
      return res.json({ message: "success", order });
    } catch (err) {
      next(err);
    }
  }

  async deleteOrderController(req, res, next) {
    const { orderId } = req.body;
    try {
      await this.#services.deleteOrderService(orderId);
      return res.json({ message: "ok" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OrderController();
