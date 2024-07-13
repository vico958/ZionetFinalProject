const userLogger = require("../services/logger");

function errorHandler(error, req, res, next) {
  let parsedError;

  try {
    parsedError = JSON.parse(error.message);
  } catch (e) {
    parsedError = {
      error_msg: error.message,
      status: error.statusCode || 500
    };
  }

  userLogger.error({
    error: parsedError,
  }, "Inside middleware error handler");

  if (res.headersSent) {
    userLogger.warn("Headers already sent. Passing the error to the next middleware.");
    return next(error);
  }

  const statusCode = parsedError.status || 500;
  const message = parsedError.error_msg || "Something went wrong from our side.";
  res.status(statusCode).send(message);

  userLogger.info({
    status: statusCode,
    error_msg: message
  }, "Error response sent");
}

module.exports = { errorHandler };
