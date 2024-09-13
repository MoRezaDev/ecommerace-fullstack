const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerConfig = (app) => {
  const swaggerDoc = swaggerJsDoc({
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "E-commerace Backend Development",
        version: "1.0.0",
      },
    },
    apis: [path.join(__dirname, "../src/modules/**/*.swagger.js")],
  });
  app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, {
      swaggerOptions: { defaultModelsExpandDepth: 0 },
    })
  );
};

module.exports = swaggerConfig;
