import React, { useState } from 'react';
import { Upload, Image, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PdfToImage: React.FC = () => {
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
        if (droppedFile && droppedFile.type === 'application/pdf') {
            handleFileChange(droppedFile);
        } else {
            setError(translations.toolPages.pdfToImage.uploadArea.supportedFormats);
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
            const response = await fetch('http://localhost:5000/api/convert/pdf-to-image', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${file.name.replace(/\.[^/.]+$/, "")}-images.zip`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setIsSuccess(true);
            } else {
                setError(translations.toolPages.pdfToImage.errors.conversionFailed);
            }
        } catch (error) {
            setError(translations.toolPages.pdfToImage.errors.networkError);
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="container mx-auto px-2 py-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
                        <Image className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {translations.toolPages.pdfToImage.title}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {translations.toolPages.pdfToImage.subtitle}
                    </p>
                </div>
                {/* Upload & Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
                    {/* Upload Area */}
                    <div className="md:col-span-2 flex items-center justify-center">
                        <div className="bg-white rounded-2xl shadow-xl p-8 w-full flex items-center justify-center">
                            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                                {/* File Drop Zone */}
                                <div
                                    className={`
                                        relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 flex flex-col items-center justify-center mx-auto
                                        ${dragActive ? 'border-fuchsia-400 bg-fuchsia-50' : 'border-gray-300 hover:border-fuchsia-400 hover:bg-gray-50'}
                                        ${file ? 'border-fuchsia-400 bg-fuchsia-50' : ''}
                                    `}
                                    style={{ width: '90%', minHeight: '370px', height: '370px', maxWidth: '600px' }}
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
                                                {translations.toolPages.pdfToImage.uploadArea.title}
                                            </h3>
                                            <p className="text-gray-500 mb-4">
                                                {translations.toolPages.pdfToImage.uploadArea.description}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {translations.toolPages.pdfToImage.uploadArea.supportedFormats}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-12 h-12 text-fuchsia-500 mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                                {translations.toolPages.pdfToImage.uploadArea.fileSelected}
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
                                    <div className="flex items-center gap-2 p-4 bg-fuchsia-50 border border-fuchsia-200 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-fuchsia-500" />
                                        <span className="text-fuchsia-700">{translations.toolPages.pdfToImage.success.message}</span>
                                    </div>
                                )}
                                {/* Convert Button */}
                                <button
                                    type="submit"
                                    disabled={!file || isConverting}
                                    className={`
                                        w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                                        ${file && !isConverting 
                                            ? 'bg-fuchsia-600 hover:bg-fuchsia-700 hover:shadow-lg transform hover:-translate-y-0.5' 
                                            : 'bg-gray-300 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    {isConverting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            {translations.toolPages.pdfToImage.button.converting}
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-5 h-5" />
                                            {translations.toolPages.pdfToImage.button.convert}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* Info/Steps Area */}
                    <div className="flex flex-col gap-4 items-end md:items-end max-w-[160px] w-full ml-auto">
                        <div className="bg-white rounded-2xl shadow p-2 mb-2 w-full max-w-[140px]">
                            <h2 className="text-base font-bold text-fuchsia-700 mb-2 text-right">Nasıl Çalışır?</h2>
                            <ul className="list-disc pl-4 text-gray-700 text-xs text-right">
                                <li>PDF yükle</li>
                                <li>Sayfa seç</li>
                                <li>Görsel indir</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl shadow p-2 w-full max-w-[140px]">
                            <h2 className="text-base font-bold text-fuchsia-700 mb-2 text-right">Adımlar</h2>
                            <ol className="list-decimal pl-4 text-gray-700 text-xs text-right">
                                <li>PDF dosyasını yükle</li>
                                <li>Sayfa seçimini yap</li>
                                <li>Dönüştür</li>
                                <li>Görselleri indir</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfToImage;