import { useState } from 'react';

export const useFileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('No file selected');
        }
    };

    const clearFile = () => {
        setFile(null);
        setError(null);
    };

    return {
        file,
        error,
        handleFileChange,
        clearFile,
    };
};