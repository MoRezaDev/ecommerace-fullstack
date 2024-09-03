const autoBind = require("auto-bind");
const productServices = require("./product.services");

class ProductController {
  #services;

  constructor() {
    autoBind(this);
    this.#services = productServices;
  }
}

module.exports = new ProductController();
