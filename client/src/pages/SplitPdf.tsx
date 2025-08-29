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
    <div className="min-h-screen bg-[#f7f6fd] py-10 px-2 flex flex-col items-center">
      <div className="max-w-3xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 text-center mb-2 max-w-3xl w-full">Split PDF Documents</h1>
        <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl w-full mx-auto">
          Easily split your PDF files into separate documents. Extract specific pages, create custom ranges, or divide large PDFs into smaller, manageable files with our powerful online tool.
        </p>
        <div>
          <div
            className="w-full min-h-[220px] border-4 border-dashed border-purple-400 rounded-2xl flex flex-col items-center justify-center bg-white shadow-lg mb-6 relative hover:border-purple-600 transition-all duration-200"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <span className="bg-purple-500 text-white rounded-full px-6 py-3 text-3xl shadow-lg flex items-center gap-2">
                ↑
              </span>
            </div>
            <input type="file" accept="application/pdf" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full py-16" onClick={() => fileInputRef.current?.click()}>
              <File className="w-12 h-12 text-purple-400 mb-4" />
              <span className="text-lg text-gray-700 font-semibold">Upload PDF to Split</span>
              <span className="text-sm text-gray-400 mt-2">Drag and drop or click to select a PDF file</span>
            </label>
            {file && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">{file.name}</span>
              </div>
            )}
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
          <button onClick={handleSplit} disabled={loading || (splitMethod === 'select' && selectedPages.length === 0)} className="bg-purple-600 text-white px-6 py-2 rounded font-semibold hover:bg-purple-700 transition-all w-full mt-2">
            {loading ? 'Splitting...' : 'Split PDF'}
          </button>
          {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
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
    </div>


  );
}
export default SplitPdf;
