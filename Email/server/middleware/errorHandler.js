const emailLogger = require("../services/logger/logger");
function errorHandler(error, req, res, next) {
  const {statusCode, message} = error
  emailLogger.error({
    error: message,
  }, "Inside middleware error handler");
  if (res.headersSent) {
    emailLogger.warn("Headers already sent. Passing the error to the next middleware.");
    return next(error);
  }
  res.status(statusCode || 500).send(message || "Something went wrong from our side.");
  emailLogger.info({
    status: statusCode, 
    error_msg: message
  }, "Error response sent");
}

module.exports = { errorHandler };
