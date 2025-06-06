// Test PDF generator for development purposes
import { jsPDF } from 'jspdf';

export const generateTestPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Test PDF Document', 20, 30);
    
    // Add subtitle
    doc.setFontSize(14);
    doc.text('Bu PDF editörü test etmek için oluşturulmuştur', 20, 50);
    
    // Add some content
    doc.setFontSize(12);
    doc.text('Bu belge PDF editörünün çalışıp çalışmadığını test etmek için kullanılır.', 20, 70);
    doc.text('Çeşitli annotation araçlarını deneyebilirsiniz:', 20, 90);
    doc.text('• Metin ekleme', 30, 110);
    doc.text('• Şekil çizme', 30, 130);
    doc.text('• Vurgulama', 30, 150);
    doc.text('• Serbest çizim', 30, 170);
    
    // Add a rectangle
    doc.rect(20, 190, 50, 30);
    doc.text('Test Rectangle', 25, 210);
    
    // Save the PDF
    return doc.output('blob');
};

// Create test PDF for immediate download
const testPdfBlob = generateTestPDF();
const url = URL.createObjectURL(testPdfBlob);
console.log('Test PDF URL:', url);
