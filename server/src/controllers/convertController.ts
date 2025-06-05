import { Request, Response } from 'express';
import { convertWordToPdf } from '../utils/conversionUtils';
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