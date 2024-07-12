function createError(message, statusCode){
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function logEnteringFunction (functionName){
    userAccessorLogger.info(`Entering ${functionName} function in userDatabaseManager`);
}
function logExitingFunction (functionName){
    userAccessorLogger.info(`Exiting ${functionName} function in userDatabaseManager`);

}

module.exports = {
    createError,
    logEnteringFunction,
    logExitingFunction
}