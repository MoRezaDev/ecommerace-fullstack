const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const { findCategoryBySlug } = require("../../helper/functions");
const ProductModel = require("../product/product.model");
class CategoryServices {
  #categoryModel;
  #productModel;
  constructor() {
    autoBind(this);
    this.#categoryModel = CategoryModel;
    this.#productModel = ProductModel;
  }

  async checkCategoryExists(categoryId) {
    const category = this.#categoryModel.findById(categoryId);
    if (!category) throw new createHttpError.NotFound("no category found");
    return category;
  }

  async getAllCategoriesService() {
    const cateogires = await this.#categoryModel.find({
      parent: { $exists: false },
    });
    return cateogires;
  }

  async getCategoryByIdService(categoryId) {
    const category = await this.#categoryModel.findOne({ _id: categoryId });

    if (!category) throw new createHttpError.NotFound("no category found");
    return category;
  }

  async getCategoryBySlugService(slug) {
    const cateogires = await this.#categoryModel.find({
      parent: { $exists: false },
    });

    const category = findCategoryBySlug(cateogires, slug);
    return category;
  }

  async getProductsByCategorySlugService(params, slug) {
    //checking category
    const pathParams = params[0].toLowerCase().split("/").filter(Boolean);

    let finalSlug = slug;
    let currentCategory = await this.#categoryModel.findOne({
      slug: slug,
      parent: { $exists: false },
    });

    if (!currentCategory)
      throw new createHttpError.NotFound("no category found!");

    if (pathParams) {
      for (const s of pathParams) {
        currentCategory = currentCategory.children.find(
          (child) => child.slug === s
        );
        if (!currentCategory)
          throw new createHttpError.NotFound("subcategory is invalid");
        finalSlug = currentCategory.slug;
      }
    }
    const products = await this.#productModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $addFields: { parentss: "$categories.parents" },
      },
      { $unwind: "$parentss" },
      {
        $lookup: {
          from: "categories",
          localField: "parentss",
          foreignField: "_id",
          as: "parents",
        },
      },
      {
        $match: {
          $or: [
            { "categories.slug": finalSlug },
            { "parents.slug": finalSlug },
          ],
        },
      },
      {
        $project: {
          parents: 0,
          parentss: 0,
        },
      },
    ]);
    return products;
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

  async updateCategoryService(categoryId, categoryDto) {
    const category = await this.checkCategoryExists(categoryId);
    if (!categoryDto.name)
      throw new createHttpError.BadRequest("name field is missing");

    if (categoryDto.name) {
      category.name = categoryDto.name;
      category.slug = categoryDto.name.replace(/ /g, "-").toLowerCase();
    }

    const updatedCategory = await category.save();
    return updatedCategory;
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
