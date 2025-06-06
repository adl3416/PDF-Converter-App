import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WordToPdf from './pages/WordToPdf';
import SmallPdfEditor from './pages/SmallPdfEditor';
import PdfToExcel from './pages/PdfToExcel';
import PdfToWord from './pages/PdfToWord';
import PdfToPowerPoint from './pages/PdfToPowerPoint';
import ImageToPdf from './pages/ImageToPdf';
import PdfToImage from './pages/PdfToImage';
import ExcelToPdf from './pages/ExcelToPdf';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/word-to-pdf" element={<WordToPdf />} />
              <Route path="/pdf-editor" element={<SmallPdfEditor />} />
              <Route path="/pdf-to-excel" element={<PdfToExcel />} />
              <Route path="/pdf-to-word" element={<PdfToWord />} />
              <Route path="/pdf-to-powerpoint" element={<PdfToPowerPoint />} />
              <Route path="/image-to-pdf" element={<ImageToPdf />} />
              <Route path="/pdf-to-image" element={<PdfToImage />} />
              <Route path="/excel-to-pdf" element={<ExcelToPdf />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;