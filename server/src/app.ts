import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/upload';
import convertRoutes from './routes/convert';

console.log('Starting PDF Converter Server...');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Setting up middleware...');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('Setting up routes...');
app.use('/api/upload', uploadRoutes);
app.use('/api/convert', convertRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('- POST /api/convert/word-to-pdf');
    console.log('- POST /api/convert/pdf-to-excel');
    console.log('- POST /api/convert/pdf-to-word');
    console.log('- POST /api/convert/pdf-to-powerpoint');
    console.log('- POST /api/convert/image-to-pdf');
    console.log('- POST /api/convert/pdf-to-image');
    console.log('- POST /api/convert/excel-to-pdf');
    console.log('- GET /api/health');
});

export default app;