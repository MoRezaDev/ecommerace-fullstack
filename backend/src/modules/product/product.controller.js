const autoBind = require("auto-bind");
const productServices = require("./product.services");

class ProductController {
  #services;

  constructor() {
    autoBind(this);
    this.#services = productServices;
  }

  async getProduct(req, res, next) {
    const { productId } = req.body;
    try {
      const product = await this.#services.getProductServices(productId);
      return res.json({ message: "success", product });
    } catch (err) {
      next(err);
    }
  }

  async getProductBySlug(req, res, next) {
    const { slug } = req.body;

    try {
      const product = await this.#services.getProductServices(slug);
      return res.json({ message: "success", product });
    } catch (err) {
      next(err);
    }
  }

  async getProductsByCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async uploadProductImages(req, res, next) {
    try {
      const images = await this.#services.uploadProductImagesServices(
        req.files
      );
      return res.json({ message: "success", images });
    } catch (err) {
      next(err);
    }
  }

  async createProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async updateProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();
