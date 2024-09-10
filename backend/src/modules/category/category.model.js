const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  parents: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
