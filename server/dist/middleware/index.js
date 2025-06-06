"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileUpload = exports.logRequest = void 0;
const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
exports.logRequest = logRequest;
const validateFileUpload = (req, res, next) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    next();
};
exports.validateFileUpload = validateFileUpload;
