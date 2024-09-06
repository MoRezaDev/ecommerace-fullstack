const {
  uploadProductImageMain,
  uploadProductImages,
  addProductImages,
} = require("../../middlewares/multer/product-images.multer");
const {
  uploadProductImagesController,
  uploadProductImageMainController,
  createProductController,
  updateProductController,
  clearProductController,
  addImagesToProductController,
  changeMainImageController,
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

router.post(
  "/upload-images-add",
  addProductImages.array("images"),
  addImagesToProductController
);

router.post("/change-main-image", changeMainImageController);

router.post("/create", createProductController);
router.put("/update-product", updateProductController);
router.delete("/clear", clearProductController);

module.exports = {
  ProductRoutes: router,
};
