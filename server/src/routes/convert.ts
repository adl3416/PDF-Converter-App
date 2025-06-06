import express from 'express';
import multer from 'multer';
import { 
  convertFile, 
  convertPdfToExcelFile, 
  convertPdfToWordFile, 
  convertPdfToPowerPointFile,
  convertImageToPdfFile,
  convertExcelToPdfFile,
  convertPdfToImageFile
} from '../controllers/convertController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Existing routes
router.post('/word-to-pdf', upload.single('file'), convertFile);
router.post('/pdf-to-excel', upload.single('file'), convertPdfToExcelFile);
router.post('/pdf-to-word', upload.single('file'), convertPdfToWordFile);
router.post('/pdf-to-powerpoint', upload.single('file'), convertPdfToPowerPointFile);

// New routes for missing conversions
router.post('/image-to-pdf', upload.array('files'), convertImageToPdfFile);
router.post('/excel-to-pdf', upload.single('file'), convertExcelToPdfFile);
router.post('/pdf-to-image', upload.single('file'), convertPdfToImageFile);

export default router;