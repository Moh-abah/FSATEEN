'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, MapPin, Package, Flag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, ErrorState, RatingStars, EmptyState } from '@/components/shared';
import { useUser } from '@/hooks';
import { useAuthStore } from '@/stores/auth-store';
import { formatCurrency } from '@/lib/utils';
import { useUserProducts } from '@/hooks/use-user-products';

export default function UserProfilePage() {
 const params = useParams();
 const userId = params.userId as string;
 const currentUser = useAuthStore((state) => state.user);
 const [reportDialogOpen, setReportDialogOpen] = useState(false);

 // ✅ تعريف واحد فقط لكل هوك
 const { data: user, isLoading: userLoading, error: userError } = useUser(userId);
 const { data: products, isLoading: productsLoading } = useUserProducts(userId);

 const isOwnProfile = currentUser?.id === userId;

 // حالة التحميل
 if (userLoading || productsLoading) {
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

 // حالة الخطأ
 if (userError || !user) {
  return (
   <div className="min-h-screen flex flex-col bg-[var(--background)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-6">
     <ErrorState
      title="المستخدم غير موجود"
      message="لم نتمكن من العثور على هذا المستخدم"
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
    <div className="container mx-auto px-4 max-w-4xl">
     {/* Profile Header */}
     <Card className="border border-[var(--border)] bg-[var(--surface)] mb-6">
      <CardContent className="p-6">
       <div className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="w-24 h-24">
         <AvatarImage src={user.avatar_url ?? undefined} />
         <AvatarFallback className="bg-[var(--primary)] text-[var(--textInverse)] text-2xl">
          {user.full_name?.[0] || user.username?.[0] || 'U'}
         </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center sm:text-right">
         <div className="flex items-center justify-center sm:justify-start gap-2">
          <h1 className="text-xl font-bold text-[var(--primary)]">
           {user.full_name || user.username || 'مستخدم'}
          </h1>
          {user.is_verified && (
           <Badge className="bg-[var(--primary)] text-[var(--textInverse)]">
            <Star className="h-3 w-3 ml-1" />
            موثق
           </Badge>
          )}
          {user.is_professional_seller && (
           <Badge variant="outline" className="border-[var(--primary)] text-[var(--primary)]">
            بائع محترف
           </Badge>
          )}
         </div>

         {user.username && (
          <p className="text-[var(--textSecondary)] text-sm">@{user.username}</p>
         )}

         <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-[var(--textSecondary)]">
          {user.city && (
           <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {user.city}
           </span>
          )}
          <span className="flex items-center gap-1">
           <RatingStars rating={user.rating_avg || 0} size="sm" />
           <span>({user.rating_count || 0})</span>
          </span>
          {user.products_count !== undefined && (
           <span className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            {user.products_count} منتج
           </span>
          )}
         </div>
        </div>

        {!isOwnProfile && (
         <div className="flex gap-2">
          <Button asChild className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]">
           <Link href={`/chats?user=${userId}`}>
            <MessageCircle className="h-4 w-4 ml-2" />
            تواصلي
           </Link>
          </Button>
          <Button
           variant="outline"
           size="icon"
           onClick={() => setReportDialogOpen(true)}
           className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]"
          >
           <Flag className="h-4 w-4" />
          </Button>
         </div>
        )}
       </div>
      </CardContent>
     </Card>

     {/* Products */}
     <div>
      <h2 className="text-lg font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
       <Package className="h-5 w-5" />
       منتجاتها
      </h2>

       { products && products.items && products.items.length > 0 ? (
       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.items.map((product) => (
         <Link key={product.id} href={`/products/${product.id}`}>
          <Card className="border border-[var(--border)] bg-[var(--surface)] overflow-hidden hover:shadow-lg transition-shadow">
           <div className="aspect-[3/4] bg-[var(--surfaceMuted)]">
            <img
             src={product.images?.[0]?.url || '/placeholder-dress.png'}
             alt={product.title}
             className="w-full h-full object-cover"
            />
           </div>
           <CardContent className="p-3">
            <p className="text-sm text-[var(--text)] truncate">{product.title}</p>
            <p className="text-[var(--primary)] font-bold text-sm mt-1">
             {formatCurrency(product.price)}
            </p>
           </CardContent>
          </Card>
         </Link>
        ))}
       </div>
      ) : (
       <EmptyState
        icon={Package}
        title="لا توجد منتجات"
        description="لم تقم هذه البائعة بإضافة أي منتجات بعد"
       />
      )}
     </div>
    </div>
   </main>

   <Footer />
   <MobileBottomNav />
  </div>
 );
}