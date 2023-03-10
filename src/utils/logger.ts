import winston from 'winston';

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const customFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.colorize({all: true}),
    winston.format.label({label: '[LOGGER]'}),
    winston.format.printf(({timestamp, level, message}) => `${timestamp} ${level}: ${message}`),
)
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.splat(), winston.format.colorize(), customFormat),
        })
    ]
});

// logger.add(
//     new winston.transports.Console({
//         format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
//     }),
// );

const stream = {
    write: (message: string) => {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
};

export {logger, stream};
