import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/upload';
import convertRoutes from './routes/convert';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/upload', uploadRoutes);
app.use('/api/convert', convertRoutes);

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

export default app;