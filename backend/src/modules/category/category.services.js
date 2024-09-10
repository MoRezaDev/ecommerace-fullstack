const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const createHttpError = require("http-errors");

class CategoryServices {
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#categoryModel = CategoryModel;
  }

  async checkCategoryExists(categoryId) {
    const category = this.#categoryModel.findById(categoryId);
    if (!category) throw new createHttpError.NotFound("no category found");
    return category;
  }

  async getAllCategoriesService() {
    const cateogires = await this.#categoryModel.find();
    return cateogires;
  }

  async getCategoryByIdService(categoryId) {
    const category = await this.checkCategoryExists(categoryId);
    return category.toObject();
  }

  async getCategoryBySlugService(slug) {
    const category = await this.#categoryModel.findOne({ slug });
    if (!category) throw new createHttpError.NotFound("no category found");
    return category.toObject();
  }

  async createCategoryService(categoryObj) {
    if (!categoryObj.name || !categoryObj.slug)
      throw new createHttpError.BadRequest(
        "please fill the name and slug field"
      );

    let categoryParent;
    let parent;
    let parents = [];
    if (categoryObj.parent) {
      categoryParent = await this.checkCategoryExists(categoryObj.parent);
      parent = categoryParent._id;
      parents = [
        ...new Set(
          [categoryParent._id].concat(
            categoryParent.parents.map((parentId) => parentId)
          )
        ),
      ];
    }
    try {
      const newCategory = await this.#categoryModel.create({
        name: categoryObj.name,
        slug: categoryObj.slug,
        parent,
        parents,
      });
      return newCategory.toObject();
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  async deleteAllCategoriesService() {
    try {
      await this.#categoryModel.deleteMany();
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  async deleteCategoryByIdService(categoryId) {
    const category = await this.checkCategoryExists(categoryId);
    await category.deleteOne();
  }
}

module.exports = new CategoryServices();
