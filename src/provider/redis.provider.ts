import { Redis } from 'ioredis';
import config from '../env/config';
import { redisHealthChecker } from './hc/redis.hc';
import logger from '../utils/logger';

const isDev = process.env.NODE_ENV === 'development';

const redisClient = new Redis({
    host: config.REDIS_HOST,
    port: Number.parseInt(config.REDIS_PORT),
    lazyConnect: true,
});

export const initRedis = () => {
    redisHealthChecker.bootstrap();

    redisClient
        .connect()
        .then(() => {
            redisHealthChecker.ready();
        })
        .catch((err) => {
            logger.error(String(err));
            redisHealthChecker.dead();
        });
};

export default redisClient;
