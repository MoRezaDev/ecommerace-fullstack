const autoBind = require("auto-bind");
const cartServices = require("./cart.services");

class CartController {
  #services;
  constructor() {
    autoBind(this);
    this.#services = cartServices;
  }

  async addCartItemController(req, res, next) {
    const { cartId, productId } = req.body;
    try {
      const cart = await this.#services.addCartItem(cartId, productId);
      return res.json({ message: "success!", cart });
    } catch (err) {
      next(err);
    }
  }

  async updateCartQuantityController(req, res, next) {
    const { cartId, cartItemId, quantity } = req.body;
    try {
      const cart = await this.#services.updateCartQuantity(
        cartId,
        cartItemId,
        quantity
      );
      return res.json({ message: "success!", cart });
    } catch (err) {
      next(err);
    }
  }

  async removeCartItemController(req, res, next) {
    const { cartId, cartItemId } = req.body;
    try {
      const cart = await this.#services.removeCartItem(cartId, cartItemId);
      return res.json({ message: "success!", cart });
    } catch (err) {
      next(err);
    }
  }
  async removeAllItemsController(req, res, next) {
    const { cartId } = req.body;
    try {
      const cart = await this.#services.removeAllItems(cartId);
      return res.json({ message: "success!", cart });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CartController();
