// Seller products list page

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, EmptyState, ErrorState } from '@/components/shared';
import { useSellerProducts, useDeleteSellerProduct, useUpdateSellerProduct } from '@/hooks';
import { formatCurrency, formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { Product } from '@/types';

const statusLabels: Record<string, string> = {
  active: 'نشط',
  sold: 'مباع',
  expired: 'منتهي',
  hidden: 'مخفي',
};

const statusColors: Record<string, string> = {
  active: 'bg-[var(--success)]',
  sold: 'bg-[var(--info)]',
  expired: 'bg-[var(--textTertiary)]',
  hidden: 'bg-[var(--warning)]',
};

const conditionLabels: Record<string, string> = {
  new: 'جديد',
  like_new: 'كالجديد',
  good: 'جيد',
  fair: 'مقبول',
};

export default function SellerProductsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { data: products, isLoading, error, refetch } = useSellerProducts(page, 12);
  const deleteProduct = useDeleteSellerProduct();
  const updateProduct = useUpdateSellerProduct();

  // Filter products by status and search on client side
  const filteredProducts = products?.items?.filter((product) => {
    const matchesStatus = status === 'all' || product.status === status;
    const matchesSearch = !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(search);
    setPage(1);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct.mutateAsync(productToDelete.id);
      toast.success('تم حذف المنتج بنجاح');
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      refetch();
    } catch (error) {
      toast.error('فشل في حذف المنتج');
    }
  };

  const handleToggleVisibility = async (product: Product) => {
    try {
      const newStatus = product.status === 'hidden' ? 'active' : 'hidden';
      await updateProduct.mutateAsync({
        productId: product.id,
        data: { status: newStatus }
      });
      toast.success(newStatus === 'hidden' ? 'تم إخفاء المنتج' : 'تم إظهار المنتج');
      refetch();
    } catch (error) {
      toast.error('فشل في تحديث حالة المنتج');
    }
  };

  const handleCopyLink = (productId: string) => {
    const url = `${window.location.origin}/products/${productId}`;
    navigator.clipboard.writeText(url);
    toast.success('تم نسخ رابط المنتج');
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <ErrorState
            title="فشل في تحميل المنتجات"
            message="تعذر تحميل قائمة المنتجات. يرجى المحاولة مرة أخرى."
            onRetry={() => refetch()}
          />
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
                <Package className="h-5 w-5 text-[var(--textInverse)]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">منتجاتي</h1>
                <p className="text-sm text-[var(--textSecondary)]">
                  {products?.total || 0} منتج
                </p>
              </div>
            </div>
            <Button asChild className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]">
              <Link href="/seller/products/new">
                <Plus className="h-4 w-4 ml-2" />
                إضافة منتج
              </Link>
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--textTertiary)]" />
                <Input
                  type="text"
                  placeholder="ابحث في منتجاتك..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pr-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                />
              </div>
            </form>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-40 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="sold">مباع</SelectItem>
                <SelectItem value="expired">منتهي</SelectItem>
                <SelectItem value="hidden">مخفي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <LoadingSkeleton type="card" count={6} />
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="border border-[var(--border)] bg-[var(--surface)] overflow-hidden hover:shadow-md transition-shadow">
                    {/* Image */}
                    <div className="relative aspect-square bg-[var(--surfaceMuted)]">
                      <img
                        src={product.images?.[0]?.url || '/placeholder-dress.png'}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge
                        className={`absolute top-2 right-2 ${statusColors[product.status]} text-[var(--textInverse)]`}
                      >
                        {statusLabels[product.status]}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-2 left-2 h-8 w-8 bg-[var(--surface)]/90 hover:bg-[var(--surface)] text-[var(--text)]"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="bg-[var(--surface)] border-[var(--border)]">
                          <DropdownMenuItem asChild>
                            <Link href={`/seller/products/${product.id}/edit`} className="text-[var(--text)]">
                              <Edit className="h-4 w-4 ml-2" />
                              تعديل
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleVisibility(product)} className="text-[var(--text)]">
                            {product.status === 'hidden' ? (
                              <>
                                <Eye className="h-4 w-4 ml-2" />
                                إظهار
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-4 w-4 ml-2" />
                                إخفاء
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCopyLink(product.id)} className="text-[var(--text)]">
                            <Copy className="h-4 w-4 ml-2" />
                            نسخ الرابط
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/products/${product.id}`} target="_blank" className="text-[var(--text)]">
                              <ExternalLink className="h-4 w-4 ml-2" />
                              عرض في الموقع
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-[var(--error)] focus:text-[var(--error)]"
                            onClick={() => {
                              setProductToDelete(product);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Content */}
                    <CardContent className="p-4">
                      <Link href={`/seller/products/${product.id}/edit`}>
                        <h3 className="font-medium text-[var(--text)] truncate hover:text-[var(--primary)] transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[var(--primary)] font-bold">
                          {formatCurrency(product.price)}
                        </span>
                        {product.purchase_price && (
                          <span className="text-xs text-[var(--textTertiary)] line-through">
                            {formatCurrency(product.purchase_price)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-[var(--textSecondary)]">
                        <span>{conditionLabels[product.condition] || product.condition}</span>
                        <span>{product.views_count} مشاهدة</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-xs text-[var(--textSecondary)]">
                        <span>{product.city}</span>
                        <span>{formatDate(product.created_at)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {products?.pages && products.pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]"
                  >
                    السابق
                  </Button>
                  <span className="flex items-center px-3 text-sm text-[var(--textSecondary)]">
                    {page} / {products.pages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= (products.pages || 1)}
                    onClick={() => setPage(p => p + 1)}
                    className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]"
                  >
                    التالي
                  </Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={Package}
              title={searchQuery || status !== 'all' ? 'لا توجد نتائج' : 'لا توجد منتجات'}
              description={
                searchQuery || status !== 'all'
                  ? 'جربي تغيير معايير البحث'
                  : 'ابدئي بإضافة منتجك الأول للبيع'
              }
                  actionLabel={!searchQuery && status === 'all' ? "إضافة منتج" : undefined}
                  actionHref={!searchQuery && status === 'all' ? "/seller/products/new" : undefined}

            />
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[var(--surface)] border-[var(--border)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[var(--primary)]">حذف المنتج</AlertDialogTitle>
            <AlertDialogDescription className="text-[var(--textSecondary)]">
              هل أنت متأكدة من حذف "{productToDelete?.title}"؟
              <br />
              لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]">إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-[var(--error)] hover:bg-[var(--errorDark)] text-[var(--textInverse)]"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}