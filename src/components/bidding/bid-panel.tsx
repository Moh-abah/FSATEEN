// Bid panel component for auctions

'use client';

import { useState } from 'react';
import { TrendingUp, Clock, Users, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { formatCurrency, formatDistanceToNow } from '@/lib/utils';
import { Bid, Auction } from '@/types';

interface BidPanelProps {
 auction: Auction;
 bids: Bid[];
 currentUserId?: string;
 onBid: (amount: number) => Promise<void>;
 isLoading?: boolean;
 isConnected?: boolean;
 latestBid?: Bid | null;
}

export function BidPanel({
 auction,
 bids,
 currentUserId,
 onBid,
 isLoading = false,
 isConnected = false,
 latestBid,
}: BidPanelProps) {
 const [bidAmount, setBidAmount] = useState('');
 const [showAllBids, setShowAllBids] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [error, setError] = useState<string | null>(null);

 // استخدام الحقول الصحيحة من Auction
 const currentPrice = auction.current_bid ?? auction.start_price;
 const minBid = currentPrice + 10; // الحد الأدنى للزيادة
 const isEnded = auction.status === 'ended' || new Date(auction.end_time) < new Date();
 const isOwner = auction.product.seller.id === currentUserId;

 const visibleBids = showAllBids ? bids : bids.slice(0, 5);

 const handleBid = async () => {
  setError(null);
  const amount = parseFloat(bidAmount);

  if (isNaN(amount) || amount < minBid) {
   setError(`الحد الأدنى للمزايدة هو ${formatCurrency(minBid)}`);
   return;
  }

  setIsSubmitting(true);
  try {
   await onBid(amount);
   setBidAmount('');
  } catch (err: unknown) {
   const error = err as { response?: { data?: { message?: string } } };
   setError(error.response?.data?.message || 'حدث خطأ أثناء المزايدة');
  } finally {
   setIsSubmitting(false);
  }
 };

 const quickBids = [
  minBid,
  minBid + 50,
  minBid + 100,
  minBid + 200,
 ];

 return (
  <Card className="border border-[var(--border)] bg-[var(--surface)]">
   <CardHeader>
    <CardTitle className="text-lg text-[var(--primary)] flex items-center gap-2">
     <TrendingUp className="h-5 w-5 text-[var(--primary)]" />
     المزاد
    </CardTitle>
   </CardHeader>
   <CardContent className="space-y-4">
    {/* Current Price */}
    <div className="bg-[var(--primary)]/10 rounded-lg p-4 text-center">
     <p className="text-sm text-[var(--textSecondary)]">السعر الحالي</p>
     <p className="text-3xl font-bold text-[var(--primary)]">
      {formatCurrency(currentPrice)}
     </p>
     <div className="flex items-center justify-center gap-4 mt-2 text-sm text-[var(--textSecondary)]">
      <span className="flex items-center gap-1">
       <Users className="h-4 w-4" />
       {auction.bid_count} مزايدة
      </span>
      <span className="flex items-center gap-1">
       <Clock className="h-4 w-4" />
       {isEnded ? 'منتهي' : formatDistanceToNow(auction.end_time)}
      </span>
     </div>
    </div>

    {/* Latest Bid Notification */}
    {latestBid && (
     <Alert className="bg-[var(--successLight)] border-[var(--success)]">
      <AlertDescription className="text-[var(--success)] text-sm">
       مزايدة جديدة! {formatCurrency(latestBid.amount)}
      </AlertDescription>
     </Alert>
    )}

    {/* Connection Status */}
    {!isConnected && (
     <div className="flex items-center gap-2 text-sm text-[var(--warning)]">
      <div className="w-2 h-2 rounded-full bg-[var(--warning)] animate-pulse" />
      جاري الاتصال...
     </div>
    )}

    {/* Bid Input */}
    {!isEnded && !isOwner && (
     <div className="space-y-3">
      <div>
       <Input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder={`${formatCurrency(minBid)} الحد الأدنى`}
        className="text-lg bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
        disabled={isLoading || isSubmitting}
       />
      </div>

      {/* Quick bid buttons */}
      <div className="flex flex-wrap gap-2">
       {quickBids.map((amount) => (
        <Button
         key={amount}
         variant="outline"
         size="sm"
         onClick={() => setBidAmount(amount.toString())}
         disabled={isLoading || isSubmitting}
         className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10"
        >
         {formatCurrency(amount)}
        </Button>
       ))}
      </div>

      {error && (
       <p className="text-[var(--error)] text-sm">{error}</p>
      )}

      <Button
       onClick={handleBid}
       disabled={isLoading || isSubmitting || !bidAmount}
       className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
      >
       {isSubmitting ? (
        <>
         <Loader2 className="h-4 w-4 ml-2 animate-spin" />
         جاري المزايدة...
        </>
       ) : (
        'ساومي الآن'
       )}
      </Button>
     </div>
    )}

    {/* Status Messages */}
    {isEnded && (
     <div className="text-center py-4">
      <Badge className="bg-[var(--textTertiary)] text-[var(--textInverse)] text-lg px-4 py-2">
       المزاد منتهي
      </Badge>
      {auction.winner_id && (
       <p className="mt-2 text-sm text-[var(--textSecondary)]">
        الفائز: معرف المستخدم {auction.winner_id.slice(0, 8)}...
       </p>
      )}
     </div>
    )}

    {isOwner && (
     <Alert className="bg-[var(--primaryLight)]/20 border-[var(--primaryLight)]">
      <AlertDescription className="text-sm text-[var(--textSecondary)]">
       هذا مزادك - لا يمكنك المشاركة فيه
      </AlertDescription>
     </Alert>
    )}

    {/* Bid History */}
    {bids.length > 0 && (
     <div className="border-t border-[var(--border)] pt-4">
      <h4 className="font-medium text-[var(--primary)] mb-3">سجل المزايدات</h4>
      <ScrollArea className={cn('h-auto', showAllBids ? 'max-h-64' : '')}>
       <div className="space-y-2">
        {visibleBids.map((bid, index) => (
         <div
          key={bid.id}
          className={cn(
           'flex items-center justify-between p-2 rounded-lg',
           index === 0 ? 'bg-[var(--primary)]/10' : 'bg-[var(--surfaceMuted)]'
          )}
         >
          <div className="flex items-center gap-2">
           <Avatar className="h-6 w-6">
            <AvatarImage src={bid.bidder?.avatar_url} />
            <AvatarFallback className="bg-[var(--primary)] text-[var(--textInverse)] text-xs">
             {bid.bidder?.username?.[0] || 'U'}
            </AvatarFallback>
           </Avatar>
           <span className="text-sm text-[var(--text)]">
            {bid.bidder?.username || 'مستخدم'}
           </span>
          </div>
          <div className="text-left">
           <span className="font-bold text-[var(--primary)]">
            {formatCurrency(bid.amount)}
           </span>
           {bid.is_winning && (
            <Badge className="mr-2 bg-[var(--success)] text-[var(--textInverse)] text-xs">
             الأعلى
            </Badge>
           )}
          </div>
         </div>
        ))}
       </div>
      </ScrollArea>

      {bids.length > 5 && (
       <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowAllBids(!showAllBids)}
        className="w-full mt-2 text-[var(--primary)] hover:text-[var(--primaryDark)]"
       >
        {showAllBids ? (
         <>
          عرض أقل
          <ChevronUp className="h-4 w-4 mr-1" />
         </>
        ) : (
         <>
          عرض الكل ({bids.length})
          <ChevronDown className="h-4 w-4 mr-1" />
         </>
        )}
       </Button>
      )}
     </div>
    )}
   </CardContent>
  </Card>
 );
}