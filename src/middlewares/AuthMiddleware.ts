import {Request, Response, NextFunction} from 'express';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    console.log('ini adalah middleware')
    next()
} 