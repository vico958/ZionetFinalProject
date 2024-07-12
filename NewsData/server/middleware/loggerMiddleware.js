const newsDataLogger = require("../services/logger");
function loggerMiddleware(req, res, next) {
  newsDataLogger.info(`${req.method} ${req.path}`);
    next();
  }
  
  module.exports = {loggerMiddleware};
  