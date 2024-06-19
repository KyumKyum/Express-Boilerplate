import { ErrorRequestHandler } from 'express';
import HttpException from '../exceptions/common/http.exception';
import httpStatus, { HttpStatus } from 'http-status';
import logger from '../utils/logger';
import ValidationException from '../exceptions/common/validation.exception';

const exceptionFilter = (): ErrorRequestHandler => {
    return (err, req, res, next) => {
        let status: number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        let body: any = {};
        //* Catch HttpException
        if (err instanceof HttpException) {
            status = err.statusCode;
            if (status === httpStatus.NOT_FOUND) {
                body.path = req.path;
            }
            body.reason = 'Http Exception';
        }

        if (err instanceof ValidationException) {
            status = httpStatus.BAD_REQUEST;
            body.reason = 'Validation Error';
        }

        if (process.env.NODE_ENV !== 'production') {
            body.errorStack = err.stack;
            console.error(`Error: ${status} - ${body.errorStack}`);
        }

        res.status(status);
        res.json(body);
    };
};

export default exceptionFilter;
