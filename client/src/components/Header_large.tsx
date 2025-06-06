import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FileText, Home, Edit, ChevronDown, Grid, Presentation, FileSpreadsheet, Type, Image, UploadCloud, Globe } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAllToolsOpen, setIsAllToolsOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const { translations, changeLanguage, getCurrentLanguageInfo } = useLanguage();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleAllTools = () => {
        setIsAllToolsOpen(!isAllToolsOpen);
    };

    const toggleLanguage = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    const handleLanguageChange = (languageCode: string) => {
        changeLanguage(languageCode);
        setIsLanguageOpen(false);
    };

    const currentLang = getCurrentLanguageInfo();

    const allTools = [
        { name: translations.tools.wordToPdf.name, path: '/word-to-pdf', icon: FileText, color: 'text-blue-600' },
        { name: translations.tools.pdfEditor.name, path: '/pdf-editor', icon: Edit, color: 'text-green-600' },
        { name: translations.tools.pdfToExcel.name, path: '/pdf-to-excel', icon: FileSpreadsheet, color: 'text-orange-600' },
        { name: translations.tools.pdfToPowerPoint.name, path: '/pdf-to-powerpoint', icon: Presentation, color: 'text-red-600' },
        { name: translations.tools.pdfToWord.name, path: '/pdf-to-word', icon: Type, color: 'text-purple-600' },
        { name: translations.tools.imageToPdf.name, path: '/image-to-pdf', icon: Image, color: 'text-pink-600' },
        { name: translations.tools.pdfToImage.name, path: '/pdf-to-image', icon: Image, color: 'text-indigo-600' },
        { name: translations.tools.excelToPdf.name, path: '/excel-to-pdf', icon: UploadCloud, color: 'text-teal-600' },
    ];

    return (
        <header className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold">
                            {translations.header.appName}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link 
                            to="/" 
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-semibold"
                        >
                            <Home className="w-5 h-5" />
                            <span>{translations.header.home}</span>
                        </Link>
                        
                        {/* All Tools Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleAllTools}
                                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-semibold focus:outline-none"
                            >
                                <Grid className="w-5 h-5" />
                                <span>{translations.header.allTools}</span>
                                <ChevronDown className={`w-4 h-4 transform transition-transform ${isAllToolsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isAllToolsOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                                    <div className="grid grid-cols-1 gap-1 p-2">
                                        {allTools.map((tool) => {
                                            const Icon = tool.icon;
                                            return (
                                                <Link
                                                    key={tool.path}
                                                    to={tool.path}
                                                    onClick={() => setIsAllToolsOpen(false)}
                                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                                                >
                                                    <Icon className={`w-5 h-5 ${tool.color} group-hover:scale-110 transition-transform`} />
                                                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">{tool.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Language Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-semibold focus:outline-none"
                            >
                                <Globe className="w-5 h-5" />
                                <span className="text-lg">{currentLang?.flag}</span>
                                <span>{currentLang?.name}</span>
                                <ChevronDown className={`w-4 h-4 transform transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isLanguageOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                                    <div className="grid grid-cols-1 gap-1 p-2">
                                        {languages.map((language) => (
                                            <button
                                                key={language.code}
                                                onClick={() => handleLanguageChange(language.code)}
                                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left w-full ${
                                                    currentLang.code === language.code 
                                                        ? 'bg-blue-50 text-blue-700' 
                                                        : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                            >
                                                <span className="text-lg">{language.flag}</span>
                                                <span className="font-medium">{language.name}</span>
                                                {currentLang.code === language.code && (
                                                    <span className="ml-auto text-blue-600">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4 bg-white/80 backdrop-blur-sm rounded-b-lg">
                        <nav className="flex flex-col space-y-3">
                            <Link 
                                to="/" 
                                onClick={toggleMenu}
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-semibold py-2 px-2 rounded-lg hover:bg-gray-50"
                            >
                                <Home className="w-5 h-5" />
                                <span>{translations.header.home}</span>
                            </Link>
                            
                            {/* Language Selector - Mobile */}
                            <div className="border-t border-gray-200 pt-3 mt-3">
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">{translations.header.language}</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            onClick={() => {
                                                handleLanguageChange(language.code);
                                                toggleMenu();
                                            }}
                                            className={`flex items-center space-x-3 px-2 py-2 rounded-lg transition-colors text-left w-full ${
                                                currentLang.code === language.code 
                                                    ? 'bg-blue-50 text-blue-700' 
                                                    : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            <span className="text-lg">{language.flag}</span>
                                            <span className="font-medium">{language.name}</span>
                                            {currentLang.code === language.code && (
                                                <span className="ml-auto text-blue-600">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* All Tools - Mobile */}
                            <div className="border-t border-gray-200 pt-3 mt-3">
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">{translations.header.allTools}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {allTools.map((tool) => {
                                        const Icon = tool.icon;
                                        return (
                                            <Link
                                                key={tool.path}
                                                to={tool.path}
                                                onClick={toggleMenu}
                                                className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <Icon className={`w-4 h-4 ${tool.color}`} />
                                                <span className="text-sm text-gray-700 font-medium">{tool.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
            
            {/* Overlay for closing dropdowns */}
            {(isAllToolsOpen || isLanguageOpen) && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => {
                        setIsAllToolsOpen(false);
                        setIsLanguageOpen(false);
                    }}
                />
            )}
        </header>
    );
};

export default Header;