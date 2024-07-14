const newsDataLogger = require("../services/logger/logger");

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong from our side.";

  newsDataLogger.error({
    error: message,
  }, "Inside middleware error handler");

  if (res.headersSent) {
    newsDataLogger.warn("Headers already sent. Passing the error to the next middleware.");
    return next(error);
  }

  res.status(statusCode).send(message);

  newsDataLogger.info({
    status: statusCode, 
    error_msg: message
  }, "Error response sent");
}

module.exports = { errorHandler };
