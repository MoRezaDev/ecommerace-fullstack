const autoBind = require("auto-bind");
const ProductModel = require("./product.model");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const path = require("path");
const fsPrmises = require("fs").promises;
const fs = require("fs");

class ProductController {
  #productModel;

  constructor() {
    autoBind(this);
    this.#productModel = ProductModel;
  }

  async checkExistsProduct(productIdOrSlug) {
    const product = await this.#productModel.findOne({
      $or: [{ _id: productIdOrSlug }, { slug: productIdOrSlug }],
    });

    if (!product) throw new createHttpError.NotFound("product not found!");
    return product;
  }

  async getProductByIdServic(productId) {
    const product = await this.checkExistsProduct(productId);
    const productObj = product.toObject();
    return productObj;
  }

  async getProductBySlugService(slug) {
    const product = await this.checkExistsProduct(slug);
    const productObj = product.toObject();
    return productObj;
  }

  async getProductsByCategoryService() {}

  async uploadProductImageMainService(file) {
    if (!file)
      throw new createHttpError.BadRequest(
        "there is problem with upload image, try again!"
      );

    const image_main_url = `http://localhost:5025/product-tmp/${file.filename}`;
    return image_main_url;
  }

  async uploadProductImagesService(files) {
    if (!files)
      throw new createHttpError.BadRequest(
        "there is problem with upload images, try again!"
      );
    const images_url = files.map((image) => {
      return `http://localhost:5025/product-tmp/${image.filename}`;
    });
    return images_url;
  }

  async moveImagesToActualPlace(images, productSlug) {
    const mainImgFileName = images.image_main_url.slice(
      images.image_main_url.lastIndexOf("/") + 1
    );
    let result = {
      image_main_url: "",
      images_url: [],
    };
    let imagesFileName = [];
    for (let img of images.images_url) {
      imagesFileName.push(img.slice(img.lastIndexOf("/") + 1));
    }

    const actualPath = path.join(__dirname, "..", "..", "public");

    //check dir exists
    if (!fs.existsSync(path.join(actualPath, productSlug))) {
      await fsPrmises.mkdir(path.join(actualPath, "product", productSlug));
    }

    try {
      const files = await fsPrmises.readdir(
        path.join(actualPath, "product-tmp")
      );
      for (const file of files) {
        const existedMain = file === mainImgFileName;
        const existedImages = imagesFileName.some((img) => {
          return img === file;
        });

        if (existedMain) {
          result.image_main_url = `http://localhost:5025/product/${productSlug}/${file}`;
        }

        if (existedImages) {
          result.images_url.push(
            `http://localhost:5025/product/${productSlug}/${file}`
          );
        }

        //moving file
        const oldPath = path.join(actualPath, "product-tmp", file);
        const newPath = path.join(actualPath, "product", productSlug, file);
        await fsPrmises.rename(oldPath, newPath);
      }
      return result;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  async createProductService(product) {
    const {
      name,
      slug,
      title,
      description,
      categoryId,
      specification,
      images,
    } = product;

    if (
      !name ||
      !slug ||
      !title ||
      !description ||
      !categoryId ||
      !specification ||
      !images
    )
      throw new createHttpError.BadRequest("please fill all the requirements");

    try {
      const newProduct = await this.#productModel.create({
        name,
        slug,
        title,
        description,
        category: new mongoose.Types.ObjectId(categoryId),
        specification:
          typeof specification === "string"
            ? JSON.parse(specification)
            : specification,
        // images: typeof images === "string" ? JSON.parse(images) : images,
      });

      //store image to actual place
      const parsedImages =
        typeof images === "object" ? { ...images } : JSON.parse(images);
      const imagesObject = await this.moveImagesToActualPlace(
        parsedImages,
        slug
      );

      newProduct.images = { ...imagesObject };
      await newProduct.save();

      return newProduct.toObject();
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  async updateProductService() {}

  async deleteProductService() {}
}

module.exports = new ProductController();
