const autoBind = require("auto-bind");
const ProductModel = require("./product.model");

class ProductServices {
  #productModel;
  constructor() {
    autoBind(this);
    this.#productModel = ProductModel;
  }
}

module.exports = new ProductServices();
