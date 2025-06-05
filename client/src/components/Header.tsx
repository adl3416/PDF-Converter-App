import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FileText, Home, Edit } from 'lucide-react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <span>PDF Converter</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link 
                            to="/" 
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </Link>
                        <Link 
                            to="/word-to-pdf" 
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            <FileText className="w-4 h-4" />
                            <span>Word to PDF</span>
                        </Link>
                        <Link 
                            to="/pdf-editor" 
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            <Edit className="w-4 h-4" />
                            <span>PDF Editor</span>
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link 
                            to="/word-to-pdf" 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Start Converting
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                    <div className="md:hidden border-t border-gray-100 py-4">
                        <nav className="flex flex-col space-y-4">
                            <Link 
                                to="/" 
                                onClick={toggleMenu}
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                            >
                                <Home className="w-4 h-4" />
                                <span>Home</span>
                            </Link>
                            <Link 
                                to="/word-to-pdf" 
                                onClick={toggleMenu}
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                            >
                                <FileText className="w-4 h-4" />
                                <span>Word to PDF</span>
                            </Link>
                            <Link 
                                to="/pdf-editor" 
                                onClick={toggleMenu}
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                            >
                                <Edit className="w-4 h-4" />
                                <span>PDF Editor</span>
                            </Link>
                            <Link 
                                to="/word-to-pdf" 
                                onClick={toggleMenu}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium text-center mt-4"
                            >
                                Start Converting
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;