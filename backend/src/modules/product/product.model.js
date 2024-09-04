const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  specification: { type: mongoose.Schema.Types.Mixed, required: true },
  images: {
    images_url: [{ type: String, required: true }],
    image_main_url: { type: String, required: true },
  },
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment", required: true }],
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
