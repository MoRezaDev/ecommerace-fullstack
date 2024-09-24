const mongoose = require("mongoose");

// Cart Item Schema
const cartItemsSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to Product model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: { type: Number, required: true, default: 0 },
});

// Cart Schema
const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  cart_items: [cartItemsSchema], // Embed the CartItem schema
  total_price: {
    type: Number,
    required: true,
    default: 0,
  },
  items_count: {
    type: Number,
    required: true,
    default: 0,
  },
  total_discount: { type: Number, required: true, default: 0 },
});

// Pre-save hook to calculate total price and items count
cartSchema.pre("save", function (next) {
  this.total_price = this.cart_items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  this.items_count = this.cart_items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);

  next();
});

module.exports = mongoose.model("Cart", cartSchema);
