const createHttpError = require("http-errors");
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    throw new createHttpError.InternalServerError(err);
  }
};

module.exports = connectDb;
