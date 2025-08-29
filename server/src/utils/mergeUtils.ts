import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function mergePdf(files: string[]): Promise<string> {
  const mergedPdf = await PDFDocument.create();
  for (const filePath of files) {
    const pdfBytes = fs.readFileSync(filePath);
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  const mergedBytes = await mergedPdf.save();
  const outputDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  const outputPath = path.join(outputDir, `${uuidv4()}_merged.pdf`);
  fs.writeFileSync(outputPath, mergedBytes);
  return outputPath;
}
