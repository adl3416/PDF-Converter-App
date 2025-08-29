import * as fs from 'fs';
import * as path from 'path';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import * as pdf2pic from 'pdf2pic';
import sharp from 'sharp';
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

export const convertImageToPdf = async (inputPaths: string[]): Promise<string> => {
  return inputPaths[0].replace(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, '.pdf');
};

export const convertPdfToImage = async (inputPath: string): Promise<string> => {
  return inputPath.replace('.pdf', '.png');
};

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
