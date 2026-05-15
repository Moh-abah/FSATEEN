// 404 Not Found page

import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] p-4">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-[var(--surfaceMuted)] flex items-center justify-center mb-6">
          <span className="text-5xl font-bold text-[var(--primary)] font-cairo">404</span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--primaryDark)] font-cairo mb-2">
          الصفحة غير موجودة
        </h1>
        <p className="text-[var(--textSecondary)] mb-6 max-w-md">
          عذراً، الصفحة التي تبحثين عنها غير موجودة أو تم نقلها.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-white">
            <Link href="/">
              <Home className="h-4 w-4 ml-2" />
              الرئيسية
            </Link>
          </Button>
          <Button variant="outline" asChild className="border-[var(--primary)] text-[var(--primaryDark)]">
            <Link href="/products">
              <Search className="h-4 w-4 ml-2" />
              تصفح الفساتين
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}