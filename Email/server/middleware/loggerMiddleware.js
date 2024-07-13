const emailLogger = require("../services/logger/logger");
function loggerMiddleware(req, res, next) {
  emailLogger.info(`${req.method} ${req.path}`);
    next();
  }
  
  module.exports = {loggerMiddleware};
  