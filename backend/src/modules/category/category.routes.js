const {
  createCategoryController,
  getCategoryByIdController,
  getCategoryBySlugController,
  deleteAllCategoriesController,
  deleteCategoryByIdController,
  getAllCategoriesController,
  updateCategoryController,
  getProductsByCategorySlugController,
} = require("./category.controller");

const router = require("express").Router();

router.get("/get-all-categories", getAllCategoriesController);
router.get("/:slug*", getProductsByCategorySlugController);
router.post("/create", createCategoryController);
router.post("/get-category-by-id", getCategoryByIdController),
  router.post("/get-category-by-slug", getCategoryBySlugController),
  router.delete("/delete-by-id", deleteCategoryByIdController);
router.delete("/delete-all", deleteAllCategoriesController);
router.put("/update", updateCategoryController);

module.exports = {
  CategoryRoutes: router,
};
