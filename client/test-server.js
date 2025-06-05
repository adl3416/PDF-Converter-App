const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Statik dosyaları serve et
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Test Server</title></head>
            <body>
                <h1>Test Server Çalışıyor!</h1>
                <p>Bu basit Express sunucusu çalışıyor.</p>
                <a href="/test.html">Test HTML sayfasına git</a>
            </body>
        </html>
    `);
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Test sunucusu http://localhost:${PORT} adresinde çalışıyor`);
    console.log(`Test sunucusu http://127.0.0.1:${PORT} adresinde çalışıyor`);
});
