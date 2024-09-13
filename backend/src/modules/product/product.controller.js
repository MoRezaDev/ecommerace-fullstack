const autoBind = require("auto-bind");
const productServices = require("./product.services");

class ProductController {
  #services;

  constructor() {
    autoBind(this);
    this.#services = productServices;
  }

  async getAllProductsController(req, res, next) {
    try {
      const products = await this.#services.getAllProductsService();
      return res.json({ message: "success", products });
    } catch (err) {
      next(err);
    }
  }

  async getProductController(req, res, next) {
    const { productId } = req.body;
    try {
      const product = await this.#services.getProductByIdServic(productId);
      return res.json({ message: "success", product });
    } catch (err) {
      next(err);
    }
  }

  async getProductBySlugController(req, res, next) {
    const { slug } = req.params;

    try {
      const product = await this.#services.getProductBySlugService(
        slug.toLowerCase()
      );
      return res.json({ message: "success", product });
    } catch (err) {
      next(err);
    }
  }

  async uploadProductImageMainController(req, res, next) {
    try {
      const image_main_url = await this.#services.uploadProductImageMainService(
        req.file
      );
      return res.json({ message: "success", image_main_url });
    } catch (err) {
      next(err);
    }
  }

  async uploadProductImagesController(req, res, next) {
    try {
      const images_url = await this.#services.uploadProductImagesService(
        req.files
      );
      return res.json({ message: "success", images_url });
    } catch (err) {
      next(err);
    }
  }

  async createProductController(req, res, next) {
    const {
      name,
      slug,
      title,
      description,
      categoryId,
      specification,
      images,
    } = req.body;
    try {
      const newProduct = await this.#services.createProductService({
        name,
        slug: slug.toLowerCase(),
        title,
        description,
        categoryId,
        specification,
        images,
      });
      return res.json({ message: "success", product: { ...newProduct } });
    } catch (err) {
      next(err);
    }
  }

  async updateProductController(req, res, next) {
    const { _id, name, slug, description, categoryId, specification } =
      req.body;
    try {
      const product = await this.#services.updateProductService({
        _id,
        name,
        slug:slug.toLowerCase(),
        description,
        categoryId,
        specification,
      });
      return res.json({ message: "success", product });
    } catch (err) {
      next(err);
    }
  }

  async addImagesToProductController(req, res, next) {
    const { slug } = req.body;
    try {
      const images = await this.#services.addImagesToProductService(
        req.files,
        slug
      );
      return res.json({ message: "success", images });
    } catch (err) {
      next(err);
    }
  }

  async changeMainImageController(req, res, next) {
    const { filename, slug } = req.body;
    try {
      const image_main_url = await this.#services.changeMainImageService(
        filename,
        slug
      );
      return res.json({ message: "success", image_main_url });
    } catch (err) {
      next(err);
    }
  }

  async deleteProductImagesController(req, res, next) {
    const { productId, slug, filenames, images_url } = req.body;
    try {
      const product = await this.#services.deleteProductImagesService(
        productId,
        filenames,
        images_url,
        slug
      );
      return res.json({ message: "success!", product });
    } catch (err) {
      next(err);
    }
  }

  async deleteProductController(req, res, next) {
    const { productId } = req.body;
    try {
      await this.#services.deleteProductService(productId);
    } catch (err) {
      next(err);
    }
  }

  async deleteMultipleProductsController(req, res, next) {
    const { productIds, filenames, slug } = req.body;
    try {
      await this.#services.deleteMultipleProductsService(
        productIds,
        filenames,
        slug
      );
      return res.json({ message: "success!" });
    } catch (err) {
      next(err);
    }
  }

  async clearProductController(req, res, next) {
    try {
      await this.#services.clearProductService();
      return res.json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();
