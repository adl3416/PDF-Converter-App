import express from 'express';
import multer from 'multer';
import { convertFile, convertPdfToExcelFile, convertPdfToWordFile, convertPdfToPowerPointFile } from '../controllers/convertController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/word-to-pdf', upload.single('file'), convertFile);
router.post('/pdf-to-excel', upload.single('file'), convertPdfToExcelFile);
router.post('/pdf-to-word', upload.single('file'), convertPdfToWordFile);
router.post('/pdf-to-powerpoint', upload.single('file'), convertPdfToPowerPointFile);

export default router;