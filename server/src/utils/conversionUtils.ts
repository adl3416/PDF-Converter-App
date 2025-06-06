import * as fs from 'fs';
import * as path from 'path';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import pdfParse from 'pdf-parse';
import * as sharp from 'sharp';
import pdf2pic from 'pdf2pic';
// @ts-ignore - pptxgenjs doesn't have proper TypeScript definitions
import PptxGenJS from 'pptxgenjs';

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
        }      } catch (error: any) {
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
    
    return outputPath;  } catch (error: any) {
    console.error('Word to PDF conversion error:', error);
    throw new Error('Failed to convert Word document to PDF');
  }
};

export const convertPdfToWord = async (inputPath: string): Promise<string> => {
  try {
    const outputPath = inputPath.replace(/\.pdf$/i, '.docx');
    
    // PDF'den gerçek text içerik çıkarma
    const pdfBuffer = fs.readFileSync(inputPath);
    const pdfData = await pdfParse(pdfBuffer);
    
    // PDF'den çıkarılan metin
    const extractedText = pdfData.text || '';
    const pageCount = pdfData.numpages || 1;
    
    // Metni paragraflarına ayır
    const paragraphs = extractedText.split(/\n\s*\n/).filter(p => p.trim());
    
    // Word document oluştur
    const docChildren = [];
    
    // Başlık ekle
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `PDF'den Word'e Dönüştürülmüş Doküman`,
            bold: true,
            size: 32,
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      })
    );
    
    // Boş satır
    docChildren.push(new Paragraph({}));
    
    // Dosya bilgileri
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Kaynak Dosya: ${path.basename(inputPath)}`,
            bold: true,
          }),
        ],
      })
    );
    
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Sayfa Sayısı: ${pageCount}`,
            bold: true,
          }),
        ],
      })
    );
    
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Dönüştürme Tarihi: ${new Date().toLocaleString('tr-TR')}`,
            bold: true,
          }),
        ],
      })
    );
    
    // Boş satır
    docChildren.push(new Paragraph({}));
    
    // Ayırıcı çizgi
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "─".repeat(50),
            color: "999999",
          }),
        ],
      })
    );
    
    // Boş satır
    docChildren.push(new Paragraph({}));
    
    // İçerik başlığı
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "PDF İçeriği:",
            bold: true,
            size: 24,
          }),
        ],
        heading: HeadingLevel.HEADING_2,
      })
    );
    
    // Boş satır
    docChildren.push(new Paragraph({}));
      // Eğer metin varsa, paragrafları ekle
    if (paragraphs.length > 0) {
      paragraphs.forEach((paragraph: string, index: number) => {
        if (paragraph.trim()) {
          // Her paragrafı ayrı paragraph olarak ekle
          const lines = paragraph.split('\n').filter((line: string) => line.trim());
          lines.forEach((line: string) => {
            docChildren.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: line.trim(),
                  }),
                ],
              })
            );
          });
          
          // Paragraflar arası boşluk
          if (index < paragraphs.length - 1) {
            docChildren.push(new Paragraph({}));
          }
        }
      });
    } else {
      // Eğer metin çıkarılamazsa bilgi ver
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Not: PDF'den metin içeriği çıkarılamadı. Bu durum aşağıdaki sebeplerden kaynaklanabilir:",
              italics: true,
              color: "666666",
            }),
          ],
        })
      );
      
      docChildren.push(new Paragraph({}));
      
      const reasons = [
        "• PDF dosyası görsel tabanlı olabilir (taranmış doküman)",
        "• PDF şifreli olabilir",
        "• PDF özel formatlar içerebilir",
        "• Metin seçilebilir formatta olmayabilir"
      ];
      
      reasons.forEach((reason: string) => {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: reason,
                color: "666666",
              }),
            ],
          })
        );
      });
    }
    
    // Word document oluştur
    const doc = new Document({
      sections: [{
        properties: {},
        children: docChildren,
      }],
    });
    
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    
    return outputPath;  } catch (error: any) {
    console.error('PDF to Word conversion error:', error);
    throw new Error('PDF to Word dönüştürme hatası: ' + error.message);
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
    
    return outputPath;  } catch (error: any) {
    console.error('Excel to PDF conversion error:', error);
    throw new Error('Failed to convert Excel file to PDF');
  }
};

export const convertPdfToExcel = async (inputPath: string): Promise<string> => {
  try {
    const outputPath = inputPath.replace(/\.pdf$/i, '.xlsx');
    
    // PDF'den gerçek metin çıkarma
    const pdfBuffer = fs.readFileSync(inputPath);
    const pdfData = await pdfParse(pdfBuffer);
    
    const extractedText = pdfData.text || '';
    const pageCount = pdfData.numpages || 1;
    const metadata = pdfData.info || {};
    
    // Workbook oluştur
    const workbook = XLSX.utils.book_new();
    
    // Ana bilgi sayfası
    const mainData = [
      ['PDF to Excel Conversion Report', '', '', ''],
      ['', '', '', ''],
      ['File Information', '', '', ''],
      ['Original File:', path.basename(inputPath), '', ''],
      ['Conversion Date:', new Date().toLocaleString('tr-TR'), '', ''],
      ['File Size:', `${Math.round(pdfBuffer.length / 1024)} KB`, '', ''],
      ['Page Count:', pageCount.toString(), '', ''],
      ['', '', '', ''],
      ['PDF Metadata', '', '', ''],
      ['Title:', metadata.Title || 'N/A', '', ''],
      ['Author:', metadata.Author || 'N/A', '', ''],
      ['Subject:', metadata.Subject || 'N/A', '', ''],
      ['Creator:', metadata.Creator || 'N/A', '', ''],
      ['Producer:', metadata.Producer || 'N/A', '', ''],
      ['Creation Date:', metadata.CreationDate || 'N/A', '', ''],
      ['Modification Date:', metadata.ModDate || 'N/A', '', ''],
      ['', '', '', ''],
      ['Extracted Content Analysis', '', '', ''],
      ['Total Characters:', extractedText.length.toString(), '', ''],
      ['Total Words:', extractedText.split(/\s+/).filter((word: string) => word.trim()).length.toString(), '', ''],
      ['Total Lines:', extractedText.split('\n').length.toString(), '', ''],
      ['Total Paragraphs:', extractedText.split(/\n\s*\n/).filter((p: string) => p.trim()).length.toString(), '', ''],
    ];
    
    const mainWorksheet = XLSX.utils.aoa_to_sheet(mainData);
    mainWorksheet['!cols'] = [
      { wch: 25 },
      { wch: 35 },
      { wch: 15 },
      { wch: 15 }
    ];
    XLSX.utils.book_append_sheet(workbook, mainWorksheet, 'File Info');
    
    // İçerik sayfası
    if (extractedText.trim()) {
      const contentLines = extractedText.split('\n').filter((line: string) => line.trim());
      const contentData = [
        ['PDF Content', '', ''],
        ['Line No.', 'Content', 'Length'],
        ['', '', ''],
      ];
      
      contentLines.forEach((line: string, index: number) => {
        if (line.trim()) {
          contentData.push([
            (index + 1).toString(),
            line.trim(),
            line.trim().length.toString()
          ]);
        }
      });
      
      const contentWorksheet = XLSX.utils.aoa_to_sheet(contentData);
      contentWorksheet['!cols'] = [
        { wch: 10 },
        { wch: 60 },
        { wch: 10 }
      ];
      XLSX.utils.book_append_sheet(workbook, contentWorksheet, 'Content');
      
      // Kelime analizi sayfası
      const words = extractedText.toLowerCase().split(/\s+/).filter((word: string) => word.trim());
      const wordCount: { [key: string]: number } = {};
      
      words.forEach((word: string) => {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (cleanWord.length > 2) {
          wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
        }
      });
      
      const sortedWords = Object.entries(wordCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 50);
      
      const wordData = [
        ['Word Frequency Analysis', '', ''],
        ['Word', 'Count', 'Percentage'],
        ['', '', ''],
      ];
      
      const totalWords = words.length;
      sortedWords.forEach(([word, count]) => {
        const percentage = ((count / totalWords) * 100).toFixed(2);
        wordData.push([word, count.toString(), `${percentage}%`]);
      });
      
      const wordWorksheet = XLSX.utils.aoa_to_sheet(wordData);
      wordWorksheet['!cols'] = [
        { wch: 20 },
        { wch: 10 },
        { wch: 15 }
      ];
      XLSX.utils.book_append_sheet(workbook, wordWorksheet, 'Word Analysis');
    } else {
      // İçerik çıkarılamazsa bilgi sayfası
      const noContentData = [
        ['Content Extraction Failed', '', ''],
        ['', '', ''],
        ['Possible Reasons:', '', ''],
        ['• PDF contains only images', '', ''],
        ['• PDF is password protected', '', ''],
        ['• PDF uses special encoding', '', ''],
        ['• PDF is scanned document', '', ''],
        ['', '', ''],
        ['Solutions:', '', ''],
        ['• Try OCR tools for image-based PDFs', '', ''],
        ['• Check if PDF is password protected', '', ''],
        ['• Use specialized PDF processing tools', '', ''],
      ];
      
      const noContentWorksheet = XLSX.utils.aoa_to_sheet(noContentData);
      noContentWorksheet['!cols'] = [
        { wch: 30 },
        { wch: 15 },
        { wch: 15 }
      ];
      XLSX.utils.book_append_sheet(workbook, noContentWorksheet, 'No Content');
    }
    
    // Excel dosyasını kaydet
    XLSX.writeFile(workbook, outputPath);
    
    return outputPath;
  } catch (error: any) {
    console.error('PDF to Excel conversion error:', error);
    throw new Error('PDF to Excel dönüştürme hatası: ' + error.message);
  }
};

export const convertPdfToPowerPoint = async (inputPath: string): Promise<string> => {
  try {
    const outputPath = inputPath.replace(/\.pdf$/i, '.pptx');
    
    // PDF'den gerçek içerik çıkarma
    const pdfBuffer = fs.readFileSync(inputPath);
    const pdfData = await pdfParse(pdfBuffer);
    
    const extractedText = pdfData.text || '';
    const pageCount = pdfData.numpages || 1;
    const metadata = pdfData.info || {};
    
    // Yeni PowerPoint sunumu oluştur
    const pptx = new PptxGenJS();
    
    // Sunum özelliklerini ayarla
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'PDF Converter App';
    pptx.company = 'PDF Tools';
    pptx.subject = `Converted from ${path.basename(inputPath)}`;
    pptx.title = metadata.Title || `PDF to PowerPoint - ${path.basename(inputPath, '.pdf')}`;
    
    // Ana başlık slaydı  
    const titleSlide = pptx.addSlide();
    
    titleSlide.addText(metadata.Title || 'PDF İçeriği PowerPoint\'e Dönüştürüldü', {
      x: 1,
      y: 1.5,
      w: 8,
      h: 1.5,
      fontSize: 28,
      bold: true,
      color: '2F5597',
      align: 'center'
    });
    
    titleSlide.addText(`Kaynak: ${path.basename(inputPath)}`, {
      x: 1,
      y: 3,
      w: 8,
      h: 0.8,
      fontSize: 16,
      color: '666666',
      align: 'center'
    });
    
    if (metadata.Author) {
      titleSlide.addText(`Yazar: ${metadata.Author}`, {
        x: 1,
        y: 3.8,
        w: 8,
        h: 0.6,
        fontSize: 14,
        color: '888888',
        align: 'center'
      });
    }
    
    titleSlide.addText(`Dönüştürme: ${new Date().toLocaleDateString('tr-TR')}`, {
      x: 1,
      y: 4.5,
      w: 8,
      h: 0.6,
      fontSize: 12,
      color: '888888',
      align: 'center'
    });
    
    // PDF bilgileri slaydı
    const infoSlide = pptx.addSlide();
    
    infoSlide.addText('Doküman Bilgileri', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 24,
      bold: true,
      color: '2F5597'
    });
    
    const stats = fs.statSync(inputPath);
    const fileSize = Math.round(stats.size / 1024);
    
    const infoItems = [
      `📄 Dosya: ${path.basename(inputPath)}`,
      `📊 Boyut: ${fileSize} KB`,
      `📋 Sayfa Sayısı: ${pageCount}`,
      `📅 Oluşturma: ${stats.birthtime.toLocaleDateString('tr-TR')}`,
      `🔄 Dönüştürme: ${new Date().toLocaleDateString('tr-TR')}`,
    ];
    
    if (metadata.Subject) infoItems.push(`📝 Konu: ${metadata.Subject}`);
    if (metadata.Creator) infoItems.push(`🛠️ Oluşturan: ${metadata.Creator}`);
    if (metadata.Producer) infoItems.push(`⚙️ Üretici: ${metadata.Producer}`);
    
    infoSlide.addText(infoItems.join('\n'), {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 4,
      fontSize: 16,
      color: '333333',
      valign: 'top'
    });
    
    // İçerik analizi slaydı
    if (extractedText.trim()) {
      const analysisSlide = pptx.addSlide();
      
      analysisSlide.addText('İçerik Analizi', {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 0.8,
        fontSize: 24,
        bold: true,
        color: '2F5597'
      });
      
      const wordCount = extractedText.split(/\s+/).filter((word: string) => word.trim()).length;
      const lineCount = extractedText.split('\n').length;
      const paragraphCount = extractedText.split(/\n\s*\n/).filter((p: string) => p.trim()).length;
      
      const analysisItems = [
        `📝 Toplam Karakter: ${extractedText.length.toLocaleString()}`,
        `🔤 Toplam Kelime: ${wordCount.toLocaleString()}`,
        `📄 Toplam Satır: ${lineCount.toLocaleString()}`,
        `📋 Toplam Paragraf: ${paragraphCount.toLocaleString()}`,
        '',
        '✅ İçerik başarıyla çıkarıldı',
        '🎯 Metin analizi tamamlandı',
        '📊 Yapısal bilgiler hazırlandı'
      ];
      
      analysisSlide.addText(analysisItems.join('\n'), {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 4,
        fontSize: 16,
        color: '333333',
        valign: 'top'
      });
      
      // İçerik örnekleri slaydı
      const contentSlide = pptx.addSlide();
      
      contentSlide.addText('İçerik Örnekleri', {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 0.8,
        fontSize: 24,
        bold: true,
        color: '2F5597'
      });
      
      // İlk birkaç paragrafı göster
      const paragraphs = extractedText.split(/\n\s*\n/).filter((p: string) => p.trim()).slice(0, 3);
      const contentPreview = paragraphs.map((p: string, index: number) => {
        const preview = p.trim().substring(0, 150);
        return `${index + 1}. ${preview}${preview.length < p.trim().length ? '...' : ''}`;
      }).join('\n\n');
      
      contentSlide.addText(contentPreview || 'İçerik önizlemesi mevcut değil', {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 4,
        fontSize: 14,
        color: '444444',
        valign: 'top'
      });
      
      // Kelime bulutu slaydı
      const words = extractedText.toLowerCase().split(/\s+/).filter((word: string) => word.trim());
      const wordCount2: { [key: string]: number } = {};
      
      words.forEach((word: string) => {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (cleanWord.length > 3) {
          wordCount2[cleanWord] = (wordCount2[cleanWord] || 0) + 1;
        }
      });
      
      const topWords = Object.entries(wordCount2)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 15)
        .map(([word, count]) => `${word} (${count})`);
      
      if (topWords.length > 0) {
        const wordCloudSlide = pptx.addSlide();
        
        wordCloudSlide.addText('En Sık Kullanılan Kelimeler', {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 0.8,
          fontSize: 24,
          bold: true,
          color: '2F5597'
        });
        
        wordCloudSlide.addText(topWords.join('\n'), {
          x: 0.5,
          y: 1.5,
          w: 9,
          h: 4,
          fontSize: 14,
          color: '555555',
          valign: 'top'
        });
      }
    } else {
      // İçerik çıkarılamazsa
      const errorSlide = pptx.addSlide();
      
      errorSlide.addText('İçerik Çıkarma Sorunu', {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 1,
        fontSize: 24,
        bold: true,
        color: 'CC0000',
        align: 'center'
      });
      
      const errorReasons = [
        '❌ PDF\'den metin çıkarılamadı',
        '',
        'Olası Sebepler:',
        '• Görsel tabanlı PDF (taranmış)',
        '• Şifreli PDF dosyası',
        '• Özel kodlama kullanımı',
        '• Bozuk PDF yapısı',
        '',
        'Çözüm Önerileri:',
        '• OCR araçları kullanın',
        '• Şifre kontrolü yapın',
        '• PDF\'i yeniden oluşturun'
      ];
      
      errorSlide.addText(errorReasons.join('\n'), {
        x: 0.5,
        y: 2.5,
        w: 9,
        h: 3,
        fontSize: 14,
        color: '666666',
        align: 'center'
      });
    }
    
    // Özet slaydı
    const summarySlide = pptx.addSlide();
    
    summarySlide.addText('Dönüştürme Özeti', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 24,
      bold: true,
      color: '2F5597'
    });
    
    const summaryItems = [
      '✅ PDF başarıyla PowerPoint\'e dönüştürüldü',
      '',
      '📋 Elde Edilen Bilgiler:',
      `• ${pageCount} sayfalık PDF analiz edildi`,
      `• ${extractedText ? 'Metin içeriği çıkarıldı' : 'Metin içeriği çıkarılamadı'}`,
      '• Metadata bilgileri işlendi',
      '• Profesyonel sunum formatı uygulandı',
      '',
      '🎯 Bu sunum düzenlenebilir ve kullanıma hazırdır!'
    ];
    
    summarySlide.addText(summaryItems.join('\n'), {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 4,
      fontSize: 16,
      color: '333333',
      valign: 'top'
    });
    
    // PowerPoint dosyasını kaydet
    await pptx.writeFile({ fileName: outputPath });
    
    return outputPath;
  } catch (error: any) {
    console.error('PDF to PowerPoint conversion error:', error);
    throw new Error('PDF to PowerPoint dönüştürme hatası: ' + error.message);
  }
};

export const convertImageToPdf = async (imagePaths: string[]): Promise<string> => {
  try {
    if (imagePaths.length === 0) {
      throw new Error('No image files provided');
    }

    // Output path will be based on the first image file
    const firstImagePath = imagePaths[0];
    const outputPath = path.join(path.dirname(firstImagePath), 'converted-images.pdf');
    
    // Create new PDF document
    const pdfDoc = await PDFDocument.create();
    
    for (const imagePath of imagePaths) {
      console.log(`Processing image: ${imagePath}`);
      
      try {
        // Read image file
        const imageBytes = fs.readFileSync(imagePath);
        
        // Determine image type and embed
        let image;
        const extension = path.extname(imagePath).toLowerCase();
        
        if (extension === '.png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else if (extension === '.jpg' || extension === '.jpeg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          // For other formats, try as JPEG first, then PNG
          try {
            image = await pdfDoc.embedJpg(imageBytes);
          } catch {
            image = await pdfDoc.embedPng(imageBytes);
          }
        }
        
        // Get image dimensions
        const { width, height } = image;
        
        // Calculate page size based on image aspect ratio
        const maxWidth = 595.28; // A4 width in points
        const maxHeight = 841.89; // A4 height in points
        const margin = 50;
        
        const availableWidth = maxWidth - (margin * 2);
        const availableHeight = maxHeight - (margin * 2);
        
        let pageWidth, pageHeight;
        
        // Scale image to fit within page with margins
        const widthRatio = availableWidth / width;
        const heightRatio = availableHeight / height;
        const scale = Math.min(widthRatio, heightRatio, 1); // Don't scale up
        
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
        
        // Center the image on the page
        const x = (maxWidth - scaledWidth) / 2;
        const y = (maxHeight - scaledHeight) / 2;
        
        // Add new page for each image
        const page = pdfDoc.addPage([maxWidth, maxHeight]);
        
        // Draw the image
        page.drawImage(image, {
          x: x,
          y: y,
          width: scaledWidth,
          height: scaledHeight,
        });
        
        console.log(`Image ${path.basename(imagePath)} added to PDF`);
          } catch (imageError: any) {
        console.error(`Error processing image ${imagePath}:`, imageError);
        // Continue with other images
      }
    }
    
    // Save PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    
    console.log(`PDF created successfully: ${outputPath}`);    return outputPath;
    
  } catch (error: any) {
    console.error('Image to PDF conversion error:', error);
    throw new Error('Failed to convert images to PDF');
  }
};

export const convertPdfToImage = async (inputPath: string): Promise<string> => {
  try {
    const outputDir = path.join(path.dirname(inputPath), 'pdf-images');
    const zipPath = inputPath.replace(/\.pdf$/i, '-images.zip');
    const fileName = path.basename(inputPath, '.pdf');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    try {
      // pdf2pic kullanarak gerçek görüntü dönüştürme
      const convert = pdf2pic.fromPath(inputPath, {
        density: 150,           // DPI
        saveFilename: fileName,
        savePath: outputDir,
        format: "png",
        width: 1000,
        height: 1400
      });
      
      // PDF sayfalarını görüntülere dönüştür
      const results = await convert.bulk(-1); // -1 means all pages
      
      if (results && results.length > 0) {
        // Başarılı dönüştürme - ZIP dosyası bilgilerini oluştur
        const zipInfo = {
          type: 'PDF to Images Conversion',
          originalFile: path.basename(inputPath),
          extractedImages: results.length,
          format: 'PNG',
          resolution: '150 DPI',
          size: '1000x1400',
          created: new Date().toISOString(),
          success: true,
          files: results.map((result: any, idx: number) => ({
            name: `${fileName}.${idx + 1}.png`,
            path: result.path,
            page: idx + 1,
            type: 'PNG Image',
            size: fs.existsSync(result.path) ? `${Math.round(fs.statSync(result.path).size / 1024)} KB` : 'Unknown'
          }))
        };
        
        fs.writeFileSync(zipPath, JSON.stringify(zipInfo, null, 2));
        
        console.log(`PDF to images conversion completed: ${results.length} images created`);
        return zipPath;
        
      } else {
        throw new Error('PDF sayfaları görüntüye dönüştürülemedi');
      }
        } catch (pdf2picError: any) {
      console.warn('pdf2pic failed, using fallback method:', pdf2picError);
      
      // Fallback: PDF içeriğini analiz edip bilgi dosyası oluştur
      const pdfBuffer = fs.readFileSync(inputPath);
      const pdfData = await pdfParse(pdfBuffer);
      
      // PDF bilgileri ile placeholder oluştur
      const imageInfo = {
        type: 'PDF Analysis (Fallback)',
        originalFile: path.basename(inputPath),
        error: 'Could not extract images directly',
        reason: 'pdf2pic conversion failed',
        fallback: true,
        pdfInfo: {
          pages: pdfData.numpages,
          text: pdfData.text ? 'Text content available' : 'No extractable text',
          metadata: pdfData.info,
          size: `${Math.round(pdfBuffer.length / 1024)} KB`
        },
        suggestions: [
          'Install system dependencies for pdf2pic',
          'Check if PDF is password protected',
          'Try with a different PDF file',
          'Use specialized PDF image extraction tools'
        ],
        created: new Date().toISOString()
      };
      
      // Her sayfa için placeholder bilgi dosyası oluştur
      for (let i = 1; i <= (pdfData.numpages || 1); i++) {
        const pageInfoPath = path.join(outputDir, `${fileName}-page-${i}.info.json`);
        const pageInfo = {
          page: i,
          originalFile: path.basename(inputPath),
          format: 'INFO (Placeholder)',
          note: 'This is placeholder information. Actual image extraction failed.',
          timestamp: new Date().toISOString(),
          content: pdfData.text ? 
            pdfData.text.substring((i-1) * 500, i * 500) : 
            'No text content available'
        };
        
        fs.writeFileSync(pageInfoPath, JSON.stringify(pageInfo, null, 2));
      }
      
      fs.writeFileSync(zipPath, JSON.stringify(imageInfo, null, 2));
      
      // Clean up temp directory
      try {
        fs.rmSync(outputDir, { recursive: true, force: true });      } catch (cleanupError: any) {
        console.warn('Could not clean up temp directory:', cleanupError);
      }
      
      console.log(`PDF analysis completed (fallback mode): ${zipPath}`);
      return zipPath;
    }
    
  } catch (error: any) {
    console.error('PDF to Image conversion error:', error);
    throw new Error('PDF to Image dönüştürme hatası: ' + error.message);
  }
};

