import React, { useState } from "react";
import { ArrowUp, FilePlus } from "lucide-react";
import { File } from "lucide-react";

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
  <div className="min-h-screen bg-[#f6f3fd] py-10 px-2 flex flex-col items-center">
  <h1 className="text-4xl font-bold text-purple-700 mb-2 text-center max-w-3xl w-full">Merge PDF Documents</h1>
  <p className="text-gray-600 mb-6 text-center max-w-2xl w-full">
        Easily merge multiple PDF files into one document. Drag and drop your PDF files below, or click to browse. Arrange, preview, and combine with a single click.
      </p>
  <div className="w-full max-w-3xl flex flex-col items-center">
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
    </div>
  );
};

export default MergePdf;
