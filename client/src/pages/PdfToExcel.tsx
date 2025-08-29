import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PdfToExcel: React.FC = () => {
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
        const droppedFile = e.dataTransfer.files[0];        if (droppedFile && droppedFile.type === 'application/pdf') {
            handleFileChange(droppedFile);
        } else {
            setError(translations.toolPages.pdfToExcel.uploadArea.supportedFormats);
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
            console.log('Sending PDF file to server:', file.name);
            const response = await fetch('http://localhost:5000/api/convert/pdf-to-excel', {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${file.name.replace(/\.[^/.]+$/, "")}.xlsx`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setIsSuccess(true);            } else {
                const errorText = await response.text();
                console.error('Server response error:', errorText);
                setError(translations.toolPages.pdfToExcel.errors.conversionFailed);
            }
        } catch (error) {
            console.error('Network error:', error);
            setError(translations.toolPages.pdfToExcel.errors.networkError);
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-16">                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                        <FileSpreadsheet className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {translations.toolPages.pdfToExcel.title}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {translations.toolPages.pdfToExcel.subtitle}
                    </p>
                </div>

                                {/* Upload & Info Section */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                    {/* Upload Area */}
                                    <div className="md:col-span-2">
                                        <div className="bg-white rounded-2xl shadow-xl p-8">
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                {/* File Drop Zone */}
                                                <div
                                                    className={`
                                                        relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
                                                        ${dragActive ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'}
                                                        ${file ? 'border-green-400 bg-green-50' : ''}
                                                    `}
                                                    onDrop={handleDrop}
                                                    onDragOver={handleDragOver}
                                                    onDragLeave={handleDragLeave}
                                                >
                                                    <input
                                                        type="file"
                                                        accept=".pdf,application/pdf"
                                                        onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                    {!file ? (
                                                        <>
                                                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                                                {translations.toolPages.pdfToExcel.uploadArea.title}
                                                            </h3>
                                                            <p className="text-gray-500 mb-4">
                                                                {translations.toolPages.pdfToExcel.uploadArea.description}
                                                            </p>
                                                            <p className="text-sm text-gray-400">
                                                                {translations.toolPages.pdfToExcel.uploadArea.supportedFormats}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                                                {translations.toolPages.pdfToExcel.uploadArea.fileSelected}
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
                            )}                            {/* Success Message */}
                            {isSuccess && (
                                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-green-700">{translations.toolPages.pdfToExcel.success.message}</span>
                                </div>
                            )}

                            {/* Convert Button */}
                            <button
                                type="submit"
                                disabled={!file || isConverting}
                                className={`
                                    w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                                    ${file && !isConverting 
                                        ? 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5' 
                                        : 'bg-gray-300 cursor-not-allowed'
                                    }
                                `}
                            >                                {isConverting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        {translations.toolPages.pdfToExcel.button.converting}
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-5 h-5" />
                                        {translations.toolPages.pdfToExcel.button.convert}
                                    </>
                                )}
                            </button>
                                                </form>
                                        </div>
                                    </div>
                                    {/* Info/Steps Area */}
                                    <div className="flex flex-col gap-6">
                                        <div className="bg-white rounded-2xl shadow p-6 mb-2">
                                            <h2 className="text-xl font-bold text-green-700 mb-2">How It Works</h2>
                                            <ul className="list-disc pl-4 text-gray-700 text-base">
                                                <li>Extract tables and data from PDF files</li>
                                                <li>Preserve Excel formatting</li>
                                                <li>Download as .xlsx file</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white rounded-2xl shadow p-6">
                                            <h2 className="text-xl font-bold text-green-700 mb-2">Quick Steps</h2>
                                            <ol className="list-decimal pl-4 text-gray-700 text-base">
                                                <li>Upload PDF</li>
                                                <li>Start Conversion</li>
                                                <li>Download Excel</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                        </div>
                </div>
        );
};

export default PdfToExcel;
