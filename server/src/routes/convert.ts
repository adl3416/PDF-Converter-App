import express from 'express';
import multer from 'multer';

import { convertFile, convertPdfToExcelFile, convertPdfToWordFile, convertPdfToPowerPointFile, convertImageToPdfFile, convertPdfToImageFile, convertExcelToPdfFile } from '../controllers/convertController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const uploadMultiple = multer({ dest: 'uploads/' });

router.post('/word-to-pdf', upload.single('file'), convertFile);
router.post('/pdf-to-excel', upload.single('file'), convertPdfToExcelFile);
router.post('/pdf-to-word', upload.single('file'), convertPdfToWordFile);
router.post('/pdf-to-powerpoint', upload.single('file'), convertPdfToPowerPointFile);
router.post('/image-to-pdf', uploadMultiple.array('files'), convertImageToPdfFile);
router.post('/pdf-to-image', upload.single('file'), convertPdfToImageFile);
router.post('/excel-to-pdf', upload.single('file'), convertExcelToPdfFile);

export default router;