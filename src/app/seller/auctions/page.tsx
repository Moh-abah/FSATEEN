// // Seller auctions list page

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { TrendingUp, Plus, ChevronLeft } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
// import { LoadingSkeleton, EmptyState } from '@/components/shared';
// import { useSellerAuctions } from '@/hooks/use-auctions';
// import { formatCurrency, getTimeRemaining } from '@/lib/utils';

// export default function SellerAuctionsPage() {
//   const [status, setStatus] = useState<'active' | 'ended' | 'all'>('all');
//   const [page, setPage] = useState(1);

//   const { data: auctions, isLoading } = useSellerAuctions(page);

//   const activeAuctions = auctions?.items?.filter(a => a.status === 'active') || [];
//   const endedAuctions = auctions?.items?.filter(a => a.status === 'ended' || a.status === 'cancelled') || [];

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col bg-[var(--background)]">
//         <Navbar />
//         <main className="flex-1 container mx-auto px-4 py-6">
//           <LoadingSkeleton type="card" count={3} />
//         </main>
//         <Footer />
//         <MobileBottomNav />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-[var(--background)]">
//       <Navbar />

//       <main className="flex-1 py-6">
//         <div className="container mx-auto px-4">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
//                 <TrendingUp className="h-5 w-5 text-[var(--textInverse)]" />
//               </div>
//               <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">مزاداتي</h1>
//             </div>
//             <Button asChild className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]">
//               <Link href="/seller/auctions/new">
//                 <Plus className="h-4 w-4 ml-2" />
//                 مزاد جديد
//               </Link>
//             </Button>
//           </div>

//           {/* Tabs */}
//           <Tabs defaultValue="active" className="w-full">
//             <TabsList className="w-full mb-6 bg-[var(--surfaceMuted)] border border-[var(--border)]">
//               <TabsTrigger value="active" className="flex-1 data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--textInverse)] data-[state=inactive]:text-[var(--textSecondary)]">
//                 نشطة ({activeAuctions.length})
//               </TabsTrigger>
//               <TabsTrigger value="ended" className="flex-1 data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--textInverse)] data-[state=inactive]:text-[var(--textSecondary)]">
//                 منتهية ({endedAuctions.length})
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="active">
//               {activeAuctions.length > 0 ? (
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {activeAuctions.map((auction) => (
//                     <Link key={auction.id} href={`/auctions/${auction.id}`}>
//                       <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow">
//                         <div className="aspect-[4/3] relative bg-[var(--surfaceMuted)]">
//                           <img
//                             src={auction.product?.images?.[0]?.url || '/placeholder-dress.png'}
//                             alt={auction.product?.title || 'مزاد'}
//                             className="w-full h-full object-cover"
//                           />
//                           <Badge className="absolute top-2 right-2 bg-[var(--success)] text-[var(--textInverse)]">
//                             نشط
//                           </Badge>
//                           <div className="absolute bottom-2 left-2 right-2 bg-[var(--overlay)] text-[var(--textInverse)] text-xs px-2 py-1 rounded">
//                             ينتهي: {getTimeRemaining(auction.end_time)}
//                           </div>
//                         </div>
//                         <div className="p-4">
//                           <h3 className="font-medium text-[var(--text)] truncate">
//                             {auction.product?.title}
//                           </h3>
//                           <div className="flex items-center justify-between mt-2">
//                             <div>
//                               <p className="text-xs text-[var(--textSecondary)]">السعر الحالي</p>
//                               <p className="text-[var(--primary)] font-bold">
//                                 {formatCurrency(auction.current_bid || 0)}
//                               </p>
//                             </div>
//                             <div className="text-left">
//                               <p className="text-xs text-[var(--textSecondary)]">المزايدات</p>
//                               <p className="font-medium text-[var(--text)]">{auction.bids_count || 0}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               ) : (
//                 <EmptyState
//                   icon={TrendingUp}
//                   title="لا توجد مزادات نشطة"
//                   description="ابدأي بإنشاء مزاد جديد"
//                   actionLabel="إنشاء مزاد"
//                   actionHref="/seller/auctions/new"
//                 />
//               )}
//             </TabsContent>

//             <TabsContent value="ended">
//               {endedAuctions.length > 0 ? (
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {endedAuctions.map((auction) => (
//                     <div key={auction.id} className="bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden opacity-75">
//                       <div className="aspect-[4/3] relative bg-[var(--surfaceMuted)]">
//                         <img
//                           src={auction.product?.images?.[0]?.url || '/placeholder-dress.png'}
//                           alt={auction.product?.title || 'مزاد'}
//                           className="w-full h-full object-cover"
//                         />
//                         <Badge className="absolute top-2 right-2 bg-[var(--textTertiary)] text-[var(--textInverse)]">
//                           منتهي
//                         </Badge>
//                       </div>
//                       <div className="p-4">
//                         <h3 className="font-medium text-[var(--text)] truncate">
//                           {auction.product?.title}
//                         </h3>
//                         <div className="flex items-center justify-between mt-2">
//                           <div>
//                             <p className="text-xs text-[var(--textSecondary)]">السعر النهائي</p>
//                             <p className="text-[var(--primary)] font-bold">
//                               {formatCurrency(auction.current_bid || 0)}
//                             </p>
//                           </div>
       
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <EmptyState
//                   icon={TrendingUp}
//                   title="لا توجد مزادات منتهية"
//                   description="لم يسبق لك إنشاء أي مزادات"
//                 />
//               )}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>

//       <Footer />
//       <MobileBottomNav />
//     </div>
//   );
// }



// src/app/seller/auctions/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Plus,
  Clock,
  Users,
  Crown,
  Sparkles,
  Zap,
  Shield,
  Award,
  Flame,
  Timer,
  CheckCircle2,
  XCircle,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, EmptyState } from '@/components/shared';
import { useSellerAuctions } from '@/hooks/use-auctions';
import { formatCurrency, getTimeRemaining } from '@/lib/utils';

// ✨ Premium Auction Card
function PremiumAuctionCard({ auction, isEnded }: { auction: any; isEnded: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const timeRemaining = getTimeRemaining(auction.end_time);
  const isUrgent = !isEnded && auction.end_time && new Date(auction.end_time).getTime() - Date.now() < 3600000;

  return (
    <Link
      href={`/auctions/${auction.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block animate-fadeInUp"
    >
      <div className={`
        relative overflow-hidden rounded-2xl border transition-all duration-300
        ${isEnded
          ? 'bg-[var(--surface)] border-[var(--border)] opacity-80 hover:opacity-100'
          : 'bg-gradient-to-br from-[var(--surface)] to-[var(--surfaceMuted)]/30 border-[var(--border)] hover:border-[var(--primary)]/40 hover:shadow-xl hover:shadow-[var(--primary)]/10 hover:-translate-y-1'
        }
      `}>

        {/* ✨ Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={auction.product?.images?.[0]?.url || '/placeholder-dress.png'}
            alt={auction.product?.title || 'مزاد'}
            className={`
              w-full h-full object-cover transition-transform duration-500
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}
          />

          {/* Gradient Overlay */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
            transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}
          `} />

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {isEnded ? (
              <Badge className="bg-[var(--textTertiary)]/90 text-[var(--textInverse)] px-3 py-1 text-xs font-cairo gap-1.5 backdrop-blur-sm">
                {auction.status === 'cancelled' ? <XCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                {auction.status === 'cancelled' ? 'ملغى' : 'منتهي'}
              </Badge>
            ) : (
              <Badge className={`
                px-3 py-1 text-xs font-cairo gap-1.5 backdrop-blur-sm
                ${isUrgent
                  ? 'bg-[var(--error)]/90 text-[var(--textInverse)] animate-pulse'
                  : 'bg-[var(--success)]/90 text-[var(--textInverse)]'
                }
              `}>
                {isUrgent ? <Flame className="w-3 h-3 animate-pulse" /> : <TrendingUp className="w-3 h-3" />}
                {isUrgent ? 'عاجل' : 'نشط'}
              </Badge>
            )}
          </div>

          {/* Time Remaining */}
          {!isEnded && auction.end_time && (
            <div className={`
              absolute bottom-3 left-3 right-3 
              flex items-center justify-center gap-1.5
              px-3 py-1.5 rounded-full
              ${isUrgent
                ? 'bg-[var(--error)]/90 text-white animate-pulse'
                : 'bg-black/60 text-white'
              }
              backdrop-blur-sm transition-all duration-300
            `}>
              <Timer className={`w-3.5 h-3.5 ${isUrgent ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-cairo font-medium">{timeRemaining}</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className={`
            absolute inset-0 bg-[var(--primary)]/20 
            flex items-center justify-center
            transition-opacity duration-300
            ${isHovered && !isEnded ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}>
            <Button
              size="sm"
              className="bg-white text-[var(--primary)] hover:bg-[var(--surface)] font-cairo gap-2 shadow-lg"
            >
              عرض التفاصيل
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ✨ Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className={`
            font-bold text-[var(--text)] font-cairo text-sm line-clamp-2 mb-3
            transition-colors duration-300 ${isHovered && !isEnded ? 'text-[var(--primary)]' : ''}
          `}>
            {auction.product?.title}
          </h3>

          {/* Stats Row */}
          <div className="flex items-center justify-between mb-3">
            {/* Price */}
            <div>
              <p className="text-[10px] text-[var(--textTertiary)] font-cairo">
                {isEnded ? 'السعر النهائي' : 'السعر الحالي'}
              </p>
              <p className={`
                text-lg font-bold font-cairo
                ${isEnded ? 'text-[var(--textSecondary)]' : 'text-[var(--primary)]'}
              `}>
                {formatCurrency(auction.current_price)}
              </p>
            </div>

            {/* Bids Count */}
            <div className="text-left">
              <p className="text-[10px] text-[var(--textTertiary)] font-cairo">المزايدات</p>
              <div className="flex items-center gap-1">
                <Users className={`w-4 h-4 ${auction.bids_count > 0 ? 'text-[var(--primary)]' : 'text-[var(--textTertiary)]'}`} />
                <span className={`
                  font-bold font-cairo
                  ${auction.bids_count > 5 ? 'text-[var(--warning)]' : 'text-[var(--text)]'}
                `}>
                  {auction.bids_count || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Winner Info */}
          {isEnded && auction.winner && (
            <div className="pt-3 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-[var(--textSecondary)] font-cairo">
                  الفائز: <span className="font-medium text-[var(--text)]">{auction.winner.full_name || auction.winner.username}</span>
                </span>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {!isEnded && auction.start_price && auction.current_price && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] text-[var(--textTertiary)] font-cairo mb-1">
                <span>التقدم</span>
                <span>{Math.min(Math.round((auction.current_price / (auction.start_price * 3)) * 100), 100)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className={`
                    h-full rounded-full transition-all duration-500
                    ${isUrgent
                      ? 'bg-gradient-to-r from-[var(--error)] to-[var(--warning)] animate-pulse'
                      : 'bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)]'
                    }
                  `}
                  style={{
                    width: `${Math.min((auction.current_price / (auction.start_price * 3)) * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ✨ Bottom Accent Line - Thin Animated */}
        <div className={`
          absolute inset-x-4 bottom-0 h-0.5 rounded-full
          bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent
          scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center
        `} />
      </div>
    </Link>
  );
}

// ✨ Inline Stats Bar - Positioned below header
// src/app/seller/auctions/page.tsx

// ... imports

// ✨ Inline Stats Bar - Positioned below header
function InlineStatsBar({ stats }: { stats: { active: number; ended: number; total: number } }) {
  // ✨ هذا المفتاح مهم جداً: عندما تتغير الأرقام، سيعاد تشغيل الأنيميشن
  return (
    <div
      key={`${stats.active}-${stats.ended}-${stats.total}`}
      className="
        w-full rounded-2xl border border-[var(--border)] 
        bg-[var(--surface)] shadow-sm relative overflow-hidden
        animate-fadeInUp
      "
    >
      {/* 
         ✨ الخط العلوي المتحرك (Shimmer Line) 
         - تم ضبطه ليعمل 3 مرات فقط داخل الحدود
         - لا يمتد خارج الشريط
      */}
      <div className="absolute top-0 left-0 w-full h-[1px] animate-shimmer-finite bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />

      <div className="flex items-center justify-between px-4 py-3">

        {/* Stats Grid */}
        <div className="flex items-center gap-6">
          {/* Active */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--success)]/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[var(--success)]" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--textTertiary)] font-cairo">نشطة</p>
              <p className="text-sm font-bold text-[var(--text)] font-cairo">{stats.active}</p>
            </div>
          </div>

          {/* Ended */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--textTertiary)]/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[var(--textTertiary)]" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--textTertiary)] font-cairo">منتهية</p>
              <p className="text-sm font-bold text-[var(--text)] font-cairo">{stats.ended}</p>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
              <Award className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--textTertiary)] font-cairo">الكل</p>
              <p className="text-sm font-bold text-[var(--text)] font-cairo">{stats.total}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs text-[var(--textSecondary)] hover:text-[var(--primary)] font-cairo gap-1">
            <Zap className="w-3.5 h-3.5" />
            عاجل
          </Button>
          <div className="w-px h-6 bg-[var(--border)]" />
          <Button variant="ghost" size="sm" className="h-8 text-xs text-[var(--textSecondary)] hover:text-[var(--primary)] font-cairo gap-1">
            <Clock className="w-3.5 h-3.5" />
            حديث
          </Button>
        </div>
      </div>

      {/* ✨ الخط السفلي المتحرك */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] animate-shimmer-finite bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-transparent delay-150" />
    </div>
  );
}

// ... rest of the code

export default function SellerAuctionsPage() {
  const [status, setStatus] = useState<'active' | 'ended' | 'all'>('all');
  const [page, setPage] = useState(1);

  const { data: auctions, isLoading } = useSellerAuctions(page);

  // ✨ Calculate stats
  const stats = useMemo(() => {
    const items = auctions?.items || [];
    return {
      active: items.filter((a: any) => a.status === 'active').length,
      ended: items.filter((a: any) => a.status === 'ended' || a.status === 'cancelled').length,
      total: items.length,
    };
  }, [auctions]);

  // ✨ Filter auctions
  const filteredAuctions = useMemo(() => {
    const items = auctions?.items || [];
    if (status === 'active') return items.filter((a: any) => a.status === 'active');
    if (status === 'ended') return items.filter((a: any) => a.status === 'ended' || a.status === 'cancelled');
    return items;
  }, [auctions, status]);

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

      <main className="flex-1 py-6 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* ✨ Premium Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-[var(--primary)]/20 rounded-xl blur-lg animate-pulse" />
                  <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] flex items-center justify-center">
                    <TrendingUp className="h-5.5 w-5.5 text-[var(--textInverse)]" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[var(--primary)] font-cairo">مزاداتي</h1>
                  <p className="text-xs text-[var(--textSecondary)] font-cairo">
                    {stats.total} مزاد{stats.total !== 1 ? 'ات' : ''} • {stats.active} نشط{stats.active !== 1 ? 'ة' : ''}
                  </p>
                </div>
              </div>

              {/* Create Auction Button */}
              <Button asChild className="bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:from-[var(--primaryDark)] hover:to-[var(--primary)] text-[var(--textInverse)] font-cairo gap-2 shadow-lg shadow-[var(--primary)]/25 hover:shadow-xl hover:shadow-[var(--primary)]/40 transition-all duration-300">
                <Link href="/seller/auctions/new">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">مزاد جديد</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* ✨ Inline Stats Bar - NOW BELOW HEADER */}
          <div className="mb-6">
            <InlineStatsBar stats={stats} />
          </div>

          {/* ✨ Premium Tabs */}
          <Tabs defaultValue="active" value={status} onValueChange={(v) => setStatus(v as any)} className="w-full">
            <TabsList className="w-full mb-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-1">
              <TabsTrigger
                value="active"
                className="flex-1 py-2.5 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--primary)] data-[state=active]:to-[var(--primaryDark)] data-[state=active]:text-[var(--textInverse)] data-[state=inactive]:text-[var(--textSecondary)] font-cairo text-sm transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>نشطة</span>
                  <Badge className={`
                    px-2 py-0.5 text-[10px] font-cairo
                    ${status === 'active'
                      ? 'bg-white/20 text-[var(--textInverse)]'
                      : 'bg-[var(--surfaceMuted)] text-[var(--textTertiary)]'
                    }
                  `}>
                    {stats.active}
                  </Badge>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="ended"
                className="flex-1 py-2.5 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--primary)] data-[state=active]:to-[var(--primaryDark)] data-[state=active]:text-[var(--textInverse)] data-[state=inactive]:text-[var(--textSecondary)] font-cairo text-sm transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>منتهية</span>
                  <Badge className={`
                    px-2 py-0.5 text-[10px] font-cairo
                    ${status === 'ended'
                      ? 'bg-white/20 text-[var(--textInverse)]'
                      : 'bg-[var(--surfaceMuted)] text-[var(--textTertiary)]'
                    }
                  `}>
                    {stats.ended}
                  </Badge>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* ✨ Active Auctions Tab */}
            <TabsContent value="active" className="mt-0">
              {filteredAuctions.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAuctions.map((auction: any, index: number) => (
                    <div key={auction.id} style={{ animationDelay: `${index * 80}ms` }}>
                      <PremiumAuctionCard auction={auction} isEnded={false} />
                    </div>
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

            {/* ✨ Ended Auctions Tab */}
            <TabsContent value="ended" className="mt-0">
              {filteredAuctions.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAuctions.map((auction: any, index: number) => (
                    <div key={auction.id} style={{ animationDelay: `${index * 80}ms` }}>
                      <PremiumAuctionCard auction={auction} isEnded={true} />
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

          {/* ✨ Footer Note */}
          <p className="text-center text-xs text-[var(--textTertiary)] font-cairo mt-8 pb-4 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            💡 اضغطي على أي مزاد لعرض التفاصيل وإدارته
          </p>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />


    </div>
  );
}