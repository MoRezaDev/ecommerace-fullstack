require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5025;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDb = require("./config/database.config");
const swaggerConfig = require("./config/swagger.config");
const allExceptionHandllers = require("./src/middlewares/handlers/errors.handler");
const { MainRouter } = require("./src/app.routes");

async function main() {
  connectDb();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.use(cookieParser());

  app.use(MainRouter);
  swaggerConfig(app);

  allExceptionHandllers(app);

  mongoose.connection.once("open", () => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
      console.log(`swagger running on http://localhost:${PORT}/swagger`);
    });
  });
}

main();
