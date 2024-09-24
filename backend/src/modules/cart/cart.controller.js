const autoBind = require("auto-bind");
const cartServices = require("./cart.services");

class CartController {
  #services;
  constructor() {
    autoBind(this);
    this.#services = cartServices;
  }
}

module.exports = new CartController();
