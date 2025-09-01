import React, { useState } from "react";
import { ArrowUp, FilePlus, File, Shield, Zap, Download, CheckCircle, Image, Edit3, Divide } from "lucide-react";
import { Link } from "react-router-dom";

const MergePdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArr = Array.from(e.target.files);
      setFiles(fileArr);
      setError("");
      setSuccess("");
      // PDF preview
      setPreviews(fileArr.map(file => URL.createObjectURL(file)));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const fileArr = Array.from(e.dataTransfer.files);
      setFiles(fileArr);
      setError("");
      setSuccess("");
      setPreviews(fileArr.map(file => URL.createObjectURL(file)));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Lütfen en az iki PDF dosyası seçin.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      files.forEach((file, idx) => {
        formData.append("files", file);
      });
      const response = await fetch("/api/convert/merge-pdf", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Birleştirme başarısız oldu.");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setSuccess("PDF dosyaları başarıyla birleştirildi!");
      setFiles([]);
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-2 md:px-8 py-16 max-w-[1400px]">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-4xl font-bold text-purple-700 mb-2 text-center">Merge PDF Documents</h1>
          <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
            Easily merge multiple PDF files into one document. Drag and drop your PDF files below, or click to browse. Arrange, preview, and combine with a single click.
          </p>
          <div className="w-full flex flex-col items-center">
            <div
              className="w-full min-h-[220px] border-4 border-dashed border-purple-400 rounded-2xl flex flex-col items-center justify-center bg-white shadow-lg mb-6 relative hover:border-purple-600 transition-all duration-200"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <span className="bg-purple-500 text-white rounded-full px-6 py-3 text-3xl shadow-lg flex items-center gap-2">
                  <ArrowUp className="w-8 h-8" />
                </span>
              </div>
              <input
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            id="merge-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="merge-upload" className="cursor-pointer flex flex-col items-center justify-center h-full w-full py-16">
            <FilePlus className="w-12 h-12 text-purple-400 mb-4" />
            <span className="text-lg text-gray-700 font-semibold">Upload PDF Files to Merge</span>
            <span className="text-sm text-gray-400 mt-2">Select or drag at least two PDF files</span>
          </label>
          {files.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {files.map((file, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                  {file.name}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* PDF Previews */}
        {previews.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {previews.map((url, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-2 flex flex-col items-center">
                <iframe src={url} title={`preview-${idx}`} className="w-full h-40" />
                <span className="text-xs text-gray-500 mt-2">{files[idx]?.name}</span>
              </div>
            ))}
          </div>
        )}
        <button
          className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-all text-lg mb-2"
          onClick={handleMerge}
          disabled={loading}
        >
          {loading ? "Birleştiriliyor..." : "Merge PDF"}
        </button>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
      </div>
      {/* Features */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8 w-full max-w-3xl">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <File className="w-8 h-8 text-purple-500 mb-2" />
          <div className="font-bold text-purple-700 mb-1">Easy & Fast</div>
          <div className="text-gray-600 text-sm text-center">Merge PDFs instantly with a powerful engine.</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <File className="w-8 h-8 text-purple-500 mb-2" />
          <div className="font-bold text-purple-700 mb-1">Secure</div>
          <div className="text-gray-600 text-sm text-center">Your files are never shared. All processing is private.</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <File className="w-8 h-8 text-purple-500 mb-2" />
          <div className="font-bold text-purple-700 mb-1">Flexible</div>
          <div className="text-gray-600 text-sm text-center">Combine as many PDFs as you need, up to 100MB total.</div>
        </div>
      </div>
      {/* FAQ */}
      <div className="mt-8 max-w-3xl w-full bg-white rounded-xl shadow p-6">
        <div className="font-bold text-purple-700 mb-2 text-xl flex items-center gap-2">
          <span className="text-2xl">❓</span> Frequently Asked Questions
        </div>
        <ul className="list-disc pl-6 text-gray-700 text-left text-sm">
          <li>How do I merge PDF files? <br />Select or drag multiple PDF files, then click Merge PDF. All files will be combined in order.</li>
          <li>Can I preview my PDFs before merging? <br />Yes! Uploaded files are shown as previews above the button.</li>
          <li>Is my data secure? <br />All processing is private, files are never shared.</li>
          <li>What is the maximum file size? <br />Up to 100MB total is recommended for best results.</li>
          <li>Can I rearrange the order? <br />(Coming soon) Drag to reorder before merging.</li>
        </ul>
      </div>
      
      {/* Features Section */}
      <div className="mt-20 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional PDF Merging Solution</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Combine multiple PDF documents into a single, organized file with our advanced merging technology. 
            Perfect for reports, presentations, and document consolidation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <File className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Multiple File Support</h3>
            <p className="text-gray-600">Upload and merge unlimited PDF files in any order. Combine documents efficiently with drag-and-drop functionality.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Secure Processing</h3>
            <p className="text-gray-600">Your PDF files are processed securely with encryption. No data is stored or shared with third parties.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Fast & Reliable</h3>
            <p className="text-gray-600">Lightning-fast processing with reliable results. Merge large documents quickly without quality loss.</p>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related PDF Tools</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/split-pdf" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Divide className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Split PDF</h4>
              <p className="text-sm text-gray-600">Extract pages from PDF files</p>
            </Link>
            <Link to="/pdf-to-image" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">PDF to Image</h4>
              <p className="text-sm text-gray-600">Convert PDF pages to images</p>
            </Link>
            <Link to="/image-to-pdf" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Image to PDF</h4>
              <p className="text-sm text-gray-600">Convert images to PDF documents</p>
            </Link>
            <Link to="/pdf-editor" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">PDF Editor</h4>
              <p className="text-sm text-gray-600">Edit PDF documents online</p>
            </Link>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergePdf;
