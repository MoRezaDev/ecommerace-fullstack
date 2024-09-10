const {
  createCategoryController,
  getCategoryByIdController,
  getCategoryBySlugController,
  deleteAllCategoriesController,
  deleteCategoryByIdController,
  getAllCategoriesController,
} = require("./category.controller");

const router = require("express").Router();

router.get("/get-all-categories", getAllCategoriesController);
router.post("/create", createCategoryController);
router.post("/get-category-by-id", getCategoryByIdController),
  router.post("/get-category-by-slug", getCategoryBySlugController),
  router.delete("/delete-by-id", deleteCategoryByIdController);
router.delete("/delete-all", deleteAllCategoriesController);

module.exports = {
  CategoryRoutes: router,
};
