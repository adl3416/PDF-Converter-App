import React, { useState } from 'react';
import { Upload, FileText, Download, CheckCircle, AlertCircle, Shield, Zap, Edit3, Image, File, Divide } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const WordToPdf: React.FC = () => {
    const { translations } = useLanguage();
    const [file, setFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (uploadedFile: File) => {
        setFile(uploadedFile);
        setError(null);
        setIsSuccess(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || droppedFile.type === 'application/msword')) {
            handleFileChange(droppedFile);
        } else {
            setError(translations.toolPages.wordToPdf.uploadArea.supportedFormats);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return;

        setIsConverting(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            console.log('Sending file to server:', file.name);
            const response = await fetch('/api/convert/word-to-pdf', {
                method: 'POST',
                body: formData,
            });

            console.log('Server response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const blob = await response.blob();
            console.log('Received blob size:', blob.size);

            if (blob.size === 0) {
                throw new Error('Received empty file from server');
            }

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = file.name.replace(/\.(docx|doc)$/i, '.pdf');
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            setIsSuccess(true);
            console.log('File downloaded successfully');
        } catch (error: any) {
            console.error('Conversion error:', error);
            setError(error.message || translations.toolPages.wordToPdf.errors.conversionFailed);
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-2 md:px-8 py-16 max-w-[1400px]">
                <div className="max-w-[1200px] mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                            <FileText className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {translations.toolPages.wordToPdf.title}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {translations.toolPages.wordToPdf.subtitle}
                        </p>
                    </div>

                    {/* Upload Section */}
                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div
                                className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                                    dragActive 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : file
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                                }`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <input
                                    type="file"
                                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="space-y-4">
                                    {file ? (
                                        <>
                                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                                            <div>
                                                <p className="text-lg font-semibold text-green-700">
                                                    {translations.toolPages.wordToPdf.uploadArea.fileSelected}
                                                </p>
                                                <p className="text-green-600">{file.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-16 h-16 text-blue-500 mx-auto" />
                                            <div>
                                                <p className="text-lg font-semibold text-gray-700 mb-2">
                                                    {translations.toolPages.wordToPdf.uploadArea.title}
                                                </p>
                                                <p className="text-blue-600 font-medium">
                                                    {translations.toolPages.wordToPdf.uploadArea.description}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    {translations.toolPages.wordToPdf.uploadArea.supportedFormats}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                                    <span className="text-red-700">{error}</span>
                                </div>
                            )}

                            {isSuccess && (
                                <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-xl">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                    <span className="text-green-700">
                                        {translations.toolPages.wordToPdf.success.message}
                                    </span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!file || isConverting}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-full font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isConverting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        {translations.toolPages.wordToPdf.button.converting}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <Download className="w-5 h-5 mr-2" />
                                        {translations.toolPages.wordToPdf.button.convert}
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mt-16 mb-16">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{translations.toolPages.wordToPdf.features.highQuality.title}</h3>
                            <p className="text-gray-600 text-sm">{translations.toolPages.wordToPdf.features.highQuality.description}</p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{translations.toolPages.wordToPdf.features.easyUpload.title}</h3>
                            <p className="text-gray-600 text-sm">{translations.toolPages.wordToPdf.features.easyUpload.description}</p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Download className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{translations.toolPages.wordToPdf.features.fast.title}</h3>
                            <p className="text-gray-600 text-sm">{translations.toolPages.wordToPdf.features.fast.description}</p>
                        </div>
                    </div>
                    
                    {/* Features Section */}
                    <div className="mt-20 max-w-[1200px] mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Word to PDF Conversion</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Convert your Word documents to PDF format with perfect formatting preservation. 
                                Ideal for sharing documents, printing, and maintaining document integrity.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Perfect Formatting</h3>
                                <p className="text-gray-600">Maintains original document layout, fonts, images, and formatting during conversion.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Secure Conversion</h3>
                                <p className="text-gray-600">Your Word documents are processed securely. Files are automatically deleted after conversion.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Zap className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Lightning Fast</h3>
                                <p className="text-gray-600">Convert Word documents to PDF in seconds with our optimized processing engine.</p>
                            </div>
                        </div>

                        {/* Related Tools Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">More PDF Tools</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Link to="/pdf-to-word" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">PDF to Word</h4>
                                    <p className="text-sm text-gray-600">Convert PDF back to Word format</p>
                                </Link>
                                <Link to="/image-to-pdf" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
                                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Image className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Image to PDF</h4>
                                    <p className="text-sm text-gray-600">Convert images to PDF documents</p>
                                </Link>
                                <Link to="/merge-pdf" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <File className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Merge PDF</h4>
                                    <p className="text-sm text-gray-600">Combine multiple PDFs into one</p>
                                </Link>
                                <Link to="/pdf-editor" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Edit3 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">PDF Editor</h4>
                                    <p className="text-sm text-gray-600">Edit PDF documents online</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordToPdf;
