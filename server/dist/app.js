"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const upload_1 = __importDefault(require("./routes/upload"));
const convert_1 = __importDefault(require("./routes/convert"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/upload', upload_1.default);
app.use('/api/convert', convert_1.default);
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
console.log('Setting up routes...');
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('- POST /api/convert/word-to-pdf');
    console.log('- GET /api/health');
});
exports.default = app;
