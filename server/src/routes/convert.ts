import express from 'express';
import multer from 'multer';
import { convertFile } from '../controllers/convertController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/word-to-pdf', upload.single('file'), convertFile);

export default router;