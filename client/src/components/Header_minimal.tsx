import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, languages } from '../contexts/LanguageContext';

const Header: React.FC = () => {
    const { translations, changeLanguage, getCurrentLanguageInfo } = useLanguage();
    const currentLang = getCurrentLanguageInfo();

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        {translations.header.appName}
                    </Link>
                    
                    <nav className="flex items-center space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">
                            {translations.header.home}
                        </Link>
                        
                        {/* Language Selector */}
                        <div className="relative">
                            <select 
                                value={currentLang.code} 
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="bg-white border border-gray-300 rounded px-3 py-2"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.flag} {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
