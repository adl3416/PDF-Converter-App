import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WordToPdf from './pages/WordToPdf';
import SimplePdfEditor from './pages/SimplePdfEditor';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/word-to-pdf" element={<WordToPdf />} />
            <Route path="/pdf-editor" element={<SimplePdfEditor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;