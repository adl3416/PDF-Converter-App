const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Statik dosyaları serve et
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Ana sayfa - PDF Editor Test
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>PDF Editor Test</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .container { max-width: 800px; margin: 0 auto; }
                    .link { display: inline-block; margin: 10px; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
                    .link:hover { background: #0056b3; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>PDF Editor Test Server</h1>
                    <p>PDF editörünü test etmek için aşağıdaki linklerden birini kullanın:</p>
                    
                    <a href="/test-pdf-editor.html" class="link">Basit PDF Test</a>
                    <a href="/test.html" class="link">HTML Test Sayfası</a>
                    
                    <h2>React PDF Editor</h2>
                    <p>React uygulaması için Vite dev server kullanın:</p>
                    <code>npm run dev</code>
                    
                    <h2>Test PDF Dosyaları</h2>
                    <p>Test için PDF dosyalarını yükleyebilir veya "Test PDF Oluştur" butonunu kullanabilirsiniz.</p>
                </div>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`\\n🚀 Test sunucusu çalışıyor:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`   http://127.0.0.1:${PORT}`);
    console.log(`\\n📁 Statik dosyalar:`);
    console.log(`   /test-pdf-editor.html - PDF test sayfası`);
    console.log(`   /test.html - HTML test sayfası`);
    console.log(`\\n💡 React dev server için: npm run dev\\n`);
});
