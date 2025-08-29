import express from 'express';
import multer from 'multer';

import { convertFile, convertPdfToExcelFile, convertPdfToWordFile, convertPdfToPowerPointFile, convertImageToPdfFile, convertPdfToImageFile, convertExcelToPdfFile, convertSplitPdfFile, convertMergePdfFile } from '../controllers/convertController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const uploadMultiple = multer({ dest: 'uploads/' });

router.post('/word-to-pdf', upload.single('file'), convertFile);
router.post('/pdf-to-excel', upload.single('file'), convertPdfToExcelFile);
router.post('/pdf-to-word', upload.single('file'), convertPdfToWordFile);
router.post('/pdf-to-powerpoint', upload.single('file'), convertPdfToPowerPointFile);
router.post('/image-to-pdf', uploadMultiple.array('files'), convertImageToPdfFile);
router.post('/pdf-to-image', upload.single('file'), convertPdfToImageFile);
router.post('/split-pdf', upload.single('file'), convertSplitPdfFile);
router.post('/excel-to-pdf', upload.single('file'), convertExcelToPdfFile);
router.post('/merge-pdf', uploadMultiple.array('files'), convertMergePdfFile);

export default router;