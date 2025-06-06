"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileUpload = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
exports.uploadFile = upload.single('file');
const handleFileUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // Here you can add additional processing for the uploaded file if needed
    return res.status(200).json({ message: 'File uploaded successfully', file: req.file });
};
exports.handleFileUpload = handleFileUpload;
