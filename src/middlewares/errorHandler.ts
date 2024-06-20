import { Request, Response, NextFunction } from 'express';
import { ResponseModel } from '../utils/Response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json(ResponseModel.error('Internal server error', status, message));
};
