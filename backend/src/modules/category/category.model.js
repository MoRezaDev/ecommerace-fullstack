const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
    parents: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

function autoPop(next) {
  this.populate([{ path: "children" }]);
  next();
}

categorySchema.pre("findOne", autoPop).pre("find", autoPop);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
