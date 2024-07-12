const logger = require("../services/logger");
function loggerMiddleware(req, res, next) {
    logger.info(`${req.method} ${req.path}`);
    next();
  }
  
  module.exports = {loggerMiddleware};
  