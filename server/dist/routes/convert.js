"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const convertController_1 = require("../controllers/convertController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const uploadMultiple = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/word-to-pdf', upload.single('file'), convertController_1.convertFile);
router.post('/pdf-to-excel', upload.single('file'), convertController_1.convertPdfToExcelFile);
router.post('/pdf-to-word', upload.single('file'), convertController_1.convertPdfToWordFile);
router.post('/pdf-to-powerpoint', upload.single('file'), convertController_1.convertPdfToPowerPointFile);
router.post('/image-to-pdf', uploadMultiple.array('files'), convertController_1.convertImageToPdfFile);
router.post('/pdf-to-image', upload.single('file'), convertController_1.convertPdfToImageFile);
router.post('/excel-to-pdf', upload.single('file'), convertController_1.convertExcelToPdfFile);
exports.default = router;
