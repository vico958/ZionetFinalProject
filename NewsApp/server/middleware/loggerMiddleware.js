const newsAppLogger = require("../services/logger/logger");
function loggerMiddleware(req, res, next) {
  newsAppLogger.info(`${req.method} ${req.path}`);
    next();
  }
  
  module.exports = {loggerMiddleware};
  