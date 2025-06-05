import { Request, Response } from 'express';
import { convertWordToPdf, convertPdfToExcel, convertPdfToWord, convertPdfToPowerPoint } from '../utils/conversionUtils';
import * as fs from 'fs';
import * as path from 'path';

export const convertFile = async (req: Request, res: Response) => {
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
    
    outputPath = await convertWordToPdf(inputPath);
    
    // PDF dosyasını indir ve ardından temizle
    const pdfFileName = path.basename(req.file.originalname, fileExtension) + '.pdf';
    
    res.download(outputPath, pdfFileName, (err) => {
      // İndirme tamamlandıktan sonra dosyaları temizle
      setTimeout(() => {
        try {
          if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        } catch (cleanupError) {
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
    
  } catch (error) {
    console.error('Conversion error:', error);
    
    // Hata durumunda dosyaları temizle
    try {
      if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (cleanupError) {
      console.error('Error cleaning up files after error:', cleanupError);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'File conversion failed' 
      });
    }
  }
};

export const convertPdfToExcelFile = async (req: Request, res: Response) => {
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
    
    outputPath = await convertPdfToExcel(inputPath);
    
    // Excel dosyasını indir ve ardından temizle
    const excelFileName = path.basename(req.file.originalname, fileExtension) + '.xlsx';
    
    res.download(outputPath, excelFileName, (err) => {
      // İndirme tamamlandıktan sonra dosyaları temizle
      setTimeout(() => {
        try {
          if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        } catch (cleanupError) {
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
    
  } catch (error) {
    console.error('PDF to Excel conversion error:', error);
    
    // Hata durumunda dosyaları temizle
    try {
      if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (cleanupError) {
      console.error('Error cleaning up files after error:', cleanupError);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'PDF to Excel conversion failed' 
      });
    }
  }
};

export const convertPdfToWordFile = async (req: Request, res: Response) => {
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
    
    outputPath = await convertPdfToWord(inputPath);
    
    // Word dosyasını indir ve ardından temizle
    const wordFileName = path.basename(req.file.originalname, fileExtension) + '.docx';
    
    res.download(outputPath, wordFileName, (err) => {
      // İndirme tamamlandıktan sonra dosyaları temizle
      setTimeout(() => {
        try {
          if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        } catch (cleanupError) {
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
    
  } catch (error) {
    console.error('PDF to Word conversion error:', error);
    
    // Hata durumunda dosyaları temizle
    try {
      if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (cleanupError) {
      console.error('Error cleaning up files after error:', cleanupError);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'PDF to Word conversion failed' 
      });
    }
  }
};

export const convertPdfToPowerPointFile = async (req: Request, res: Response) => {
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
    
    outputPath = await convertPdfToPowerPoint(inputPath);
    
    // PowerPoint dosyasını indir ve ardından temizle
    const pptxFileName = path.basename(req.file.originalname, fileExtension) + '.pptx';
    
    res.download(outputPath, pptxFileName, (err) => {
      // İndirme tamamlandıktan sonra dosyaları temizle
      setTimeout(() => {
        try {
          if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        } catch (cleanupError) {
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
    
  } catch (error) {
    console.error('PDF to PowerPoint conversion error:', error);
    
    // Hata durumunda dosyaları temizle
    try {
      if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (cleanupError) {
      console.error('Error cleaning up files after error:', cleanupError);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'PDF to PowerPoint conversion failed' 
      });
    }
  }
};