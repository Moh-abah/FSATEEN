// Rating stars component

'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  interactive = false,
  onChange,
}: RatingStarsProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => {
    const starValue = i + 1;
    const isFilled = starValue <= rating;
    const isHalf = starValue - 0.5 <= rating && starValue > rating;

    return { value: starValue, isFilled, isHalf };
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {stars.map((star) => (
          <button
            key={star.value}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star.value)}
            className={cn(
              "focus:outline-none transition-colors",
              interactive && "cursor-pointer hover:scale-110"
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                star.isFilled || star.isHalf
                  ? "fill-[var(--primary)] text-[var(--primary)]"
                  : "text-[var(--textTertiary)]"
              )}
            />
          </button>
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-[var(--textSecondary)] mr-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}