const userAccessorLogger = require("../services/logger/logger");
function loggerMiddleware(req, res, next) {
  userAccessorLogger.info(`${req.method} ${req.path}`);
    next();
  }
  
  module.exports = {loggerMiddleware};
  