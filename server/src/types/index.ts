export interface FileUploadResponse {
    success: boolean;
    message: string;
    fileUrl?: string;
}

export interface ConvertRequest {
    filePath: string;
    targetFormat: 'pdf' | 'docx' | 'xlsx';
}

export interface ConvertResponse {
    success: boolean;
    message: string;
    convertedFileUrl?: string;
}

export interface ErrorResponse {
    success: boolean;
    error: string;
}