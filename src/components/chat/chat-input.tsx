// Chat input component

'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Send, ImagePlus, Smile, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string, imageUrl?: string) => void;
  onTyping?: () => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function ChatInput({
  onSend,
  onTyping,
  disabled = false,
  placeholder = 'اكتبي رسالة...',
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((!message.trim() && !imagePreview) || disabled) return;

    onSend(message.trim(), imagePreview || undefined);
    setMessage('');
    setImagePreview(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageSelect = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // In production, upload to S3
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('bg-[var(--surface)] border-t border-[var(--border)] p-3', className)}>
      {/* Image preview */}
      {imagePreview && (
        <div className="mb-2 relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="h-20 w-20 object-cover rounded-lg"
          />
          <button
            onClick={removeImage}
            className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--error)] text-[var(--textInverse)] rounded-full flex items-center justify-center text-xs"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Image button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && handleImageSelect(e.target.files)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          className="text-[var(--textSecondary)] hover:text-[var(--primary)]"
        >
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <ImagePlus className="h-5 w-5" />
          )}
        </Button>

        {/* Text input */}
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            onTyping?.();
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 rounded-full bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
        />

        {/* Send button */}
        <Button
          type="button"
          size="icon"
          onClick={handleSend}
          disabled={disabled || (!message.trim() && !imagePreview)}
          className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)] rounded-full"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}