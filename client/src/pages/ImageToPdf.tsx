import React, { useState } from 'react';
import { Upload, Image, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ImageToPdf: React.FC = () => {
    // Önizleme URL'leri
    const [previews, setPreviews] = useState<string[]>([]);
    const { translations } = useLanguage();
    const [files, setFiles] = useState<File[]>([]);
    const [isConverting, setIsConverting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    // PDF settings
    const [pageSize, setPageSize] = useState('A4');
    const [orientation, setOrientation] = useState('auto');
    const [imageQuality, setImageQuality] = useState(80);
    const [pageMargin, setPageMargin] = useState(20);

    const handleFileChange = (uploadedFiles: FileList) => {
        const imageFiles = Array.from(uploadedFiles).filter(file => 
            file.type.startsWith('image/')
        );
        
        if (imageFiles.length !== uploadedFiles.length) {
            setError(translations.toolPages.imageToPdf.errors.invalidFileType);
        } else {
            setFiles(imageFiles);
            setError(null);
            // Önizleme URL'lerini oluştur
            const urls = imageFiles.map(file => URL.createObjectURL(file));
            setPreviews(urls);
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
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    // Önizleme URL'lerini güncelle
    setPreviews(previews.filter((_, i) => i !== index));
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
        formData.append('pageSize', pageSize);
        formData.append('orientation', orientation);
        formData.append('imageQuality', imageQuality.toString());
        formData.append('pageMargin', pageMargin.toString());

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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-extrabold drop-shadow-sm">Image to PDF Converter</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Transform multiple images into professional PDF documents. Support for JPG, PNG, WEBP, and other formats with customizable page settings and high-quality output.
                    </p>
                </div>
                {/* Main Section: Upload + PDF Settings */}
                <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
                    {/* Upload Area */}
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
                        {/* Upload Area */}
                        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 space-y-6">
                            <div
                                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'} ${files.length > 0 ? 'border-purple-400 bg-purple-50' : ''}`}
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
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Images</h3>
                                        <p className="text-gray-500 mb-4">Drag & drop images here or click to select files</p>
                                        <p className="text-sm text-gray-400">Supported formats: JPG, PNG, WEBP, etc.</p>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Images ({files.length})</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                                            {files.map((file, index) => (
                                                <div key={index} className="relative bg-gray-100 rounded-lg p-2 flex flex-col items-center">
                                                    {/* Önizleme */}
                                                    <img src={previews[index]} alt={file.name} className="w-20 h-20 object-cover rounded mb-2 border" />
                                                    <p className="text-sm text-gray-600 truncate">{file.name}</p>
                                                    <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                    <button type="button" onClick={() => removeFile(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">×</button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            {error && (
                                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <span className="text-red-700">{error}</span>
                                </div>
                            )}
                            {isSuccess && (
                                <div className="flex items-center gap-2 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-purple-500" />
                                    <span className="text-purple-700">PDF created successfully!</span>
                                </div>
                            )}
                        </div>
                        {/* PDF Settings Panel */}
                        <div className="w-full md:w-80 bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 h-fit">
                            <div className="font-bold text-lg text-purple-700 mb-2">PDF Settings</div>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Size</label>
                                    <select value={pageSize} onChange={e => setPageSize(e.target.value)} className="w-full border rounded px-2 py-1">
                                        <option value="A4">A4</option>
                                        <option value="Letter">Letter</option>
                                        <option value="Legal">Legal</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
                                    <select value={orientation} onChange={e => setOrientation(e.target.value)} className="w-full border rounded px-2 py-1">
                                        <option value="auto">Auto (Best Fit)</option>
                                        <option value="portrait">Portrait</option>
                                        <option value="landscape">Landscape</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Quality: {imageQuality}%</label>
                                    <input type="range" min={10} max={100} value={imageQuality} onChange={e => setImageQuality(Number(e.target.value))} className="w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Margin: {pageMargin}mm</label>
                                    <input type="range" min={0} max={50} value={pageMargin} onChange={e => setPageMargin(Number(e.target.value))} className="w-full" />
                                </div>
                            </div>
                            <button type="submit" disabled={files.length === 0 || isConverting} className={`w-full py-3 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-all text-lg ${files.length === 0 || isConverting ? 'opacity-50 cursor-not-allowed' : ''}`}>Create PDF ({files.length} images)</button>
                        </div>
                    </form>
                </div>
                {/* Features Section */}
                <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="text-center p-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Image className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Fast Conversion</h3>
                        <p className="text-gray-600 text-sm">Convert images to PDF instantly with high performance.</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Secure Process</h3>
                        <p className="text-gray-600 text-sm">Your files are processed securely and never shared.</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Download className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Responsive Design</h3>
                        <p className="text-gray-600 text-sm">Works perfectly on all devices and screen sizes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageToPdf;
