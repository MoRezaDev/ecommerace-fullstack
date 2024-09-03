const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  specification: { type: mongoose.Schema.Types.Mixed },
  images: {
    images_url: [{ type: String }],
    image_main_url: { type: String },
  },
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
