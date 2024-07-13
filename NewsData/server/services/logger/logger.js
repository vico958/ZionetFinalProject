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
        destination: `${__dirname}/newsDataService.log`,
        colorize: false
    }
})

const streams = [
    { stream: prettyTransport },
    { stream: fileTransport }
];
const logger = pino({}, pinoMultiStream.multistream(streams));

const newsDataLogger = logger.child({ service: "newsData" });

module.exports = newsDataLogger;

