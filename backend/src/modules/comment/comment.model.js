const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    status: {
      type: String,
      enum: ["accepted", "denied", "pending"],
      default: "pending",
      required: true,
    },
    rate: { type: Number, enum: [1, 2, 3, 4, 5] },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Types.ObjectId, ref: "Product", index: true },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
