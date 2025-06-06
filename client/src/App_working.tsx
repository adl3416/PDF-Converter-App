import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

// Simple test component
const TestHome: React.FC = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: 'blue' }}>🎉 React Çalışıyor! / React is Working!</h1>
            <p>PDF Converter App - Internationalization Test</p>
            <div style={{ 
                backgroundColor: '#e8f5e8', 
                padding: '15px', 
                borderRadius: '8px',
                margin: '20px 0' 
            }}>
                <p>✅ React: Çalışıyor / Working</p>
                <p>✅ Router: Çalışıyor / Working</p>
                <p>✅ Components: Yükleniyor / Loading</p>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Routes>
                        <Route path="/" element={<TestHome />} />
                    </Routes>
                </div>
            </Router>
        </LanguageProvider>
    );
};

export default App;
