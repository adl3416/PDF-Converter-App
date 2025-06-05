import { Request, Response } from 'express';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const uploadFile = upload.single('file');

export const handleFileUpload = (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Here you can add additional processing for the uploaded file if needed

    return res.status(200).json({ message: 'File uploaded successfully', file: req.file });
};