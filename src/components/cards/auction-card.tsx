// Auction card component - متوافق تماماً مع الـ API الفعلي

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Clock, Users, User, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Auction } from '@/types';
import { formatTimeRemaining, cn, formatCurrencymzad } from '@/lib/utils';

interface AuctionCardProps {
  auction: Auction;
}

export function AuctionCard({ auction }: AuctionCardProps) {
  const [timeRemaining, setTimeRemaining] = useState(
    formatTimeRemaining(auction.end_time)
  );
  const [imageError, setImageError] = useState(false);

  // ----- استخراج البيانات من الاستجابة الفعلية -----
  // الصورة: من الحقول المسطحة (قائمة المزادات) أو من الكائن المتداخل
  const imageUrl =
    auction.product_image ||
    auction.product?.primary_image ||
    auction.product?.images?.[0]?.url ||
    '/placeholder-dress.png';

  // عنوان المنتج: من الحقل المسطح أو من الكائن المتداخل
  const productTitle =
    auction.product_title || auction.product?.title || 'منتج غير متوفر';

  // اسم البائع: من الحقل المسطح أو من الكائن المتداخل
  const sellerName =
    auction.seller_username || auction.product?.seller?.username || 'بائع';

  const isActive = auction.status === 'active';
  const isEnded = auction.status === 'ended';

  const currentPrice = auction.current_bid ?? auction.start_price;
  const bidsCount = auction.bid_count ?? 0;
  const hasWinner = isEnded && auction.winner_id;

  // تحديث العداد التنازلي
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(auction.end_time));
    }, 1000);
    return () => clearInterval(interval);
  }, [auction.end_time, isActive]);

  return (
    <Link href={`/auctions/${auction.id}`}>
      <Card className="group overflow-hidden border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg bg-[var(--surface)]">
        {/* حاوية الصورة */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surfaceMuted)]">
          <Image
            src={imageError ? '/placeholder-dress.png' : imageUrl}
            alt={productTitle}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* شارة الحالة */}
          <Badge
            className={cn(
              "absolute top-2 right-2",
              isActive ? "bg-[var(--success)]" : isEnded ? "bg-[var(--textTertiary)]" : "bg-[var(--error)]"
            )}
          >
            {isActive ? 'نشط' : isEnded ? 'منتهي' : 'ملغي'}
          </Badge>

          {/* شارة مزاد */}
          <Badge
            variant="outline"
            className="absolute top-2 left-2 bg-[var(--primary)] text-[var(--textInverse)] border-[var(--primary)]"
          >
            مزاد
          </Badge>

          {/* الوقت المتبقي */}
          {isActive && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <div className="flex items-center gap-2 text-white text-sm">
                <Clock className="h-4 w-4 text-[var(--primary)]" />
                <span className="font-medium">{timeRemaining}</span>
              </div>
            </div>
          )}

          {/* شارة البيع */}
          {hasWinner && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge className="bg-[var(--primary)] text-[var(--textInverse)] px-4 py-1">
                تم البيع
              </Badge>
            </div>
          )}
        </div>

        {/* المحتوى */}
        <CardContent className="p-3">
          <h3 className="font-medium text-[var(--text)] line-clamp-2 text-sm mb-2 min-h-[40px]">
            {productTitle}
          </h3>

          {/* أعلى مزايدة */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--textSecondary)]">أعلى مزايدة</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-[var(--primary)]" />
              <span className="text-lg font-bold text-[var(--primary)] font-cairo">
                {formatCurrencymzad(currentPrice)}
              </span>
            </div>
          </div>

          {/* سعر البداية */}
          <div className="flex items-center justify-between text-xs text-[var(--textSecondary)] mb-2">
            <span>سعر البداية</span>
            <span>{formatCurrencymzad(auction.start_price)}</span>
          </div>

          {/* عدد المزايدات واسم البائع */}
          <div className="flex items-center gap-4 text-xs text-[var(--textSecondary)]">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{bidsCount} مزايدة</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{sellerName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}