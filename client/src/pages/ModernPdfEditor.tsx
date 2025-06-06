import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
    Upload, 
    Download, 
    Type, 
    Square,
    Circle,
    Highlighter,
    Edit3,
    Trash2,
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    RotateCw,
    Mouse,
    Pen,
    FileText,
    Settings,
    Eye,
    EyeOff,
    Undo,
    Redo,
    Save,
    Share2,
    Plus,
    Minus,
    Hand,
    Palette
} from 'lucide-react';

// PDF.js worker setup
pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

// PDF.js initialization with error handling
if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    console.warn('PDF.js worker not set, setting fallback...');
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

interface Annotation {
    id: string;
    type: 'text' | 'rectangle' | 'circle' | 'highlight' | 'freehand' | 'image';
    pageNumber: number;
    x: number;
    y: number;
    width?: number;
    height?: number;
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    strokeWidth?: number;
    opacity?: number;
    path?: { x: number; y: number }[];
}

interface ToolbarGroup {
    id: string;
    title: string;
    tools: {
        id: string;
        name: string;
        icon: React.ReactNode;
        action: string;
    }[];
}

const ModernPdfEditor: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.2);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [selectedTool, setSelectedTool] = useState<string>('select');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedColor, setSelectedColor] = useState('#FF6B6B');
    const [fontSize, setFontSize] = useState(16);
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [opacity, setOpacity] = useState(1);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
    const [undoStack, setUndoStack] = useState<Annotation[][]>([]);
    const [redoStack, setRedoStack] = useState<Annotation[][]>([]);
      const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);    // PDF.js initialization
    useEffect(() => {
        console.log('PDF.js version:', pdfjs.version);
        console.log('PDF.js worker src:', pdfjs.GlobalWorkerOptions.workerSrc);
        
        // Test PDF.js availability
        if (typeof pdfjs === 'undefined') {
            console.error('PDF.js is not loaded!');
            setError('PDF.js kütüphanesi yüklenemedi');
        } else {
            console.log('PDF.js loaded successfully');
        }
    }, []);    const createTestPDF = async () => {
        try {
            console.log('Test PDF oluşturuluyor...');
            setIsLoading(true);
            setError(null);
            
            const { jsPDF } = await import('jspdf');
            const doc = new jsPDF();
            
            // Add title
            doc.setFontSize(20);
            doc.text('Test PDF Document', 20, 30);
            
            // Add subtitle
            doc.setFontSize(14);
            doc.text('Bu PDF editörü test etmek için oluşturulmuştur', 20, 50);
            
            // Add some content
            doc.setFontSize(12);
            doc.text('Bu belge PDF editörünün çalışıp çalışmadığını test etmek için kullanılır.', 20, 70);
            doc.text('Çeşitli annotation araçlarını deneyebilirsiniz:', 20, 90);
            doc.text('• Metin ekleme', 30, 110);
            doc.text('• Şekil çizme', 30, 130);
            doc.text('• Vurgulama', 30, 150);
            doc.text('• Serbest çizim', 30, 170);
            
            // Add a rectangle
            doc.rect(20, 190, 50, 30);
            doc.text('Test Rectangle', 25, 210);
            
            // Add second page
            doc.addPage();
            doc.setFontSize(16);
            doc.text('İkinci Sayfa', 20, 30);
            doc.text('Bu ikinci sayfadır. Sayfa gezinme özelliğini test edebilirsiniz.', 20, 50);
            
            // Convert to blob and create file
            const pdfBlob = doc.output('blob');
            const testFile = new File([pdfBlob], 'test-document.pdf', { type: 'application/pdf' });
            
            console.log('Test PDF oluşturuldu:', testFile.name, testFile.size, 'bytes');
            
            setFile(testFile);
            setIsLoading(false);
            console.log('Test PDF oluşturuldu ve yüklendi');
        } catch (error) {
            console.error('Test PDF oluşturma hatası:', error);
            setError('Test PDF oluşturulamadı: ' + (error as Error).message);
            setIsLoading(false);
        }
    };

    const toolbarGroups: ToolbarGroup[] = [
        {
            id: 'selection',
            title: 'Selection',
            tools: [
                { id: 'select', name: 'Select & Move', icon: <Mouse size={18} />, action: 'select' },
                { id: 'hand', name: 'Hand Tool', icon: <Hand size={18} />, action: 'pan' }
            ]
        },
        {
            id: 'text',
            title: 'Text',
            tools: [
                { id: 'text', name: 'Add Text', icon: <Type size={18} />, action: 'text' }
            ]
        },
        {
            id: 'shapes',
            title: 'Shapes',
            tools: [
                { id: 'rectangle', name: 'Rectangle', icon: <Square size={18} />, action: 'rectangle' },
                { id: 'circle', name: 'Circle', icon: <Circle size={18} />, action: 'circle' }
            ]
        },
        {
            id: 'annotation',
            title: 'Annotation',
            tools: [
                { id: 'highlight', name: 'Highlight', icon: <Highlighter size={18} />, action: 'highlight' },
                { id: 'freehand', name: 'Draw', icon: <Pen size={18} />, action: 'freehand' }
            ]
        },
        {
            id: 'media',
            title: 'Media',
            tools: [
                { id: 'image', name: 'Add Image', icon: <ImageIcon size={18} />, action: 'image' }
            ]
        }
    ];

    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        
        const droppedFile = e.dataTransfer.files[0];
        console.log('Dropped file:', droppedFile?.name, droppedFile?.type, droppedFile?.size);
        
        if (droppedFile) {
            if (droppedFile.type === 'application/pdf' || droppedFile.name.toLowerCase().endsWith('.pdf')) {
                if (droppedFile.size > 0) {
                    setFile(droppedFile);
                    setError(null);
                    console.log('PDF dosyası kabul edildi');
                } else {
                    setError('Dosya boş görünüyor. Lütfen geçerli bir PDF dosyası yükleyin');
                }
            } else {
                setError(`Desteklenmeyen dosya türü: ${droppedFile.type}. Lütfen PDF dosyası yükleyin`);
            }
        } else {
            setError('Dosya yüklenemedi');
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
        console.log('Selected file:', selectedFile?.name, selectedFile?.type, selectedFile?.size);
        
        if (selectedFile) {
            if (selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf')) {
                if (selectedFile.size > 0) {
                    setFile(selectedFile);
                    setError(null);
                    console.log('PDF dosyası seçildi');
                } else {
                    setError('Dosya boş görünüyor. Lütfen geçerli bir PDF dosyası seçin');
                }
            } else {
                setError(`Desteklenmeyen dosya türü: ${selectedFile.type}. Lütfen PDF dosyası seçin`);
            }
        }
    };    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        console.log('PDF document loaded successfully');
        console.log('Number of pages:', numPages);
        console.log('File details:', file?.name, file?.size, file?.type);
        
        setNumPages(numPages);
        setCurrentPage(1);
        setError(null);
        setIsLoading(false);
        console.log('PDF başarıyla yüklendi:', numPages, 'sayfa');
    };

    const onDocumentLoadError = (error: Error) => {
        console.error('PDF document load error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.log('Failed file details:', file?.name, file?.size, file?.type);
        
        setIsLoading(false);
        setError(`PDF yüklenemedi: ${error.message}. Lütfen farklı bir dosya deneyin.`);
    };

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.3));
    const resetZoom = () => setScale(1.2);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= numPages) {
            setCurrentPage(page);
        }
    };

    const addToUndoStack = () => {
        setUndoStack(prev => [...prev.slice(-9), [...annotations]]);
        setRedoStack([]);
    };

    const handleUndo = () => {
        if (undoStack.length > 0) {
            const previousState = undoStack[undoStack.length - 1];
            setRedoStack(prev => [...prev, [...annotations]]);
            setAnnotations(previousState);
            setUndoStack(prev => prev.slice(0, -1));
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
            const nextState = redoStack[redoStack.length - 1];
            setUndoStack(prev => [...prev, [...annotations]]);
            setAnnotations(nextState);
            setRedoStack(prev => prev.slice(0, -1));
        }
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (!pageRef.current || selectedTool === 'select' || selectedTool === 'hand') return;

        const rect = pageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        addToUndoStack();

        const newAnnotation: Annotation = {
            id: Date.now().toString(),
            type: selectedTool as Annotation['type'],
            pageNumber: currentPage,
            x,
            y,
            width: selectedTool === 'text' ? undefined : 100,
            height: selectedTool === 'text' ? undefined : 60,
            text: selectedTool === 'text' ? 'Metin ekleyin' : undefined,
            fontSize,
            color: selectedColor,
            backgroundColor: selectedTool === 'highlight' ? selectedColor + '40' : undefined,
            strokeWidth,
            opacity
        };

        setAnnotations(prev => [...prev, newAnnotation]);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (selectedTool === 'freehand') {
            setIsDrawing(true);
            const rect = pageRef.current?.getBoundingClientRect();
            if (rect) {
                setCurrentPath([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]);
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDrawing && selectedTool === 'freehand') {
            const rect = pageRef.current?.getBoundingClientRect();
            if (rect) {
                setCurrentPath(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
            }
        }
    };

    const handleMouseUp = () => {
        if (isDrawing && selectedTool === 'freehand' && currentPath.length > 1) {
            addToUndoStack();
            const newAnnotation: Annotation = {
                id: Date.now().toString(),
                type: 'freehand',
                pageNumber: currentPage,
                x: Math.min(...currentPath.map(p => p.x)),
                y: Math.min(...currentPath.map(p => p.y)),
                color: selectedColor,
                strokeWidth,
                opacity,
                path: currentPath
            };
            setAnnotations(prev => [...prev, newAnnotation]);
        }
        setIsDrawing(false);
        setCurrentPath([]);
    };

    const deleteAnnotation = (id: string) => {
        addToUndoStack();
        setAnnotations(prev => prev.filter(ann => ann.id !== id));
    };

    const handleDownload = async () => {
        if (!file) return;
        
        setIsLoading(true);
        try {
            // Basit download - gerçek implementasyonda annotations'ları PDF'e ekleyeceğiz
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = `edited_${file.name}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('İndirme hatası:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const currentPageAnnotations = annotations.filter(ann => ann.pageNumber === currentPage);

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-gray-900">PDF Düzenleyici</h1>
                    {file && (
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            {file.name}
                        </span>
                    )}
                </div>

                {file && (
                    <div className="flex items-center space-x-2">
                        {/* Undo/Redo */}
                        <button
                            onClick={handleUndo}
                            disabled={undoStack.length === 0}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Geri Al"
                        >
                            <Undo size={18} />
                        </button>
                        <button
                            onClick={handleRedo}
                            disabled={redoStack.length === 0}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            title="İleri Al"
                        >
                            <Redo size={18} />
                        </button>

                        <div className="w-px h-6 bg-gray-300 mx-2"></div>

                        {/* Zoom Controls */}
                        <button
                            onClick={handleZoomOut}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            title="Uzaklaştır"
                        >
                            <Minus size={18} />
                        </button>
                        <span className="text-sm text-gray-600 min-w-[60px] text-center font-medium">
                            {Math.round(scale * 100)}%
                        </span>
                        <button
                            onClick={handleZoomIn}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            title="Yakınlaştır"
                        >
                            <Plus size={18} />
                        </button>
                        <button
                            onClick={resetZoom}
                            className="text-xs text-gray-600 hover:text-gray-900 px-2 py-1 hover:bg-gray-100 rounded"
                            title="Sıfırla"
                        >
                            Sıfırla
                        </button>

                        <div className="w-px h-6 bg-gray-300 mx-2"></div>

                        {/* Page Navigation */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={currentPage}
                                onChange={(e) => handlePageChange(parseInt(e.target.value) || 1)}
                                className="w-12 text-center text-sm border border-gray-300 rounded px-1 py-1"
                                min={1}
                                max={numPages}
                            />
                            <span className="text-sm text-gray-600">/ {numPages}</span>
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= numPages}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={18} />
                        </button>

                        <div className="w-px h-6 bg-gray-300 mx-2"></div>

                        {/* Action Buttons */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className={`p-2 rounded-lg ${sidebarOpen ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                            title="Kenar Çubuğu"
                        >
                            {sidebarOpen ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        
                        <button
                            onClick={handleDownload}
                            disabled={isLoading}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            <Download size={18} />
                            <span>İndir</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {file && sidebarOpen && (
                    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                        {/* Tools */}
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4">Araçlar</h3>
                            
                            {toolbarGroups.map((group) => (
                                <div key={group.id} className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">{group.title}</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {group.tools.map((tool) => (
                                            <button
                                                key={tool.id}
                                                onClick={() => setSelectedTool(tool.action)}
                                                className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                                                    selectedTool === tool.action
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                                                }`}
                                                title={tool.name}
                                            >
                                                <div className="mb-1">{tool.icon}</div>
                                                <span className="text-xs font-medium">{tool.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Properties Panel */}
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4">Özellikler</h3>
                            
                            {/* Color Picker */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Renk</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                                                selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                                            }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                                <input
                                    type="color"
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                    className="mt-2 w-full h-8 rounded border border-gray-300"
                                />
                            </div>

                            {/* Font Size */}
                            {selectedTool === 'text' && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Font Boyutu: {fontSize}px
                                    </label>
                                    <input
                                        type="range"
                                        min="8"
                                        max="72"
                                        value={fontSize}
                                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            )}

                            {/* Stroke Width */}
                            {(selectedTool === 'freehand' || selectedTool === 'rectangle' || selectedTool === 'circle') && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Çizgi Kalınlığı: {strokeWidth}px
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={strokeWidth}
                                        onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            )}

                            {/* Opacity */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Şeffaflık: {Math.round(opacity * 100)}%
                                </label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={opacity}
                                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Annotations List */}
                        {currentPageAnnotations.length > 0 && (
                            <div className="flex-1 p-4 overflow-y-auto">
                                <h3 className="font-semibold text-gray-900 mb-4">
                                    Açıklamalar ({currentPageAnnotations.length})
                                </h3>
                                <div className="space-y-2">
                                    {currentPageAnnotations.map((annotation) => (
                                        <div key={annotation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="w-4 h-4 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: annotation.color }}
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 capitalize">
                                                        {annotation.type === 'text' ? 'Metin' :
                                                         annotation.type === 'rectangle' ? 'Dikdörtgen' :
                                                         annotation.type === 'circle' ? 'Daire' :
                                                         annotation.type === 'highlight' ? 'Vurgulama' :
                                                         annotation.type === 'freehand' ? 'Çizim' : annotation.type}
                                                    </div>
                                                    {annotation.text && (
                                                        <div className="text-xs text-gray-600 truncate max-w-[120px]">
                                                            {annotation.text}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteAnnotation(annotation.id)}
                                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                                title="Sil"
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
                <div className="flex-1 overflow-auto bg-gray-100 p-6">
                    {!file ? (
                        /* Upload Area */
                        <div className="max-w-2xl mx-auto mt-12">
                            <div
                                className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
                                    dragActive 
                                        ? 'border-blue-400 bg-blue-50 scale-105' 
                                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                                }`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <div className="relative">
                                    <FileText className="mx-auto h-20 w-20 text-gray-400 mb-6" />
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                        PDF Düzenleyici
                                    </h2>
                                    <p className="text-gray-600 mb-8 text-lg">
                                        PDF dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın
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
                                        className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    >
                                        <Upload size={24} />
                                        <span className="text-lg font-medium">PDF Dosyası Seç</span>
                                    </button>
                                    
                                    <div className="mt-4">
                                        <button
                                            onClick={createTestPDF}
                                            className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors duration-200"
                                        >
                                            <FileText size={20} />
                                            <span className="font-medium">Test PDF Oluştur</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                        <Type className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Metin Ekleme</h3>
                                    <p className="text-gray-600 text-sm">PDF belgelerinize özel metin açıklamaları ekleyin</p>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                        <Highlighter className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Vurgulama</h3>
                                    <p className="text-gray-600 text-sm">Önemli bölümleri vurgulayın ve işaretleyin</p>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                        <Square className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Şekiller</h3>
                                    <p className="text-gray-600 text-sm">Dikdörtgenler ve daireler ekleyerek alanları işaretleyin</p>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                                        <Pen className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Serbest Çizim</h3>
                                    <p className="text-gray-600 text-sm">El yazısı notlar ve çizimler ekleyin</p>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                                        <ImageIcon className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Resim Ekleme</h3>
                                    <p className="text-gray-600 text-sm">Belgelerinize resim ve logoları ekleyin</p>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                                        <Download className="h-6 w-6 text-teal-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Kaydetme</h3>
                                    <p className="text-gray-600 text-sm">Düzenlenmiş PDF'inizi tüm değişikliklerle indirin</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* PDF Viewer */
                        <div className="flex justify-center">
                            {error && (
                                <div className="fixed top-4 right-4 max-w-md p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg z-50">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                              <div 
                                ref={pageRef}
                                className="relative cursor-crosshair"
                                onClick={handleCanvasClick}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                style={{ cursor: selectedTool === 'pan' ? 'grab' : selectedTool === 'select' ? 'default' : 'crosshair' }}
                            >                                <Document
                                    file={file}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    onLoadError={onDocumentLoadError}
                                    loading={
                                        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm min-h-[400px]">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                                            <span className="text-gray-600 font-medium">PDF yükleniyor...</span>
                                            <span className="text-sm text-gray-500 mt-2">Lütfen bekleyin</span>
                                        </div>
                                    }
                                    error={
                                        <div className="p-12 text-center bg-white rounded-lg shadow-sm min-h-[400px] flex flex-col items-center justify-center">
                                            <div className="text-red-600 mb-4">
                                                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="text-red-600 mb-2 font-semibold text-lg">PDF yüklenemedi</div>
                                            <div className="text-gray-600 mb-4">Dosya bozuk olabilir veya desteklenmeyen bir format olabilir</div>
                                            <button 
                                                onClick={() => setFile(null)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                            >
                                                Yeni dosya yükle
                                            </button>
                                        </div>
                                    }
                                    className="shadow-2xl rounded-lg overflow-hidden"
                                >
                                    <Page
                                        pageNumber={currentPage}
                                        scale={scale}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        loading={
                                            <div className="flex items-center justify-center p-12 min-h-[300px]">
                                                <div className="text-center">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                                    <span className="text-gray-600">Sayfa yükleniyor...</span>
                                                </div>
                                            </div>
                                        }
                                        error={
                                            <div className="p-8 text-center text-red-600 min-h-[300px] flex items-center justify-center">
                                                <div>
                                                    <div className="text-red-500 mb-2">⚠️</div>
                                                    <div>Sayfa {currentPage} yüklenemedi</div>
                                                    <button 
                                                        onClick={() => setCurrentPage(1)}
                                                        className="mt-2 text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                                    >
                                                        İlk sayfaya git
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    />
                                </Document>
                                
                                {/* Annotation Overlays */}
                                {currentPageAnnotations.map((annotation) => (
                                    <div
                                        key={annotation.id}
                                        className="absolute pointer-events-none select-none"
                                        style={{
                                            left: annotation.x,
                                            top: annotation.y,
                                            width: annotation.width,
                                            height: annotation.height,
                                            fontSize: annotation.fontSize,
                                            color: annotation.color,
                                            backgroundColor: annotation.backgroundColor,
                                            opacity: annotation.opacity,
                                            border: annotation.type === 'rectangle' ? `${annotation.strokeWidth}px solid ${annotation.color}` : 
                                                   annotation.type === 'circle' ? `${annotation.strokeWidth}px solid ${annotation.color}` : 'none',
                                            borderRadius: annotation.type === 'circle' ? '50%' : '0',
                                            padding: annotation.type === 'text' ? '4px 8px' : '0',
                                            fontFamily: 'system-ui, -apple-system, sans-serif',
                                            fontWeight: annotation.type === 'text' ? '500' : 'normal',
                                            whiteSpace: annotation.type === 'text' ? 'nowrap' : 'normal',
                                            textShadow: annotation.type === 'text' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                                        }}
                                    >
                                        {annotation.type === 'text' && annotation.text}
                                        {annotation.type === 'freehand' && annotation.path && (
                                            <svg
                                                className="absolute top-0 left-0 pointer-events-none"
                                                width={Math.max(...annotation.path.map(p => p.x)) - Math.min(...annotation.path.map(p => p.x)) + 20}
                                                height={Math.max(...annotation.path.map(p => p.y)) - Math.min(...annotation.path.map(p => p.y)) + 20}
                                                style={{
                                                    left: -10,
                                                    top: -10
                                                }}
                                            >
                                                <path
                                                    d={`M ${annotation.path.map(p => `${p.x - annotation.x + 10} ${p.y - annotation.y + 10}`).join(' L ')}`}
                                                    stroke={annotation.color}
                                                    strokeWidth={annotation.strokeWidth}
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    opacity={annotation.opacity}
                                                />
                                            </svg>
                                        )}
                                    </div>
                                ))}

                                {/* Current Drawing Path */}
                                {isDrawing && currentPath.length > 1 && (
                                    <svg
                                        className="absolute top-0 left-0 pointer-events-none"
                                        width="100%"
                                        height="100%"
                                    >
                                        <path
                                            d={`M ${currentPath.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                                            stroke={selectedColor}
                                            strokeWidth={strokeWidth}
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            opacity={opacity}
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernPdfEditor;
