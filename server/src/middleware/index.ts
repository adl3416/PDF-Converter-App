import { Request, Response, NextFunction } from 'express';

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

export const validateFileUpload = (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    next();
};