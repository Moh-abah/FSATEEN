// src/components/Rating/rating-dialog.tsx
'use client';

import { useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription,
 DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useOrderActions } from '@/hooks';

interface RatingDialogProps {
 orderId: string;
 isOpen: boolean;
 onClose: () => void;
 onSuccess?: () => void;
}

export function RatingDialog({ orderId, isOpen, onClose, onSuccess }: RatingDialogProps) {
 const [hoveredStar, setHoveredStar] = useState(0);
 const [selectedStar, setSelectedStar] = useState(0);
 const [comment, setComment] = useState('');
 const [error, setError] = useState<string | null>(null);

 const { rateOrder } = useOrderActions();

 const handleSubmit = async () => {
  if (selectedStar === 0) {
   setError('يرجى اختيار تقييم');
   return;
  }

  setError(null);

  try {
   await rateOrder.mutateAsync({
    orderId,
    data: {
     score: selectedStar,
     comment: comment.trim() || undefined,
    },
   });

   setSelectedStar(0);
   setHoveredStar(0);
   setComment('');
   onClose();
   onSuccess?.();
  } catch {
   setError('فشل إرسال التقييم، حاول مرة أخرى');
  }
 };

 const handleClose = () => {
  setSelectedStar(0);
  setHoveredStar(0);
  setComment('');
  setError(null);
  onClose();
 };

 return (
  <Dialog open={isOpen} onOpenChange={handleClose}>
   <DialogContent className="bg-[var(--surface)] border border-[var(--border)] sm:max-w-md">
    <DialogHeader>
     <DialogTitle className="text-[var(--primary)] font-cairo text-center">
      تقييم البائع 
     </DialogTitle>
     <DialogDescription className="text-center text-[var(--textSecondary)]">
      شاركينا تجربتكِ مع الطرف الآخر
     </DialogDescription>
    </DialogHeader>

    <div className="py-4 space-y-5">
     {/* Stars */}
     <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5">
       {[1, 2, 3, 4, 5].map((star) => (
        <button
         key={star}
         type="button"
         onClick={() => setSelectedStar(star)}
         onMouseEnter={() => setHoveredStar(star)}
         onMouseLeave={() => setHoveredStar(0)}
         className="p-0.5 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
        >
         <Star
          className={cn(
           'w-9 h-9 transition-colors',
           (hoveredStar || selectedStar) >= star
            ? 'fill-[var(--primary)] text-[var(--primary)]'
            : 'text-[var(--border)]'
          )}
         />
        </button>
       ))}
      </div>
      <span className="text-sm text-[var(--textSecondary)] font-cairo">
       {selectedStar > 0
        ? `${selectedStar} من 5 نجوم`
        : 'اضغطي لإضافة تقييم'}
      </span>
     </div>

     {/* Comment */}
     <div>
      <label className="text-sm font-medium text-[var(--text)] mb-2 block">
       تعليق (اختياري)
      </label>
      <Textarea
       placeholder="اكتبي تعليقكِ..."
       value={comment}
       onChange={(e) => setComment(e.target.value)}
       className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)] resize-none"
       rows={3}
      />
     </div>

     {/* Error */}
     {error && (
      <p className="text-sm text-[var(--error)] text-center">{error}</p>
     )}
    </div>

    <DialogFooter className="gap-2 sm:gap-2">
     <Button
      variant="outline"
      onClick={handleClose}
      className="border-[var(--border)] text-[var(--text)] font-cairo"
     >
      إلغاء
     </Button>
     <Button
      onClick={handleSubmit}
      disabled={rateOrder.isPending || selectedStar === 0}
      className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)] font-cairo"
     >
      {rateOrder.isPending ? (
       <>
        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
        جاري الإرسال...
       </>
      ) : (
       'إرسال التقييم'
      )}
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}