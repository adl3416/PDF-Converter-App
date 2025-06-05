import React, { useState } from 'react';
import { Upload, Presentation, Download, CheckCircle, AlertCircle } from 'lucide-react';

const PdfToPowerPoint: React.FC = () => {
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
            setError('Please upload a valid PDF file');
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
            const response = await fetch('http://localhost:5000/api/convert/pdf-to-powerpoint', {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${file.name.replace(/\.[^/.]+$/, "")}.pptx`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setIsSuccess(true);
            } else {
                const errorText = await response.text();
                console.error('Server response error:', errorText);
                setError('Conversion failed. Please try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            setError('An error occurred during conversion.');
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
            <div className="container mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                        <Presentation className="w-8 h-8 text-orange-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        PDF to PowerPoint Converter
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Convert your PDF documents to PowerPoint presentations quickly and easily. 
                        Transform static PDFs into editable and interactive slides.
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
                                    ${dragActive ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'}
                                    ${file ? 'border-orange-400 bg-orange-50' : ''}
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
                                            Drop your PDF file here
                                        </h3>
                                        <p className="text-gray-500 mb-4">
                                            or click to browse files
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Supports PDF files only
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                            File Selected
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
                                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-green-700">File converted successfully!</span>
                                </div>
                            )}

                            {/* Convert Button */}
                            <button
                                type="submit"
                                disabled={!file || isConverting}
                                className={`
                                    w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                                    ${file && !isConverting 
                                        ? 'bg-orange-600 hover:bg-orange-700 hover:shadow-lg transform hover:-translate-y-0.5' 
                                        : 'bg-gray-300 cursor-not-allowed'
                                    }
                                `}
                            >
                                {isConverting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-5 h-5" />
                                        Convert to PowerPoint
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Features Section */}
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Slide Conversion</h3>
                            <p className="text-gray-600 text-sm">Convert PDF pages to PowerPoint slides</p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Easy Upload</h3>
                            <p className="text-gray-600 text-sm">Drag & drop or click to upload PDF files</p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Download className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Instant Download</h3>
                            <p className="text-gray-600 text-sm">Get your PowerPoint file immediately</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfToPowerPoint;
