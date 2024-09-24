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
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    parent: { type: mongoose.Types.ObjectId, ref: "Comment", index: true },
    product: { type: mongoose.Types.ObjectId, ref: "Product", index: true },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;