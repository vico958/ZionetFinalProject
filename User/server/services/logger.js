const pino = require('pino');

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: "SYS: dd-mm-yyyy HH:MM:ss",  // Corrected spelling from 'transtaleTime' to 'translateTime'
            ignore: 'pid,hostname',  // Corrected spelling from 'ignoe' to 'ignore'
        }
    }
});

module.exports = logger;
