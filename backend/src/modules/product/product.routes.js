const updateProductImages = require("../../middlewares/multer/product-images.multer");
const { uploadProductImages } = require("./product.controller");

const router = require("express").Router();

router.post(
  "/upload-images",
  updateProductImages.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "images", maxCount: 8 },
  ]),
  uploadProductImages
);

module.exports = {
  ProductRoutes: router,
};
