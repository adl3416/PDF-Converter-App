import React, { useState, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Link } from 'react-router-dom';
import { 
    Upload, 
    Download, 
    RotateCw, 
    RotateCcw, 
    ZoomIn, 
    ZoomOut, 
    Type, 
    Square,
    Circle,
    Edit3,
    Trash2,
    Save,
    FileText,
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
    Shield,
    Zap,
    File,
    Divide
} from 'lucide-react';

// PDF.js worker ayarı - CDN kullan
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Annotation {
    id: string;
    type: 'text' | 'rectangle' | 'circle';
    x: number;
    y: number;
    width?: number;
    height?: number;
    text?: string;
    fontSize?: number;
    color?: string;
}

const PdfEditor: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [rotation, setRotation] = useState<number>(0);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [selectedTool, setSelectedTool] = useState<'select' | 'text' | 'rectangle' | 'circle'>('select');
    const [dragActive, setDragActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
            setError(null);
        } else {
            setError('Please upload a valid PDF file');
        }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Please select a valid PDF file');
        }
    };

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setCurrentPage(1);
        setError(null);
        console.log('PDF loaded successfully with', numPages, 'pages');
    };

    const onDocumentLoadError = (error: Error) => {
        console.error('Error loading PDF:', error);
        setError('Failed to load PDF. Please try another file.');
    };

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
    const handleRotateLeft = () => setRotation(prev => (prev - 90) % 360);
    const handleRotateRight = () => setRotation(prev => (prev + 90) % 360);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= numPages) {
            setCurrentPage(page);
        }
    };

    const handleDownload = async () => {
        if (!file) return;
        
        setIsLoading(true);
        try {
            // Bu örnekte basit bir download yapıyoruz
            // Gerçek implementasyonda annotations'ları PDF'e ekleyeceğiz
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = `edited_${file.name}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addAnnotation = (type: Annotation['type'], x: number, y: number) => {
        const newAnnotation: Annotation = {
            id: Date.now().toString(),
            type,
            x,
            y,
            width: type !== 'text' ? 100 : undefined,
            height: type !== 'text' ? 50 : undefined,
            text: type === 'text' ? 'Sample Text' : undefined,
            fontSize: 16,
            color: '#ff0000'
        };
        setAnnotations(prev => [...prev, newAnnotation]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            <div className="container mx-auto px-2 md:px-8 py-16 max-w-[1400px]">
                <div className="max-w-[1200px] mx-auto">
                    {/* Header */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">PDF Editor</h1>
                    
                    {file && (
                        <div className="flex items-center space-x-4">
                            {/* Zoom Controls */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleZoomOut}
                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                                >
                                    <ZoomOut size={20} />
                                </button>
                                <span className="text-sm text-gray-600 min-w-[50px] text-center">
                                    {Math.round(scale * 100)}%
                                </span>
                                <button
                                    onClick={handleZoomIn}
                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                                >
                                    <ZoomIn size={20} />
                                </button>
                            </div>

                            {/* Rotation Controls */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleRotateLeft}
                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                                >
                                    <RotateCcw size={20} />
                                </button>
                                <button
                                    onClick={handleRotateRight}
                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                                >
                                    <RotateCw size={20} />
                                </button>
                            </div>

                            {/* Page Navigation */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage <= 1}
                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md disabled:opacity-50"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="text-sm text-gray-600">
                                    {currentPage} / {numPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage >= numPages}
                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md disabled:opacity-50"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Download Button */}
                            <button
                                onClick={handleDownload}
                                disabled={isLoading}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Download size={20} />
                                <span>Download</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex">
                {/* Sidebar - Tools */}
                {file && (
                    <div className="w-64 bg-white border-r border-gray-200 p-4">
                        <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
                        
                        <div className="space-y-2">
                            <button
                                onClick={() => setSelectedTool('select')}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left ${
                                    selectedTool === 'select' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <Edit3 size={20} />
                                <span>Select</span>
                            </button>
                            
                            <button
                                onClick={() => setSelectedTool('text')}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left ${
                                    selectedTool === 'text' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <Type size={20} />
                                <span>Add Text</span>
                            </button>
                            
                            <button
                                onClick={() => setSelectedTool('rectangle')}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left ${
                                    selectedTool === 'rectangle' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <Square size={20} />
                                <span>Rectangle</span>
                            </button>
                            
                            <button
                                onClick={() => setSelectedTool('circle')}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left ${
                                    selectedTool === 'circle' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <Circle size={20} />
                                <span>Circle</span>
                            </button>
                        </div>

                        {/* Annotations List */}
                        {annotations.length > 0 && (
                            <div className="mt-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Annotations</h3>
                                <div className="space-y-2">
                                    {annotations.map((annotation) => (
                                        <div key={annotation.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                            <span className="text-sm text-gray-700 capitalize">
                                                {annotation.type}
                                            </span>
                                            <button
                                                onClick={() => setAnnotations(prev => prev.filter(a => a.id !== annotation.id))}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {!file ? (
                        /* Upload Area */
                        <div className="max-w-2xl mx-auto">
                            <div
                                className={`
                                    relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
                                    ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
                                `}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Upload PDF to Edit
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Drag and drop your PDF file here, or click to browse
                                </p>
                                
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Upload size={20} />
                                    <span>Choose PDF File</span>
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid md:grid-cols-2 gap-6 mt-12">
                                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                                    <Type className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Add Text</h3>
                                    <p className="text-gray-600 text-sm">Add custom text annotations to your PDF documents</p>
                                </div>
                                
                                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                                    <Square className="h-8 w-8 text-green-600 mx-auto mb-3" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Draw Shapes</h3>
                                    <p className="text-gray-600 text-sm">Add rectangles and circles to highlight important areas</p>
                                </div>
                                
                                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                                    <RotateCw className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Rotate Pages</h3>
                                    <p className="text-gray-600 text-sm">Rotate individual pages or entire document as needed</p>
                                </div>
                                
                                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                                    <Download className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Save Changes</h3>
                                    <p className="text-gray-600 text-sm">Download your edited PDF with all modifications</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* PDF Viewer */
                        <div className="flex flex-col items-center">
                            {error && (
                                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                    {error}
                                </div>
                            )}
                            
                            <div className="relative">
                                <Document
                                    file={file}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    onLoadError={onDocumentLoadError}
                                    loading={
                                        <div className="flex items-center justify-center p-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                            <span className="ml-2 text-gray-600">Loading PDF...</span>
                                        </div>
                                    }
                                    error={
                                        <div className="p-8 text-center">
                                            <div className="text-red-600 mb-2">Failed to load PDF</div>
                                            <div className="text-gray-600 text-sm">Please try uploading a different PDF file</div>
                                        </div>
                                    }
                                    className="border border-gray-300 shadow-lg"
                                >
                                    <Page
                                        pageNumber={currentPage}
                                        scale={scale}
                                        rotate={rotation}
                                        renderTextLayer={true}
                                        renderAnnotationLayer={true}
                                        loading={
                                            <div className="flex items-center justify-center p-8">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                            </div>
                                        }
                                        error={
                                            <div className="p-4 text-center text-red-600">
                                                Failed to load page {currentPage}
                                            </div>
                                        }
                                    />
                                </Document>
                                
                                {/* Annotation Overlay */}
                                {annotations.map((annotation) => (
                                    <div
                                        key={annotation.id}
                                        className="absolute pointer-events-none"
                                        style={{
                                            left: annotation.x,
                                            top: annotation.y,
                                            width: annotation.width,
                                            height: annotation.height,
                                            fontSize: annotation.fontSize,
                                            color: annotation.color,
                                            border: annotation.type !== 'text' ? `2px solid ${annotation.color}` : 'none',
                                            borderRadius: annotation.type === 'circle' ? '50%' : '0',
                                        }}
                                    >
                                        {annotation.type === 'text' && annotation.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Features Section */}
                    <div className="mt-20 max-w-[1200px] mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced PDF Editing Features</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Edit your PDF documents with professional-grade tools. Add text, shapes, annotations, and more. 
                                Perfect for form filling, document review, and content enhancement.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Type className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Text Editing</h3>
                                <p className="text-gray-600">Add custom text anywhere on your PDF. Choose fonts, sizes, and colors to match your document style.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Square className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Shape Tools</h3>
                                <p className="text-gray-600">Draw rectangles, circles, and other shapes. Perfect for highlighting areas or creating visual elements.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <RotateCw className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Page Controls</h3>
                                <p className="text-gray-600">Rotate pages, zoom in/out for precise editing, and navigate through multi-page documents easily.</p>
                            </div>
                        </div>

                        {/* Related Tools Section */}
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">More PDF Tools</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Link to="/split-pdf" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Divide className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Split PDF</h4>
                                    <p className="text-sm text-gray-600">Extract pages from PDF files</p>
                                </Link>
                                <Link to="/merge-pdf" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <File className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Merge PDF</h4>
                                    <p className="text-sm text-gray-600">Combine multiple PDFs into one</p>
                                </Link>
                                <Link to="/pdf-to-image" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ImageIcon className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">PDF to Image</h4>
                                    <p className="text-sm text-gray-600">Convert PDF pages to images</p>
                                </Link>
                                <Link to="/image-to-pdf" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
                                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ImageIcon className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Image to PDF</h4>
                                    <p className="text-sm text-gray-600">Convert images to PDF documents</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfEditor;