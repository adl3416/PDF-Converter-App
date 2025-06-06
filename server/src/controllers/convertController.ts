import { Request, Response } from 'express';
import { 
  convertWordToPdf, 
  convertPdfToExcel, 
  convertPdfToWord, 
  convertPdfToPowerPoint,
  convertImageToPdf,
  convertExcelToPdf,
  convertPdfToImage
} from '../utils/conversionUtils';
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

// Image to PDF conversion
export const convertImageToPdfFile = async (req: Request, res: Response) => {
  let inputPaths: string[] = [];
  let outputPath = '';
  
  try {
    console.log('Image to PDF conversion request received');
    
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      console.log('No files uploaded');
      return res.status(400).json({ error: 'No image files uploaded' });
    }
    
    console.log('Files received:', req.files.length);

    // Dosya türü kontrolü - sadece görüntü dosyalarını kabul et
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    const imageFiles = req.files.filter((file: any) => {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      return allowedExtensions.includes(fileExtension);
    });
    
    if (imageFiles.length === 0) {
      // Geçersiz dosyaları temizle
      req.files.forEach((file: any) => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
      return res.status(400).json({ 
        error: 'Invalid file type. Please upload image files only (JPG, PNG, GIF, BMP).' 
      });
    }

    // Dosyaları doğru uzantılarla yeniden adlandır
    inputPaths = imageFiles.map((file: any) => {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const correctInputPath = file.path + fileExtension;
      fs.renameSync(file.path, correctInputPath);
      return correctInputPath;
    });
    
    console.log(`Converting ${inputPaths.length} image files to PDF`);
    
    outputPath = await convertImageToPdf(inputPaths);
    
    // PDF dosyasını indir ve ardından temizle
    const pdfFileName = 'converted-images.pdf';
    
    res.download(outputPath, pdfFileName, (err) => {
      // İndirme tamamlandıktan sonra dosyaları temizle
      setTimeout(() => {
        try {
          inputPaths.forEach(inputPath => {
            if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
          });
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
    console.error('Image to PDF conversion error:', error);
    
    // Hata durumunda dosyaları temizle
    try {
      inputPaths.forEach(inputPath => {
        if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      });
      if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (cleanupError) {
      console.error('Error cleaning up files after error:', cleanupError);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Image to PDF conversion failed' 
      });
    }
  }
};

// Excel to PDF conversion
export const convertExcelToPdfFile = async (req: Request, res: Response) => {
  let inputPath = '';
  let outputPath = '';
  
  try {
    console.log('Excel to PDF conversion request received');
    
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log('File received:', req.file);

    // Dosya türü kontrolü - Excel dosyalarını kabul et
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      // Geçersiz dosyayı temizle
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ 
        error: 'Invalid file type. Please upload Excel files only (XLSX, XLS).' 
      });
    }

    inputPath = req.file.path;
    
    // Dosyayı doğru uzantıyla yeniden adlandır
    const correctInputPath = inputPath + fileExtension;
    fs.renameSync(inputPath, correctInputPath);
    inputPath = correctInputPath;
    
    console.log(`Converting Excel file: ${req.file.originalname}`);
    
    outputPath = await convertExcelToPdf(inputPath);
    
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
    console.error('Excel to PDF conversion error:', error);
    
    // Hata durumunda dosyaları temizle
    try {
      if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (cleanupError) {
      console.error('Error cleaning up files after error:', cleanupError);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Excel to PDF conversion failed' 
      });
    }
  }
};

// PDF to Image conversion
export const convertPdfToImageFile = async (req: Request, res: Response) => {
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
    
    console.log(`Converting PDF to images: ${req.file.originalname}`);
    
    outputPath = await convertPdfToImage(inputPath);
    
    // ZIP dosyasını indir ve ardından temizle
    const zipFileName = path.basename(req.file.originalname, fileExtension) + '-images.zip';
    
    res.download(outputPath, zipFileName, (err) => {
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
    console.error('PDF to Image conversion error:', error);
    
    // Hata durumunda dosyaları temizle
    try {
      if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (cleanupError) {
      console.error('Error cleaning up files after error:', cleanupError);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'PDF to Image conversion failed' 
      });
    }
  }
};