import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import * as pdf2pic from 'pdf2pic';
import pdfParse from 'pdf-parse';
// @ts-ignore
import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';

export const convertWordToPdf = async (inputPath: string): Promise<string> => {
  try {
    const outputPath = inputPath.replace(/\.(docx?|txt)$/i, '.pdf');
    
    let textContent = '';
    
    if (inputPath.toLowerCase().endsWith('.txt')) {
      textContent = fs.readFileSync(inputPath, 'utf-8');
    } else if (inputPath.toLowerCase().endsWith('.docx')) {
      try {
        const result = await mammoth.convertToHtml({ path: inputPath });
        const htmlContent = result.value;
        
        textContent = htmlContent
          .replace(/<\/p>/g, '\n\n')
          .replace(/<br[^>]*>/g, '\n')
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim();
        
        if (!textContent || textContent.trim().length < 5) {
          const rawResult = await mammoth.extractRawText({ path: inputPath });
          textContent = rawResult.value || 'Content could not be extracted from the Word document.';
        }
      } catch (error) {
        console.error('Error extracting DOCX content:', error);
        textContent = 'Error: Could not process the Word document content.';
      }
    } else {
      textContent = 'Document converted from: ' + path.basename(inputPath);
    }

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 50;
    const maxWidth = pageWidth - 2 * margin;
    const lineHeight = 16;
    const fontSize = 12;

    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    let yPosition = pageHeight - margin;

    const lines = textContent.split('\n');
    
    for (const line of lines) {
      if (!line.trim()) {
        yPosition -= lineHeight / 2;
        continue;
      }

      const words = line.split(' ');
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (textWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            if (yPosition < margin + lineHeight) {
              currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
              yPosition = pageHeight - margin;
            }
            
            currentPage.drawText(currentLine, {
              x: margin,
              y: yPosition,
              size: fontSize,
              font: font,
              color: rgb(0, 0, 0),
            });
            yPosition -= lineHeight;
          }
          currentLine = word;
        }
      }

      if (currentLine) {
        if (yPosition < margin + lineHeight) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = pageHeight - margin;
        }
        
        currentPage.drawText(currentLine, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight;
      }
    }

    const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
    
  console.log('Successfully converted to PDF:', outputPath);
  return outputPath;
  } catch (error) {
    console.error('Word to PDF conversion error:', error);
    throw new Error('Failed to convert Word to PDF: ' + (error as Error).message);
  }
};

export const convertPdfToWord = async (inputPath: string): Promise<string> => {
  return inputPath.replace('.pdf', '.docx');
};

export const convertExcelToPdf = async (inputPath: string): Promise<string> => {
  return inputPath.replace(/\.(xlsx?|csv)$/i, '.pdf');
};

export const convertPdfToExcel = async (inputPath: string): Promise<string> => {
  return inputPath.replace('.pdf', '.xlsx');
};

export const convertPdfToPowerPoint = async (inputPath: string): Promise<string> => {
  return inputPath.replace('.pdf', '.pptx');
};

export const convertImageToPdf = async (
  inputPaths: string[], options?: { pageSize?: string; orientation?: string; imageQuality?: number; pageMargin?: number }
): Promise<string> => {
  // PDF oluştur
  const pdfDoc = await PDFDocument.create();
  const pageSize = options?.pageSize || 'A4';
  const orientation = options?.orientation || 'auto';
  const imageQuality = typeof options?.imageQuality === 'number' ? options.imageQuality : 80;
  const pageMargin = typeof options?.pageMargin === 'number' ? options.pageMargin : 20;

  // A4 boyutları (595x842 pt)
  const sizes: Record<string, [number, number]> = {
    'A4': [595.28, 841.89],
    'Letter': [612, 792],
    'Legal': [612, 1008],
  };
  let [defaultWidth, defaultHeight] = sizes[pageSize] || sizes['A4'];

  for (const imgPath of inputPaths) {
    // Resmi buffer olarak oku
    let imgBuffer = fs.readFileSync(imgPath);
    // Kaliteyi uygula (JPEG için)
    if (imgPath.endsWith('.jpg') || imgPath.endsWith('.jpeg')) {
      imgBuffer = Buffer.from(await sharp(imgBuffer).jpeg({ quality: imageQuality }).toBuffer());
    } else if (imgPath.endsWith('.png')) {
      imgBuffer = Buffer.from(await sharp(imgBuffer).png({ quality: imageQuality }).toBuffer());
    } else {
      imgBuffer = Buffer.from(await sharp(imgBuffer).png({ quality: imageQuality }).toBuffer());
    }

    // Resmi PDF'e ekle
    let img;
    let dims;
    if (imgPath.endsWith('.jpg') || imgPath.endsWith('.jpeg')) {
      img = await pdfDoc.embedJpg(imgBuffer);
      dims = img.scale(1);
    } else {
      img = await pdfDoc.embedPng(imgBuffer);
      dims = img.scale(1);
    }

    // Sayfa boyutunu ve yönünü ayarla
    let pageWidth = defaultWidth;
    let pageHeight = defaultHeight;
    if (orientation === 'landscape' || (orientation === 'auto' && dims.width > dims.height)) {
      if (pageWidth < pageHeight) {
        [pageWidth, pageHeight] = [pageHeight, pageWidth];
      }
    }

    // Resmi margin ile ortala
    const maxImgWidth = pageWidth - 2 * pageMargin;
    const maxImgHeight = pageHeight - 2 * pageMargin;
    let drawWidth = dims.width;
    let drawHeight = dims.height;
    // Resmi sayfaya sığdır
    const widthRatio = maxImgWidth / dims.width;
    const heightRatio = maxImgHeight / dims.height;
    const scale = Math.min(widthRatio, heightRatio, 1);
    drawWidth = dims.width * scale;
    drawHeight = dims.height * scale;
    const x = (pageWidth - drawWidth) / 2;
    const y = (pageHeight - drawHeight) / 2;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawImage(img, {
      x,
      y,
      width: drawWidth,
      height: drawHeight,
    });
  }

  // PDF'i kaydet
  const pdfBytes = await pdfDoc.save();
  const outputDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  const outputPath = path.join(outputDir, `converted_images.pdf`);
  fs.writeFileSync(outputPath, pdfBytes);
  return outputPath;
};

export const convertPdfToImage = async (inputPath: string, options?: { outputFormat?: string; qualityScale?: number; pageSelection?: string }): Promise<string> => {
  const JSZip = require('jszip');
  const fs = require('fs');
  const path = require('path');

  try {
    console.log('Starting PDF to Image conversion with options:', options);
    const outputDir = path.dirname(inputPath);
    const baseName = path.basename(inputPath, '.pdf');
    const { outputFormat = 'png', qualityScale = 1.5, pageSelection = '' } = options || {};
    
    console.log('Output directory:', outputDir);
    console.log('Base name:', baseName);
    
    // Create a basic ZIP with conversion info for now
    // This is a fallback implementation until we get proper PDF-to-image working
    const zip = new JSZip();
    
    // Create conversion information
    const conversionInfo = `PDF to Image Conversion Report
==================================

Source File: ${path.basename(inputPath)}
File Size: ${fs.statSync(inputPath).size} bytes
Output Format: ${outputFormat.toUpperCase()}
Quality Scale: ${qualityScale}x
Page Selection: ${pageSelection || 'All pages'}

Status: Conversion system is being updated
Note: This is a temporary response while we implement proper PDF-to-image conversion.

The system has received your file and conversion request successfully.
We are working on implementing full PDF-to-image conversion capabilities.

Thank you for your patience!
`;

    // Add the info file to ZIP
    zip.file('conversion_info.txt', conversionInfo);
    
    // Add a sample placeholder
    zip.file('README.txt', `Your PDF file "${path.basename(inputPath)}" was received successfully.
    
PDF to Image conversion is currently being implemented.
This ZIP file contains information about your conversion request.

Features being implemented:
- High-quality image extraction
- Multiple format support (PNG, JPEG)
- Custom quality scaling
- Page range selection
- Batch processing

Please check back soon for full conversion capabilities!`);

    // Generate ZIP buffer and save
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    const zipPath = path.join(outputDir, `${baseName}_conversion_info.zip`);
    
    console.log('Creating ZIP file at:', zipPath);
    fs.writeFileSync(zipPath, zipBuffer);
    
    // Verify file was created
    if (fs.existsSync(zipPath)) {
      const stats = fs.statSync(zipPath);
      console.log('ZIP file created successfully, size:', stats.size, 'bytes');
      return zipPath;
    } else {
      throw new Error('Failed to create ZIP file');
    }
    
  } catch (error) {
    console.error('PDF to Image conversion error:', error);
    
    // Final fallback
    const outputDir = path.dirname(inputPath);
    const baseName = path.basename(inputPath, '.pdf');
    const zipPath = path.join(outputDir, `${baseName}_error.zip`);
    
    try {
      const JSZip = require('jszip');
      const zip = new JSZip();
      zip.file('error.txt', `Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}
      
Time: ${new Date().toISOString()}
Input file: ${path.basename(inputPath)}
Error type: ${error instanceof Error ? error.constructor.name : 'Unknown'}

Please try again or contact support if the issue persists.`);
      
      const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(zipPath, zipBuffer);
      
      console.log('Error ZIP created at:', zipPath);
      return zipPath;
    } catch (fallbackError) {
      console.error('Fallback ZIP creation failed:', fallbackError);
      throw new Error('Complete conversion failure');
    }
  }
};

// Helper function to parse page selection string
function parsePageSelection(pageSelection: string): number[] {
  const pages: number[] = [];
  const parts = pageSelection.split(',').map(p => p.trim()).filter(Boolean);
  
  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
          if (i > 0) pages.push(i);
        }
      }
    } else {
      const page = parseInt(part, 10);
      if (!isNaN(page) && page > 0) {
        pages.push(page);
      }
    }
  }
  
  return Array.from(new Set(pages)).sort((a, b) => a - b); // Remove duplicates and sort
}

export const splitPdf = async (inputPath: string, pages: string): Promise<string> => {
  // pages expected like: "1,2,4-6" or empty to split every page
  const pdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const totalPages = pdfDoc.getPageCount();

  // parse pages
  let ranges: Array<{ start: number; end: number }> = [];
  if (!pages || !pages.toString().trim()) {
    for (let i = 1; i <= totalPages; i++) ranges.push({ start: i, end: i });
  } else {
    const parts = pages.toString().split(',').map(p => p.trim()).filter(Boolean);
    for (const part of parts) {
      if (part.includes('-')) {
        const [s, e] = part.split('-').map(n => parseInt(n, 10));
        if (!isNaN(s) && !isNaN(e)) ranges.push({ start: Math.max(1, s), end: Math.min(totalPages, e) });
      } else {
        const n = parseInt(part, 10);
        if (!isNaN(n)) ranges.push({ start: Math.max(1, n), end: Math.min(totalPages, n) });
      }
    }
  }

  const zip = new JSZip();
  let fileIndex = 0;
  for (const r of ranges) {
    const newPdf = await PDFDocument.create();
    for (let i = r.start - 1; i <= r.end - 1; i++) {
      if (i < 0 || i >= totalPages) continue;
      const [copied] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copied);
    }
    const newBytes = await newPdf.save();
    const name = r.start === r.end ? `page-${r.start}.pdf` : `pages-${r.start}-${r.end}.pdf`;
    zip.file(name, newBytes);
    fileIndex++;
  }

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
  const zipPath = inputPath.replace(/\.pdf$/i, '_split.zip');
  fs.writeFileSync(zipPath, zipBuffer);
  return zipPath;
};
