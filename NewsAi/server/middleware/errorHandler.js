const newsAiLogger = require("../services/logger");
function errorHandler(error, req, res, next) {
  const {statusCode, message} = error
  newsAiLogger.error({
    error: message,
  }, "Inside middleware error handler");
  if (res.headersSent) {
    newsAiLogger.warn("Headers already sent. Passing the error to the next middleware.");
    return next(error);
  }
  res.status(statusCode || 500).send(message || "Something went wrong from our side.");
  newsAiLogger.info({
    status: statusCode, 
    error_msg: message
  }, "Error response sent");
}

module.exports = { errorHandler };
