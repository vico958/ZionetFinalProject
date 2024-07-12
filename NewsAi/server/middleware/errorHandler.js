function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
}

module.exports = { errorHandler };
