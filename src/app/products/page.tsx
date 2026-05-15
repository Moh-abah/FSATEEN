'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Heart, 
  Eye, 
  Sparkles,
  Filter,
  Grid3X3,
  LayoutList,
  ArrowUpDown,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
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
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, EmptyState, ErrorState } from '@/components/shared';
import { useProducts, useCategories, useCities } from '@/hooks';
import { formatCurrency, cn } from '@/lib/utils';
import { ProductFilters } from '@/types';


// ✨ Configuration Constants
const SORT_OPTIONS = [
  { value: 'published_at:desc', label: 'الأحدث أولاً', icon: Sparkles },
  { value: 'published_at:asc', label: 'الأقدم أولاً', icon: ChevronDown },
  { value: 'price:asc', label: 'السعر: من الأقل', icon: ArrowUpDown },
  { value: 'price:desc', label: 'السعر: من الأعلى', icon: ArrowUpDown },
];

const CONDITIONS = [
  { value: 'new', label: 'جديد ✨', color: 'var(--success)' },
  { value: 'like_new', label: 'كالجديد 🌟', color: 'var(--info)' },
  { value: 'good', label: 'جيد 👍', color: 'var(--warning)' },
  { value: 'fair', label: 'مقبول 💫', color: 'var(--textTertiary)' },
];

const VIEW_MODES = [
  { value: 'grid', icon: Grid3X3, label: 'شبكة' },
  { value: 'list', icon: LayoutList, label: 'قائمة' },
];

// ✨ Premium Product Card - Grid View
function PremiumProductCard({ product, viewMode = 'grid' }: { product: any; viewMode?: 'grid' | 'list' }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter(); // داخل الدالة
  const conditionConfig: Record<string, { bg: string; text: string; label: string }> = {
    new: { bg: 'bg-[var(--success)]/10', text: 'text-[var(--success)]', label: 'جديد' },
    like_new: { bg: 'bg-[var(--info)]/10', text: 'text-[var(--info)]', label: 'كالجديد' },
    good: { bg: 'bg-[var(--warning)]/10', text: 'text-[var(--warning)]', label: 'جيد' },
    fair: { bg: 'bg-[var(--textTertiary)]/10', text: 'text-[var(--textTertiary)]', label: 'مقبول' },
  };
  
  const condition = conditionConfig[product.condition] || conditionConfig.good;

  // Grid View Card
  if (viewMode === 'grid') {
    return (
      <div className="group relative">
        <Card 
          onClick={() => router.push(`/products/${product.id}`)}

        className="
          overflow-hidden border border-[var(--border)] bg-[var(--surface)] 
          hover:shadow-2xl hover:shadow-[var(--primary)]/15 hover:border-[var(--primary)]/40
          transition-all duration-300 h-full flex flex-col cursor-pointer
          active:scale-[0.99]
        ">
          {/* ✨ Product Image Section */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surfaceMuted)]">
            {/* Main Image with Elegant Zoom */}
            <img
              src={product.images?.[0]?.url || '/placeholder-dress.png'}
              alt={product.title || 'منتج'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Wishlist Button */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
              className={`
                absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center
                backdrop-blur-md transition-all duration-200
                ${isWishlisted 
                  ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30' 
                  : 'bg-white/90 text-[var(--text)] hover:bg-white hover:scale-110 shadow-md'
                }
              `}
            >
              <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            
            {/* Condition Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`
                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold font-cairo
                ${condition.bg} ${condition.text} backdrop-blur-md border border-current/20
              `}>
                {condition.label}
              </span>
            </div>
            
            {/* Quick Actions - Reveal on Hover */}
            <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
              <div className="flex gap-2">
                <Button 
                  size="sm"
                  className="flex-1 bg-white/95 backdrop-blur-md text-[var(--text)] hover:bg-white font-cairo font-medium shadow-lg border border-white/20"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                  <Eye className="w-4 h-4 ml-1" />
                  معاينة
                </Button>
              </div>
            </div>
            
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
            <h3 className="font-semibold text-[var(--text)] font-cairo line-clamp-2 mb-2 
              group-hover:text-[var(--primary)] transition-colors duration-200 leading-tight">
              {product.title}
            </h3>
            
            {/* Category & City */}
            <div className="flex items-center gap-2 mb-3 text-xs text-[var(--textTertiary)] font-cairo">
              {product.category && (
                <span className="truncate">{product.category}</span>
              )}
              {product.category && product.city && <span>•</span>}
              {product.city && (
                <span className="truncate">{product.city}</span>
              )}
            </div>
            
            {/* Seller & Date */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]/60">
              <div className="flex items-center gap-1.5 text-xs text-[var(--textTertiary)] font-cairo">


                {product.seller?.avatar_url ? (
                  <img
                    src={product.seller.avatar_url}
                    alt={product.seller.name}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-[var(--border)]"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[var(--primary)]">
                      {product.seller?.name?.charAt(0) || 'ب'}
                    </span>
                  </div>
                )}
                <span className="truncate max-w-[80px]">{product.seller?.name || 'بائعة'}</span>
              </div>
              <span className="text-xs text-[var(--textTertiary)] font-cairo">
                {new Date(product.published_at).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
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
    <Card 
      onClick={() => router.push(`/products/${product.id}`)}
    className="
      overflow-hidden border border-[var(--border)] bg-[var(--surface)] 
      hover:shadow-xl hover:shadow-[var(--primary)]/8 hover:border-[var(--primary)]/30
      transition-all duration-300 cursor-pointer active:scale-[0.995]
    ">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-28 h-36 rounded-2xl overflow-hidden bg-[var(--surfaceMuted)] shrink-0 ring-1 ring-[var(--border)] group-hover:ring-[var(--primary)]/30 transition-all">
            <img
              src={product.images?.[0]?.url || '/placeholder-dress.png'}
              alt={product.title || 'منتج'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
              loading="lazy"
            />
            {/* Wishlist */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
              className={`
                absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center
                backdrop-blur-md transition-all duration-200
                ${isWishlisted 
                  ? 'bg-[var(--primary)] text-white shadow-md' 
                  : 'bg-white/90 text-[var(--text)] hover:bg-white'
                }
              `}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-[var(--text)] font-cairo line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-[var(--textTertiary)] font-cairo">
                  {product.category && <span>{product.category}</span>}
                  {product.category && product.city && <span>•</span>}
                  {product.city && <span>{product.city}</span>}
                </div>
              </div>
              <span className={`
                px-3 py-1 rounded-full text-xs font-semibold font-cairo shrink-0
                ${condition.bg} ${condition.text} border border-current/20
              `}>
                {condition.label}
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1.5 text-xs text-[var(--textTertiary)] font-cairo">
                {product.seller?.avatar_url ? (
                  <img src={product.seller.avatar_url} alt="" className="w-5 h-5 rounded-full object-cover ring-1 ring-[var(--border)]" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[var(--primary)]">
                      {product.seller?.full_name?.[0] || product.seller?.username?.[0] || 'ب'}
                    </span>
                  </div>
                )}
                <span>{product.seller?.full_name || product.seller?.username || 'بائعة'}</span>
                <span>•</span>
                <span>{new Date(product.published_at || product.created_at).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}</span>
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
function ProductSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
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
function ProductsEmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <Card className="border-2 border-dashed border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surfaceMuted)]/30">
      <CardContent className="py-16 px-6 text-center">
        <div className="relative mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 rounded-3xl blur-2xl" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--primary)]/5 flex items-center justify-center ring-1 ring-[var(--primary)]/30">
            <Search className="w-10 h-10 text-[var(--primary)]" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-[var(--text)] font-cairo mb-2">
          لم نعثر على نتائج 🤔
        </h3>
        <p className="text-[var(--textSecondary)] font-cairo mb-6 max-w-sm mx-auto leading-relaxed">
          جربي تغيير الفلاتر أو استخدام كلمات بحث مختلفة لاكتشاف فساتين رائعة
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline"
            onClick={onClearFilters}
            className="border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] font-cairo"
          >
            <X className="w-4 h-4 ml-2" />
            مسح الفلاتر
          </Button>
          <Button 
            asChild
            className="bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:from-[var(--primaryDark)] hover:to-[var(--primary)] text-[var(--textInverse)] shadow-lg shadow-[var(--primary)]/30 font-cairo"
          >
            <a href="/products">عرض الكل</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ✨ Filter Sheet Content - Premium Design
function FilterSheetContent({ 
  categories, 
  cities, 
  filters, 
  priceRange, 
  onPriceChange, 
  onFilterChange, 
  onApply, 
  onClear 
}: any) {
  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="pb-4 border-b border-[var(--border)]">
        <SheetTitle className="text-[var(--primary)] font-cairo flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          فلاتر البحث
        </SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2 scrollbar-thin">
        
        {/* Category */}
        <div className="space-y-3">
          <Label className="text-[var(--text)] font-cairo font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            التصنيف
          </Label>
          <Select
            value={filters.category || ''}
            onValueChange={(value) => onFilterChange('category', value || undefined)}
          >
            <SelectTrigger className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)] font-cairo">
              <SelectValue placeholder="اختر التصنيف" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--surface)] border-[var(--border)] font-cairo">
              <SelectItem value="">جميع التصنيفات</SelectItem>
              {categories?.map((cat: any) => (
                <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-3">
          <Label className="text-[var(--text)] font-cairo font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            المدينة
          </Label>
          <Select
            value={filters.city || ''}
            onValueChange={(value) => onFilterChange('city', value || undefined)}
          >
            <SelectTrigger className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)] font-cairo">
              <SelectValue placeholder="اختر المدينة" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--surface)] border-[var(--border)] font-cairo max-h-60">
              <SelectItem value="">جميع المدن</SelectItem>
              {cities?.map((city: any) => (
                <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Condition */}
        <div className="space-y-3">
          <Label className="text-[var(--text)] font-cairo font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            حالة الفستان
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {CONDITIONS.map((cond) => (
              <button
                key={cond.value}
                onClick={() => onFilterChange('condition', filters.condition === cond.value ? undefined : cond.value)}
                className={`
                  p-3 rounded-xl border text-sm font-cairo text-right transition-all duration-200
                  ${filters.condition === cond.value 
                    ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm' 
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--primary)]/50'
                  }
                `}
                style={filters.condition === cond.value ? { borderColor: cond.color, color: cond.color } : {}}
              >
                {cond.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <Label className="text-[var(--text)] font-cairo font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            نطاق السعر
          </Label>
          
          <div className="pt-4 px-1">
            <Slider
              value={priceRange}
              onValueChange={onPriceChange}
              min={0}
              max={10000}
              step={100}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-center">
              <span className="text-xs text-[var(--textTertiary)] font-cairo">من</span>
              <p className="text-sm font-bold text-[var(--primary)] font-cairo">{formatCurrency(priceRange[0])}</p>
            </div>
            <div className="text-center">
              <span className="text-xs text-[var(--textTertiary)] font-cairo">إلى</span>
              <p className="text-sm font-bold text-[var(--primary)] font-cairo">{formatCurrency(priceRange[1])}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Actions */}
      <SheetFooter className="pt-4 border-t border-[var(--border)] gap-2">
        <SheetClose asChild>
          <Button
            variant="outline"
            className="flex-1 border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)] font-cairo"
            onClick={onClear}
          >
            <X className="w-4 h-4 ml-2" />
            مسح الكل
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button
            className="flex-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:from-[var(--primaryDark)] hover:to-[var(--primary)] text-[var(--textInverse)] font-cairo shadow-md"
            onClick={onApply}
          >
            <CheckCircle className="w-4 h-4 ml-2" />
            تطبيق الفلاتر
          </Button>
        </SheetClose>
      </SheetFooter>
    </div>
  );
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial filters from URL
  const initialFilters: ProductFilters = {
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    city: searchParams.get('city') || undefined,
    condition: searchParams.get('condition') || undefined,
    min_price: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
    max_price: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
    sort_by: searchParams.get('sort_by') || 'published_at',
    sort_order: (searchParams.get('sort_order') as 'asc' | 'desc') || 'desc',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    page_size: 20,
  };

  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.min_price || 0,
    filters.max_price || 10000,
  ]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch data
  const {  data, isLoading, error, refetch } = useProducts(filters);
  const { data: categories } = useCategories();
  const { data: cities } = useCities();
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 1) {
        params.set(key, String(value));
      }
    });
    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchInput || undefined, page: 1 }));
  };

  const handleSortChange = (value: string) => {
    const [sort_by, sort_order] = value.split(':');
    setFilters(prev => ({ ...prev, sort_by, sort_order: sort_order as 'asc' | 'desc', page: 1 }));
  };

  const handleFilterChange = (key: string, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const applyPriceFilter = () => {
    setFilters(prev => ({
      ...prev,
      min_price: priceRange[0] > 0 ? priceRange[0] : undefined,
      max_price: priceRange[1] < 10000 ? priceRange[1] : undefined,
      page: 1,
    }));
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      sort_by: 'published_at',
      sort_order: 'desc',
      page: 1,
      page_size: 20,
    });
    setSearchInput('');
    setPriceRange([0, 10000]);
  };

  const activeFilters = useMemo(() => {
    const items: { key: string; label: string; value: any }[] = [];
    if (filters.category) {
      const cat = categories?.find((c: any) => c.slug === filters.category);
      items.push({ key: 'category', label: cat?.name || filters.category, value: filters.category });
    }
    if (filters.city) items.push({ key: 'city', label: filters.city, value: filters.city });
    if (filters.condition) {
      const cond = CONDITIONS.find(c => c.value === filters.condition);
      items.push({ key: 'condition', label: cond?.label.split(' ')[0] || filters.condition, value: filters.condition });
    }
    if (filters.min_price || filters.max_price) {
      items.push({ 
        key: 'price', 
        label: `${formatCurrency(filters.min_price || 0)} - ${formatCurrency(filters.max_price || 10000)}`,
        value: { min: filters.min_price, max: filters.max_price }
      });
    }
    return items;
  }, [filters, categories]);

  const removeFilter = (key: string) => {
    if (key === 'price') {
      setPriceRange([0, 10000]);
      setFilters(prev => ({ ...prev, min_price: undefined, max_price: undefined, page: 1 }));
    } else {
      handleFilterChange(key, undefined);
    }
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
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] rounded-2xl blur-lg opacity-40" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] flex items-center justify-center shadow-xl shadow-[var(--primary)]/30">
                    <Sparkles className="h-7 w-7 text-[var(--textInverse)]" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo tracking-tight">
                    الفساتين
                  </h1>
                  <p className="text-sm text-[var(--textSecondary)] font-cairo mt-0.5">
                    {data?.total ? `${data.total} فستان متاح` : 'اكتشفي مجموعتنا'}
                  </p>
                </div>
              </div>

              {/* Search + Sort + View Toggle */}
              <div className="flex items-center gap-2">
                {/* Search */}
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="ابحثي عن فستان..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-40 sm:w-56 md:w-64 pr-10 bg-[var(--surface)] border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 font-cairo placeholder:text-[var(--textTertiary)] transition-all"
                  />
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[var(--textTertiary)]" />
                  {searchInput && (
                    <button 
                      type="button"
                      onClick={() => { setSearchInput(''); setFilters(prev => ({ ...prev, search: undefined, page: 1 })); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-[var(--textTertiary)] hover:text-[var(--text)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </form>

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
                          onClick={() => handleSortChange(option.value)}
                          className={`
                            cursor-pointer justify-between px-3 py-2.5 hover:bg-[var(--surfaceMuted)]
                            ${`${filters.sort_by}:${filters.sort_order}` === option.value ? 'text-[var(--primary)] font-semibold' : 'text-[var(--text)]'}
                          `}
                        >
                          <span className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {option.label}
                          </span>
                          {`${filters.sort_by}:${filters.sort_order}` === option.value && <CheckCircle className="w-4 h-4 text-[var(--primary)]" />}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-[var(--surfaceMuted)] border border-[var(--border)] shadow-sm">
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

                {/* Filter Sheet Trigger */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="relative border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)] font-cairo gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">فلاتر</span>
                      {activeFilters.length > 0 && (
                        <Badge className="absolute -top-1.5 -left-1.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-bold bg-[var(--primary)] text-[var(--textInverse)] border-0 shadow-sm">
                          {activeFilters.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[320px] sm:w-[380px] bg-[var(--surface)] border-r border-[var(--border)] p-0">
                    <FilterSheetContent
                      categories={categories}
                      cities={cities}
                      filters={filters}
                      priceRange={priceRange}
                      onPriceChange={handlePriceChange}
                      onFilterChange={handleFilterChange}
                      onApply={applyPriceFilter}
                      onClear={clearFilters}
                    />
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* ✨ Active Filters Chips */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-[var(--textSecondary)] font-cairo ml-2">الفلاتر النشطة:</span>
                {activeFilters.map((filter) => (
                  <Badge 
                    key={filter.key}
                    variant="secondary" 
                    className="gap-1.5 px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 font-cairo font-medium hover:bg-[var(--primary)]/20 transition-colors cursor-pointer"
                    onClick={() => removeFilter(filter.key)}
                  >
                    {filter.label}
                    <X className="h-3.5 w-3.5 hover:scale-110 transition-transform" />
                  </Badge>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearFilters}
                  className="text-[var(--textTertiary)] hover:text-[var(--text)] font-cairo text-sm h-auto py-1 px-2"
                >
                  مسح الكل
                </Button>
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

          {/* ✨ Products Grid/List */}
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' 
            : 'space-y-4'
          }>
            {isLoading ? (
              <>
                {[...Array(viewMode === 'grid' ? 10 : 5)].map((_, i) => (
                  <ProductSkeleton key={i} viewMode={viewMode} />
                ))}
              </>
            ) : error ? (
              <div className="col-span-full">
                <ErrorState 
                  onRetry={() => refetch()} 
                  title="عذراً، حدث خطأ"
                    message="لم نتمكن من تحميل الفساتين. حاولي مرة أخرى"
         
                />
              </div>
            ) : data?.items && data.items.length > 0 ? (
              <>
                    {data.items.map((product) => (
                      <PremiumProductCard key={product.id} product={product} viewMode={viewMode} />
                    ))}
              </>
            ) : (
              <div className="col-span-full">
                <ProductsEmptyState onClearFilters={clearFilters} />
              </div>
            )}
          </div>

          {/* ✨ Premium Pagination */}
          {data?.total && data.total > (filters.page_size || 20) && !isLoading && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-[var(--border)]">
              <p className="text-sm text-[var(--textSecondary)] font-cairo">
                عرض <span className="font-medium text-[var(--text)]">{((filters.page || 1) - 1) * (filters.page_size || 20) + 1}</span> - <span className="font-medium text-[var(--text)]">{Math.min((filters.page || 1) * (filters.page_size || 20), data.total)}</span> من <span className="font-medium text-[var(--primary)]">{data.total}</span> فستان
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={(filters.page || 1) === 1}
                  onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) - 1 }))}
                  className="border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] font-cairo disabled:opacity-50"
                >
                  السابق
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, Math.ceil(data.total / (filters.page_size || 20))) }, (_, i) => {
                    const pageNum = (filters.page || 1) - 2 + i;
                    if (pageNum < 1 || pageNum > Math.ceil(data.total / (filters.page_size || 20))) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setFilters(prev => ({ ...prev, page: pageNum }))}
                        className={`
                          w-9 h-9 rounded-lg text-sm font-medium font-cairo transition-all
                          ${pageNum === filters.page 
                            ? 'bg-[var(--primary)] text-[var(--textInverse)] shadow-md' 
                            : 'text-[var(--text)] hover:bg-[var(--surfaceMuted)]'
                          }
                        `}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  disabled={(filters.page || 1) * (filters.page_size || 20) >= data.total}
                  onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }))}
                  className="border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] font-cairo disabled:opacity-50"
                >
                  التالي
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