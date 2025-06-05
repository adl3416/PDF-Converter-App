import React, { useState, useRef, useCallback, useEffect } from 'react';
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
    FileText,
    ChevronLeft,
    ChevronRight,
    PenTool,
    Edit2,
    X,
    Trash2,
    Move,
    Save
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Signature {
    id: string;
    type: 'draw' | 'text';
    data: string; // base64 for drawn signatures, text for typed
    x: number;
    y: number;
    width: number;
    height: number;
    font?: string;
}

interface Annotation {
    id: string;
    type: 'text' | 'rectangle' | 'circle' | 'drawing';
    x: number;
    y: number;
    width: number;
    height: number;
    text?: string;
    fontSize?: number;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    strokePath?: { x: number; y: number }[];
}

const SimplePdfEditor: React.FC = () => {
    // Ana state tanımlamaları
    const [file, setFile] = useState<File | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // İmza modal state'leri
    const [showSignatureModal, setShowSignatureModal] = useState(false);
    const [signatureType, setSignatureType] = useState<'draw' | 'text'>('draw');
    const [textSignature, setTextSignature] = useState('');
    const [signatureFont, setSignatureFont] = useState('Brush Script MT, cursive');
    
    // İmza ve annotation state'leri
    const [signatures, setSignatures] = useState<Signature[]>([]);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [selectedSignature, setSelectedSignature] = useState<string | null>(null);
    const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
    
    // Araç ve etkileşim state'leri
    const [currentTool, setCurrentTool] = useState<'select' | 'text' | 'rectangle' | 'circle' | 'draw'>('select');
    const [isPlacingSignature, setIsPlacingSignature] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeHandle, setResizeHandle] = useState<'nw' | 'ne' | 'sw' | 'se' | null>(null);
    
    // Çizim state'leri
    const [isDrawing, setIsDrawing] = useState(false);
    const [isDrawingOnPdf, setIsDrawingOnPdf] = useState(false);
    const [currentDrawingPath, setCurrentDrawingPath] = useState<{ x: number; y: number }[]>([]);
    
    // Düzenleme state'leri
    const [editingAnnotation, setEditingAnnotation] = useState<string | null>(null);
    
    // Ref'ler
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pdfContainerRef = useRef<HTMLDivElement>(null);

    // Dosya yükleme işleyicileri
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
            const url = URL.createObjectURL(droppedFile);
            setPdfUrl(url);
            setError(null);
        } else {
            setError('Lütfen geçerli bir PDF dosyası yükleyin');
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
            const url = URL.createObjectURL(selectedFile);
            setPdfUrl(url);
            setError(null);
        } else {
            setError('Lütfen geçerli bir PDF dosyası seçin');
        }
    };

    // İmza çizim fonksiyonları
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    // İmza kaydetme
    const saveSignature = () => {
        let signatureData = '';
        
        if (signatureType === 'draw' && canvasRef.current) {
            const canvas = canvasRef.current;
            signatureData = canvas.toDataURL('image/png', 1.0);
        } else if (signatureType === 'text' && textSignature.trim()) {
            signatureData = textSignature.trim();
        }
        
        if (signatureData) {
            const newSignature: Signature = {
                id: Date.now().toString(),
                type: signatureType,
                data: signatureData,
                x: 100,
                y: 100,
                width: signatureType === 'draw' ? 200 : 300,
                height: signatureType === 'draw' ? 100 : 60,
                font: signatureType === 'text' ? signatureFont : undefined
            };
            
            setSignatures(prev => [...prev, newSignature]);
            setSelectedSignature(newSignature.id);
            setIsPlacingSignature(true);
        }
        
        // Modal'ı kapat
        setShowSignatureModal(false);
        setTextSignature('');
        if (canvasRef.current) {
            clearCanvas();
        }
    };

    // Silme fonksiyonları
    const deleteSignature = (signatureId: string) => {
        setSignatures(prev => prev.filter(sig => sig.id !== signatureId));
        if (selectedSignature === signatureId) {
            setSelectedSignature(null);
        }
    };

    const deleteAnnotation = (annotationId: string) => {
        setAnnotations(prev => prev.filter(ann => ann.id !== annotationId));
        if (selectedAnnotation === annotationId) {
            setSelectedAnnotation(null);
        }
    };

    // İtem seçme ve sürükleme işleyicileri
    const handleItemClick = (e: React.MouseEvent, itemId: string, itemType: 'signature' | 'annotation') => {
        e.preventDefault();
        e.stopPropagation();
        
        if (itemType === 'signature') {
            setSelectedSignature(itemId);
            setSelectedAnnotation(null);
        } else {
            setSelectedAnnotation(itemId);
            setSelectedSignature(null);
        }
    };

    const handleMouseDown = (e: React.MouseEvent, itemId: string, itemType: 'signature' | 'annotation') => {
        e.preventDefault();
        e.stopPropagation();
        
        const rect = pdfContainerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;
        
        setDragStart({ x: startX, y: startY });
        
        if (itemType === 'signature') {
            setSelectedSignature(itemId);
            setSelectedAnnotation(null);
        } else {
            setSelectedAnnotation(itemId);
            setSelectedSignature(null);
        }
        
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging && !isResizing) return;
        
        const rect = pdfContainerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        
        if (isDragging) {
            const deltaX = currentX - dragStart.x;
            const deltaY = currentY - dragStart.y;
            
            if (selectedSignature) {
                setSignatures(prev => prev.map(sig => 
                    sig.id === selectedSignature 
                        ? { ...sig, x: Math.max(0, sig.x + deltaX), y: Math.max(0, sig.y + deltaY) }
                        : sig
                ));
            } else if (selectedAnnotation) {
                setAnnotations(prev => prev.map(ann => 
                    ann.id === selectedAnnotation 
                        ? { ...ann, x: Math.max(0, ann.x + deltaX), y: Math.max(0, ann.y + deltaY) }
                        : ann
                ));
            }
            
            setDragStart({ x: currentX, y: currentY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeHandle(null);
    };

    // Annotation ekleme
    const addAnnotation = (type: 'text' | 'rectangle' | 'circle', x: number, y: number) => {
        const newAnnotation: Annotation = {
            id: Date.now().toString(),
            type,
            x,
            y,
            width: type === 'text' ? 200 : 100,
            height: type === 'text' ? 40 : 100,
            text: type === 'text' ? 'Metni düzenlemek için çift tıklayın' : undefined,
            fontSize: 16,
            color: '#000000',
            borderColor: '#000000',
            backgroundColor: 'transparent'
        };
        
        setAnnotations(prev => [...prev, newAnnotation]);
        setSelectedAnnotation(newAnnotation.id);
        setCurrentTool('select');
    };

    // PDF konteyner tıklama işleyicisi
    const handlePdfContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'IFRAME') {
            const rect = pdfContainerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (isPlacingSignature && selectedSignature) {
                setSignatures(prev => prev.map(sig => 
                    sig.id === selectedSignature 
                        ? { ...sig, x, y }
                        : sig
                ));
                
                setIsPlacingSignature(false);
                setSelectedSignature(null);
            } else if (currentTool === 'text') {
                addAnnotation('text', x, y);
            } else if (currentTool === 'rectangle') {
                addAnnotation('rectangle', x, y);
            } else if (currentTool === 'circle') {
                addAnnotation('circle', x, y);
            } else if (currentTool === 'select') {
                setSelectedSignature(null);
                setSelectedAnnotation(null);
            }
        }
    };

    // Annotation metin düzenleme
    const updateAnnotationText = (annotationId: string, newText: string) => {
        setAnnotations(prev => prev.map(ann => 
            ann.id === annotationId ? { ...ann, text: newText } : ann
        ));
    };

    const handleAnnotationDoubleClick = (annotationId: string) => {
        const annotation = annotations.find(ann => ann.id === annotationId);
        if (annotation && annotation.type === 'text') {
            setEditingAnnotation(annotationId);
        }
    };

    // PDF dışa aktarma
    const exportEditedPdf = async () => {
        if (!pdfContainerRef.current || !file) return;

        try {
            const container = pdfContainerRef.current;
            const rect = container.getBoundingClientRect();
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [rect.width, rect.height]
            });

            const canvas = await html2canvas(container, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, rect.width, rect.height);

            const fileName = file.name.replace('.pdf', '_duzenlenmi.pdf');
            pdf.save(fileName);
            
        } catch (error) {
            console.error('PDF dışa aktarma hatası:', error);
            setError('PDF dışa aktarılamadı');
        }
    };

    // İndirme
    const handleDownload = () => {
        if (!file) return;
        
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Canvas ayarları
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
            }
        }
    }, [showSignatureModal]);

    // URL temizleme
    useEffect(() => {
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfUrl]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        PDF Düzenleyici
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        PDF dosyalarınızı görüntüleyin, düzenleyin ve açıklama ekleyin
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Kenar Çubuğu */}
                    {file && (
                        <div className="lg:w-80 bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Araçlar</h2>
                            
                            {/* Dosya Bilgisi */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-2">Dosya Bilgisi</h3>
                                <p className="text-sm text-gray-600 break-words">{file.name}</p>
                                <p className="text-sm text-gray-500">
                                    Boyut: {Math.round(file.size / 1024)} KB
                                </p>
                            </div>

                            {/* Araçlar */}
                            <div className="space-y-3">
                                <button 
                                    onClick={() => setCurrentTool('select')}
                                    className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${
                                        currentTool === 'select' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <Move className="h-5 w-5" />
                                    <span>Seç & Taşı</span>
                                </button>

                                <button 
                                    onClick={() => setCurrentTool(currentTool === 'text' ? 'select' : 'text')}
                                    className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${
                                        currentTool === 'text' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <Type className="h-5 w-5 text-blue-600" />
                                    <span>Metin Ekle</span>
                                </button>
                                
                                <button 
                                    onClick={() => setCurrentTool(currentTool === 'rectangle' ? 'select' : 'rectangle')}
                                    className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${
                                        currentTool === 'rectangle' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <Square className="h-5 w-5 text-green-600" />
                                    <span>Dikdörtgen Ekle</span>
                                </button>
                                
                                <button 
                                    onClick={() => setCurrentTool(currentTool === 'circle' ? 'select' : 'circle')}
                                    className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${
                                        currentTool === 'circle' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <Circle className="h-5 w-5 text-purple-600" />
                                    <span>Daire Ekle</span>
                                </button>

                                <button 
                                    onClick={() => setShowSignatureModal(true)}
                                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border-2 border-orange-200 bg-orange-50"
                                >
                                    <PenTool className="h-5 w-5 text-orange-600" />
                                    <span className="font-medium text-orange-700">İmza Oluştur</span>
                                </button>
                            </div>

                            {/* Kaydedilmiş İmzalar */}
                            {signatures.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-medium text-gray-900 mb-3">Kaydedilmiş İmzalar</h3>
                                    <div className="space-y-2">
                                        {signatures.map((signature) => (
                                            <div 
                                                key={signature.id}
                                                className={`p-3 border rounded-lg transition-all ${
                                                    selectedSignature === signature.id 
                                                        ? 'border-blue-500 bg-blue-50' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {signature.type === 'draw' ? 'Çizilmiş' : 'Metin'} İmza
                                                    </span>
                                                    <button
                                                        onClick={() => deleteSignature(signature.id)}
                                                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                                
                                                {/* İmza Önizlemesi */}
                                                <div className="mb-2 h-12 bg-white border rounded flex items-center justify-center overflow-hidden">
                                                    {signature.type === 'draw' ? (
                                                        <img 
                                                            src={signature.data} 
                                                            alt="İmza" 
                                                            className="max-h-full max-w-full object-contain"
                                                        />
                                                    ) : (
                                                        <span 
                                                            style={{ 
                                                                fontFamily: signature.font,
                                                                fontSize: '14px'
                                                            }}
                                                            className="text-gray-800"
                                                        >
                                                            {signature.data}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <button
                                                    onClick={() => {
                                                        setSelectedSignature(signature.id);
                                                        setIsPlacingSignature(true);
                                                    }}
                                                    className="w-full text-sm bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                                                >
                                                    <Move size={14} />
                                                    <span>PDF'e Yerleştir</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Açıklamalar */}
                            {annotations.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-medium text-gray-900 mb-3">Açıklamalar</h3>
                                    <div className="space-y-2">
                                        {annotations.map((annotation) => (
                                            <div 
                                                key={annotation.id}
                                                className={`p-3 border rounded-lg transition-all ${
                                                    selectedAnnotation === annotation.id 
                                                        ? 'border-blue-500 bg-blue-50' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700 capitalize">
                                                        {annotation.type === 'text' ? 'Metin' : 
                                                         annotation.type === 'rectangle' ? 'Dikdörtgen' : 
                                                         annotation.type === 'circle' ? 'Daire' : annotation.type} Açıklaması
                                                    </span>
                                                    <button
                                                        onClick={() => deleteAnnotation(annotation.id)}
                                                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                                
                                                {annotation.type === 'text' && (
                                                    <div className="mb-2">
                                                        <input
                                                            type="text"
                                                            value={annotation.text || ''}
                                                            onChange={(e) => updateAnnotationText(annotation.id, e.target.value)}
                                                            className="w-full text-xs px-2 py-1 border rounded"
                                                            placeholder="Metin girin..."
                                                        />
                                                    </div>
                                                )}
                                                
                                                <button
                                                    onClick={() => {
                                                        setSelectedAnnotation(annotation.id);
                                                        setSelectedSignature(null);
                                                    }}
                                                    className="w-full text-sm bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700 transition-colors"
                                                >
                                                    Seç
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* İşlem Butonları */}
                            <div className="mt-8 space-y-3">
                                <button
                                    onClick={exportEditedPdf}
                                    disabled={signatures.length === 0 && annotations.length === 0}
                                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Save size={20} />
                                    <span>Düzenlenmiş PDF'i Dışa Aktar</span>
                                </button>

                                <button
                                    onClick={handleDownload}
                                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Download size={20} />
                                    <span>Orijinal PDF'i İndir</span>
                                </button>
                                
                                <button
                                    onClick={() => {
                                        setFile(null);
                                        setPdfUrl(null);
                                        setError(null);
                                        setSignatures([]);
                                        setAnnotations([]);
                                        setSelectedSignature(null);
                                        setSelectedAnnotation(null);
                                        setCurrentTool('select');
                                    }}
                                    className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Yeni Dosya Yükle
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Ana İçerik */}
                    <div className="flex-1">
                        {!file ? (
                            /* Yükleme Alanı */
                            <div className="max-w-2xl mx-auto">
                                {error && (
                                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                        {error}
                                    </div>
                                )}
                                
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
                                        Düzenlemek için PDF Yükleyin
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        PDF dosyanızı buraya sürükleyin veya seçmek için tıklayın
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
                                        <span>PDF Dosyası Seç</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* PDF Görüntüleyici */
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">PDF Görüntüleyici</h2>
                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                                            <ZoomOut size={20} />
                                        </button>
                                        <span className="text-sm text-gray-600">100%</span>
                                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                                            <ZoomIn size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* PDF İmza ve Açıklamalarla */}
                                <div 
                                    ref={pdfContainerRef}
                                    className="relative border border-gray-300 rounded-lg overflow-hidden"
                                    onClick={handlePdfContainerClick}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    style={{ 
                                        cursor: isPlacingSignature ? 'crosshair' : 
                                               currentTool !== 'select' ? 'crosshair' : 'default' 
                                    }}
                                >
                                    <iframe
                                        src={pdfUrl || ''}
                                        width="100%"
                                        height="600"
                                        style={{ border: 'none' }}
                                        title="PDF Görüntüleyici"
                                    />

                                    {/* İmza Overlay'leri */}
                                    {signatures.map((signature) => (
                                        <div
                                            key={signature.id}
                                            className={`absolute group cursor-pointer ${
                                                selectedSignature === signature.id 
                                                    ? 'border-2 border-blue-500 shadow-lg' 
                                                    : 'border-2 border-transparent hover:border-blue-300'
                                            }`}
                                            style={{
                                                left: signature.x,
                                                top: signature.y,
                                                width: signature.width,
                                                height: signature.height,
                                                zIndex: selectedSignature === signature.id ? 1000 : 100
                                            }}
                                            onClick={(e) => handleItemClick(e, signature.id, 'signature')}
                                            onMouseDown={(e) => handleMouseDown(e, signature.id, 'signature')}
                                        >
                                            {/* Silme butonu - seçili item için */}
                                            {selectedSignature === signature.id && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteSignature(signature.id);
                                                    }}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}

                                            {signature.type === 'draw' ? (
                                                <img 
                                                    src={signature.data} 
                                                    alt="İmza" 
                                                    className="w-full h-full object-contain bg-white rounded"
                                                    draggable={false}
                                                />
                                            ) : (
                                                <div 
                                                    className="w-full h-full flex items-center justify-center bg-white rounded"
                                                    style={{ 
                                                        fontFamily: signature.font,
                                                        fontSize: Math.min(signature.height * 0.6, 24) + 'px'
                                                    }}
                                                >
                                                    {signature.data}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Annotation Overlay'leri */}
                                    {annotations.map((annotation) => (
                                        <div
                                            key={annotation.id}
                                            className={`absolute group cursor-pointer ${
                                                selectedAnnotation === annotation.id 
                                                    ? 'border-2 border-green-500 shadow-lg' 
                                                    : 'border-2 border-transparent hover:border-green-300'
                                            }`}
                                            style={{
                                                left: annotation.x,
                                                top: annotation.y,
                                                width: annotation.width,
                                                height: annotation.height,
                                                zIndex: selectedAnnotation === annotation.id ? 1000 : 100
                                            }}
                                            onClick={(e) => handleItemClick(e, annotation.id, 'annotation')}
                                            onMouseDown={(e) => handleMouseDown(e, annotation.id, 'annotation')}
                                        >
                                            {/* Silme butonu - seçili item için */}
                                            {selectedAnnotation === annotation.id && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteAnnotation(annotation.id);
                                                    }}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}

                                            {annotation.type === 'text' && (
                                                <div 
                                                    className="w-full h-full flex items-center justify-center bg-white bg-opacity-80 rounded px-2"
                                                    style={{ 
                                                        fontSize: annotation.fontSize + 'px',
                                                        color: annotation.color
                                                    }}
                                                    onDoubleClick={() => handleAnnotationDoubleClick(annotation.id)}
                                                >
                                                    {editingAnnotation === annotation.id ? (
                                                        <input
                                                            type="text"
                                                            value={annotation.text || ''}
                                                            onChange={(e) => updateAnnotationText(annotation.id, e.target.value)}
                                                            onBlur={() => setEditingAnnotation(null)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    setEditingAnnotation(null);
                                                                }
                                                            }}
                                                            className="w-full bg-transparent border-none outline-none text-center"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        annotation.text
                                                    )}
                                                </div>
                                            )}
                                            
                                            {annotation.type === 'rectangle' && (
                                                <div 
                                                    className="w-full h-full border-2 rounded"
                                                    style={{ 
                                                        borderColor: annotation.borderColor,
                                                        backgroundColor: annotation.backgroundColor 
                                                    }}
                                                />
                                            )}
                                            
                                            {annotation.type === 'circle' && (
                                                <div 
                                                    className="w-full h-full border-2 rounded-full"
                                                    style={{ 
                                                        borderColor: annotation.borderColor,
                                                        backgroundColor: annotation.backgroundColor 
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}

                                    {/* Araç Talimatları */}
                                    {isPlacingSignature && (
                                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
                                            <p className="text-sm font-medium">İmzayı yerleştirmek istediğiniz yere tıklayın</p>
                                        </div>
                                    )}
                                    
                                    {currentTool !== 'select' && !isPlacingSignature && (
                                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
                                            <p className="text-sm font-medium">
                                                {currentTool === 'text' ? 'Metin eklemek için tıklayın' : 
                                                 currentTool === 'rectangle' ? 'Dikdörtgen eklemek için tıklayın' : 
                                                 currentTool === 'circle' ? 'Daire eklemek için tıklayın' : ''}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 text-center text-sm text-gray-600">
                                    <p>
                                        PDF başarıyla yüklendi. Düzenlemek için kenar çubuğundaki araçları kullanın.
                                        {signatures.length > 0 && ` • ${signatures.length} imza`}
                                        {annotations.length > 0 && ` • ${annotations.length} açıklama`}
                                        {(selectedSignature || selectedAnnotation) && ' • Seçili öğe sürüklenebilir'}
                                    </p>
                                    {currentTool !== 'select' && (
                                        <p className="text-blue-600 font-medium mt-1">
                                            {currentTool === 'text' ? 'Metin Aracı Aktif' : 
                                             currentTool === 'rectangle' ? 'Dikdörtgen Aracı Aktif' : 
                                             currentTool === 'circle' ? 'Daire Aracı Aktif' : ''} - Eklemek için PDF'e tıklayın
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* İmza Modal'ı */}
                {showSignatureModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">İmza Ekle</h2>
                                    <button
                                        onClick={() => setShowSignatureModal(false)}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* İmza Türü Sekmeleri */}
                                <div className="flex border-b border-gray-200 mb-6">
                                    <button
                                        onClick={() => setSignatureType('draw')}
                                        className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                                            signatureType === 'draw'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        <PenTool className="inline-block w-4 h-4 mr-2" />
                                        İmza Çiz
                                    </button>
                                    <button
                                        onClick={() => setSignatureType('text')}
                                        className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                                            signatureType === 'text'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        <Edit2 className="inline-block w-4 h-4 mr-2" />
                                        İmza Yaz
                                    </button>
                                </div>

                                {/* İmza Çizme Sekmesi */}
                                {signatureType === 'draw' && (
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <p className="text-gray-600 mb-4">İmzanızı aşağıdaki kutuya çizin</p>
                                            <div className="border-2 border-gray-300 rounded-lg bg-white inline-block">
                                                <canvas
                                                    ref={canvasRef}
                                                    width={400}
                                                    height={200}
                                                    className="cursor-crosshair"
                                                    onMouseDown={startDrawing}
                                                    onMouseMove={draw}
                                                    onMouseUp={stopDrawing}
                                                    onMouseLeave={stopDrawing}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    onClick={clearCanvas}
                                                    className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    Temizle
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* İmza Yazma Sekmesi */}
                                {signatureType === 'text' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                İmzanızı yazın
                                            </label>
                                            <input
                                                type="text"
                                                value={textSignature}
                                                onChange={(e) => setTextSignature(e.target.value)}
                                                placeholder="Adınızı girin"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Font Stili
                                            </label>
                                            <select
                                                value={signatureFont}
                                                onChange={(e) => setSignatureFont(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            >
                                                <option value="Brush Script MT, cursive">Brush Script</option>
                                                <option value="Dancing Script, cursive">Dancing Script</option>
                                                <option value="Great Vibes, cursive">Great Vibes</option>
                                                <option value="Pacifico, cursive">Pacifico</option>
                                                <option value="Sacramento, cursive">Sacramento</option>
                                            </select>
                                        </div>

                                        {/* İmza Önizlemesi */}
                                        {textSignature && (
                                            <div className="p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                                <p className="text-sm text-gray-600 mb-2">Önizleme:</p>
                                                <div
                                                    style={{ fontFamily: signatureFont }}
                                                    className="text-3xl text-gray-900 text-center"
                                                >
                                                    {textSignature}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Modal İşlemleri */}
                                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={() => setShowSignatureModal(false)}
                                        className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        İptal
                                    </button>
                                    <button
                                        onClick={saveSignature}
                                        disabled={
                                            (signatureType === 'draw' && !canvasRef.current) ||
                                            (signatureType === 'text' && !textSignature.trim())
                                        }
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                    >
                                        İmza Ekle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SimplePdfEditor;
