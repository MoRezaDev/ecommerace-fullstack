const mongoose = require("mongoose");
const { randomInt } = require("crypto");
const transactionSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
      index: true,
      default: () => randomInt(1000000, 9999999),
    },
    status: { type: String, enum: ["success", "failed"], required: true },
    tracking_number: { type: Number, required: true, index: true, default: 0 },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, lowercase: true, index: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "waiting",
        "paid",
        "in_progress",
        "packing",
        "exit_prodct",
        "officer",
        "delivered",
      ],
      index: true,
      default: "waiting",
    },
    products: [
      { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    ],
    transactions: [{ type: transactionSchema }],
    address: { type: String, required: true },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    deliver_date: { type: Number, required: true },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

orderSchema.pre("findOne", function (next) {
  this.populate({
    path: "user",
    select: "_id mobile role name family address location email img_url",
  });
});

transactionSchema.pre("save", async function (next) {
  const transaction = this;

  // Function to generate a random number
  const generateRandomNumber = () => randomInt(1000000, 9999999);

  let isUnique = false;
  while (!isUnique) {
    const randomNumber = generateRandomNumber();

    // Check if the random number exists in any order's transactions array
    const existedTransaction = await OrderModel.findOne({
      "transactions.number": randomNumber,
    });

    if (!existedTransaction) {
      transaction.number = randomNumber;
      isUnique = true;
    }
  }

  next();
});

module.exports = OrderModel;
