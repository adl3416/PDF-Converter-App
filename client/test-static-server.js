const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the test page
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test-smallpdf-editor.html'));
});

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Test server running at http://localhost:${PORT}`);
    console.log(`Test page available at http://localhost:${PORT}/test`);
});
