import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Image, Download, CheckCircle, AlertCircle, Zap, File, Edit3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PdfToImage: React.FC = () => {
    // Conversion settings
    const [outputFormat, setOutputFormat] = useState<'png' | 'jpeg'>('png');
    const [qualityScale, setQualityScale] = useState(1.5); // 1x, 1.5x, 2x
    const [pageSelection, setPageSelection] = useState('');
    // MB info
    const getEstimatedSize = () => {
        if (!file) return '';
        // Basit tahmin: kalite arttıkça dosya boyutu artar
        const base = file.size;
        const scale = qualityScale;
        return ((base * scale) / 1024 / 1024).toFixed(2) + ' MB';
    };
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
        formData.append('outputFormat', outputFormat);
        formData.append('qualityScale', qualityScale.toString());
        formData.append('pageSelection', pageSelection);
        
        try {
            console.log('Starting PDF to Image conversion...');
            
            const response = await fetch('http://localhost:5000/api/convert/pdf-to-image', {
                method: 'POST',
                body: formData,
            });
            
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (response.ok) {
                console.log('Conversion successful, downloading file...');
                
                // Check if response is actually a file
                const contentType = response.headers.get('content-type');
                console.log('Content type:', contentType);
                
                if (contentType && contentType.includes('application/json')) {
                    // Server returned JSON error instead of file
                    const errorData = await response.json();
                    setError(errorData.error || 'Conversion failed');
                    return;
                }
                
                const blob = await response.blob();
                console.log('Blob size:', blob.size);
                
                if (blob.size === 0) {
                    setError('Downloaded file is empty. Please try again.');
                    return;
                }
                
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${file.name.replace(/\.[^/.]+$/, "")}-images.zip`;
                
                // Add to DOM temporarily
                document.body.appendChild(a);
                a.click();
                
                // Clean up
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                
                setIsSuccess(true);
                console.log('Download completed successfully');
                
                // Reset form after successful conversion
                setTimeout(() => {
                    setFile(null);
                    setIsSuccess(false);
                    setPageSelection('');
                }, 3000);
                
            } else {
                console.error('Response not OK:', response.status, response.statusText);
                
                // Try to get error message from response
                try {
                    const errorData = await response.json();
                    setError(errorData.error || `Server error: ${response.status}`);
                } catch (parseError) {
                    setError(`Server error: ${response.status} ${response.statusText}`);
                }
            }
        } catch (error) {
            console.error('Network/conversion error:', error);
            
            if (error instanceof TypeError && error.message.includes('fetch')) {
                setError('Unable to connect to server. Please make sure the server is running on port 5000.');
            } else {
                setError('Network error occurred. Please check your connection and try again.');
            }
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="container mx-auto px-2 md:px-8 py-16 max-w-[1400px]">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
                        <Image className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-extrabold drop-shadow-sm">{translations.toolPages.pdfToImage.title}</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {translations.toolPages.pdfToImage.subtitle}
                    </p>
                </div>
                {/* Main Section: Upload + Settings + Features */}
                <div className="flex flex-col md:flex-row gap-12 max-w-[1200px] mx-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                        {/* Upload Area - Much Wider */}
                        <div className="bg-white rounded-3xl shadow-2xl p-12 space-y-8 w-full max-w-[1000px] mx-auto">
                            <div className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 min-h-[300px] flex flex-col justify-center ${dragActive ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'} ${file ? 'border-indigo-400 bg-indigo-50' : ''}`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}>
                                <input
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {!file ? (
                                    <>
                                        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                                        <h3 className="text-2xl font-bold text-gray-700 mb-4">Select PDF File</h3>
                                        <p className="text-gray-500 mb-6 text-xl">Drag & drop your PDF here or click to select file</p>
                                        <p className="text-lg text-gray-400">Supported format: PDF • Maximum file size: 50MB</p>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="font-semibold text-gray-700 text-lg">File: <span className="font-normal">{file.name}</span></span>
                                            <span className="text-gray-600 text-lg">Size: {((file.size / 1024 / 1024).toFixed(2))} MB</span>
                                            <span className="text-gray-600 text-lg">Estimated Output: {getEstimatedSize()}</span>
                                            {/* Page count: Backend'den alınabilir, şimdilik dinamik */}
                                            <span className="text-gray-600 text-lg">Ready for conversion</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* Conversion Settings */}
                        {file && (
                        <div className="bg-white rounded-2xl shadow-xl p-8 mt-2 w-full max-w-[1000px] mx-auto">
                            <div className="font-bold text-xl text-gray-900 mb-6">Conversion Settings</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
                                    <select value={outputFormat} onChange={e => setOutputFormat(e.target.value as 'png' | 'jpeg')} className="w-full border rounded-lg px-4 py-3 text-lg">
                                        <option value="png">PNG (supports transparency)</option>
                                        <option value="jpeg">JPEG (smaller size)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quality Scale</label>
                                    <select value={qualityScale} onChange={e => setQualityScale(Number(e.target.value))} className="w-full border rounded-lg px-4 py-3 text-lg">
                                        <option value={1}>1x (Normal Quality)</option>
                                        <option value={1.5}>1.5x (High Quality)</option>
                                        <option value={2}>2x (Very High Quality)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Page Selection (optional)</label>
                                <input 
                                    type="text" 
                                    value={pageSelection} 
                                    onChange={e => setPageSelection(e.target.value)} 
                                    placeholder="e.g. 1,3,5-8 (empty = all pages)" 
                                    className="w-full border rounded-lg px-4 py-3 text-lg" 
                                />
                                <span className="text-sm text-gray-500 mt-2 block">Leave empty to convert all pages</span>
                            </div>
                        </div>
                        )}
                        {/* Error/Success/Convert Button */}
                        <div className="w-full max-w-[1000px] mx-auto">
                            {error && (
                                <div className="flex items-center gap-2 p-6 bg-red-50 border border-red-200 rounded-xl mb-4">
                                    <AlertCircle className="w-6 h-6 text-red-500" />
                                    <span className="text-red-700 text-lg">{error}</span>
                                </div>
                            )}
                            {isSuccess && (
                                <div className="flex items-center gap-2 p-6 bg-indigo-50 border border-indigo-200 rounded-xl mb-4">
                                    <CheckCircle className="w-6 h-6 text-indigo-500" />
                                    <span className="text-indigo-700 text-lg">{translations.toolPages.pdfToImage.success.message}</span>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={!file || isConverting}
                                className={`w-full py-6 px-8 rounded-xl font-bold text-white text-xl transition-all duration-300 flex items-center justify-center gap-3 ${file && !isConverting ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-1' : 'bg-gray-300 cursor-not-allowed'}`}
                            >
                                {isConverting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                        {translations.toolPages.pdfToImage.button.converting}
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-6 h-6" />
                                        {translations.toolPages.pdfToImage.button.convert}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    {/* Features Panel */}
                    <div className="w-full md:w-96 bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-8 h-fit min-w-[280px]">
                        <div className="font-bold text-lg text-indigo-700 mb-2">Conversion Options</div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Image className="w-6 h-6 text-indigo-600" />
                                <span className="font-semibold text-gray-700">Multiple Formats</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Zap className="w-6 h-6 text-indigo-600" />
                                <span className="font-semibold text-gray-700">Quality Control</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Download className="w-6 h-6 text-indigo-600" />
                                <span className="font-semibold text-gray-700">Batch Download</span>
                            </div>
                        </div>
                        <div className="font-bold text-lg text-indigo-700 mt-8 mb-2">How It Works</div>
                        <ol className="list-decimal pl-4 text-gray-700 text-sm">
                            <li>Upload PDF</li>
                            <li>Choose Settings</li>
                            <li>Convert</li>
                            <li>Download</li>
                        </ol>
                    </div>
                </div>
                
                {/* Features Section */}
                <div className="mt-20 max-w-[1200px] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional PDF to Image Conversion</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Extract high-quality images from your PDF documents with precision and control. 
                            Perfect for presentations, web publishing, and image editing workflows.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Image className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Multiple Output Formats</h3>
                            <p className="text-gray-600">Choose between PNG for transparency support or JPEG for smaller file sizes. Both formats maintain excellent quality.</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Zap className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Quality Control</h3>
                            <p className="text-gray-600">Adjust image quality and scale to get the perfect balance between file size and visual clarity.</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Download className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Batch Download</h3>
                            <p className="text-gray-600">All converted images are packaged in a convenient ZIP file for easy download and organization.</p>
                        </div>
                    </div>

                    {/* Related Tools Section */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">More PDF Tools</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            <Link to="/split-pdf" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
                                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <File className="w-6 h-6 text-pink-600" />
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Split PDF</h4>
                                <p className="text-sm text-gray-600">Extract pages from PDF files</p>
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
    );
};

export default PdfToImage;