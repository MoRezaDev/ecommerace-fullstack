const autoBind = require("auto-bind");
const categoryServices = require("./category.services");

class CategoryController {
  #services;
  constructor() {
    autoBind(this);
    this.#services = categoryServices;
  }

  async getAllCategoriesController(req, res, next) {
    try {
      const categories = await this.#services.getAllCategoriesService();
      return res.json({ categories });
    } catch (err) {
      next(err);
    }
  }

  async getCategoryByIdController(req, res, next) {
    const { categoryId } = req.body;
    try {
      const category = await this.#services.getCategoryByIdService(categoryId);
      return res.json({ category });
    } catch (err) {
      next(err);
    }
  }

  async getCategoryBySlugController(req, res, next) {
    const { slug } = req.body;

    try {
      const category = await this.#services.getCategoryBySlugService(
        slug.toLowerCase()
      );
      return res.json({ category });
    } catch (err) {
      next(err);
    }
  }

  async getProductsByCategorySlugController(req, res, next) {
    const slug = req.params.slug.toLowerCase();
    const params = req.params;
    try {
      const products = await this.#services.getProductsByCategorySlugService(
        params,
        slug
      );
      return res.json({ message: "success", products });
    } catch (err) {
      next(err);
    }
  }

  async createCategoryController(req, res, next) {
    const { name, slug, parent } = req.body;
    try {
      const category = await this.#services.createCategoryService({
        name,
        slug,
        parent,
      });
      return res.json({ message: "success", category });
    } catch (err) {
      next(err);
    }
  }

  async updateCategoryController(req, res, next) {
    const { categoryId, name } = req.body;
    try {
      const updatedCategory = await this.#services.updateCategoryService(
        categoryId,
        { name }
      );
      return res.json({ message: "success", category: updatedCategory });
    } catch (err) {
      next(err);
    }
  }
  async deleteAllCategoriesController(req, res, next) {
    try {
      await this.#services.deleteAllCategoriesService();
      return res.json({ message: "success!" });
    } catch (err) {
      next(err);
    }
  }

  async deleteCategoryByIdController(req, res, next) {
    const { categoryId } = req.body;
    try {
      await this.#services.deleteCategoryByIdService(categoryId);
      return res.json({ message: "deleted success!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CategoryController();
