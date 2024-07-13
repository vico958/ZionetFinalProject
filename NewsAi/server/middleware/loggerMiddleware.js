const newsAiLogger = require("../services/logger/logger");
function loggerMiddleware(req, res, next) {
  newsAiLogger.info(`${req.method} ${req.path}`);
    next();
  }
  
  module.exports = {loggerMiddleware};
  