'use client';

import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface FileUploadCardProps {
  label: string;
  accept: string[];
  maxSizeBytes: number;
  required?: boolean;
  onFileChange: (file: File | null) => void;
  currentFile?: File | null;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({ label, accept, maxSizeBytes, onFileChange, currentFile }) => {
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }, []);

  const handleFile = (file: File) => {
    if (!accept.includes(file.type) && !accept.includes('*')) return onFileChange(null);
    if (file.size > maxSizeBytes) return onFileChange(null);
    onFileChange(file);
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(id); return 100; }
        return p + Math.floor(Math.random() * 10) + 5;
      });
    }, 200);
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`w-full min-h-[120px] rounded-2xl flex items-center justify-center flex-col gap-3 p-4 transition-colors ${dragOver ? 'bg-green-50 ring-1 ring-green-200' : 'bg-gray-50'}`}
      >
        <input type="file" className="hidden" id={`file-input-${label.replace(/\s+/g, '-')}`} onChange={inputChange} />
        <label htmlFor={`file-input-${label.replace(/\s+/g, '-')}`} className="cursor-pointer px-4 py-2 bg-green-700 text-white rounded-lg shadow-sm hover:bg-green-800 transition">Select file</label>
        <p className="text-xs text-gray-500">or drag & drop here. Accepted: {accept.join(', ')} • Max {(maxSizeBytes/1024/1024).toFixed(0)}MB</p>

        {currentFile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md mt-3">
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div>
                <p className="text-sm font-medium text-gray-800">{currentFile.name}</p>
                <p className="text-xs text-gray-500">{(currentFile.size/1024/1024).toFixed(2)} MB</p>
              </div>
              <div className="w-40">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div className="h-2 bg-amber-500" style={{ width: `${Math.min(progress,100)}%` }} layout />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FileUploadCard;
