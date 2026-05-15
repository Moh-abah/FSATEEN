// Seller auctions list page

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Plus, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, EmptyState } from '@/components/shared';
import { useSellerAuctions } from '@/hooks/use-auctions';
import { formatCurrency, getTimeRemaining } from '@/lib/utils';

export default function SellerAuctionsPage() {
  const [status, setStatus] = useState<'active' | 'ended' | 'all'>('all');
  const [page, setPage] = useState(1);

  const { data: auctions, isLoading } = useSellerAuctions(page);

  const activeAuctions = auctions?.items?.filter(a => a.status === 'active') || [];
  const endedAuctions = auctions?.items?.filter(a => a.status === 'ended' || a.status === 'cancelled') || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <LoadingSkeleton type="card" count={3} />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-[var(--textInverse)]" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">مزاداتي</h1>
            </div>
            <Button asChild className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]">
              <Link href="/seller/auctions/new">
                <Plus className="h-4 w-4 ml-2" />
                مزاد جديد
              </Link>
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="w-full mb-6 bg-[var(--surfaceMuted)] border border-[var(--border)]">
              <TabsTrigger value="active" className="flex-1 data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--textInverse)] data-[state=inactive]:text-[var(--textSecondary)]">
                نشطة ({activeAuctions.length})
              </TabsTrigger>
              <TabsTrigger value="ended" className="flex-1 data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--textInverse)] data-[state=inactive]:text-[var(--textSecondary)]">
                منتهية ({endedAuctions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {activeAuctions.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeAuctions.map((auction) => (
                    <Link key={auction.id} href={`/auctions/${auction.id}`}>
                      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-[4/3] relative bg-[var(--surfaceMuted)]">
                          <img
                            src={auction.product?.images?.[0]?.url || '/placeholder-dress.png'}
                            alt={auction.product?.title || 'مزاد'}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2 bg-[var(--success)] text-[var(--textInverse)]">
                            نشط
                          </Badge>
                          <div className="absolute bottom-2 left-2 right-2 bg-[var(--overlay)] text-[var(--textInverse)] text-xs px-2 py-1 rounded">
                            ينتهي: {getTimeRemaining(auction.end_time)}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-[var(--text)] truncate">
                            {auction.product?.title}
                          </h3>
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <p className="text-xs text-[var(--textSecondary)]">السعر الحالي</p>
                              <p className="text-[var(--primary)] font-bold">
                                {formatCurrency(auction.current_bid || 0)}
                              </p>
                            </div>
                            <div className="text-left">
                              <p className="text-xs text-[var(--textSecondary)]">المزايدات</p>
                              <p className="font-medium text-[var(--text)]">{auction.bids_count || 0}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={TrendingUp}
                  title="لا توجد مزادات نشطة"
                  description="ابدأي بإنشاء مزاد جديد"
                  actionLabel="إنشاء مزاد"
                  actionHref="/seller/auctions/new"
                />
              )}
            </TabsContent>

            <TabsContent value="ended">
              {endedAuctions.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {endedAuctions.map((auction) => (
                    <div key={auction.id} className="bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden opacity-75">
                      <div className="aspect-[4/3] relative bg-[var(--surfaceMuted)]">
                        <img
                          src={auction.product?.images?.[0]?.url || '/placeholder-dress.png'}
                          alt={auction.product?.title || 'مزاد'}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-[var(--textTertiary)] text-[var(--textInverse)]">
                          منتهي
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-[var(--text)] truncate">
                          {auction.product?.title}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <p className="text-xs text-[var(--textSecondary)]">السعر النهائي</p>
                            <p className="text-[var(--primary)] font-bold">
                              {formatCurrency(auction.current_bid || 0)}
                            </p>
                          </div>
       
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={TrendingUp}
                  title="لا توجد مزادات منتهية"
                  description="لم يسبق لك إنشاء أي مزادات"
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}