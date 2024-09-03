const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  expiresIn: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  role: { type: String, default: "user", required: true },
  name: { type: String },
  family: { type: String },
  address: { type: String },
  location: {
    latitude: { type: Number },
    longitude: { type: Number},
  },
  email: { type: String },
  password: { type: String },
  history: [{ type: mongoose.Types.ObjectId, ref: "History" }],
  img_url: { type: String },
  card: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  otp: otpSchema,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
