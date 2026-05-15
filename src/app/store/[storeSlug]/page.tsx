// Public store page

'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Store, MapPin, Star, Package, Instagram, Twitter, ExternalLink, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, ErrorState, RatingStars, EmptyState } from '@/components/shared';
import { usePublicStore, useStoreProducts } from '@/hooks';
import { formatCurrency } from '@/lib/utils';

export default function StorePage() {
 const params = useParams();
 const storeSlug = params.storeSlug as string;
 const [search, setSearch] = useState('');
 const [page, setPage] = useState(1);

 const { data: store, isLoading: storeLoading, error } = usePublicStore(storeSlug);
 const { data: products, isLoading: productsLoading } = useStoreProducts(storeSlug, page, 20, search);

 const isLoading = storeLoading || productsLoading;

 if (storeLoading) {
  return (
   <div className="min-h-screen flex flex-col bg-[var(--background)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-6">
     <LoadingSkeleton type="card" count={3} />
    </main>
    <Footer />
    <MobileBottomNav />
   </div>
  );
 }

 if (error || !store) {
  return (
   <div className="min-h-screen flex flex-col bg-[var(--background)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-6">
     <ErrorState
      title="المتجر غير موجود"
      message="لم نتمكن من العثور على هذا المتجر"
      onRetry={() => window.location.reload()}
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
     {/* Store Header */}
     <div className="relative mb-6">
      {/* Banner */}
      {store.store_banner_url && (
       <div className="w-full h-48 rounded-xl overflow-hidden bg-[var(--surfaceMuted)] mb-4">
        <img
         src={store.store_banner_url}
         alt={store.store_name}
         className="w-full h-full object-cover"
        />
       </div>
      )}

      {/* Store Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
       {/* Logo */}
       <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--surfaceMuted)] border-4 border-[var(--surface)] shadow-lg">
        <img
         src={store.store_logo_url || '/placeholder-dress.png'}
         alt={store.store_name}
         className="w-full h-full object-cover"
        />
       </div>

       <div className="flex-1 text-center sm:text-right">
        <div className="flex items-center justify-center sm:justify-start gap-2">
         <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">
          {store.store_name}
         </h1>
         {store.is_verified && (
          <Badge className="bg-[var(--primary)] text-[var(--textInverse)]">
           <Star className="h-3 w-3 ml-1" />
           موثق
          </Badge>
         )}
        </div>

        {store.store_description && (
         <p className="text-[var(--textSecondary)] text-sm mt-1 max-w-md">
          {store.store_description}
         </p>
        )}

        <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-[var(--textSecondary)]">
         {store.city && (
          <span className="flex items-center gap-1">
           <MapPin className="h-4 w-4" />
           {store.city}
          </span>
         )}
         <span className="flex items-center gap-1">
          <RatingStars rating={store.rating || 0} size="sm" />
          <span>({store.total_ratings || 0})</span>
         </span>
         <span className="flex items-center gap-1">
          <Package className="h-4 w-4" />
          {store.products_count || 0} منتج
         </span>
        </div>
       </div>

       {/* Social Links */}
       <div className="flex gap-2">
        {store.social_instagram && (
         <a
          href={`https://instagram.com/${store.social_instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[var(--surfaceMuted)] flex items-center justify-center text-[var(--textSecondary)] hover:text-[var(--primary)] transition-colors"
         >
          <Instagram className="h-5 w-5" />
         </a>
        )}
        {store.social_twitter && (
         <a
          href={`https://twitter.com/${store.social_twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[var(--surfaceMuted)] flex items-center justify-center text-[var(--textSecondary)] hover:text-[var(--primary)] transition-colors"
         >
          <Twitter className="h-5 w-5" />
         </a>
        )}
       </div>
      </div>
     </div>

     {/* Search */}
     <div className="mb-6">
      <Input
       type="search"
       placeholder="ابحثي في منتجات المتجر..."
       value={search}
       onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
       }}
       className="max-w-md bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
      />
     </div>

     {/* Products */}
     <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold text-[var(--primary)]">المنتجات</h2>
      <Button variant="link" asChild className="text-[var(--primary)]">
       <Link href={`/store/${storeSlug}/products`}>
        عرض الكل
        <ChevronLeft className="h-4 w-4 mr-1" />
       </Link>
      </Button>
     </div>

     {isLoading ? (
      <LoadingSkeleton type="card" count={4} />
     ) : products?.items && products.items.length > 0 ? (
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
     ) : (
      <EmptyState
       icon={Package}
       title="لا توجد منتجات"
       description={search ? 'لم يتم العثور على منتجات مطابقة' : 'لم يتم إضافة منتجات بعد'}
      />
     )}

     {/* Pagination */}
     {products && products.pages && products.pages > 1 && (
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
        disabled={page >= products.pages}
        onClick={() => setPage(p => p + 1)}
        className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]"
       >
        التالي
       </Button>
      </div>
     )}
    </div>
   </main>

   <Footer />
   <MobileBottomNav />
  </div>
 );
}