const userLogger = require("../services/logger/logger");
function loggerMiddleware(req, res, next) {
  userLogger.info(`${req.method} ${req.path}`);
    next();
  }
  
  module.exports = {loggerMiddleware};
  