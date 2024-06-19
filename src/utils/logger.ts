import winston, { log } from 'winston';
import winstonDailyRotate from 'winston-daily-rotate-file';
import * as path from 'path';

const logDir = path.join(process.cwd(), 'logs');
const mode = process.env.NODE_ENV;

/** Custom log colors */
const customColors = {
    error: 'red',
    warn: 'yellow',
    info: 'white',
    http: 'green',
    debug: 'skyblue',
};

winston.addColors(customColors);

/** Levels */
const winstonLogLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

/** Formats */
const winstonLogColorize = winston.format.colorize({ all: true }); // Colorize all log levels
const winstonLogAlign = winston.format.align();

const winstonTimestampFormat = winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
});

const winstonLogFormat = winston.format.printf(({ timestamp, level, message }, ...rest) => {
    return `[${timestamp}] ${level}: ${message} ${rest}`;
});

/** Format */
const winstonFormat = winston.format.combine(
    winstonLogColorize,
    winstonLogAlign,
    winstonTimestampFormat,
    winstonLogFormat,
);

/** transport */
const winstonDefaultTransportOptions = {
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: winstonFormat,
};

const winstonErrorTransport = new winstonDailyRotate({
    level: 'error',
    dirname: path.join(logDir, 'error'),
    filename: 'error-%DATE%.log',
    ...winstonDefaultTransportOptions,
});

const winstonExceptionTransport = new winstonDailyRotate({
    level: 'exception',
    dirname: path.join(logDir, 'exception'),
    filename: 'exception-%DATE%.log',
    ...winstonDefaultTransportOptions,
});

/** Provider */
const logger = winston.createLogger({
    levels: winstonLogLevels,
    level: mode === 'development' ? 'debug' : 'http', //* Default level
    format: winstonFormat,
    transports: mode === 'development' ? [new winston.transports.Console()] : [winstonErrorTransport],
    exceptionHandlers: mode === 'development' ? new winston.transports.Console() : winstonExceptionTransport,
    exitOnError: false,
});

export default logger;
