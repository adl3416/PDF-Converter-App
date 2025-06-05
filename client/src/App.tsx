import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WordToPdf from './pages/WordToPdf';
import SimplePdfEditor from './pages/SimplePdfEditor';
import PdfToExcel from './pages/PdfToExcel';
import PdfToWord from './pages/PdfToWord';
import PdfToPowerPoint from './pages/PdfToPowerPoint';

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
              <Route path="/pdf-editor" element={<SimplePdfEditor />} />
              <Route path="/pdf-to-excel" element={<PdfToExcel />} />
              <Route path="/pdf-to-word" element={<PdfToWord />} />
              <Route path="/pdf-to-powerpoint" element={<PdfToPowerPoint />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;