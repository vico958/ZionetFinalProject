const emailLogger = require("../services/logger/logger");
function createError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function handleEmailError(error) {
    let message;
    let statusCode;

    switch (error.code) {
        case 'ECONNREFUSED':
            message = 'Connection refused. Please check the SMTP server details.';
            statusCode = 502;
            break;
        case 'ETIMEDOUT':
            message = 'Connection timed out. Please try again later.';
            statusCode = 504;
            break;
        case 'ECONNRESET':
            message = 'Connection reset by server. Please check your network and SMTP server.';
            statusCode = 502;
            break;
        case 'EAUTH':
            message = 'Authentication failed. Please check your email credentials.';
            statusCode = 401;
            break;
        case 'EENVELOPE':
            message = 'Invalid email addresses in the envelope.';
            statusCode = 400;
            break;
        case 'EMESSAGE':
            message = 'Message content error.';
            statusCode = 400;
            break;
        case 'EDNS':
            message = 'DNS lookup failed. Please check the SMTP server domain.';
            statusCode = 502;
            break;
        case 'ENETUNREACH':
            message = 'Network is unreachable. Please check your network connection.';
            statusCode = 503;
            break;
        default:
            message = 'An unexpected error occurred: ' + error.message;
            statusCode = 500;
            break;
    }
    emailLogger.warn({
        status:statusCode,
        error: message
    }, "Inside handle email error");
    return createError(message, statusCode);
}

module.exports = {
    handleEmailError
}
