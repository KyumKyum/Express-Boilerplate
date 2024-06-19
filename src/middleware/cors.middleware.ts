import cors from 'cors';
import { or } from 'ajv/dist/compile/codegen';

const whitelist = ['*']; //! This should be modified in real uses!!!!!!!

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist[0] === '*' || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            //* CORS!
            callback(new Error('Invalid origin')); //* TODO: Refactor this.
        }
    },
    credentials: false,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
