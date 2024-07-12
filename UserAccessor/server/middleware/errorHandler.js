
function errorHandler(error, req, res, next) {
    for (let i = 0; i < 10; i++) {
        console.log("error from user accessor, error handler");
        console.log(error.statusCode);
        console.log(error.message);
    }
    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong from our side.";
    const sendObject = {
        "message": message,
        "statusCode": statusCode
    }
    console.log("error from user accessor, error handler22222222222222222");
    // Ensure the error is sent as a JSON object
    res.status(error.statusCode || 500).send(error.message || "Something went wrong from our side.");
}

module.exports = { errorHandler };
