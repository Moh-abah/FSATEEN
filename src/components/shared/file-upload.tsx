// File upload component

'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onUpload: (file: File) => Promise<string>;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

export function FileUpload({
  onUpload,
  value,
  onChange,
  accept = 'image/*',
  maxSize = 5,
  className,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`حجم الملف يجب أن يكون أقل من ${maxSize} ميجابايت`);
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const url = await onUpload(file);
      onChange(url);
    } catch {
      setError('فشل رفع الملف. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-40 object-cover rounded-lg border border-[var(--border)] bg-[var(--surfaceMuted)]"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 left-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--error)] hover:bg-[var(--errorDark)]"
            onClick={handleRemove}
          >
            <X className="h-4 w-4 text-[var(--textInverse)]" />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--surfaceMuted)] transition-colors">
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
              <span className="mt-2 text-sm text-[var(--textSecondary)]">جاري الرفع...</span>
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 text-[var(--primary)] mb-2" />
              <span className="text-sm text-[var(--textSecondary)]">اضغطي لرفع صورة</span>
              <span className="text-xs text-[var(--textTertiary)] mt-1">
                الحد الأقصى {maxSize} ميجابايت
              </span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-[var(--error)]">{error}</p>
      )}
    </div>
  );
}

interface MultiFileUploadProps {
  onUpload: (file: File) => Promise<string>;
  value?: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

export function MultiFileUpload({
  onUpload,
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 5,
}: MultiFileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (value.length + files.length > maxFiles) {
      alert(`يمكنك رفع ${maxFiles} صور كحد أقصى`);
      return;
    }

    setIsUploading(true);

    try {
      const urls = await Promise.all(files.map(file => onUpload(file)));
      onChange([...value, ...urls]);
    } catch {
      alert('فشل رفع بعض الصور');
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {value.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={url}
                alt={`صورة ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border border-[var(--border)] bg-[var(--surfaceMuted)]"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 left-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--error)] hover:bg-[var(--errorDark)]"
                onClick={() => handleRemove(index)}
              >
                <X className="h-3 w-3 text-[var(--textInverse)]" />
              </Button>
              {index === 0 && (
                <span className="absolute bottom-1 right-1 text-xs bg-[var(--primary)] text-[var(--textInverse)] px-1.5 py-0.5 rounded">
                  رئيسية
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {value.length < maxFiles && (
        <label className="flex items-center justify-center gap-2 w-full h-12 border border-dashed border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--surfaceMuted)] transition-colors">
          {isUploading ? (
            <>
              <div className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-[var(--textSecondary)]">جاري الرفع...</span>
            </>
          ) : (
            <>
              <ImageIcon className="h-5 w-5 text-[var(--primary)]" />
              <span className="text-sm text-[var(--textSecondary)]">
                إضافة صورة ({value.length}/{maxFiles})
              </span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}