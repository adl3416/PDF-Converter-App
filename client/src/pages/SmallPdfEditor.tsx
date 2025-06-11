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
    Mouse,
    Pen,
    FileText,
    Eye,
    EyeOff,
    Undo,
    Redo,
    Plus,
    Minus,
    Hand,
    MessageSquare,
    PenTool,
    Edit2,
    StickyNote,
    Move,
    X,
    Check,
    MoreHorizontal
} from 'lucide-react';

// PDF.js worker setup
pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

interface Annotation {
    id: string;
    type: 'text' | 'rectangle' | 'circle' | 'highlight' | 'freehand' | 'image' | 'signature' | 'sticky-note';
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
    isEditing?: boolean;
    signatureData?: string;
}



interface SignaturePadProps {
    onSave: (signature: string) => void;
    onCancel: () => void;
    color: string;
    strokeWidth: number;
}

interface SignatureAnnotationProps {
    annotation: Annotation;
    onUpdate: (id: string, updates: Partial<Annotation>) => void;
    onDelete: (id: string) => void;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

// Generic draggable annotation component
interface DraggableAnnotationProps {
    annotation: Annotation;
    onUpdate: (id: string, updates: Partial<Annotation>) => void;
    onDelete: (id: string) => void;
    isSelected: boolean;
    onSelect: (id: string) => void;
    children: React.ReactNode;
    className?: string;
}

const DraggableAnnotation: React.FC<DraggableAnnotationProps> = ({ 
    annotation, onUpdate, onDelete, isSelected, onSelect, children, className = "" 
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(annotation.id);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(annotation.id);
        
        setIsDragging(true);
        setDragStart({
            x: e.clientX - annotation.x,
            y: e.clientY - annotation.y
        });
    };

    const handleResizeStart = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsResizing(true);
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            width: annotation.width || 100,
            height: annotation.height || 60
        });
    };

    // Global mouse events for dragging
    useEffect(() => {
        if (isDragging) {
            const handleGlobalMouseMove = (e: MouseEvent) => {
                const newX = e.clientX - dragStart.x;
                const newY = e.clientY - dragStart.y;
                onUpdate(annotation.id, { x: newX, y: newY });
            };

            const handleGlobalMouseUp = () => {
                setIsDragging(false);
            };

            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove);
                document.removeEventListener('mouseup', handleGlobalMouseUp);
            };
        }
    }, [isDragging, dragStart, annotation.id, onUpdate]);

    // Global mouse events for resizing
    useEffect(() => {
        if (isResizing) {
            const handleGlobalResizeMove = (e: MouseEvent) => {
                const deltaX = e.clientX - resizeStart.x;
                const deltaY = e.clientY - resizeStart.y;
                
                const minWidth = annotation.type === 'freehand' ? 20 : 50;
                const minHeight = annotation.type === 'freehand' ? 20 : 30;
                
                const newWidth = Math.max(minWidth, resizeStart.width + deltaX);
                const newHeight = Math.max(minHeight, resizeStart.height + deltaY);
                
                onUpdate(annotation.id, { width: newWidth, height: newHeight });
            };

            const handleGlobalResizeEnd = () => {
                setIsResizing(false);
            };

            document.addEventListener('mousemove', handleGlobalResizeMove);
            document.addEventListener('mouseup', handleGlobalResizeEnd);

            return () => {
                document.removeEventListener('mousemove', handleGlobalResizeMove);
                document.removeEventListener('mouseup', handleGlobalResizeEnd);
            };
        }
    }, [isResizing, resizeStart, annotation.id, onUpdate, annotation.type]);

    return (
        <div 
            className={`group relative cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''} ${className}`}
            style={{ 
                width: annotation.width, 
                height: annotation.height,
                opacity: annotation.opacity 
            }}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >
            {children}
            
            {/* Delete Button */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(annotation.id);
                    }}
                    className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    title="Sil"
                >
                    <X size={12} />
                </button>
            </div>

            {/* Resize Handle */}
            {isSelected && (
                <div
                    onMouseDown={handleResizeStart}
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded-full cursor-se-resize hover:bg-blue-600 transition-colors"
                    title="Yeniden boyutlandır"
                />
            )}
        </div>
    );
};

const SignatureAnnotation: React.FC<SignatureAnnotationProps> = ({ annotation, onUpdate, onDelete, isSelected, onSelect }) => {
    return (
        <DraggableAnnotation
            annotation={annotation}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isSelected={isSelected}
            onSelect={onSelect}
            className="border-2 border-dashed border-blue-500 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden"
        >
            {annotation.signatureData ? (
                <img 
                    src={annotation.signatureData} 
                    alt="İmza"
                    className="w-full h-full object-contain"
                />
            ) : (
                <div className="text-blue-700 font-medium flex items-center">
                    <PenTool size={20} className="mr-2" />
                    İmza Alanı
                </div>
            )}
        </DraggableAnnotation>
    );
};

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onCancel, color, strokeWidth }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set up canvas
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;
        
        // Clear canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [color, strokeWidth]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
        setIsEmpty(false);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setIsEmpty(true);
    };

    const saveSignature = () => {
        if (isEmpty) return;
        
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dataURL = canvas.toDataURL();
        onSave(dataURL);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">İmza Oluşturun</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
                    <canvas
                        ref={canvasRef}
                        width={400}
                        height={200}
                        className="border border-gray-200 rounded cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                    />
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={clearCanvas}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Temizle
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        İptal
                    </button>
                    <button
                        onClick={saveSignature}
                        disabled={isEmpty}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

interface EditableTextProps {
    annotation: Annotation;
    onUpdate: (id: string, updates: Partial<Annotation>) => void;
    onDelete: (id: string) => void;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ annotation, onUpdate, onDelete, isSelected, onSelect }) => {
    const [isEditing, setIsEditing] = useState(annotation.isEditing || false);
    const [text, setText] = useState(annotation.text || 'Metin yazın...');
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
    
    const textRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEditing) {
            // Use textarea for multiline or input for single line
            if (annotation.type === 'sticky-note') {
                textRef.current?.focus();
                textRef.current?.select();
            } else {
                inputRef.current?.focus();
                inputRef.current?.select();
            }
        }
    }, [isEditing, annotation.type]);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(annotation.id);
        if (!isEditing && !isDragging && !isResizing) {
            setIsEditing(true);
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        onUpdate(annotation.id, { text: text.trim() || 'Metin yazın...', isEditing: false });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && annotation.type !== 'sticky-note') {
            e.preventDefault();
            handleSave();
        }
        if (e.key === 'Escape') {
            setIsEditing(false);
            setText(annotation.text || 'Metin yazın...');
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            handleSave();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    // Dragging functionality
    const handleMouseDown = (e: React.MouseEvent) => {
        if (isEditing) return;
        
        e.stopPropagation();
        onSelect(annotation.id);
        
        setIsDragging(true);
        setDragStart({
            x: e.clientX - annotation.x,
            y: e.clientY - annotation.y
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || isEditing) return;
        
        e.preventDefault();
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        onUpdate(annotation.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Resizing functionality
    const handleResizeStart = (e: React.MouseEvent, corner: string) => {
        e.stopPropagation();
        setIsResizing(true);
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            width: annotation.width || 100,
            height: annotation.height || 30
        });
    };

    const handleResizeMove = (e: React.MouseEvent) => {
        if (!isResizing) return;
        
        e.preventDefault();
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        const newWidth = Math.max(50, resizeStart.width + deltaX);
        const newHeight = Math.max(20, resizeStart.height + deltaY);
        
        onUpdate(annotation.id, { width: newWidth, height: newHeight });
    };

    const handleResizeEnd = () => {
        setIsResizing(false);
    };

    // Global mouse events
    useEffect(() => {
        if (isDragging) {
            const handleGlobalMouseMove = (e: MouseEvent) => {
                const newX = e.clientX - dragStart.x;
                const newY = e.clientY - dragStart.y;
                onUpdate(annotation.id, { x: newX, y: newY });
            };

            const handleGlobalMouseUp = () => {
                setIsDragging(false);
            };

            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove);
                document.removeEventListener('mouseup', handleGlobalMouseUp);
            };
        }
    }, [isDragging, dragStart, annotation.id, onUpdate]);

    useEffect(() => {
        if (isResizing) {
            const handleGlobalResizeMove = (e: MouseEvent) => {
                const deltaX = e.clientX - resizeStart.x;
                const deltaY = e.clientY - resizeStart.y;
                
                const newWidth = Math.max(50, resizeStart.width + deltaX);
                const newHeight = Math.max(20, resizeStart.height + deltaY);
                
                onUpdate(annotation.id, { width: newWidth, height: newHeight });
            };

            const handleGlobalResizeEnd = () => {
                setIsResizing(false);
            };

            document.addEventListener('mousemove', handleGlobalResizeMove);
            document.addEventListener('mouseup', handleGlobalResizeEnd);

            return () => {
                document.removeEventListener('mousemove', handleGlobalResizeMove);
                document.removeEventListener('mouseup', handleGlobalResizeEnd);
            };
        }
    }, [isResizing, resizeStart, annotation.id, onUpdate]);

    if (isEditing) {
        return (
            <div 
                ref={containerRef}
                className="relative"
                style={{
                    width: annotation.width || 100,
                    height: annotation.height || 30
                }}
            >
                {annotation.type === 'sticky-note' ? (
                    <textarea
                        ref={textRef}
                        value={text}
                        onChange={handleChange}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="w-full h-full p-2 border-2 border-blue-500 rounded resize-none focus:outline-none shadow-lg"
                        style={{
                            color: annotation.color,
                            fontSize: annotation.fontSize,
                            fontFamily: annotation.fontFamily || 'Arial',
                            backgroundColor: 'white'
                        }}
                        placeholder="Not yazın..."
                    />
                ) : (
                    <input
                        ref={inputRef}
                        type="text"
                        value={text}
                        onChange={handleChange}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="w-full h-full p-2 border-2 border-blue-500 rounded focus:outline-none shadow-lg"
                        style={{
                            color: annotation.color,
                            fontSize: annotation.fontSize,
                            fontFamily: annotation.fontFamily || 'Arial',
                            backgroundColor: 'white'
                        }}
                        placeholder="Metin yazın..."
                    />
                )}
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
                width: annotation.width || 100,
                height: annotation.height || 30
            }}
        >
            <div
                onMouseDown={handleMouseDown}
                onClick={handleClick}
                className={`w-full h-full p-2 rounded cursor-move border-2 transition-all ${
                    isSelected ? 'border-blue-500' : 'border-dashed border-transparent hover:border-blue-300'
                } ${
                    annotation.type === 'sticky-note' ? 'bg-yellow-100 border-yellow-300' : 'bg-white bg-opacity-80'
                } hover:bg-blue-50`}
                style={{
                    color: annotation.color,
                    fontSize: annotation.fontSize,
                    fontFamily: annotation.fontFamily || 'Arial',
                    opacity: annotation.opacity,
                    whiteSpace: annotation.type === 'sticky-note' ? 'pre-wrap' : 'nowrap',
                    overflow: 'hidden',
                    userSelect: 'none'
                }}
            >
                {text}
            </div>
            
            {/* Delete Button */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(annotation.id);
                    }}
                    className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    title="Sil"
                >
                    <X size={12} />
                </button>
            </div>

            {/* Resize Handle */}
            {isSelected && (
                <div
                    onMouseDown={handleResizeStart}
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded-full cursor-se-resize hover:bg-blue-600 transition-colors"
                    title="Yeniden boyutlandır"
                />
            )}
        </div>
    );
};

const SmallPdfEditor: React.FC = () => {
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
    const [selectedColor, setSelectedColor] = useState('#FF4444');
    const [fontSize, setFontSize] = useState(16);
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [opacity, setOpacity] = useState(1);
    const [isDrawing, setIsDrawing] = useState(false);    const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
    const [undoStack, setUndoStack] = useState<Annotation[][]>([]);    const [redoStack, setRedoStack] = useState<Annotation[][]>([]);
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    const tools = [
        { id: 'select', name: 'Seç', icon: <Mouse size={20} />, action: 'select', color: 'blue' },
        { id: 'text', name: 'Metin', icon: <Type size={20} />, action: 'text', color: 'green' },
        { id: 'highlight', name: 'Vurgula', icon: <Highlighter size={20} />, action: 'highlight', color: 'yellow' },
        { id: 'freehand', name: 'Çiz', icon: <Pen size={20} />, action: 'freehand', color: 'purple' },
        { id: 'rectangle', name: 'Kutu', icon: <Square size={20} />, action: 'rectangle', color: 'orange' },
        { id: 'circle', name: 'Daire', icon: <Circle size={20} />, action: 'circle', color: 'teal' },
        { id: 'signature', name: 'İmza', icon: <PenTool size={20} />, action: 'signature', color: 'indigo' },
        { id: 'sticky-note', name: 'Not', icon: <StickyNote size={20} />, action: 'sticky-note', color: 'pink' },
        { id: 'image', name: 'Resim', icon: <ImageIcon size={20} />, action: 'image', color: 'red' },
    ];

    const colors = [
        '#FF4444', '#44FF44', '#4444FF', '#FFFF44', '#FF44FF', '#44FFFF',
        '#FF8844', '#8844FF', '#44FF88', '#888888', '#000000', '#FFFFFF'
    ];

    // PDF Test function
    const createTestPDF = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const { jsPDF } = await import('jspdf');
            const doc = new jsPDF();
            
            // Title
            doc.setFontSize(24);
            doc.text('SmallPDF Benzeri Editör', 20, 30);
            
            // Subtitle
            doc.setFontSize(16);
            doc.text('Test Belgesi', 20, 50);
            
            // Content
            doc.setFontSize(12);
            doc.text('Bu belge PDF editörünün gelişmiş özelliklerini test etmek için oluşturulmuştur.', 20, 70);
            doc.text('', 20, 80);
            doc.text('Mevcut özellikler:', 20, 90);
            doc.text('✓ Metin ekleme ve düzenleme', 30, 105);
            doc.text('✓ Vurgulama ve işaretleme', 30, 120);
            doc.text('✓ Serbest çizim', 30, 135);
            doc.text('✓ Şekil ekleme (kutu, daire)', 30, 150);
            doc.text('✓ İmza alanları', 30, 165);
            doc.text('✓ Yapışkan notlar', 30, 180);
            doc.text('✓ Resim ekleme', 30, 195);
            
            // Box for testing
            doc.rect(20, 210, 60, 40);
            doc.text('Test Alanı', 30, 235);
            
            // Second page
            doc.addPage();
            doc.setFontSize(18);
            doc.text('İkinci Sayfa', 20, 30);
            doc.setFontSize(12);
            doc.text('Bu sayfada da editör özelliklerini test edebilirsiniz.', 20, 50);
            doc.text('Sayfa gezinme ile farklı sayfalara geçiş yapabilirsiniz.', 20, 70);
            
            const pdfBlob = doc.output('blob');
            const testFile = new File([pdfBlob], 'smallpdf-test.pdf', { type: 'application/pdf' });
            
            setFile(testFile);
            setIsLoading(false);
        } catch (error) {
            console.error('Test PDF oluşturma hatası:', error);
            setError('Test PDF oluşturulamadı');
            setIsLoading(false);
        }
    };

    // File handling
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
            setError(null);
        } else {
            setError('Lütfen PDF dosyası yükleyin');
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
            setError('Lütfen PDF dosyası seçin');
        }
    };

    // PDF events
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setCurrentPage(1);
        setError(null);
        setIsLoading(false);
    };

    const onDocumentLoadError = (error: Error) => {
        console.error('PDF yükleme hatası:', error);
        setIsLoading(false);
        setError(`PDF yüklenemedi: ${error.message}`);
    };

    // Zoom controls
    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.3));
    const resetZoom = () => setScale(1.2);

    // Page navigation
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= numPages) {
            setCurrentPage(page);
        }
    };

    // Undo/Redo
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
    };    // Annotation handling
    const updateAnnotation = (id: string, updates: Partial<Annotation>) => {
        setAnnotations(prev => 
            prev.map(ann => ann.id === id ? { ...ann, ...updates } : ann)
        );
    };

    const deleteAnnotation = (id: string) => {
        addToUndoStack();
        setAnnotations(prev => prev.filter(ann => ann.id !== id));
        if (selectedAnnotation === id) {
            setSelectedAnnotation(null);
        }
    };

    // Move selected annotation
    const moveAnnotation = (direction: 'up' | 'down' | 'left' | 'right', step: number = 5) => {
        if (!selectedAnnotation) return;
        
        const annotation = annotations.find(ann => ann.id === selectedAnnotation);
        if (!annotation) return;

        let updates: Partial<Annotation> = {};
        
        switch (direction) {
            case 'up':
                updates.y = Math.max(0, annotation.y - step);
                break;
            case 'down':
                updates.y = annotation.y + step;
                break;
            case 'left':
                updates.x = Math.max(0, annotation.x - step);
                break;
            case 'right':
                updates.x = annotation.x + step;
                break;
        }
        
        updateAnnotation(selectedAnnotation, updates);
    };

    // Move annotation by line (bigger steps)
    const moveAnnotationByLine = (direction: 'up' | 'down') => {
        moveAnnotation(direction, 20); // Larger step for line movement
    };const handleCanvasClick = (e: React.MouseEvent) => {
        // Clear selection when clicking on empty canvas
        if (selectedTool === 'select') {
            setSelectedAnnotation(null);
            return;
        }

        if (!pageRef.current || selectedTool === 'hand') return;

        // Special handling for signature tool
        if (selectedTool === 'signature') {
            setShowSignaturePad(true);
            return;
        }

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
            width: selectedTool === 'text' ? 200 : selectedTool === 'sticky-note' ? 150 : 100,
            height: selectedTool === 'text' ? 40 : selectedTool === 'sticky-note' ? 100 : 60,
            text: selectedTool === 'text' ? 'Metin yazın...' : 
                  selectedTool === 'sticky-note' ? 'Not yazın...' : undefined,
            fontSize,
            color: selectedColor,
            backgroundColor: selectedTool === 'highlight' ? selectedColor + '40' : 
                           selectedTool === 'sticky-note' ? '#FFEB3B80' : undefined,
            strokeWidth,
            opacity,
            isEditing: selectedTool === 'text' || selectedTool === 'sticky-note'
        };

        setAnnotations(prev => [...prev, newAnnotation]);
        
        // Select the newly created annotation
        setSelectedAnnotation(newAnnotation.id);
    };

    // Signature handling
    const handleSignatureSave = (signatureData: string) => {
        if (!pageRef.current) return;

        addToUndoStack();

        const newAnnotation: Annotation = {
            id: Date.now().toString(),
            type: 'signature',
            pageNumber: currentPage,
            x: 100, // Default position
            y: 100,
            width: 200,
            height: 100,
            signatureData,
            opacity
        };

        setAnnotations(prev => [...prev, newAnnotation]);
        setShowSignaturePad(false);
        setSelectedTool('select');
    };

    const handleSignatureCancel = () => {
        setShowSignaturePad(false);
        setSelectedTool('select');
    };

    // Drawing for freehand
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
    };    const handleMouseUp = () => {
        if (isDrawing && selectedTool === 'freehand' && currentPath.length > 1) {
            addToUndoStack();
            
            // Calculate bounds of the path
            const minX = Math.min(...currentPath.map(p => p.x));
            const minY = Math.min(...currentPath.map(p => p.y));
            const maxX = Math.max(...currentPath.map(p => p.x));
            const maxY = Math.max(...currentPath.map(p => p.y));
            
            const newAnnotation: Annotation = {
                id: Date.now().toString(),
                type: 'freehand',
                pageNumber: currentPage,
                x: minX,
                y: minY,
                width: maxX - minX + strokeWidth * 2,
                height: maxY - minY + strokeWidth * 2,
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

    // Download
    const handleDownload = async () => {
        if (!file) return;
        
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `edited_${file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const currentPageAnnotations = annotations.filter(ann => ann.pageNumber === currentPage);    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Annotation movement with arrow keys
            if (selectedAnnotation && !e.ctrlKey && !e.metaKey && !e.altKey) {
                switch (e.key) {
                    case 'ArrowUp':
                        e.preventDefault();
                        if (e.shiftKey) {
                            moveAnnotationByLine('up'); // Shift + Arrow = line movement
                        } else {
                            moveAnnotation('up', 1); // Single pixel movement
                        }
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        if (e.shiftKey) {
                            moveAnnotationByLine('down');
                        } else {
                            moveAnnotation('down', 1);
                        }
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        moveAnnotation('left', e.shiftKey ? 10 : 1);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        moveAnnotation('right', e.shiftKey ? 10 : 1);
                        break;
                    case 'Delete':
                    case 'Backspace':
                        e.preventDefault();
                        deleteAnnotation(selectedAnnotation);
                        break;
                }
            }

            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            handleRedo();
                        } else {
                            handleUndo();
                        }
                        break;
                    case 'y':
                        e.preventDefault();
                        handleRedo();
                        break;
                    case '=':
                    case '+':
                        e.preventDefault();
                        handleZoomIn();
                        break;
                    case '-':
                        e.preventDefault();
                        handleZoomOut();
                        break;
                    case '0':
                        e.preventDefault();
                        resetZoom();
                        break;
                }
            }
            
            // Tool shortcuts (only when no annotation is selected)
            if (!selectedAnnotation && !e.ctrlKey && !e.metaKey && !e.altKey) {
                switch (e.key) {
                    case 'Escape':
                        setSelectedTool('select');
                        setShowSignaturePad(false);
                        setSelectedAnnotation(null);
                        break;
                    case 't':
                        setSelectedTool('text');
                        break;
                    case 'h':
                        setSelectedTool('highlight');
                        break;
                    case 'p':
                        setSelectedTool('freehand');
                        break;
                    case 'r':
                        setSelectedTool('rectangle');
                        break;
                    case 'c':
                        setSelectedTool('circle');
                        break;
                    case 's':
                        setSelectedTool('signature');
                        break;
                    case 'n':
                        setSelectedTool('sticky-note');
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undoStack, redoStack, scale, selectedAnnotation]);

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-900">PDF Editör</h1>
                    {file && (
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full max-w-xs truncate">
                            {file.name}
                        </span>
                    )}
                </div>

                {file && (
                    <div className="flex items-center space-x-3">
                        {/* Undo/Redo */}
                        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={handleUndo}
                                disabled={undoStack.length === 0}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Geri Al (Ctrl+Z)"
                            >
                                <Undo size={18} />
                            </button>
                            <button
                                onClick={handleRedo}
                                disabled={redoStack.length === 0}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="İleri Al (Ctrl+Y)"
                            >
                                <Redo size={18} />
                            </button>
                        </div>

                        {/* Zoom Controls */}
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={handleZoomOut}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
                                title="Uzaklaştır"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="text-sm text-gray-700 min-w-[50px] text-center font-medium">
                                {Math.round(scale * 100)}%
                            </span>
                            <button
                                onClick={handleZoomIn}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
                                title="Yakınlaştır"
                            >
                                <Plus size={18} />
                            </button>
                        </div>

                        {/* Page Navigation */}
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex items-center space-x-1">
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
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        {/* Download Button */}
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
                {/* Tools Sidebar */}
                {file && (
                    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-2">
                        {tools.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => setSelectedTool(tool.action)}
                                className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all ${
                                    selectedTool === tool.action
                                        ? `bg-${tool.color}-100 text-${tool.color}-700 border-2 border-${tool.color}-300`
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                                title={tool.name}
                            >
                                {tool.icon}
                                <span className="text-xs mt-1 font-medium">{tool.name}</span>
                            </button>
                        ))}
                    </div>
                )}                {/* Properties Panel */}
                {file && (selectedTool !== 'select' || selectedAnnotation) && (
                    <div className="w-64 bg-white border-r border-gray-200 p-4">
                        <h3 className="font-semibold text-gray-900 mb-4">
                            {selectedAnnotation ? 'Seçili Öğe' : 'Özellikler'}
                        </h3>
                        
                        {/* Movement Controls for Selected Annotation */}
                        {selectedAnnotation && (
                            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-medium text-blue-900 mb-3">Hareket Kontrolleri</h4>
                                
                                {/* Directional Controls */}
                                <div className="grid grid-cols-3 gap-1 mb-3">
                                    <div></div>
                                    <button
                                        onClick={() => moveAnnotationByLine('up')}
                                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                                        title="Yukarı (Shift+↑)"
                                    >
                                        ↑
                                    </button>
                                    <div></div>
                                    
                                    <button
                                        onClick={() => moveAnnotation('left', 10)}
                                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                                        title="Sola (Shift+←)"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={() => setSelectedAnnotation(null)}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-xs"
                                        title="Seçimi Kaldır"
                                    >
                                        ●
                                    </button>
                                    <button
                                        onClick={() => moveAnnotation('right', 10)}
                                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                                        title="Sağa (Shift+→)"
                                    >
                                        →
                                    </button>
                                    
                                    <div></div>
                                    <button
                                        onClick={() => moveAnnotationByLine('down')}
                                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                                        title="Aşağı (Shift+↓)"
                                    >
                                        ↓
                                    </button>
                                    <div></div>
                                </div>
                                
                                {/* Fine Movement */}
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <button
                                        onClick={() => moveAnnotation('up', 1)}
                                        className="px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded text-xs transition-colors"
                                        title="1px Yukarı (↑)"
                                    >
                                        ↑ 1px
                                    </button>
                                    <button
                                        onClick={() => moveAnnotation('down', 1)}
                                        className="px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded text-xs transition-colors"
                                        title="1px Aşağı (↓)"
                                    >
                                        ↓ 1px
                                    </button>
                                </div>
                                
                                {/* Delete Button */}
                                <button
                                    onClick={() => deleteAnnotation(selectedAnnotation)}
                                    className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors flex items-center justify-center space-x-2"
                                    title="Sil (Delete)"
                                >
                                    <Trash2 size={14} />
                                    <span>Sil</span>
                                </button>
                                
                                <div className="mt-3 text-xs text-blue-700">
                                    <p>💡 İpucu:</p>
                                    <p>• Ok tuşları: 1px hareket</p>
                                    <p>• Shift+Ok: Hızlı hareket</p>
                                    <p>• Delete: Sil</p>
                                </div>
                            </div>
                        )}
                        
                        {/* Color Picker */}
                        {selectedTool !== 'select' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Renk</label>
                                <div className="grid grid-cols-6 gap-2 mb-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-lg border-2 transition-all ${
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
                                    className="w-full h-8 rounded border border-gray-300"
                                />
                            </div>
                        )}                        {/* Font Size for Text */}
                        {(selectedTool === 'text' || selectedTool === 'sticky-note') && (
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

                        {/* Stroke Width for Drawing */}
                        {(selectedTool === 'freehand' || selectedTool === 'rectangle' || selectedTool === 'circle') && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Çizgi Kalınlığı: {strokeWidth}px
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={strokeWidth}
                                    onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        )}

                        {/* Opacity */}
                        {selectedTool !== 'select' && (
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
                        )}

                        {/* Annotations List */}
                        {currentPageAnnotations.length > 0 && (
                            <div className="border-t border-gray-200 pt-4">
                                <h4 className="font-medium text-gray-900 mb-2">
                                    Bu Sayfadaki Notlar ({currentPageAnnotations.length})
                                </h4>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {currentPageAnnotations.map((annotation) => (
                                        <div 
                                            key={annotation.id} 
                                            className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                                                selectedAnnotation === annotation.id 
                                                    ? 'bg-blue-100 border border-blue-300' 
                                                    : 'bg-gray-50 hover:bg-gray-100'
                                            }`}
                                            onClick={() => setSelectedAnnotation(annotation.id)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <div
                                                    className="w-3 h-3 rounded-full border"
                                                    style={{ backgroundColor: annotation.color }}
                                                />
                                                <span className="text-xs text-gray-600 truncate max-w-[120px]">
                                                    {annotation.type === 'text' ? 'Metin' :
                                                     annotation.type === 'highlight' ? 'Vurgu' :
                                                     annotation.type === 'freehand' ? 'Çizim' :
                                                     annotation.type === 'rectangle' ? 'Kutu' :
                                                     annotation.type === 'circle' ? 'Daire' :
                                                     annotation.type === 'signature' ? 'İmza' :
                                                     annotation.type === 'sticky-note' ? 'Not' : 'Öğe'}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteAnnotation(annotation.id);
                                                }}
                                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                                title="Sil"
                                            >
                                                <Trash2 size={12} />
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
                                <FileText className="mx-auto h-20 w-20 text-gray-400 mb-6" />
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    SmallPDF Benzeri Editör
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
                                
                                <div className="space-y-4">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    >
                                        <Upload size={24} />
                                        <span className="text-lg font-medium">PDF Dosyası Seç</span>
                                    </button>
                                    
                                    <div>
                                        <button
                                            onClick={createTestPDF}
                                            disabled={isLoading}
                                            className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                        >
                                            <FileText size={20} />
                                            <span className="font-medium">
                                                {isLoading ? 'Oluşturuluyor...' : 'Demo PDF Oluştur'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-700 text-sm">{error}</p>
                                    </div>
                                )}
                            </div>

                            {/* Features Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                        <Type className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Akıllı Metin Editörü</h3>
                                    <p className="text-gray-600 text-sm">Tıklayarak düzenleyin, Enter ile kaydedin. SmallPDF benzeri deneyim.</p>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                                        <Highlighter className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Akıllı Vurgulama</h3>
                                    <p className="text-gray-600 text-sm">Önemli bölümleri vurgulayın ve renkli işaretlemeler yapın</p>
                                </div>
                                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                        <PenTool className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">İmza Desteği</h3>
                                    <p className="text-gray-600 text-sm">Dijital imza alanları ekleyin ve belgeleri imzalayın</p>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                                        <StickyNote className="h-6 w-6 text-pink-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Yapışkan Notlar</h3>
                                    <p className="text-gray-600 text-sm">Sayfalara yapışkan notlar ekleyin ve yorum yapın</p>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                                        <Pen className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Serbest Çizim</h3>
                                    <p className="text-gray-600 text-sm">El yazısı notlar ve çizimler ekleyin</p>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                                        <Download className="h-6 w-6 text-teal-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Hızlı İndirme</h3>
                                    <p className="text-gray-600 text-sm">Düzenlenmiş PDF'inizi hemen indirin</p>
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
                                            <X className="h-5 w-5 text-red-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm">{error}</p>
                                        </div>
                                        <button 
                                            onClick={() => setError(null)}
                                            className="ml-auto"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div 
                                ref={pageRef}
                                className="relative"
                                onClick={handleCanvasClick}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                style={{ 
                                    cursor: selectedTool === 'select' ? 'default' : 
                                           selectedTool === 'hand' ? 'grab' : 'crosshair' 
                                }}
                            >
                                <Document
                                    file={file}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    onLoadError={onDocumentLoadError}
                                    loading={
                                        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-xl min-h-[500px]">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                                            <span className="text-gray-600 font-medium">PDF yükleniyor...</span>
                                            <span className="text-sm text-gray-500 mt-2">Lütfen bekleyin</span>
                                        </div>
                                    }
                                    error={
                                        <div className="p-12 text-center bg-white rounded-lg shadow-xl min-h-[500px] flex flex-col items-center justify-center">
                                            <div className="text-red-600 mb-4">
                                                <FileText size={64} />
                                            </div>
                                            <div className="text-red-600 mb-2 font-semibold text-lg">PDF yüklenemedi</div>
                                            <div className="text-gray-600 mb-4">Dosya bozuk olabilir veya desteklenmeyen bir format olabilir</div>
                                            <button 
                                                onClick={() => setFile(null)}
                                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
                                            <div className="flex items-center justify-center p-8 min-h-[400px]">
                                                <div className="text-center">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                                    <span className="text-gray-600">Sayfa yükleniyor...</span>
                                                </div>
                                            </div>
                                        }
                                        error={
                                            <div className="p-8 text-center text-red-600 min-h-[400px] flex items-center justify-center">
                                                <div>
                                                    <div className="text-red-500 mb-2">⚠️</div>
                                                    <div>Sayfa {currentPage} yüklenemedi</div>
                                                </div>
                                            </div>
                                        }
                                    />
                                </Document>
                                
                                {/* Annotations Overlay */}
                                {currentPageAnnotations.map((annotation) => (
                                    <div
                                        key={annotation.id}
                                        className="absolute"
                                        style={{
                                            left: annotation.x,
                                            top: annotation.y,
                                            width: annotation.width,
                                            height: annotation.height,
                                            zIndex: 10
                                        }}
                                    >                                        {annotation.type === 'text' && (
                                            <EditableText
                                                annotation={annotation}
                                                onUpdate={updateAnnotation}
                                                onDelete={deleteAnnotation}
                                                isSelected={selectedAnnotation === annotation.id}
                                                onSelect={setSelectedAnnotation}
                                            />
                                        )}
                                        
                                        {annotation.type === 'sticky-note' && (
                                            <div className="relative">
                                                <EditableText
                                                    annotation={annotation}
                                                    onUpdate={updateAnnotation}
                                                    onDelete={deleteAnnotation}
                                                    isSelected={selectedAnnotation === annotation.id}
                                                    onSelect={setSelectedAnnotation}
                                                />
                                                <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                                            </div>
                                        )}                                        {annotation.type === 'signature' && (
                                            <SignatureAnnotation
                                                annotation={annotation}
                                                onUpdate={updateAnnotation}
                                                onDelete={deleteAnnotation}
                                                isSelected={selectedAnnotation === annotation.id}
                                                onSelect={setSelectedAnnotation}
                                            />
                                        )}
                                          {annotation.type === 'rectangle' && (
                                            <DraggableAnnotation
                                                annotation={annotation}
                                                onUpdate={updateAnnotation}
                                                onDelete={deleteAnnotation}
                                                isSelected={selectedAnnotation === annotation.id}
                                                onSelect={setSelectedAnnotation}
                                            >
                                                <div 
                                                    className="border w-full h-full"
                                                    style={{
                                                        borderColor: annotation.color,
                                                        borderWidth: annotation.strokeWidth,
                                                        opacity: annotation.opacity
                                                    }}
                                                />
                                            </DraggableAnnotation>
                                        )}
                                        
                                        {annotation.type === 'circle' && (
                                            <DraggableAnnotation
                                                annotation={annotation}
                                                onUpdate={updateAnnotation}
                                                onDelete={deleteAnnotation}
                                                isSelected={selectedAnnotation === annotation.id}
                                                onSelect={setSelectedAnnotation}
                                            >
                                                <div 
                                                    className="border rounded-full w-full h-full"
                                                    style={{
                                                        borderColor: annotation.color,
                                                        borderWidth: annotation.strokeWidth,
                                                        opacity: annotation.opacity
                                                    }}
                                                />
                                            </DraggableAnnotation>
                                        )}
                                        
                                        {annotation.type === 'highlight' && (
                                            <DraggableAnnotation
                                                annotation={annotation}
                                                onUpdate={updateAnnotation}
                                                onDelete={deleteAnnotation}
                                                isSelected={selectedAnnotation === annotation.id}
                                                onSelect={setSelectedAnnotation}
                                            >
                                                <div 
                                                    className="w-full h-full"
                                                    style={{
                                                        backgroundColor: annotation.backgroundColor,
                                                        opacity: annotation.opacity
                                                    }}
                                                />
                                            </DraggableAnnotation>
                                        )}
                                        
                                        {annotation.type === 'freehand' && annotation.path && (
                                            <DraggableAnnotation
                                                annotation={annotation}
                                                onUpdate={updateAnnotation}
                                                onDelete={deleteAnnotation}
                                                isSelected={selectedAnnotation === annotation.id}
                                                onSelect={setSelectedAnnotation}
                                            >
                                                <svg
                                                    className="absolute top-0 left-0 pointer-events-none w-full h-full"
                                                    width={annotation.width}
                                                    height={annotation.height}
                                                >
                                                    <path
                                                        d={`M ${annotation.path.map(p => 
                                                            `${p.x - Math.min(...annotation.path!.map(p => p.x))} ${p.y - Math.min(...annotation.path!.map(p => p.y))}`
                                                        ).join(' L ')}`}
                                                        stroke={annotation.color}
                                                        strokeWidth={annotation.strokeWidth}
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        opacity={annotation.opacity}
                                                    />
                                                </svg>
                                            </DraggableAnnotation>
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
                        </div>                    )}
                </div>
            </div>
            
            {/* Signature Pad Modal */}
            {showSignaturePad && (
                <SignaturePad
                    onSave={handleSignatureSave}
                    onCancel={handleSignatureCancel}
                    color={selectedColor}
                    strokeWidth={strokeWidth}
                />
            )}
        </div>
    );
};

export default SmallPdfEditor;
