function errorHandler (error, req, res, next) {
    for (let i = 0; i < 10; i++) {
        console.log("error from user accessor, error handler");
      }
    if (res.headersSent) {
      return next(error)
    }
    console.log("error from user accessor, error handler22222222222222222");
    res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
  }

  module.exports = {errorHandler};
  