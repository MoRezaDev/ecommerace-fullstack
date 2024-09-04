const {
  uploadProductImageMain,
  uploadProductImages,
} = require("../../middlewares/multer/product-images.multer");
const {
  uploadProductImagesController,
  uploadProductImageMainController,
  createProductController,
} = require("./product.controller");

const router = require("express").Router();

router.post(
  "/upload-images",
  uploadProductImages.array("images", 8),
  uploadProductImagesController
);

router.post(
  "/upload-image-main",
  uploadProductImageMain.single("main_image"),
  uploadProductImageMainController
);

router.post("/create", createProductController);

module.exports = {
  ProductRoutes: router,
};
