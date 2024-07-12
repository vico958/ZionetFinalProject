function errorHandler (error, req, res, next) {
  if (res.headersSent) {
    for(let i=0;i<10;i++){
        console.log("check userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    }
  return next(error)
}
for(let i=0;i<10;i++){
    console.log("check user 2222222222222222222222222222222222222222222222");
}
    res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
  }

  module.exports = {errorHandler};
  