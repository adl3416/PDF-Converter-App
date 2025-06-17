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
    
    console.log(Successfully converted to PDF: );
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
