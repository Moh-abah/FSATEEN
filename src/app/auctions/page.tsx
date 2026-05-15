// Auctions listing page

'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { AuctionCard } from '@/components/cards';
import { LoadingSkeleton, EmptyState, ErrorState } from '@/components/shared';
import { useAuctions } from '@/hooks';
import { Button } from '@/components/ui/button';

export default function AuctionsPage() {
  const { data, isLoading, error, refetch } = useAuctions(1, 20);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-[var(--textInverse)]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">المزادات</h1>
              <p className="text-sm text-[var(--textSecondary)]">سارعي بالمشاركة في المزادات النشطة</p>
            </div>
          </div>

          {/* Auctions Grid */}
          {isLoading ? (
            <LoadingSkeleton type="card" count={8} />
          ) : error ? (
            <ErrorState onRetry={() => refetch()} />
          ) : data?.items && data.items.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.items.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={TrendingUp}
              title="لا توجد مزادات نشطة حالياً"
              description="تابعينا للحصول على تحديثات المزادات القادمة"
              actionLabel="تصفح الفساتين"
              actionHref="/products"
            />
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}