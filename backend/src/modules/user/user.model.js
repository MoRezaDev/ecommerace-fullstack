const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  expiresIn: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", required: true },
  name: { type: String },
  family: { type: String },
  address: { type: String },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  email: { type: String },
  password: { type: String },
  orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
  img_url: { type: String },
  cart: { type: mongoose.Types.ObjectId, ref: "Cart" },
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  otp: otpSchema,
});

userSchema.pre("findOne", function (next) {
  this.populate({
    path: "cart", // Populate the cart first
    populate: {
      path: "cart_items.product", // Then populate the product field inside cart_items
      model: "Product", // Assuming 'Product' is the model name for products
    },
  });
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
