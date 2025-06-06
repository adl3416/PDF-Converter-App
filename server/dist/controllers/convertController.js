"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertExcelToPdfFile = exports.convertPdfToImageFile = exports.convertImageToPdfFile = exports.convertPdfToPowerPointFile = exports.convertPdfToWordFile = exports.convertPdfToExcelFile = exports.convertFile = void 0;
const conversionUtils_1 = require("../utils/conversionUtils");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const convertFile = async (req, res) => {
    let inputPath = '';
    let outputPath = '';
    try {
        console.log('Conversion request received');
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('File received:', req.file);
        // Dosya türü kontrolü
        const allowedExtensions = ['.doc', '.docx', '.txt'];
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            // Geçersiz dosyayı temizle
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                error: 'Invalid file type. Please upload DOC, DOCX, or TXT files only.'
            });
        }
        inputPath = req.file.path;
        // Dosyayı doğru uzantıyla yeniden adlandır
        const correctInputPath = inputPath + fileExtension;
        fs.renameSync(inputPath, correctInputPath);
        inputPath = correctInputPath;
        console.log(`Converting file: ${req.file.originalname} (${fileExtension})`);
        outputPath = await (0, conversionUtils_1.convertWordToPdf)(inputPath);
        // PDF dosyasını indir ve ardından temizle
        const pdfFileName = path.basename(req.file.originalname, fileExtension) + '.pdf';
        res.download(outputPath, pdfFileName, (err) => {
            // İndirme tamamlandıktan sonra dosyaları temizle
            setTimeout(() => {
                try {
                    if (fs.existsSync(inputPath))
                        fs.unlinkSync(inputPath);
                    if (fs.existsSync(outputPath))
                        fs.unlinkSync(outputPath);
                }
                catch (cleanupError) {
                    console.error('Error cleaning up files:', cleanupError);
                }
            }, 1000);
            if (err) {
                console.error('Error downloading file:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error downloading converted file' });
                }
            }
        });
    }
    catch (error) {
        console.error('Conversion error:', error);
        // Hata durumunda dosyaları temizle
        try {
            if (inputPath && fs.existsSync(inputPath))
                fs.unlinkSync(inputPath);
            if (outputPath && fs.existsSync(outputPath))
                fs.unlinkSync(outputPath);
        }
        catch (cleanupError) {
            console.error('Error cleaning up files after error:', cleanupError);
        }
        if (!res.headersSent) {
            res.status(500).json({
                error: error instanceof Error ? error.message : 'File conversion failed'
            });
        }
    }
};
exports.convertFile = convertFile;
const convertPdfToExcelFile = async (req, res) => {
    let inputPath = '';
    let outputPath = '';
    try {
        console.log('PDF to Excel conversion request received');
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('File received:', req.file);
        // Dosya türü kontrolü - sadece PDF dosyalarını kabul et
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (fileExtension !== '.pdf') {
            // Geçersiz dosyayı temizle
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                error: 'Invalid file type. Please upload PDF files only.'
            });
        }
        inputPath = req.file.path;
        // Dosyayı doğru uzantıyla yeniden adlandır
        const correctInputPath = inputPath + fileExtension;
        fs.renameSync(inputPath, correctInputPath);
        inputPath = correctInputPath;
        console.log(`Converting PDF file: ${req.file.originalname}`);
        outputPath = await (0, conversionUtils_1.convertPdfToExcel)(inputPath);
        // Excel dosyasını indir ve ardından temizle
        const excelFileName = path.basename(req.file.originalname, fileExtension) + '.xlsx';
        res.download(outputPath, excelFileName, (err) => {
            // İndirme tamamlandıktan sonra dosyaları temizle
            setTimeout(() => {
                try {
                    if (fs.existsSync(inputPath))
                        fs.unlinkSync(inputPath);
                    if (fs.existsSync(outputPath))
                        fs.unlinkSync(outputPath);
                }
                catch (cleanupError) {
                    console.error('Error cleaning up files:', cleanupError);
                }
            }, 1000);
            if (err) {
                console.error('Error downloading file:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error downloading converted file' });
                }
            }
        });
    }
    catch (error) {
        console.error('PDF to Excel conversion error:', error);
        // Hata durumunda dosyaları temizle
        try {
            if (inputPath && fs.existsSync(inputPath))
                fs.unlinkSync(inputPath);
            if (outputPath && fs.existsSync(outputPath))
                fs.unlinkSync(outputPath);
        }
        catch (cleanupError) {
            console.error('Error cleaning up files after error:', cleanupError);
        }
        if (!res.headersSent) {
            res.status(500).json({
                error: error instanceof Error ? error.message : 'PDF to Excel conversion failed'
            });
        }
    }
};
exports.convertPdfToExcelFile = convertPdfToExcelFile;
const convertPdfToWordFile = async (req, res) => {
    let inputPath = '';
    let outputPath = '';
    try {
        console.log('PDF to Word conversion request received');
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('File received:', req.file);
        // Dosya türü kontrolü - sadece PDF dosyalarını kabul et
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (fileExtension !== '.pdf') {
            // Geçersiz dosyayı temizle
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                error: 'Invalid file type. Please upload PDF files only.'
            });
        }
        inputPath = req.file.path;
        // Dosyayı doğru uzantıyla yeniden adlandır
        const correctInputPath = inputPath + fileExtension;
        fs.renameSync(inputPath, correctInputPath);
        inputPath = correctInputPath;
        console.log(`Converting PDF file: ${req.file.originalname}`);
        outputPath = await (0, conversionUtils_1.convertPdfToWord)(inputPath);
        // Word dosyasını indir ve ardından temizle
        const wordFileName = path.basename(req.file.originalname, fileExtension) + '.docx';
        res.download(outputPath, wordFileName, (err) => {
            // İndirme tamamlandıktan sonra dosyaları temizle
            setTimeout(() => {
                try {
                    if (fs.existsSync(inputPath))
                        fs.unlinkSync(inputPath);
                    if (fs.existsSync(outputPath))
                        fs.unlinkSync(outputPath);
                }
                catch (cleanupError) {
                    console.error('Error cleaning up files:', cleanupError);
                }
            }, 1000);
            if (err) {
                console.error('Error downloading file:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error downloading converted file' });
                }
            }
        });
    }
    catch (error) {
        console.error('PDF to Word conversion error:', error);
        // Hata durumunda dosyaları temizle
        try {
            if (inputPath && fs.existsSync(inputPath))
                fs.unlinkSync(inputPath);
            if (outputPath && fs.existsSync(outputPath))
                fs.unlinkSync(outputPath);
        }
        catch (cleanupError) {
            console.error('Error cleaning up files after error:', cleanupError);
        }
        if (!res.headersSent) {
            res.status(500).json({
                error: error instanceof Error ? error.message : 'PDF to Word conversion failed'
            });
        }
    }
};
exports.convertPdfToWordFile = convertPdfToWordFile;
const convertPdfToPowerPointFile = async (req, res) => {
    let inputPath = '';
    let outputPath = '';
    try {
        console.log('PDF to PowerPoint conversion request received');
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('File received:', req.file);
        // Dosya türü kontrolü - sadece PDF dosyalarını kabul et
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (fileExtension !== '.pdf') {
            // Geçersiz dosyayı temizle
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                error: 'Invalid file type. Please upload PDF files only.'
            });
        }
        inputPath = req.file.path;
        // Dosyayı doğru uzantıyla yeniden adlandır
        const correctInputPath = inputPath + fileExtension;
        fs.renameSync(inputPath, correctInputPath);
        inputPath = correctInputPath;
        console.log(`Converting PDF file: ${req.file.originalname}`);
        outputPath = await (0, conversionUtils_1.convertPdfToPowerPoint)(inputPath);
        // PowerPoint dosyasını indir ve ardından temizle
        const pptxFileName = path.basename(req.file.originalname, fileExtension) + '.pptx';
        res.download(outputPath, pptxFileName, (err) => {
            // İndirme tamamlandıktan sonra dosyaları temizle
            setTimeout(() => {
                try {
                    if (fs.existsSync(inputPath))
                        fs.unlinkSync(inputPath);
                    if (fs.existsSync(outputPath))
                        fs.unlinkSync(outputPath);
                }
                catch (cleanupError) {
                    console.error('Error cleaning up files:', cleanupError);
                }
            }, 1000);
            if (err) {
                console.error('Error downloading file:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error downloading converted file' });
                }
            }
        });
    }
    catch (error) {
        console.error('PDF to PowerPoint conversion error:', error);
        // Hata durumunda dosyaları temizle
        try {
            if (inputPath && fs.existsSync(inputPath))
                fs.unlinkSync(inputPath);
            if (outputPath && fs.existsSync(outputPath))
                fs.unlinkSync(outputPath);
        }
        catch (cleanupError) {
            console.error('Error cleaning up files after error:', cleanupError);
        }
        if (!res.headersSent) {
            res.status(500).json({
                error: error instanceof Error ? error.message : 'PDF to PowerPoint conversion failed'
            });
        }
    }
};
exports.convertPdfToPowerPointFile = convertPdfToPowerPointFile;
const convertImageToPdfFile = async (req, res) => {
    let inputPaths = [];
    let outputPath = '';
    try {
        console.log('Image to PDF conversion request received');
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            console.log('No files uploaded');
            return res.status(400).json({ error: 'No files uploaded' });
        }
        console.log('Files received:', req.files.length);
        // Dosya türü kontrolü - sadece resim dosyalarını kabul et
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.bmp', '.gif'];
        for (const file of req.files) {
            const fileExtension = path.extname(file.originalname).toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                // Geçersiz dosyaları temizle
                req.files.forEach(f => {
                    if (fs.existsSync(f.path))
                        fs.unlinkSync(f.path);
                });
                return res.status(400).json({
                    error: 'Invalid file type. Please upload image files only (JPG, PNG, JPEG, BMP, GIF).'
                });
            }
            // Dosyayı doğru uzantıyla yeniden adlandır
            const correctInputPath = file.path + fileExtension;
            fs.renameSync(file.path, correctInputPath);
            inputPaths.push(correctInputPath);
        }
        console.log(`Converting ${inputPaths.length} image files`);
        outputPath = await (0, conversionUtils_1.convertImageToPdf)(inputPaths);
        // PDF dosyasını indir ve ardından temizle
        const pdfFileName = 'converted_images.pdf';
        res.download(outputPath, pdfFileName, (err) => {
            // İndirme tamamlandıktan sonra dosyaları temizle
            setTimeout(() => {
                try {
                    inputPaths.forEach(inputPath => {
                        if (fs.existsSync(inputPath))
                            fs.unlinkSync(inputPath);
                    });
                    if (fs.existsSync(outputPath))
                        fs.unlinkSync(outputPath);
                }
                catch (cleanupError) {
                    console.error('Error cleaning up files:', cleanupError);
                }
            }, 1000);
            if (err) {
                console.error('Error downloading file:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error downloading converted file' });
                }
            }
        });
    }
    catch (error) {
        console.error('Image to PDF conversion error:', error);
        // Hata durumunda dosyaları temizle
        try {
            inputPaths.forEach(inputPath => {
                if (inputPath && fs.existsSync(inputPath))
                    fs.unlinkSync(inputPath);
            });
            if (outputPath && fs.existsSync(outputPath))
                fs.unlinkSync(outputPath);
        }
        catch (cleanupError) {
            console.error('Error cleaning up files after error:', cleanupError);
        }
        if (!res.headersSent) {
            res.status(500).json({
                error: error instanceof Error ? error.message : 'Image to PDF conversion failed'
            });
        }
    }
};
exports.convertImageToPdfFile = convertImageToPdfFile;
const convertPdfToImageFile = async (req, res) => {
    let inputPath = '';
    let outputPath = '';
    try {
        console.log('PDF to Image conversion request received');
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('File received:', req.file);
        // Dosya türü kontrolü - sadece PDF dosyalarını kabul et
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (fileExtension !== '.pdf') {
            // Geçersiz dosyayı temizle
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                error: 'Invalid file type. Please upload PDF files only.'
            });
        }
        inputPath = req.file.path;
        // Dosyayı doğru uzantıyla yeniden adlandır
        const correctInputPath = inputPath + fileExtension;
        fs.renameSync(inputPath, correctInputPath);
        inputPath = correctInputPath;
        console.log(`Converting PDF file: ${req.file.originalname}`);
        outputPath = await (0, conversionUtils_1.convertPdfToImage)(inputPath);
        // ZIP dosyasını indir ve ardından temizle
        const zipFileName = path.basename(req.file.originalname, fileExtension) + '_images.zip';
        res.download(outputPath, zipFileName, (err) => {
            // İndirme tamamlandıktan sonra dosyaları temizle
            setTimeout(() => {
                try {
                    if (fs.existsSync(inputPath))
                        fs.unlinkSync(inputPath);
                    if (fs.existsSync(outputPath))
                        fs.unlinkSync(outputPath);
                }
                catch (cleanupError) {
                    console.error('Error cleaning up files:', cleanupError);
                }
            }, 1000);
            if (err) {
                console.error('Error downloading file:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error downloading converted file' });
                }
            }
        });
    }
    catch (error) {
        console.error('PDF to Image conversion error:', error);
        // Hata durumunda dosyaları temizle
        try {
            if (inputPath && fs.existsSync(inputPath))
                fs.unlinkSync(inputPath);
            if (outputPath && fs.existsSync(outputPath))
                fs.unlinkSync(outputPath);
        }
        catch (cleanupError) {
            console.error('Error cleaning up files after error:', cleanupError);
        }
        if (!res.headersSent) {
            res.status(500).json({
                error: error instanceof Error ? error.message : 'PDF to Image conversion failed'
            });
        }
    }
};
exports.convertPdfToImageFile = convertPdfToImageFile;
const convertExcelToPdfFile = async (req, res) => {
    let inputPath = '';
    let outputPath = '';
    try {
        console.log('Excel to PDF conversion request received');
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('File received:', req.file);
        // Dosya türü kontrolü - sadece Excel dosyalarını kabul et
        const allowedExtensions = ['.xls', '.xlsx'];
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            // Geçersiz dosyayı temizle
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                error: 'Invalid file type. Please upload Excel files only (XLS, XLSX).'
            });
        }
        inputPath = req.file.path;
        // Dosyayı doğru uzantıyla yeniden adlandır
        const correctInputPath = inputPath + fileExtension;
        fs.renameSync(inputPath, correctInputPath);
        inputPath = correctInputPath;
        console.log(`Converting Excel file: ${req.file.originalname}`);
        // Excel to PDF conversion - using Word to PDF as a placeholder
        // In a real implementation, you'd need a proper Excel to PDF converter
        outputPath = await (0, conversionUtils_1.convertWordToPdf)(inputPath);
        // PDF dosyasını indir ve ardından temizle
        const pdfFileName = path.basename(req.file.originalname, fileExtension) + '.pdf';
        res.download(outputPath, pdfFileName, (err) => {
            // İndirme tamamlandıktan sonra dosyaları temizle
            setTimeout(() => {
                try {
                    if (fs.existsSync(inputPath))
                        fs.unlinkSync(inputPath);
                    if (fs.existsSync(outputPath))
                        fs.unlinkSync(outputPath);
                }
                catch (cleanupError) {
                    console.error('Error cleaning up files:', cleanupError);
                }
            }, 1000);
            if (err) {
                console.error('Error downloading file:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error downloading converted file' });
                }
            }
        });
    }
    catch (error) {
        console.error('Excel to PDF conversion error:', error);
        // Hata durumunda dosyaları temizle
        try {
            if (inputPath && fs.existsSync(inputPath))
                fs.unlinkSync(inputPath);
            if (outputPath && fs.existsSync(outputPath))
                fs.unlinkSync(outputPath);
        }
        catch (cleanupError) {
            console.error('Error cleaning up files after error:', cleanupError);
        }
        if (!res.headersSent) {
            res.status(500).json({
                error: error instanceof Error ? error.message : 'Excel to PDF conversion failed'
            });
        }
    }
};
exports.convertExcelToPdfFile = convertExcelToPdfFile;
