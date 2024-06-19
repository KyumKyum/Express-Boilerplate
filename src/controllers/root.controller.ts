import { Response, Router } from 'express';
import httpStatus from 'http-status';

const rootController = Router();

rootController.get('/hc', async (_, res: Response) => {
    res.status(httpStatus.OK).send({ message: 'ALIVE!' });
});

export default rootController;
