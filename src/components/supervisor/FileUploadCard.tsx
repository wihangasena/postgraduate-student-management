'use client';

import { FC, useRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FileText, UploadCloud, X, CheckCircle2 } from 'lucide-react';

interface FileUploadCardProps {
  label: string;
  error?: FieldError;
  file?: File | null;
  progress: number;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

export const FileUploadCard: FC<FileUploadCardProps> = ({
  label,
  error,
  file,
  progress,
  onFileSelect,
  onClear,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile?: File) => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label>

      <motion.div
        whileHover={{ y: -2 }}
        className={`rounded-2xl border-2 border-dashed bg-gradient-to-br from-white to-emerald-50/40 p-5 transition-all duration-200 ${
          isDragging ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-slate-300'
        } ${error ? 'border-red-500 bg-red-50/60' : ''}`}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files?.[0]);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        {!file ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-4 rounded-xl px-4 py-8 text-center transition hover:bg-white/70"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
              <UploadCloud size={28} />
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-900">
                Drag and drop your CV here, or click to browse
              </p>
              <p className="text-sm text-slate-500">PDF only, maximum file size 5 MB</p>
            </div>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <FileText size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{file.name}</p>
                <p className="mt-1 text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <div className="mt-3">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{progress < 100 ? 'Uploading preview...' : 'Upload ready'}</span>
                    {progress >= 100 && (
                      <span className="inline-flex items-center gap-1 text-emerald-700">
                        <CheckCircle2 size={14} />
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClear}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Remove uploaded file"
              >
                <X size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
            >
              Replace file
            </button>
          </div>
        )}
      </motion.div>

      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
