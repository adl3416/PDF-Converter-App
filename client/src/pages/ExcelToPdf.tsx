import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ExcelToPdf: React.FC = () => {
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
        if (droppedFile && (
            droppedFile.type === 'application/vnd.ms-excel' ||
            droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            droppedFile.name.endsWith('.xls') ||
            droppedFile.name.endsWith('.xlsx')
        )) {
            handleFileChange(droppedFile);
        } else {
            setError(translations.toolPages.excelToPdf.uploadArea.supportedFormats);
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
            console.log('Sending Excel file to server:', file.name);
            const response = await fetch('http://localhost:5000/api/convert/excel-to-pdf', {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${file.name.replace(/\.[^/.]+$/, "")}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setIsSuccess(true);
            } else {
                const errorText = await response.text();
                console.error('Server response error:', errorText);
                setError(translations.toolPages.excelToPdf.errors.conversionFailed);
            }
        } catch (error) {
            console.error('Network error:', error);
            setError(translations.toolPages.excelToPdf.errors.networkError);
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50">
            <div className="container mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6">
                        <FileSpreadsheet className="w-8 h-8 text-teal-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {translations.toolPages.excelToPdf.title}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {translations.toolPages.excelToPdf.subtitle}
                    </p>
                </div>

                {/* Upload Section */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* File Drop Zone */}
                            <div
                                className={`
                                    relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
                                    ${dragActive ? 'border-teal-400 bg-teal-50' : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'}
                                    ${file ? 'border-teal-400 bg-teal-50' : ''}
                                `}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <input
                                    type="file"
                                    accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                
                                {!file ? (
                                    <>
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                            {translations.toolPages.excelToPdf.uploadArea.title}
                                        </h3>
                                        <p className="text-gray-500 mb-4">
                                            {translations.toolPages.excelToPdf.uploadArea.description}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {translations.toolPages.excelToPdf.uploadArea.supportedFormats}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                            {translations.toolPages.excelToPdf.uploadArea.fileSelected}
                                        </h3>
                                        <p className="text-gray-600 font-medium">
                                            {file.name}
                                        </p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <span className="text-red-700">{error}</span>
                                </div>
                            )}

                            {/* Success Message */}
                            {isSuccess && (
                                <div className="flex items-center gap-2 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-teal-500" />
                                    <span className="text-teal-700">{translations.toolPages.excelToPdf.success.message}</span>
                                </div>
                            )}

                            {/* Convert Button */}
                            <button
                                type="submit"
                                disabled={!file || isConverting}
                                className={`
                                    w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                                    ${file && !isConverting 
                                        ? 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg transform hover:-translate-y-0.5' 
                                        : 'bg-gray-300 cursor-not-allowed'
                                    }
                                `}
                            >
                                {isConverting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        {translations.toolPages.excelToPdf.button.converting}
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-5 h-5" />
                                        {translations.toolPages.excelToPdf.button.convert}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Features Section */}
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-6 h-6 text-teal-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{translations.toolPages.excelToPdf.features.preserveFormatting.title}</h3>
                            <p className="text-gray-600 text-sm">{translations.toolPages.excelToPdf.features.preserveFormatting.description}</p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileSpreadsheet className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{translations.toolPages.excelToPdf.features.multipleSheets.title}</h3>
                            <p className="text-gray-600 text-sm">{translations.toolPages.excelToPdf.features.multipleSheets.description}</p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Download className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{translations.toolPages.excelToPdf.features.professionalOutput.title}</h3>
                            <p className="text-gray-600 text-sm">{translations.toolPages.excelToPdf.features.professionalOutput.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcelToPdf;
