export interface FileUploadResponse {
    success: boolean;
    message: string;
    fileUrl?: string;
}

export interface ConversionRequest {
    fileName: string;
    fileType: 'word' | 'excel' | 'pdf';
}

export interface ConversionResponse {
    success: boolean;
    message: string;
    convertedFileUrl?: string;
}

export interface PdfEditorState {
    currentPage: number;
    totalPages: number;
    zoomLevel: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
}