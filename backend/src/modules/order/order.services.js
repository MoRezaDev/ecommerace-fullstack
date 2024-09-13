const autoBind = require("auto-bind");
const OrderModel = require("./order.model");
const createHttpError = require("http-errors");
const UserModel = require("../user/user.model");
const { randomInt } = require("crypto");
const { paginatedData } = require("../../helper/functions");

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
    const user = await this.checkOrderExists(userId);
    return user.orders;
  }

  async getUserOrdersByStatusService(userId, status) {
    const orders = await this.#orderModel.find({ _id: userId, status });
    if (!orders || orders.length === 0)
      throw new createHttpError.NotFound("no order with this status found");
    return orders;
  }

  async createOrderService(userId, orderDto) {
    const user = await this.checkUserExits(userId);
    const { products, address, location, deliver_date } = orderDto;
    if (!products || !address || !deliver_date)
      throw new createHttpError.BadRequest("please insert all fields");

    const newOrder = await this.#orderModel.create({
      products,
      address,
      deliver_date,
      number: `dkc-${randomInt(100000, 999999)}`,
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
    const { address, deliver_date, location, status } = orderDto;
    if (address) {
      order.address = address;
    }

    if (deliver_date) {
      order.deliver_date = deliver_date;
    }

    if (location) {
      order.location = location;
    }

    if (status) {
      order.status = status;
    }

    const result = await order.save();
    return result.toObject();
  }

  async createTransactionService(orderId, transactionDto) {
    const { status, tracking_number } = transactionDto;

    // Check if the order exists
    const order = await this.checkOrderExists(orderId);

    if (!status) {
      throw new createHttpError.BadGateway("Error in getting status");
    }

    // Check if the order has already been paid for
    if (order.status !== "waiting") {
      throw new createHttpError.Forbidden("You already paid for this product");
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
    await order.save();

    // Return the last transaction
    const createdTransaction =
      order.transactions[order.transactions.length - 1];

    return createdTransaction;
  }
}

module.exports = new OrderServices();
