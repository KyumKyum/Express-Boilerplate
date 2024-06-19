import {NextFunction} from "express";
import ajv from "../provider/ajv.provider";
import HttpException from "../exceptions/common/http.exception";
import httpStatus from "http-status";

const validateRequestInterceptor = (schemaName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validate = ajv.getSchema(schemaName);

        if(validate?.(req.body)){
            next(); //* Validated!
        }else if(!validate){
            throw new HttpException(httpStatus.INTERNAL_SERVER_ERROR, `ERROR: Cannot found schema named ${schemaName}`)
        }else{
            throw new HttpException(httpStatus.BAD_REQUEST, `ERROR: Received malformed (possibly corrupted) request body`, validate.errors)
        }
    }
}