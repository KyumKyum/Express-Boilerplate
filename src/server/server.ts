import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from '../config/config';
import logger from '../utils/logger';
import corsMiddleware from '../middleware/cors.middleware';
import cookieParser from 'cookie-parser';
import morganMiddleware from '../middleware/morgan.middleware';
import exceptionMiddleware from "../middleware/exception.middleware";

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

/** Second Phase: Apply middlewares, guards and interceptors */

if (mode !== 'production') {
    //* Allow CORS on dev mode
    logger.info('🛠️[DEV MODE]: Allow cors for all origin.🛠️');
    server.use(cors());
} else {
    //* Production mode: apply cors guard
    server.use(corsMiddleware); //* CORS Guard
}
//
server.use(morganMiddleware); //* Logger Middleware
server.use(exceptionMiddleware) //* Exception Middleware

/** Third Phase: Apply routers */
//TODO

/** Final Phase: Bootstrap */

server.get('/', (req: Request, res: Response) => {
    res.send('Typescript + Node.js + Express Server');
});

const port = Number.parseInt(config.SERV_PORT);

server.listen(port, () => {
    logger.info(`🚀 Bootstrapped! Server is running at http://localhost:${port} 🚀`);
});

export default server;
