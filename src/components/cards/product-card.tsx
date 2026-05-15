'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, MapPin, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { formatCurrency, getConditionLabel, cn } from '@/lib/utils';
import { useToggleFavorite } from '@/hooks';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function ProductCard({ product, showActions = true, variant = 'default' }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const toggleFavorite = useToggleFavorite();

  const primaryImage = product.images?.[0]?.url || '/placeholder-dress.png';
  const isSold = product.status === 'sold';
  const isExpired = product.status === 'expired';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite.mutate(product.id);
  };
  

  const cardClasses = cn(
    "group overflow-hidden border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg bg-[var(--surface)]",
    variant === 'compact' && "flex flex-row h-32",
    variant === 'horizontal' && "flex flex-row"
  );

  const imageContainerClasses = cn(
    "relative overflow-hidden bg-[var(--surfaceMuted)]",
    variant === 'default' && "aspect-[3/4]",
    variant === 'compact' && "w-24 h-full",
    variant === 'horizontal' && "w-2/5 aspect-square"
  );

  const contentClasses = cn(
    variant === 'compact' && "flex-1 p-2",
    variant === 'horizontal' && "flex-1 p-4",
    variant === 'default' && "p-3"
  );

  
  return (
    <Link href={`/products/${product.id}`}>
      {/* <Card className="group overflow-hidden border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg bg-[var(--surface)]"> */}
        <Card className={cardClasses}>
        {/* Image Container */}
        {/* <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surfaceMuted)]"> */}
        <div className={imageContainerClasses}>  {/* ✅ تغيير هنا */}

          <Image
            src={imageError ? '/placeholder-dress.png' : primaryImage}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Status Badge */}
          {(isSold || isExpired) && (
            <div className="absolute inset-0 bg-[var(--overlay)] flex items-center justify-center">
              <Badge
                variant={isSold ? "default" : "secondary"}
                className={cn(
                  "text-white px-4 py-1",
                  isSold ? "bg-[var(--error)]" : "bg-gray-600"
                )}
              >
                {isSold ? 'مباع' : 'منتهي'}
              </Badge>
            </div>
          )}

          {/* Condition Badge */}
          {!isSold && !isExpired && (
            <Badge
              variant="outline"
              className="absolute top-2 right-2 bg-[var(--surface)]/90 text-[var(--primary)] border-[var(--primary)]"
            >
              {getConditionLabel(product.condition)}
            </Badge>
          )}

          {/* Favorite Button */}
          {showActions && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-2 left-2 h-8 w-8 rounded-full bg-[var(--surface)]/90 hover:bg-[var(--surface)] transition-colors",
                product.is_favorited && "text-[var(--error)]"
              )}
              onClick={handleFavoriteClick}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  product.is_favorited && "fill-[var(--error)]"
                )}
              />
            </Button>
          )}

          {/* Views count */}
          {product.views_count > 0 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
              <Eye className="h-3 w-3" />
              {product.views_count}
            </div>
          )}
        </div>

        {/* Content */}
        {/* <CardContent className="p-3"> */}
          <CardContent className={contentClasses}>  {/* ✅ تغيير هنا */}

          <h3 className={cn(
            "font-medium text-[var(--text)] line-clamp-2 mb-1",
            variant === 'default' && "text-sm min-h-[40px]",
            variant === 'compact' && "text-xs",
            variant === 'horizontal' && "text-base"
          )}>
            {product.title}
          </h3>

          <p className={cn(
            "font-bold text-[var(--primary)] font-cairo",
            variant === 'default' && "text-lg",
            variant === 'compact' && "text-sm",
            variant === 'horizontal' && "text-xl"
          )}>
            {formatCurrency(product.price)}
          </p>


          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-[var(--textSecondary)] mt-2">
            <MapPin className="h-3 w-3" />
            <span>{product.city}</span>
          </div>

          {/* Seller Info */}
          {product.seller && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[var(--borderLight)]">
              {product.seller.avatar_url ? (
                <Image
                  src={product.seller.avatar_url}
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--textInverse)] text-xs">
                  {product.seller.full_name?.charAt(0) || product.seller.username?.charAt(0) || 'ب'}
                </div>
              )}
              <span className="text-xs text-[var(--textSecondary)] truncate">
                {product.seller.full_name || product.seller.username || 'بائعة'}
              </span>
              {product.seller.is_verified && (
                <Badge variant="outline" className="h-4 text-[10px] px-1 border-[var(--primary)] text-[var(--primary)]">
                  موثقة
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}