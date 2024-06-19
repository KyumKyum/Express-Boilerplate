import morgan from 'morgan';
import { Request, Response } from 'express';
import logger from '../utils/logger';

const morganMiddleware = morgan((tokens, req: Request, res: Response) => {
    const status = res.statusCode;
    const logMessage = `[${tokens.method(req, res)}] ${tokens.url(req, res)} | ${tokens.status(req, res)} - ${tokens['response-time'](req, res)} ms`;

    if (status >= 500) {
        //* Internal Server Errors: log as an error.
        logger.error(logMessage);
    } else {
        logger.http(logMessage); //* Logs http message
    }

    return null;
});

export default morganMiddleware;
