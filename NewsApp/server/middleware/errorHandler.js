function errorHandler(error, req, res, next) {
  const parsedError = JSON.parse(error.message);
  if (res.headersSent) {
    return next(error);
  }

  res.status(parsedError.status || 500).send(parsedError.error_msg || "Something went wrong from our side.");
}

module.exports = { errorHandler };
