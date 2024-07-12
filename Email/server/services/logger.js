const pino = require('pino');
const pinoMultiStream = require("pino-multi-stream");
const prettyTransport = pino.transport({
        target: 'pino-pretty',
        options: {
            translateTime: "SYS: dd-mm-yyyy HH:MM:ss",
            ignore: 'pid,hostname',
    }
});
const fileTransport = pino.transport({
    target: "pino-pretty",
    options: {
        translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        ignore: "pid",
        destination: `${__dirname}/emailService.log`,
        colorize: false
    }
})

const streams = [
    { stream: prettyTransport },
    { stream: fileTransport }
];
const logger = pino({}, pinoMultiStream.multistream(streams));

const emailLogger = logger.child({ service: "email" });

module.exports = emailLogger;
