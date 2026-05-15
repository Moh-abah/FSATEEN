// Auction detail page with bidding - متوافق مع الـ API الفعلي

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Clock,
  TrendingUp,
  Users,
  Tag,
  ChevronLeft,
  ChevronRight,
  Gavel,
  User,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { CountdownTimer, LoadingSkeleton, ErrorState } from '@/components/shared';
import { useAuction, useAuctionBids, usePlaceBid } from '@/hooks';
import { useAuthStore } from '@/stores/auth-store';
import { formatCurrency, getAvatarUrl, cn } from '@/lib/utils';

export default function AuctionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const auctionId = params.auctionId as string;

  const { user, isAuthenticated } = useAuthStore();
  const { data: auction, isLoading, error, refetch } = useAuction(auctionId);
  const { data: bidsData, refetch: refetchBids } = useAuctionBids(auctionId);
  const placeBid = usePlaceBid();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [bidError, setBidError] = useState<string | null>(null);

  // استخراج البيانات من الاستجابة الفعلية
  const isActive = auction?.status === 'active';
  const isEnded = auction?.status === 'ended';
  const isOwner = user?.id === auction?.product?.seller?.id;

  // السعر الحالي (current_bid قد يكون null، نستخدم start_price كبديل)
  const currentPrice = auction?.current_bid ?? auction?.start_price ?? 0;
  const startPrice = auction?.start_price ?? 0;
  const bidCount = auction?.bid_count ?? 0;

  // الحد الأدنى للمزايدة التالية (أعلى مزايدة حالية + 1)
  const minBid = currentPrice + 1;

  // اسم أعلى مزايد (إن وجد)
  const currentLeader = auction?.current_bidder_username || 'لا يوجد';

  // الصور: نستخدم product.images أو product.primary_image
  const images = auction?.product?.images?.map(img => img.url) ||
    (auction?.product?.primary_image ? [auction.product.primary_image] : []);
  const primaryImage = images[currentImageIndex] || '/placeholder-dress.png';

  // معلومات البائع
  const seller = auction?.product?.seller;
  const sellerName = seller?.username || 'بائع';
  const sellerAvatar = seller?.avatar_url || '';
  const sellerRating = seller?.rating_avg || 0;

  // معلومات الفائز (إذا انتهى المزاد وله winner_id، لكن لا يوجد كائن winner كامل)
  const hasWinner = isEnded && auction?.winner_id;

  const handleBid = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    const amount = Number(bidAmount);
    if (amount < minBid) {
      setBidError(`الحد الأدنى للمزايدة هو ${formatCurrency(minBid)}`);
      return;
    }

    setBidError(null);
    try {
      await placeBid.mutateAsync({
        auctionId,
        data: { amount },
      });
      setBidAmount('');
      // تحديث البيانات بعد المزايدة
      refetch();
      refetchBids();
    } catch (err) {
      setBidError('حدث خطأ. يرجى المحاولة مرة أخرى.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <LoadingSkeleton type="detail" />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  if (error || !auction) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <ErrorState onRetry={() => refetch()} />
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
          <div className="grid md:grid-cols-2 gap-8">
            {/* معرض الصور */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[var(--surfaceMuted)] border border-[var(--border)]">
                <Image
                  src={primaryImage}
                  alt={auction.product?.title || 'مزاد'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* أزرار التنقل بين الصور */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--surface)]/80 hover:bg-[var(--surface)] text-[var(--text)]"
                      onClick={() => setCurrentImageIndex(prev =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-[var(--surface)]/80 hover:bg-[var(--surface)] text-[var(--text)]"
                      onClick={() => setCurrentImageIndex(prev =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* شارة مزاد */}
                <Badge className="absolute top-2 right-2 bg-[var(--primary)] text-[var(--textInverse)]">
                  مزاد
                </Badge>

                {/* شارة الحالة (منتهي/ملغي) */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge className="bg-[var(--textTertiary)] text-[var(--textInverse)] px-4 py-2 text-base">
                      {isEnded ? 'انتهى المزاد' : 'ملغي'}
                    </Badge>
                  </div>
                )}
              </div>

              {/* الصور المصغرة */}
              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "relative aspect-square rounded-lg overflow-hidden border-2 transition-colors",
                        currentImageIndex === index
                          ? "border-[var(--primary)]"
                          : "border-transparent"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`صورة ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* معلومات المزاد */}
            <div className="space-y-6">
              {/* العنوان */}
              <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">
                {auction.product?.title || 'منتج بدون عنوان'}
              </h1>

              {/* بطاقات الوقت والمزايدات */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="border border-[var(--border)] bg-[var(--surface)]">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 mx-auto text-[var(--primary)] mb-2" />
                    <p className="text-sm text-[var(--textSecondary)]">الوقت المتبقي</p>
                    {isActive ? (
                      <CountdownTimer endTime={auction.end_time} showIcon={false} className="text-lg font-bold text-[var(--primary)]" />
                    ) : (
                      <p className="text-lg font-bold text-[var(--textTertiary)]">انتهى</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border border-[var(--border)] bg-[var(--surface)]">
                  <CardContent className="p-4 text-center">
                    <Users className="h-6 w-6 mx-auto text-[var(--primary)] mb-2" />
                    <p className="text-sm text-[var(--textSecondary)]">عدد المزايدات</p>
                    <p className="text-lg font-bold text-[var(--primary)]">
                      {bidCount}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* السعر الحالي */}
              <Card className="border-2 border-[var(--primary)] bg-gradient-to-br from-[var(--surfaceMuted)] to-[var(--surface)]">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-[var(--textSecondary)] mb-2">أعلى مزايدة حالية</p>
                  <p className="text-4xl font-bold text-[var(--primary)] font-cairo">
                    {formatCurrency(currentPrice)}
                  </p>
                  <div className="flex justify-center gap-4 text-xs text-[var(--textTertiary)] mt-2">
                    <span>سعر البداية: {formatCurrency(startPrice)}</span>
                    {currentLeader !== 'لا يوجد' && (
                      <span>القائد: {currentLeader}</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* نموذج تقديم مزايدة */}
              {isActive && !isOwner && (
                <Card className="border border-[var(--border)] bg-[var(--surface)]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[var(--primary)]">قدمي مزايدتك</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-[var(--textSecondary)] block mb-1">
                        الحد الأدنى للمزايدة: {formatCurrency(minBid)}
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder={`${minBid}`}
                          className="flex-1 text-lg bg-[var(--surface)] border-[var(--border)] text-[var(--text)]"
                          min={minBid}
                          step={1}
                        />
                        <Button
                          className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)] shrink-0"
                          onClick={handleBid}
                          disabled={placeBid.isPending}
                        >
                          <Gavel className="h-4 w-4 ml-2" />
                          {placeBid.isPending ? 'جاري...' : 'مزايدة'}
                        </Button>
                      </div>
                      {bidError && (
                        <p className="text-sm text-[var(--error)] mt-2">{bidError}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* رسالة للمالك: لا يمكنه المزايدة على مزاده */}
              {isActive && isOwner && (
                <Card className="border border-[var(--warning)] bg-[var(--warning)]/10">
                  <CardContent className="p-4 text-center">
                    <Info className="h-5 w-5 mx-auto text-[var(--warning)] mb-1" />
                    <p className="text-sm text-[var(--warning)]">
                      أنت صاحب هذا المزاد، لا يمكنك المزايدة على منتجك.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* الفائز (إذا انتهى المزاد) */}
              {isEnded && hasWinner && (
                <Card className="border border-[var(--primary)] bg-[var(--surfaceMuted)]">
                  <CardContent className="p-4 text-center">
                    <Tag className="h-6 w-6 mx-auto text-[var(--primary)] mb-2" />
                    <p className="text-sm text-[var(--textSecondary)]">الفائز بالمزاد</p>
                    <p className="text-lg font-bold text-[var(--primary)]">
                      {auction.current_bidder_username || 'مستخدم'}
                    </p>
                    <p className="text-[var(--primary)] font-bold mt-1">
                      {formatCurrency(currentPrice)}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* وصف المنتج */}
              {auction.product?.description && (
                <Card className="border border-[var(--border)] bg-[var(--surface)]">
                  <CardHeader>
                    <CardTitle className="text-md text-[var(--text)]">وصف المنتج</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--textSecondary)] leading-relaxed line-clamp-4">
                      {auction.product.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* رابط إلى صفحة المنتج (اختياري) */}
              <Card className="border border-[var(--border)] bg-[var(--surface)]">
                <CardContent className="p-4">
                  <Link
                    href={`/products/${auction.product_id}`}
                    className="text-[var(--primary)] text-sm hover:underline flex items-center gap-1"
                  >
                    عرض تفاصيل المنتج ←
                  </Link>
                </CardContent>
              </Card>

              {/* معلومات البائع */}
              <Card className="border border-[var(--border)] bg-[var(--surface)]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-[var(--primary)]">
                      <AvatarImage src={getAvatarUrl(sellerAvatar, sellerName)} />
                      <AvatarFallback className="bg-[var(--primary)] text-[var(--textInverse)] text-lg">
                        {sellerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-[var(--text)] text-lg">
                        {sellerName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[var(--textSecondary)]">
                        <span>بائعة</span>
                        {sellerRating > 0 && (
                          <span className="flex items-center gap-1">
                            <span className="text-[var(--warning)]">★</span> {sellerRating.toFixed(1)}
                          </span>
                        )}
                        {seller?.is_verified && (
                          <Badge variant="outline" className="text-[var(--success)] border-[var(--success)] text-[10px] px-1">
                            موثقة
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* سجل المزايدات */}
          {bidsData && bidsData.items.length > 0 && (
            <Card className="mt-8 border border-[var(--border)] bg-[var(--surface)]">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--primary)]">سجل المزايدات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {bidsData.items.map((bid, index) => {
                    const isWinningBid = bid.amount === currentPrice && index === 0; // تبسيط، يمكن تحسينه
                    return (
                      <div
                        key={bid.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg",
                          isWinningBid ? "bg-[var(--primary)]/10 border border-[var(--primary)]" : "bg-[var(--surfaceMuted)]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[var(--textSecondary)] font-mono">#{index + 1}</span>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={getAvatarUrl(bid.bidder?.avatar_url, bid.bidder?.username)} />
                            <AvatarFallback className="bg-[var(--primaryLight)] text-[var(--primaryDark)] text-xs">
                              {bid.bidder?.username?.charAt(0) || 'م'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-[var(--text)]">
                            {bid.bidder?.username || 'مزايِد'}
                          </span>
                        </div>
                        <div className="text-left">
                          <span className="font-bold text-[var(--primary)]">
                            {formatCurrency(bid.amount)}
                          </span>
                          {isWinningBid && (
                            <Badge className="mr-2 bg-[var(--primary)] text-[var(--textInverse)] text-xs">
                              الأعلى
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* رسالة إذا لم توجد مزايدات */}
          {bidsData && bidsData.items.length === 0 && (
            <Card className="mt-8 border border-[var(--border)] bg-[var(--surface)]">
              <CardContent className="p-8 text-center">
                <Gavel className="h-12 w-12 mx-auto text-[var(--textTertiary)] mb-2" />
                <p className="text-[var(--textSecondary)]">لا توجد مزايدات بعد</p>
                {isActive && !isOwner && (
                  <p className="text-sm text-[var(--textTertiary)] mt-1">كوني أول من يقدم مزايدة!</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}