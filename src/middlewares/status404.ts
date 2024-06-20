import { Request, Response, NextFunction } from "express";

export const status404 = () => {
    return (req : Request, res: Response, next: NextFunction) => {
        res.status(404).send('<h1>404 :(</h1>');
    };
}