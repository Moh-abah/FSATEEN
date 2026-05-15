// Global error boundary

'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-[var(--errorLight)] flex items-center justify-center mb-6">
          <AlertCircle className="h-10 w-10 text-[var(--error)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo mb-2">
          حدث خطأ ما
        </h1>
        <p className="text-[var(--textSecondary)] mb-6">
          عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]">
            <RefreshCw className="h-4 w-4 ml-2" />
            إعادة المحاولة
          </Button>
          <Button variant="outline" asChild className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10">
            <Link href="/">
              <Home className="h-4 w-4 ml-2" />
              الرئيسية
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}