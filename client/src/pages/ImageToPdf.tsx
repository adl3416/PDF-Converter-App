import React, { useState } from 'react';
import { Upload, Image, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ImageToPdf: React.FC = () => {
    const { translations } = useLanguage();
    const [files, setFiles] = useState<File[]>([]);
    const [isConverting, setIsConverting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (uploadedFiles: FileList) => {
        const imageFiles = Array.from(uploadedFiles).filter(file => 
            file.type.startsWith('image/')
        );
        
        if (imageFiles.length !== uploadedFiles.length) {
            setError(translations.toolPages.imageToPdf.errors.invalidFileType);
        } else {
            setFiles(imageFiles);
            setError(null);
        }
        setIsSuccess(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            handleFileChange(droppedFiles);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (files.length === 0) return;

        setIsConverting(true);
        setError(null);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            console.log('Sending image files to server:', files.map(f => f.name));
            const response = await fetch('http://localhost:5000/api/convert/image-to-pdf', {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `converted-images.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setIsSuccess(true);
            } else {
                const errorText = await response.text();
                console.error('Server response error:', errorText);
                setError(translations.toolPages.imageToPdf.errors.conversionFailed);
            }
        } catch (error) {
            console.error('Network error:', error);
            setError(translations.toolPages.imageToPdf.errors.networkError);
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-6">
                        <Image className="w-8 h-8 text-pink-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {translations.toolPages.imageToPdf.title}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {translations.toolPages.imageToPdf.subtitle}
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
                                    ${dragActive ? 'border-pink-400 bg-pink-50' : 'border-gray-300 hover:border-pink-400 hover:bg-gray-50'}
                                    ${files.length > 0 ? 'border-pink-400 bg-pink-50' : ''}
                                `}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => e.target.files && handleFileChange(e.target.files)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                
                                {files.length === 0 ? (
                                    <>
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                            {translations.toolPages.imageToPdf.uploadArea.title}
                                        </h3>
                                        <p className="text-gray-500 mb-4">
                                            {translations.toolPages.imageToPdf.uploadArea.description}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {translations.toolPages.imageToPdf.uploadArea.supportedFormats}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                            {files.length} {translations.toolPages.imageToPdf.uploadArea.fileSelected}
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                                            {files.map((file, index) => (
                                                <div key={index} className="relative bg-gray-100 rounded-lg p-2">
                                                    <p className="text-sm text-gray-600 truncate">{file.name}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
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
                                <div className="flex items-center gap-2 p-4 bg-pink-50 border border-pink-200 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-pink-500" />
                                    <span className="text-pink-700">{translations.toolPages.imageToPdf.success.message}</span>
                                </div>
                            )}

                            {/* Convert Button */}
                            <button
                                type="submit"
                                disabled={files.length === 0 || isConverting}
                                className={`
                                    w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                                    ${files.length > 0 && !isConverting 
                                        ? 'bg-pink-600 hover:bg-pink-700 hover:shadow-lg transform hover:-translate-y-0.5' 
                                        : 'bg-gray-300 cursor-not-allowed'
                                    }
                                `}
                            >
                                {isConverting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        {translations.toolPages.imageToPdf.button.converting}
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-5 h-5" />
                                        {translations.toolPages.imageToPdf.button.convert}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Features Section */}
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Image className="w-6 h-6 text-pink-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{translations.toolPages.imageToPdf.features.multipleImages.title}</h3>
                            <p className="text-gray-600 text-sm">{translations.toolPages.imageToPdf.features.multipleImages.description}</p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{translations.toolPages.imageToPdf.features.highQuality.title}</h3>
                            <p className="text-gray-600 text-sm">{translations.toolPages.imageToPdf.features.highQuality.description}</p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Download className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{translations.toolPages.imageToPdf.features.fastConversion.title}</h3>
                            <p className="text-gray-600 text-sm">{translations.toolPages.imageToPdf.features.fastConversion.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageToPdf;
