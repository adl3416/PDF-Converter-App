import React, { useState, useRef } from 'react';
import { Shield, Zap, File, Divide } from 'lucide-react';
import { getPdfPageImages } from '../utils/pdfPreview';

const faqs = [
  {
    q: 'How do I split a PDF into individual pages?',
    a: 'Simply upload your PDF, select the pages you want to extract, and click Split PDF. Each selected page will be saved as a separate PDF file.',
  },
  {
    q: 'How do I split a PDF into equal parts?',
    a: 'You can specify how many parts you want to divide your PDF into, and our tool will automatically calculate the page ranges for equal distribution.',
  },
  {
    q: 'What’s the maximum file size I can split?',
    a: 'The tool can handle large PDF files, but for best results, we recommend files under 100MB.',
  },
  {
    q: 'Can I split a PDF into specific page ranges?',
    a: 'Yes! Use the page ranges field to define custom ranges like 1-5, 10, 15-20. Each range will become a separate PDF file.',
  },
  {
    q: 'Is my PDF data secure during splitting?',
    a: 'Absolutely! All PDF processing happens locally or securely on our server. Your files are never shared.',
  },
  {
    q: 'Can I download all split files at once?',
    a: 'Yes! After splitting, you can download all files individually or as a ZIP archive.',
  },
];

const SplitPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [splitMethod, setSplitMethod] = useState<'select' | 'range' | 'equal'>('select');
  const [pageRange, setPageRange] = useState('');
  const [equalParts, setEqualParts] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setLoading(true);
      // Get page previews (placeholder)
      const images = await getPdfPageImages(e.target.files[0]);
      setPageImages(images);
      setSelectedPages(images.map((_, i) => i + 1)); // Select all by default
      setLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
      setLoading(true);
      const images = await getPdfPageImages(e.dataTransfer.files[0]);
      setPageImages(images);
      setSelectedPages(images.map((_, i) => i + 1));
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    setSelectedPages(pageImages.map((_, i) => i + 1));
  };
  const handleDeselectAll = () => {
    setSelectedPages([]);
  };
  const handleTogglePage = (page: number) => {
    setSelectedPages(prev => prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page]);
  };

  const handleSplit = async () => {
    setError(null);
    if (!file) {
      setError('Dosya seçilmeli.');
      return;
    }
    let pages = '';
    if (splitMethod === 'select') {
      if (selectedPages.length === 0) {
        setError('En az bir sayfa seçilmeli.');
        return;
      }
      pages = selectedPages.join(',');
    } else if (splitMethod === 'range') {
      if (!pageRange.trim()) {
        setError('Sayfa aralığı girilmeli.');
        return;
      }
      pages = pageRange;
    } else if (splitMethod === 'equal') {
      if (!equalParts || equalParts < 2 || !pageImages.length) {
        setError('Geçerli parça sayısı girilmeli.');
        return;
      }
      const total = pageImages.length;
      const partSize = Math.ceil(total / equalParts);
      let ranges = [];
      for (let i = 0; i < equalParts; i++) {
        const start = i * partSize + 1;
        const end = Math.min((i + 1) * partSize, total);
        ranges.push(start === end ? `${start}` : `${start}-${end}`);
      }
      pages = ranges.join(',');
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pages', pages);
    try {
      const res = await fetch('/api/convert/split-pdf', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('PDF split error');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'split.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('PDF split error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f6fd] py-10 px-2">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 text-center mb-2">Split PDF Documents</h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Easily split your PDF files into separate documents. Extract specific pages, create custom ranges, or divide large PDFs into smaller, manageable files with our powerful online tool.
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center mb-8 border border-gray-200"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              style={{ minHeight: 220 }}
            >
              <div className="text-3xl text-gray-400 mb-2">↑</div>
              <div className="font-semibold text-lg mb-2">Upload PDF to Split</div>
              <div className="text-gray-500 mb-4">Drag and drop your PDF file here, or click to browse</div>
              <button
                className="bg-purple-600 text-white px-5 py-2 rounded font-semibold shadow hover:bg-purple-700"
                onClick={() => fileInputRef.current?.click()}
              >
                {file ? file.name : 'Choose PDF File'}
              </button>
              <input type="file" accept="application/pdf" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            </div>
            {pageImages.length > 0 && (
              <div className="mb-4">
                <div className="mb-4 flex gap-2">
                  <button
                    className={`flex-1 py-2 rounded-lg font-semibold border ${splitMethod === 'select' ? 'bg-white border-purple-500 text-purple-700 shadow' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                    onClick={() => setSplitMethod('select')}
                  >Select Pages</button>
                  <button
                    className={`flex-1 py-2 rounded-lg font-semibold border ${splitMethod === 'range' ? 'bg-white border-purple-500 text-purple-700 shadow' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                    onClick={() => setSplitMethod('range')}
                  >Page Ranges</button>
                  <button
                    className={`flex-1 py-2 rounded-lg font-semibold border ${splitMethod === 'equal' ? 'bg-white border-purple-500 text-purple-700 shadow' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                    onClick={() => setSplitMethod('equal')}
                  >Equal Parts</button>
                </div>
                {splitMethod === 'select' && (
                  <>
                    <div className="flex gap-2 mb-2">
                      <button className="bg-gray-200 px-3 py-1 rounded" onClick={handleSelectAll}>Select All</button>
                      <button className="bg-gray-200 px-3 py-1 rounded" onClick={handleDeselectAll}>Deselect All</button>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {pageImages.map((img, i) => (
                        <div key={i} className={`border rounded-lg p-1 flex flex-col items-center cursor-pointer ${selectedPages.includes(i+1) ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'}`} onClick={() => handleTogglePage(i+1)}>
                          <div className="w-20 h-28 bg-gray-100 flex items-center justify-center text-gray-400 text-xs mb-1">
                            {img ? <img src={img} alt={`Page ${i+1}`} className="w-full h-full object-contain" /> : <span>Page {i+1}</span>}
                          </div>
                          <input type="checkbox" checked={selectedPages.includes(i+1)} readOnly />
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {splitMethod === 'range' && (
                  <div className="mb-2 flex flex-col items-start">
                    <label className="font-semibold mb-1">Page Ranges</label>
                    <input type="text" className="border rounded px-2 py-1 w-48" placeholder="e.g. 1-5,8,10-12" value={pageRange} onChange={e => setPageRange(e.target.value)} />
                  </div>
                )}
                {splitMethod === 'equal' && (
                  <div className="mb-2 flex flex-col items-start">
                    <label className="font-semibold mb-1">Equal Parts</label>
                    <input type="number" min={2} max={pageImages.length} className="border rounded px-2 py-1 w-24" value={equalParts} onChange={e => setEqualParts(Number(e.target.value))} />
                  </div>
                )}
              </div>
            )}
            <button onClick={handleSplit} disabled={loading || selectedPages.length === 0} className="bg-purple-600 text-white px-6 py-2 rounded font-semibold hover:bg-purple-700 transition-all w-full mt-2">
              {loading ? 'Splitting...' : 'Split PDF'}
            </button>
            {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
          </div>
          <div className="flex flex-col gap-6 w-full md:w-72">
            <div className="bg-white rounded-xl shadow p-5 mb-2">
              <h4 className="font-bold text-lg mb-2 text-purple-700">How It Works</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Select Pages</li>
                <li>• Page Ranges</li>
                <li>• Equal Parts</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-5 mb-2">
              <h4 className="font-bold text-lg mb-2 text-purple-700">Quick Steps</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>1. Upload PDF</li>
                <li>2. Choose Method</li>
                <li>3. Preview Pages</li>
                <li>4. Download</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Zap className="w-8 h-8 text-purple-500 mb-2" />
            <div className="font-bold text-purple-700 mb-1">Lightning Fast</div>
            <div className="text-gray-600 text-sm text-center">Advanced PDF.js engine for quick and reliable splitting</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Shield className="w-8 h-8 text-purple-500 mb-2" />
            <div className="font-bold text-purple-700 mb-1">Privacy Focused</div>
            <div className="text-gray-600 text-sm text-center">Client-side or secure server processing keeps your documents safe and private</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Divide className="w-8 h-8 text-purple-500 mb-2" />
            <div className="font-bold text-purple-700 mb-1">Flexible Splitting</div>
            <div className="text-gray-600 text-sm text-center">Multiple splitting options to suit your specific needs</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 mt-8">
          <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
            <span className="mr-2">❓</span>Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="mb-4">
                <div className="font-semibold text-gray-800 mb-1">{faq.q}</div>
                <div className="text-gray-600 text-sm">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitPdf;
