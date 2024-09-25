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
  deleteMultipleProductsController,
  deleteProductController,
  getProductController,
  deleteProductImagesController,
  getAllProductsController,
  getProductBySlugController,
  addProductQuantityController,
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

router.delete("/delete-product-images", deleteProductImagesController);

router.post("/change-main-image", changeMainImageController);

router.get("/get-all-products", getAllProductsController);
router.get("/:slug", getProductBySlugController);
router.post("/get-product", getProductController);
router.post("/create", createProductController);
router.put("/update-product", updateProductController);
router.delete("/clear", clearProductController);
router.delete("/delete-products", deleteMultipleProductsController);
router.delete("/delete-product", deleteProductController);

router.post("/add-product-quantity", addProductQuantityController);

module.exports = {
  ProductRoutes: router,
};
