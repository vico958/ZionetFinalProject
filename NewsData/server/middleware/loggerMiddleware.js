const newsDataLogger = require("../services/logger/logger");
function loggerMiddleware(req, res, next) {
  newsDataLogger.info(`${req.method} ${req.path}`);
    next();
  }
  
  module.exports = {loggerMiddleware};
  