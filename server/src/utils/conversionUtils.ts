import * as fs from 'fs';
import * as path from 'path';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { PDFDocument, rgb } from 'pdf-lib';
import * as mammoth from 'mammoth';

export const convertWordToPdf = async (inputPath: string): Promise<string> => {
  try {
    const outputPath = inputPath.replace(/\.(docx?|txt)$/i, '.pdf');
    
    let textContent = '';
    
    if (inputPath.toLowerCase().endsWith('.txt')) {
      // TXT dosyası için
      textContent = fs.readFileSync(inputPath, 'utf-8');
    } else if (inputPath.toLowerCase().endsWith('.docx')) {
      // DOCX dosyası için mammoth kullanarak içerik çıkarma
      try {
        const result = await mammoth.extractRawText({ path: inputPath });
        textContent = result.value;
        
        if (result.messages && result.messages.length > 0) {
          console.log('Mammoth warnings:', result.messages);
        }
        
        // Eğer içerik çıkarılamazsa placeholder kullan
        if (!textContent || textContent.trim().length < 5) {
          textContent = 'Word document converted to PDF\n\nOriginal file: ' + path.basename(inputPath) + '\n\nNote: Document content could not be extracted properly.';
        }
      } catch (error) {
        console.error('Error extracting DOCX content:', error);
        textContent = 'Word document converted to PDF\n\nOriginal file: ' + path.basename(inputPath) + '\n\nError: Could not process the document content.';
      }
    } else {
      // DOC veya diğer formatlar için basit fallback
      textContent = 'Document converted to PDF\n\nOriginal file: ' + path.basename(inputPath) + '\n\nNote: This format requires additional processing.';
    }
      // PDF oluştur
    const pdfDoc = await PDFDocument.create();
    const timesRoman = await pdfDoc.embedFont('Times-Roman');
    
    const pageWidth = 595.28; // A4 width
    const pageHeight = 841.89; // A4 height
    const margin = 72; // 1 inch margins
    const fontSize = 12;
    const lineHeight = fontSize * 1.4;
    const maxWidth = pageWidth - 2 * margin;
    
    // Karakterler için yaklaşık genişlik
    const charWidth = fontSize * 0.5;
    const maxCharsPerLine = Math.floor(maxWidth / charWidth);
    
    // Text'i paragraf ve satırlara böl
    const paragraphs = textContent.split(/\n\s*\n/).filter(p => p.trim());
    const allLines: string[] = [];
    
    for (const paragraph of paragraphs) {
      const words = paragraph.trim().split(/\s+/);
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        if (testLine.length > maxCharsPerLine) {
          if (currentLine) {
            allLines.push(currentLine);
            currentLine = word;
          } else {
            // Çok uzun kelime - böl
            allLines.push(word);
          }
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        allLines.push(currentLine);
      }
      // Paragraf sonuna boş satır ekle
      allLines.push('');
    }
    
    // Sayfa başına düşen satır sayısı
    const linesPerPage = Math.floor((pageHeight - 2 * margin) / lineHeight);
    let currentPageLines = 0;
    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    let yPosition = pageHeight - margin - fontSize;
    
    // Her satırı PDF'e ekle
    for (const line of allLines) {
      if (currentPageLines >= linesPerPage) {
        // Yeni sayfa oluştur
        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin - fontSize;
        currentPageLines = 0;
      }
      
      if (line.trim()) {
        currentPage.drawText(line, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: timesRoman,
          color: rgb(0, 0, 0),
        });
      }
      
      yPosition -= lineHeight;
      currentPageLines++;
    }
    
    // PDF'i kaydet
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    
    return outputPath;
  } catch (error) {
    console.error('Word to PDF conversion error:', error);
    throw new Error('Failed to convert Word document to PDF');
  }
};

export const convertPdfToWord = async (inputPath: string): Promise<string> => {
  try {
    const outputPath = inputPath.replace(/\.pdf$/i, '.docx');
    
    // PDF'den text çıkar (basit implementasyon)
    const pdfBuffer = fs.readFileSync(inputPath);
    
    // Basit DOCX oluştur
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "PDF content converted to Word document",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Original file: ${path.basename(inputPath)}`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Note: This is a basic conversion. For full PDF text extraction, additional libraries are needed.",
              }),
            ],
          }),
        ],
      }],
    });
    
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    
    return outputPath;
  } catch (error) {
    console.error('PDF to Word conversion error:', error);
    throw new Error('Failed to convert PDF to Word document');
  }
};

export const convertExcelToPdf = async (inputPath: string): Promise<string> => {
  try {
    const outputPath = inputPath.replace(/\.(xlsx?|xls)$/i, '.pdf');
    
    // Excel dosyası için basit PDF oluştur
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    
    const { width, height } = page.getSize();
    
    page.drawText('Excel Spreadsheet Converted to PDF', {
      x: 50,
      y: height - 100,
      size: 16,
      color: rgb(0, 0, 0),
    });
    
    page.drawText(`Original file: ${path.basename(inputPath)}`, {
      x: 50,
      y: height - 130,
      size: 12,
      color: rgb(0, 0, 0),
    });
    
    page.drawText('Note: This is a basic conversion placeholder.', {
      x: 50,
      y: height - 160,
      size: 12,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    
    return outputPath;
  } catch (error) {
    console.error('Excel to PDF conversion error:', error);
    throw new Error('Failed to convert Excel file to PDF');
  }
};

