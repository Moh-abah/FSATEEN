// src/app/favorites/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Heart,
  Sparkles,
  Grid3X3,
  LayoutList,
  Search,
  X,
  Trash2,
  ChevronDown,
  ArrowUpDown,
  CheckCircle,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, EmptyState, ErrorState } from '@/components/shared';
import { useFavorites, useRemoveFavorite } from '@/hooks';
import { formatCurrency } from '@/lib/utils';
import { Favorite, PaginatedResponse } from '@/types';



// ✨ Premium Favorite Card - Grid View
function FavoriteCard({ product, onRemove, viewMode = 'grid' }: {
  product: any;
  onRemove: (id: string) => void;
  viewMode?: 'grid' | 'list';
}) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRemoving(true);
    await onRemove(product.id);
    setIsRemoving(false);
  };

  // Grid View Card
  if (viewMode === 'grid') {
    return (
      <div className="group relative">
        <Card className="
          overflow-hidden border border-[var(--border)] bg-[var(--surface)] 
          hover:shadow-2xl hover:shadow-[var(--primary)]/15 hover:border-[var(--primary)]/40
          transition-all duration-300 h-full flex flex-col
          active:scale-[0.99]
        ">
          {/* ✨ Product Image Section */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surfaceMuted)]">
            {/* Main Image */}
            <Link href={`/products/${product.id}`} className="block">
              <img
                src={product.images?.[0]?.url || '/placeholder-dress.png'}
                alt={product.title || 'منتج'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </Link>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className={`
                absolute top-3 left-3 z-20 w-9 h-9 rounded-full flex items-center justify-center
                backdrop-blur-md transition-all duration-200
                ${isRemoving
                  ? 'bg-[var(--error)] text-white scale-90'
                  : 'bg-white/90 text-[var(--text)] hover:bg-[var(--error)] hover:text-white hover:scale-110 shadow-md'
                }
              `}
              title="إزالة من المفضلة"
            >
              {isRemoving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-4.5 h-4.5" />
              )}
            </button>

            {/* Price Tag - Floating */}
            <div className="absolute bottom-3 left-3 z-10">
              <span className="
                px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md text-sm font-bold text-[var(--primary)] font-cairo 
                shadow-lg border border-white/30 min-w-[90px] text-center
              ">
                {formatCurrency(product.price)}
              </span>
            </div>

            {/* Image Count */}
            {product.images?.length > 1 && (
              <div className="absolute bottom-3 right-3 z-10">
                <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-xs font-medium font-cairo flex items-center gap-1">
                  <Grid3X3 className="w-3 h-3" />
                  {product.images.length}
                </span>
              </div>
            )}
          </div>

          {/* ✨ Product Info Section */}
          <CardContent className="p-4 flex-1 flex flex-col">
            {/* Title */}
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-[var(--text)] font-cairo line-clamp-2 mb-2 
                group-hover:text-[var(--primary)] transition-colors duration-200 leading-tight cursor-pointer">
                {product.title}
              </h3>
            </Link>

            {/* Category & City */}
            <div className="flex items-center gap-2 mb-3 text-xs text-[var(--textTertiary)] font-cairo">
              {product.category && <span className="truncate">{product.category}</span>}
              {product.category && product.city && <span>•</span>}
              {product.city && <span className="truncate">{product.city}</span>}
            </div>

            {/* Seller & Date */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]/60">
              <div className="flex items-center gap-1.5 text-xs text-[var(--textTertiary)] font-cairo">
                <span className="truncate max-w-[80px]">{product.seller?.name || 'بائعة'}</span>
              </div>
              <span className="text-xs text-[var(--textTertiary)] font-cairo">
                {new Date(product.published_at || product.created_at).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </CardContent>

          {/* ✨ Bottom Accent Line */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary)] 
            scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"
          />
        </Card>
      </div>
    );
  }

  // List View Card
  return (
    <Card className="
      overflow-hidden border border-[var(--border)] bg-[var(--surface)] 
      hover:shadow-xl hover:shadow-[var(--primary)]/8 hover:border-[var(--primary)]/30
      transition-all duration-300 cursor-pointer active:scale-[0.995]
    ">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link href={`/products/${product.id}`} className="relative w-28 h-36 rounded-2xl overflow-hidden bg-[var(--surfaceMuted)] shrink-0 ring-1 ring-[var(--border)] group-hover:ring-[var(--primary)]/30 transition-all">
            <img
              src={product.images?.[0]?.url || '/placeholder-dress.png'}
              alt={product.title || 'منتج'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
              loading="lazy"
            />
          </Link>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-[var(--text)] font-cairo line-clamp-1 group-hover:text-[var(--primary)] transition-colors cursor-pointer">
                    {product.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1 text-xs text-[var(--textTertiary)] font-cairo">
                  {product.category && <span>{product.category}</span>}
                  {product.category && product.city && <span>•</span>}
                  {product.city && <span>{product.city}</span>}
                </div>
              </div>
              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className={`
                  p-2 rounded-lg transition-all duration-200 shrink-0
                  ${isRemoving
                    ? 'bg-[var(--error)]/10 text-[var(--error)]'
                    : 'text-[var(--textTertiary)] hover:text-[var(--error)] hover:bg-[var(--error)]/10'
                  }
                `}
                title="إزالة من المفضلة"
              >
                {isRemoving ? (
                  <div className="w-4 h-4 border-2 border-[var(--error)]/30 border-t-[var(--error)] rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1.5 text-xs text-[var(--textTertiary)] font-cairo">
                <span>{product.seller?.name || 'بائعة'}</span>
                <span>•</span>
                <span>{new Date(product.added_at || product.published_at).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}</span>
              </div>
              <span className="font-bold text-lg text-[var(--primary)] font-cairo">
                {formatCurrency(product.price)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ✨ Premium Skeleton Loader
function FavoriteSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
  if (viewMode === 'grid') {
    return (
      <Card className="overflow-hidden border border-[var(--border)] bg-[var(--surface)] h-full animate-pulse">
        <Skeleton className="aspect-[3/4] bg-[var(--surfaceMuted)] rounded-none" />
        <CardContent className="p-4 space-y-3">
          <Skeleton className="h-5 w-full bg-[var(--surfaceMuted)] rounded-lg" />
          <Skeleton className="h-4 w-2/3 bg-[var(--surfaceMuted)] rounded-lg" />
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]/50">
            <Skeleton className="h-4 w-16 bg-[var(--surfaceMuted)] rounded" />
            <Skeleton className="h-4 w-12 bg-[var(--surfaceMuted)] rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-[var(--border)] bg-[var(--surface)] animate-pulse">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Skeleton className="w-28 h-36 rounded-2xl bg-[var(--surfaceMuted)] shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-3/4 bg-[var(--surfaceMuted)] rounded-lg" />
            <Skeleton className="h-4 w-1/2 bg-[var(--surfaceMuted)] rounded-lg" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-24 bg-[var(--surfaceMuted)] rounded" />
              <Skeleton className="h-5 w-16 bg-[var(--surfaceMuted)] rounded-lg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ✨ Premium Empty State
function FavoritesEmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <Card className="border-2 border-dashed border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surfaceMuted)]/30">
      <CardContent className="py-16 px-6 text-center">
        <div className="relative mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 rounded-3xl blur-2xl animate-pulse" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--primary)]/5 flex items-center justify-center ring-1 ring-[var(--primary)]/30">
            <Heart className="w-10 h-10 text-[var(--primary)]" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-[var(--text)] font-cairo mb-2">
          مفضلتكِ فارغة 💔
        </h3>
        <p className="text-[var(--textSecondary)] font-cairo mb-6 max-w-sm mx-auto leading-relaxed">
          أضيفي الفساتين التي تعجبكِ إلى المفضلة للوصول إليها بسرعة وسهولة
        </p>

        <Button
          onClick={onBrowse}
          className="bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:from-[var(--primaryDark)] hover:to-[var(--primary)] text-[var(--textInverse)] shadow-lg shadow-[var(--primary)]/30 font-cairo gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          تصفحي الفساتين
        </Button>
      </CardContent>
    </Card>
  );
}

// ✨ Clear All Dialog
function ClearAllDialog({ open, onOpenChange, onConfirm }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[var(--surface)] border-[var(--border)] rounded-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-[var(--error)]/10 flex items-center justify-center mb-3">
            <Trash2 className="w-6 h-6 text-[var(--error)]" />
          </div>
          <DialogTitle className="text-[var(--primary)] font-cairo">مسح المفضلة</DialogTitle>
          <DialogDescription className="text-[var(--textSecondary)] font-cairo">
            هل أنتِ متأكدة من إزالة جميع المنتجات من المفضلة؟ لا يمكن التراجع عن هذا الإجراء.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)] font-cairo"
          >
            إلغاء
          </Button>
          <Button
            variant="destructive"
            onClick={() => { onConfirm(); onOpenChange(false); }}
            className="font-cairo"
          >
            نعم، امسحي الكل
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const SORT_OPTIONS = [
  { value: 'added_at:desc', label: 'الأحدث أولاً', icon: Sparkles },
  { value: 'added_at:asc', label: 'الأقدم أولاً', icon: ChevronDown },
  { value: 'price:asc', label: 'السعر: من الأقل', icon: ArrowUpDown },
  { value: 'price:desc', label: 'السعر: من الأعلى', icon: ArrowUpDown },
  { value: 'title:asc', label: 'الاسم: أ-ي', icon: ArrowUpDown },
];

const VIEW_MODES = [
  { value: 'grid', icon: Grid3X3, label: 'شبكة' },
  { value: 'list', icon: LayoutList, label: 'قائمة' },
];

export default function FavoritesPage() {
  const { data, isLoading, error, refetch } = useFavorites();
  const { mutate: removeFavorite } = useRemoveFavorite();

  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('added_at:desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearDialog, setShowClearDialog] = useState(false);


  const favoritesItems = data?.items ?? [];

  // ✨ Filter and sort favorites
  const filteredFavorites = useMemo(() => {
    if (!data?.items) return [];
    let items = [...data.items];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.product?.title?.toLowerCase().includes(query) ||
        item.product?.category?.toLowerCase().includes(query)
      );
    }

    // Sort
    items.sort((a, b) => {
      const [field, order] = sortBy.split(':');
      const multiplier = order === 'asc' ? 1 : -1;

      switch (field) {

        case 'price':
          return multiplier * ((b.product?.price || 0) - (a.product?.price || 0));
        case 'title':
          return multiplier * (a.product?.title || '').localeCompare(b.product?.title || '', 'ar');

        case 'added_at':
          // استخدم a.product.published_at و b.product.published_at
          return multiplier * (
            new Date(b.product.published_at || b.added_at).getTime() -
            new Date(a.product.published_at || a.added_at).getTime()
          );

        default:
          return 0;
      }
    });

    return items;
  }, [data, searchQuery, sortBy]);



  const handleRemove = (productId: string) => {
    removeFavorite(productId);
    // لا حاجة لـ refetch() لأن useRemoveFavorite تقوم بـ invalidate تلقائياً
  };



  const handleBrowse = () => {
    window.location.href = '/products';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* ✨ Premium Header */}
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              {/* Title with Stats */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] rounded-2xl blur-lg opacity-40 animate-pulse" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] flex items-center justify-center shadow-xl shadow-[var(--primary)]/30">
                    <Heart className="h-7 w-7 text-[var(--textInverse)] fill-current" />
                  </div>
                  {favoritesItems.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 bg-[var(--primary)] text-[var(--textInverse)] text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-[var(--background)]">
                      {favoritesItems.length}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo tracking-tight">
                    المفضلة
                  </h1>
                  <p className="text-sm text-[var(--textSecondary)] font-cairo mt-0.5">
                    {data?.items?.length
                      ? `${data.items.length} ${data.items.length === 1 ? 'منتج' : 'منتجات'} محفوظة`
                      : 'احفظي ما يعجبكِ للرجوع إليه'}
                  </p>
                </div>
              </div>

              {/* Toolbar: Search + Sort + View Toggle + Actions */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[var(--textTertiary)]" />
                  <Input
                    placeholder="ابحثي في المفضلة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-40 sm:w-48 md:w-56 pr-10 bg-[var(--surface)] border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 font-cairo placeholder:text-[var(--textTertiary)] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-[var(--textTertiary)] hover:text-[var(--text)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)] font-cairo gap-2 min-w-[130px]"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                      ترتيب
                      <ChevronDown className="h-3 w-3 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[var(--surface)] border-[var(--border)] font-cairo w-56">
                    <DropdownMenuLabel className="text-xs text-[var(--textTertiary)] px-3 py-2">ترتيب حسب</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[var(--border)]" />
                    {SORT_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      return (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className={`
                            cursor-pointer justify-between px-3 py-2.5 hover:bg-[var(--surfaceMuted)]
                            ${sortBy === option.value ? 'text-[var(--primary)] font-semibold' : 'text-[var(--text)]'}
                          `}
                        >
                          <span className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {option.label}
                          </span>
                          {sortBy === option.value && <CheckCircle className="w-4 h-4 text-[var(--primary)]" />}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surfaceMuted)] border border-[var(--border)] shadow-sm">
                  {VIEW_MODES.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.value}
                        onClick={() => setViewMode(mode.value as 'grid' | 'list')}
                        className={`
                          p-2.5 rounded-lg transition-all duration-200
                          ${viewMode === mode.value
                            ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] text-[var(--textInverse)] shadow-md'
                            : 'text-[var(--textTertiary)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                          }
                        `}
                        title={mode.label}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </button>
                    );
                  })}
                </div>

                {/* Clear All Button */}
                {favoritesItems.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowClearDialog(true)}
                    className="text-[var(--textTertiary)] hover:text-[var(--error)] hover:bg-[var(--error)]/10 font-cairo gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">مسح الكل</span>
                  </Button>
                )}
              </div>
            </div>

            {/* ✨ Active Search Badge */}
            {searchQuery && (
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20 font-cairo gap-1.5">
                  نتائج لـ: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:scale-110 transition-transform">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </Badge>
                <span className="text-sm text-[var(--textTertiary)] font-cairo">
                  {filteredFavorites.length} نتيجة
                </span>
              </div>
            )}

            {/* ✨ Mobile View Toggle */}
            <div className="flex sm:hidden items-center justify-end gap-1 p-1 rounded-xl bg-[var(--surfaceMuted)] border border-[var(--border)] mb-4 w-fit ml-auto">
              {VIEW_MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.value}
                    onClick={() => setViewMode(mode.value as 'grid' | 'list')}
                    className={`
                      p-2 rounded-lg transition-all duration-200
                      ${viewMode === mode.value
                        ? 'bg-[var(--primary)] text-[var(--textInverse)] shadow-sm'
                        : 'text-[var(--textTertiary)] hover:text-[var(--text)]'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </header>

          {/* ✨ Favorites Grid/List */}
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            : 'space-y-4'
          }>
            {isLoading ? (
              <>
                {[...Array(viewMode === 'grid' ? 10 : 5)].map((_, i) => (
                  <FavoriteSkeleton key={i} viewMode={viewMode} />
                ))}
              </>
            ) : error ? (
              <div className="col-span-full">
                <ErrorState
                  onRetry={() => refetch()}
                  title="عذراً، حدث خطأ"
                  message="لم نتمكن من تحميل المفضلة. حاولي مرة أخرى"
           
                />
              </div>
            ) : filteredFavorites && filteredFavorites.length > 0 ? (
              <>
                {filteredFavorites.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fadeInUp"
                    style={{
                      animation: `fadeInUp 0.4s ease-out ${Math.min(index * 40, 300)}ms forwards`,
                      opacity: 0
                    }}
                  >
                    <FavoriteCard
                      product={item.product}
                      onRemove={handleRemove}
                      viewMode={viewMode}
                    />
                  </div>
                ))}
              </>
            ) : searchQuery ? (
              <div className="col-span-full">
                <EmptyState
                  icon={Search}
                  title="لا توجد نتائج"
                  description="جربي البحث بكلمات مختلفة"
                  actionLabel="مسح البحث"
                  onAction={() => setSearchQuery('')}
                />
              </div>
            ) : (
              <div className="col-span-full">
                <FavoritesEmptyState onBrowse={handleBrowse} />
              </div>
            )}
          </div>

          {/* ✨ Quick Stats Footer */}
          {favoritesItems.length > 0 && !isLoading && (
            <div className="mt-10 p-4 rounded-2xl bg-gradient-to-r from-[var(--primary)]/5 to-[var(--surface-muted)] border border-[var(--border)]/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[var(--primary)] fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text)] font-cairo">{favoritesItems.length}</p>
                    <p className="text-xs text-[var(--textSecondary)] font-cairo">منتج محفوظ</p>
                  </div>
                </div>

                <Separator className="hidden sm:block h-8 w-px bg-[var(--border)]" />

                <div className="text-sm text-[var(--textSecondary)] font-cairo">
                  💡 نصيحة: اضغطي على القلب في أي منتج لإضافته للمفضلة
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearDialog(true)}
                  className="border-[var(--border)] text-[var(--textTertiary)] hover:text-[var(--error)] hover:border-[var(--error)] font-cairo"
                >
                  <Trash2 className="w-4 h-4 ml-1.5" />
                  مسح الكل
                </Button>
              </div>
            </div>
          )}

        </div>
      </main>


      <Footer />
      <MobileBottomNav />
    </div>
  );
}