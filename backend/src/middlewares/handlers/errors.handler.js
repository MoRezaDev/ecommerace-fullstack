function allExceptionHandllers(app) {
  app.use((error, req, res, next) => {
    if (error) {
      let status = error.status || error.statusCode;
      if (!status || status < 200 || status > 500) status = 500;
      return res
        .status(status)
        .json({ message: error.stack ?? "Internal Server Error!" });
    }
    return next();
  });
}

module.exports = allExceptionHandllers;
