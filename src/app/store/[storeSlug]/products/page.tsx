// Store products listing page

'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Package, ChevronLeft, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, EmptyState } from '@/components/shared';
import { usePublicStore, useStoreProducts } from '@/hooks';
import { formatCurrency } from '@/lib/utils';

export default function StoreProductsPage() {
 const params = useParams();
 const storeSlug = params.storeSlug as string;
 const [search, setSearch] = useState('');
 const [sortBy, setSortBy] = useState('newest');
 const [page, setPage] = useState(1);

 const { data: store } = usePublicStore(storeSlug);
 const { data: products, isLoading } = useStoreProducts(storeSlug, page, 24, search);

 return (
  <div className="min-h-screen flex flex-col bg-[var(--background)]">
   <Navbar />

   <main className="flex-1 py-6">
    <div className="container mx-auto px-4">
     {/* Header */}
     <div className="flex items-center gap-3 mb-6">
      <Button variant="ghost" size="icon" asChild className="text-[var(--text)]">
       <Link href={`/store/${storeSlug}`}>
        <ChevronLeft className="h-5 w-5" />
       </Link>
      </Button>
      <div>
       <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">
        منتجات {store?.store_name || 'المتجر'}
       </h1>
       <p className="text-sm text-[var(--textSecondary)]">
        {products?.total || 0} منتج
       </p>
      </div>
     </div>

     {/* Filters */}
     <div className="flex flex-wrap gap-3 mb-6">
      <div className="flex-1 min-w-[200px] max-w-md">
       <Input
        type="search"
        placeholder="ابحثي في المنتجات..."
        value={search}
        onChange={(e) => {
         setSearch(e.target.value);
         setPage(1);
        }}
        className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
       />
      </div>
      <Select value={sortBy} onValueChange={setSortBy}>
       <SelectTrigger className="w-40 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
        <SelectValue placeholder="ترتيب حسب" />
       </SelectTrigger>
       <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
        <SelectItem value="newest">الأحدث</SelectItem>
        <SelectItem value="price_low">السعر: من الأقل</SelectItem>
        <SelectItem value="price_high">السعر: من الأعلى</SelectItem>
        <SelectItem value="popular">الأكثر شعبية</SelectItem>
       </SelectContent>
      </Select>
     </div>

     {/* Products Grid */}
     {isLoading ? (
      <LoadingSkeleton type="card" count={8} />
     ) : products?.items && products.items.length > 0 ? (
      <>
       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.items.map((product) => (
         <Link key={product.id} href={`/products/${product.id}`}>
          <Card className="border border-[var(--border)] bg-[var(--surface)] overflow-hidden hover:shadow-lg transition-shadow">
           <div className="aspect-[3/4] bg-[var(--surfaceMuted)] relative">
            <img
             src={product.images?.[0]?.url || '/placeholder-dress.png'}
             alt={product.title}
             className="w-full h-full object-cover"
            />
            {product.status === 'sold' && (
             <div className="absolute inset-0 bg-[var(--overlay)] flex items-center justify-center">
              <Badge className="bg-[var(--error)] text-[var(--textInverse)]">مباع</Badge>
             </div>
            )}
           </div>
           <CardContent className="p-3">
            <p className="text-sm text-[var(--text)] truncate">{product.title}</p>
            <div className="flex items-center justify-between mt-1">
             <p className="text-[var(--primary)] font-bold text-sm">
              {formatCurrency(product.price)}
             </p>
             {product.condition && (
              <Badge variant="outline" className="text-xs border-[var(--border)] text-[var(--textSecondary)]">
               {product.condition === 'new' ? 'جديد' : 'مستعمل'}
              </Badge>
             )}
            </div>
           </CardContent>
          </Card>
         </Link>
        ))}
       </div>

       {/* Pagination */}
       {products.pages && products.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
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
       title="لا توجد منتجات"
       description={search ? 'لم يتم العثور على منتجات مطابقة' : 'لم يتم إضافة منتجات بعد'}
      />
     )}
    </div>
   </main>

   <Footer />
   <MobileBottomNav />
  </div>
 );
}