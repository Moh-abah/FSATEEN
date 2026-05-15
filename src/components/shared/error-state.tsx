// Error state component

'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'حدث خطأ',
  message = 'لم نتمكن من تحميل البيانات. يرجى المحاولة مرة أخرى.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[var(--errorLight)] flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-[var(--error)]" />
      </div>
      <h3 className="text-lg font-medium text-[var(--text)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--textSecondary)] max-w-sm mb-4">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="gap-2 border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]"
        >
          <RefreshCw className="h-4 w-4" />
          إعادة المحاولة
        </Button>
      )}
    </div>
  );
}