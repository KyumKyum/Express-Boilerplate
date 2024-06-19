import { HttpStatus } from 'http-status';

class HttpException extends Error {
    public statusCode: number;
    public detail: any;

    constructor(statusCode: number, msg: string, detail?: any) {
        super(msg);
        this.statusCode = statusCode;
        this.name = "HttpException";
        this.detail = detail;
    }
}

export default HttpException;
