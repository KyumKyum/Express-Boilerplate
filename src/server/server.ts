import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from '../config/config';
import logger from '../utils/logger';
import corsGuard from '../middleware/cors.guard';
import cookieParser from 'cookie-parser';
import loggingInterceptor from '../middleware/logging.interceptor';
import exceptionFilter from '../middleware/exception.filter';
import hc, { StatusIndicator } from './healthChecker';
import * as process from 'node:process';
import rootController from '../controllers/root.controller';

const mode = process.env.NODE_ENV;
const welcomeMsg =
    mode === 'development'
        ? '🤖Notification Server: Running on dev mode.🤖'
        : '💫Notification Server: Running on production mode.💫';
logger.info(welcomeMsg);

/** First Page: Server init and build.*/
const server: Express = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

/** Second Phase: Apply middlewares, guards and interceptors, router */
//
if (mode !== 'production') {
    //* Allow CORS on dev mode
    logger.info('🛠️[DEV MODE]: Allow cors for all origin.🛠️');
    server.use(cors());
} else {
    //* Production mode: apply cors global guards
    server.use(corsGuard); //* CORS global Guard
}
//

/** Third Phase: Apply controllers */
server.use('/', rootController);

server.use(loggingInterceptor); //* Logger Middleware
server.use(exceptionFilter); //* Exception Middleware

/** Final Phase: Bootstrap */
const port = Number.parseInt(config.SERV_PORT);

logger.info('⚙️Bootstrapping... Waiting all dependent services being alive...⚙️');

hc.subscribe({
    next: ({ source, status }: StatusIndicator) => {
        logger.info(`${source} - ${status}`);
    },
    complete: () => {
        server.listen(port, () => {
            logger.info(`🚀 Bootstrapped! Server is running at http://localhost:${port} 🚀`);
        });
    },
    error: ({ source, status }: StatusIndicator) => {
        logger.error(`Server Failed to initialized: ${status} - Source: ${source}`);
        process.exit(1);
    },
});
export default server;
