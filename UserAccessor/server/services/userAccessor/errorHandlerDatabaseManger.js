const { createError } = require("../general");

function handleDatabaseError(error) {
    let message;
    let statusCode;

    switch (error.name) {
        case 'ValidationError':
            message = 'Validation Error: ' + error.message;
            statusCode = 400;
            break;
        case 'MongoError':
            switch (error.code) {
                case 11000:
                    message = 'Duplicate key error: ' + error.message;
                    statusCode = 409;
                    break;
                default:
                    message = 'MongoDB Error: ' + error.message;
                    statusCode = 500;
            }
            break;
        case 'CastError':
            message = 'Invalid ID format: ' + error.message;
            statusCode = 400;
            break;
        case 'DocumentNotFoundError':
            message = 'Document not found: ' + error.message;
            statusCode = 404;
            break;
        default:
            message = 'Database Error: ' + error.message;
            statusCode = 500;
    }

    console.error(message);
    throw createError(message, statusCode);
}

module.exports = {
    handleDatabaseError
};
