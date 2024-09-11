const autoBind = require("auto-bind");
const OrderModel = require("./order.model");
const createHttpError = require("http-errors");
const UserModel = require("../user/user.model");
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

  async getAllUserOrders() {
    const user = await this.checkUserExits();
    const paginatedOrders = paginatedData(user.orders, 1, 8);
    return paginatedOrders;
  }
}

module.exports = new OrderServices();
