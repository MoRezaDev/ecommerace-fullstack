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

  async checkExistsProduct(productId) {
    const product = await this.#productModel.findOne({ _id: productId });

    if (!product) throw new createHttpError.NotFound("product not found!");
    return product;
  }

  async checkExistsProductBySlug(slug) {
    const product = await this.#productModel.findOne({ slug: slug });

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

  async updateProductService(product) {
    const { _id, name, slug, description, categoryId, specification } = product;
    console.log(name);
    const productObj = await this.checkExistsProduct(_id);
    if (name) {
      productObj.name = name;
    }
    if (slug) {
      productObj.slug = slug;
    }
    if (description) {
      productObj.description = description;
    }
    if (categoryId) {
      productObj.category = new mongoose.Types.ObjectId(categoryId);
    }
    if (specification) {
      const parsedSpec =
        typeof specification === "string"
          ? JSON.parse(specification)
          : specification;
      productObj.specification = { ...parsedSpec };
    }

    const result = await productObj.save();
    return result.toObject();
  }

  async addImagesToProductService(files, slug) {
    const product = await this.checkExistsProductBySlug(slug);

    if (!files)
      throw new createHttpError.BadRequest(
        "there is problem with upload images, try again!"
      );

    for (const file of files) {
      product.images.images_url.push(
        `http://localhost:5025/product/${slug}/${file.filename}`
      );
    }

    await product.save();
    return product.images;
  }

  async changeMainImageService(filename, slug) {
    const product = await this.checkExistsProductBySlug(slug);
    const imgUrlpath = product.images.image_main_url.substring(
      0,
      product.images.image_main_url.lastIndexOf("/")
    );

    const pathName = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "product",
      slug
    );

    //checking in folder
    try {
      const files = await fsPrmises.readdir(pathName);
      //checking filename exist
      const fileExists = files.some((file) => file === filename);
      if (!fileExists)
        throw new createHttpError.NotFound(
          "file is not exist or invalid filename"
        );

      for (const file of files) {
        let newFileName = file;

        // Step 1: Remove 'main-' prefix if it exists
        if (file.startsWith("main-")) {
          newFileName = file.replace("main-", "");

          // Rename the file on the filesystem
          const oldPath = path.join(pathName, file);
          const newPath = path.join(pathName, newFileName);
          await fsPrmises.rename(oldPath, newPath);
        }

        // Step 2: Add 'main-' to the filename if it matches the provided filename
        if (newFileName === filename) {
          const newMainFile = `main-${newFileName}`;

          // Rename the file on the filesystem
          const oldPath = path.join(pathName, newFileName);
          const newPath = path.join(pathName, newMainFile);
          await fsPrmises.rename(oldPath, newPath);
        }
      }
      product.images.image_main_url = `${imgUrlpath}/${filename}`;
      const productUpdated = await product.save();
      return productUpdated.images.image_main_url;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  async deleteProductImagesService(productId, filenames, images_url, slug) {
    const product = await this.checkExistsProduct(productId);
    if (!Array.isArray(filenames)) {
      throw new createHttpError.BadRequest("bad id array");
    }

    // delete files from server
    const filePath = path.join(__dirname, "..", "..", "public", "product");

    // Ensure all file deletions are awaited
    await Promise.all(
      filenames.map(async (file) => {
        const fullPath = path.join(filePath, slug, file);
        await fsPrmises.unlink(fullPath).catch((err) => {
          console.error(`Error deleting file ${fullPath}:`, err);
        });
      })
    );

    product.images.images_url = product.images.images_url.filter(
      (image) => !images_url.includes(image)
    );
    const result = await product.save();
    return result;
  }

  async deleteProductService(productId) {
    try {
      const product = await this.checkExistsProduct(productId);

      //delete directory
      const productPath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "product",
        product.slug
      );
      await fsPrmises.rm(productPath, { recursive: true, force: true });
      await product.deleteOne();
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  async deleteMultipleProductsService(productIds, filenames, slug) {
    if (
      !Array.isArray(productIds) ||
      !productIds ||
      !Array.isArray(filenames)
    ) {
      throw new createHttpError.BadRequest("bad id array");
    }

    // delete files from server
    const filePath = path.join(__dirname, "..", "..", "public", "product");

    // Ensure all file deletions are awaited
    await Promise.all(
      filenames.map(async (file) => {
        const fullPath = path.join(filePath, slug, file);
        await fsPrmises.unlink(fullPath).catch((err) => {
          console.error(`Error deleting file ${fullPath}:`, err);
        });
      })
    );

    // Delete products from the database
    const result = await this.#productModel.deleteMany({
      _id: { $in: productIds },
    });

    return result; // Consider returning this if needed
  }

  async clearProductService() {
    await this.#productModel.deleteMany();
  }
}

module.exports = new ProductController();
