const autoBind = require("auto-bind");
const OrderModel = require("./order.model");
const createHttpError = require("http-errors");
const UserModel = require("../user/user.model");
const { randomInt } = require("crypto");
const { paginatedData } = require("../../helper/functions");
const { default: mongoose } = require("mongoose");

class OrderServices {
  #orderModel;
  #userModel;
  constructor() {
    autoBind(this);
    this.#orderModel = OrderModel;
    this.#userModel = UserModel;
  }

  async checkOrderExists(orderId) {
    const order = await this.#orderModel.findById(orderId);
    if (!order)
      throw new createHttpError.NotFound("order not found or id is invalid");
    return order;
  }

  async checkUserExits(userId) {
    const user = await this.#userModel.findById(userId);
    if (!user)
      throw new createHttpError.NotFound("user not found or id is invalid");
    return user;
  }

  async getUserOrdersService(userId) {
    const user = await this.checkUserExits(userId);
    return (await user.populate("orders")).orders;
  }

  async getUserOrdersByStatusService(userId, status) {
    const orders = await this.#orderModel.find({ user: userId, status });
    if (!orders || orders.length === 0)
      throw new createHttpError.NotFound("no order with this status found");
    return orders;
  }

  async createOrderService(userId, orderDto) {
    const user = await this.checkUserExits(userId);
    const { products, address, location, deliver_date } = orderDto;
    if (!products || !address || !deliver_date)
      throw new createHttpError.BadRequest("please insert all fields");
    console.log(products);
    const newOrder = await this.#orderModel.create({
      products: products.map((product) => new mongoose.Types.ObjectId(product)),
      address,
      deliver_date,
      number: `dkc-${randomInt(100000, 999999)}`,
      user: userId,
    });

    if (location) {
      newOrder.location = location;
      await newOrder.save();
    }
    user.orders.push(newOrder._id);
    await user.save();
    return newOrder;
  }

  async updateOrderService(orderId, orderDto) {
    const order = await this.checkOrderExists(orderId);
    const { address, deliver_date, location } = orderDto;
    if (address) {
      order.address = address;
    }

    if (deliver_date) {
      order.deliver_date = deliver_date;
    }

    if (location) {
      order.location = location;
    }

    const result = await order.save();
    return result.toObject();
  }

  async createTransactionService(orderId, transactionDto) {
    const { status, tracking_number } = transactionDto;

    // Check if the order exists
    const order = await this.checkOrderExists(orderId);
    // Check if the order has already been paid for
    if (order.status !== "waiting") {
      throw new createHttpError.Forbidden("You already paid for this product");
    }

    if (!status) {
      throw new createHttpError.BadGateway("Error in getting status");
    }

    // Build the transaction object
    const transactionObj = {
      status: tracking_number ? "success" : "failed",
      tracking_number: tracking_number || 0,
    };

    if (tracking_number && status === "success") {
      order.status = "paid";
    }

    // Push the new transaction into the order's transactions array
    order.transactions.push(transactionObj);

    // Save the updated order
    order.status = "paid";
    await order.save();

    // Return the last transaction
    const createdTransaction =
      order.transactions[order.transactions.length - 1];

    return createdTransaction;
  }

  //Admin Services
  async updateOrderStatusService(orderId, status) {
    const order = await this.checkOrderExists(orderId);
    if (!status) throw new createHttpError.BadRequest("invalid status");
    order.status = status;
    const result = await order.save();
    return result;
  }

  async getAllProcessingOrdersService() {
    const orders = await this.#orderModel.find({
      status: { $ne: "delivered" },
      status: { $ne: "waiting" },
    });

    return orders;
  }

  async getOrderService(orderNumber) {
    const order = await this.#orderModel
      .findOne({ number: orderNumber })
      .exec();
    if (!order) throw new createHttpError.NotFound("no order found!");
    return order.toObject();
  }

  async deleteOrderService(orderId) {
    const order = await this.checkOrderExists(orderId);
    await order.deleteOne();
  }
}

module.exports = new OrderServices();
