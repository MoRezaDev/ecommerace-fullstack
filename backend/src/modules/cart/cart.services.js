const CartModel = require("./cart.model");
const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const productServices = require("../product/product.services");

class CartServices {
  #cartModel;
  #productServices;
  constructor() {
    autoBind(this);
    this.#cartModel = CartModel;
    this.#productServices = productServices;
  }

  //this function executes just only while user creation
  async createCart(userId) {
    try {
      const cart = await this.#cartModel.create({ user: userId });
      return cart;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  async checkExistsCart(cartId) {
    const cart = await this.#cartModel.findById(cartId);
    if (!cart)
      throw createHttpError.NotFound("invalid cartId or there is no cart");
    return cart;
  }

  async addCartItem(cartId, productId) {
    const cart = await this.checkExistsCart(cartId);
    cart.cart_items.push({ product: productId, quantity: 1 });
    await cart.save();

    await cart.populate("product");
    return cart;
  }

  //includes add or remove quantity
  async updateCartQuantity(cartId, cartItemId, quantity) {
    if (!quantity || quantity === 0)
      throw new createHttpError.BadRequest("invalid quantity");

    const cart = await this.checkExistsCart(cartId);

    // Find the cart item
    const item = cart.cart_items.id(cartItemId); // Mongoose helper to find sub-document by _id

    if (!item)
      throw new createHttpError.Forbidden(
        "Error in finding item in cart items"
      );

    const allowProductQuantity =
      await this.#productServices.allowProductQuantity(item._id, quantity);

    // Update the quantity
    if (allowProductQuantity) {
      item.quantity = quantity;
    }

    // Save the updated cart
    await cart.save();

    await cart.populate("product");
    return cart;
  }

  async removeCartItem(cartId, productId) {
    const cart = await this.checkExistsCart(cartId);

    const filteredCartItems = cart.cart_items.filter(
      (cartItem) => cartItem.product.toString() !== productId
    );
    cart.cart_items = filteredCartItems;
    await cart.save();
    await cart.populate("product");
    return cart;
  }
}

module.exports = new CartServices();
