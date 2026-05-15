// @ts-nocheck
// app/auctions/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, TrendingUp, Loader2, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton } from '@/components/shared';
import { useMyProducts, useCreateAuction } from '@/hooks';
import { useToast } from '@/hooks/use-toast'; // تأكد من وجوده
import { formatCurrency } from '@/lib/utils';

const auctionSchema = z.object({
 product_id: z.string().min(1, 'يرجى اختيار منتج'),
 start_price: z.coerce.number().min(1, 'السعر الافتتاحي مطلوب'),
 end_time: z.string().min(1, 'تاريخ الانتهاء مطلوب'),
 winner_selection: z.enum(['auto', 'manual']).default('auto'),
});




type AuctionFormData = z.infer<typeof auctionSchema>;

export default function NewAuctionPage() {
 const router = useRouter();
 const { toast } = useToast();
 const { mutate: createAuction, isPending } = useCreateAuction();

 // ✅ استخدم useMyProducts بدلاً من useSellerProducts
 const { data: productsData, isLoading: productsLoading } = useMyProducts(1, 50);
 const products = productsData?.items ?? [];
 const activeProducts = products.filter(p => p.status === 'active');

 const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors },
 } = useForm<AuctionFormData>({
  resolver: zodResolver(auctionSchema),
  defaultValues: {
   winner_selection: 'auto',
  },
 });

 const selectedProductId = watch('product_id');
 const selectedProduct = activeProducts.find(p => p.id === selectedProductId);

 const endTimeOptions = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  date.setHours(23, 59, 0, 0);
  return {
   value: date.toISOString(),
   label: date.toLocaleDateString('ar-SA', { weekday: 'long', month: 'long', day: 'numeric' }),
  };
 });

 const onSubmit = (data: AuctionFormData) => {
  createAuction(data, {
   onSuccess: (auction) => {
    toast({ title: 'تم إنشاء المزاد بنجاح' });
    router.push(`/auctions/${auction.id}`);
   },
   onError: () => {
    toast({ title: 'حدث خطأ أثناء إنشاء المزاد', variant: 'destructive' });
   },
  });
 };

 if (productsLoading) {
  return (
   <div className="min-h-screen flex flex-col bg-[var(--background)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-6">
     <LoadingSkeleton type="card" count={2} />
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
    <div className="container mx-auto px-4 max-w-2xl">
     <div className="flex items-center gap-3 mb-6">
      <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[var(--text)]">
       <ArrowRight className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">إنشاء مزاد جديد</h1>
     </div>

     {activeProducts.length === 0 ? (
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
       <CardContent className="py-8 text-center">
        <TrendingUp className="h-12 w-12 text-[var(--primary)] mx-auto mb-4" />
        <h3 className="text-lg font-medium text-[var(--text)] mb-2">لا توجد منتجات نشطة</h3>
        <p className="text-[var(--textSecondary)] mb-4">
         يجب أن يكون لديك منتجات نشطة لإنشاء مزاد
        </p>
        <Button asChild className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]">
         <Link href="/seller/products/new">إضافة منتج جديد</Link>
        </Button>
       </CardContent>
      </Card>
     ) : (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       {/* اختيار المنتج */}
       <Card className="border border-[var(--border)] bg-[var(--surface)]">
        <CardHeader>
         <CardTitle className="text-lg text-[var(--primary)]">اختيار المنتج</CardTitle>
        </CardHeader>
        <CardContent>
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {activeProducts.map((product) => (
           <button
            key={product.id}
            type="button"
            onClick={() => setValue('product_id', product.id)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all ${selectedProductId === product.id
              ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20'
              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
             }`}
           >
            <div className="aspect-square bg-[var(--surfaceMuted)]">
             <img
              src={product.images?.[0]?.url || '/placeholder-dress.png'}
              alt={product.title}
              className="w-full h-full object-cover"
             />
            </div>
            <div className="p-2 bg-[var(--surface)]">
             <p className="text-xs truncate text-[var(--text)]">{product.title}</p>
             <p className="text-sm font-bold text-[var(--primary)]">
              {formatCurrency(product.price)}
             </p>
            </div>
           </button>
          ))}
         </div>
         {errors.product_id && (
          <p className="text-[var(--error)] text-sm mt-2">{errors.product_id.message}</p>
         )}
        </CardContent>
       </Card>

       {/* إعدادات المزاد */}
       <Card className="border border-[var(--border)] bg-[var(--surface)]">
        <CardHeader>
         <CardTitle className="text-lg text-[var(--primary)]">إعدادات المزاد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
         <div>
          <Label htmlFor="start_price" className="text-[var(--text)]">السعر الافتتاحي (ريال)</Label>
          <Input
           id="start_price"
           type="number"
           {...register('start_price', { valueAsNumber: true })}
           placeholder="0"
           className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
          />
          {errors.start_price && (
           <p className="text-[var(--error)] text-sm mt-1">{errors.start_price.message}</p>
          )}
          {selectedProduct && (
           <p className="text-xs text-[var(--textSecondary)] mt-1">
            سعر المنتج الحالي: {formatCurrency(selectedProduct.price)}
           </p>
          )}
         </div>

         <div>
          <Label htmlFor="end_time" className="text-[var(--text)]">تاريخ الانتهاء</Label>
          <Select onValueChange={(value) => setValue('end_time', value)}>
           <SelectTrigger className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
            <SelectValue placeholder="اختر تاريخ الانتهاء" />
           </SelectTrigger>
           <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
            {endTimeOptions.map((option) => (
             <SelectItem key={option.value} value={option.value}>
              {option.label}
             </SelectItem>
            ))}
           </SelectContent>
          </Select>
          {errors.end_time && (
           <p className="text-[var(--error)] text-sm mt-1">{errors.end_time.message}</p>
          )}
         </div>

         <div>
          <Label className="text-[var(--text)]">طريقة اختيار الفائز</Label>
          <RadioGroup
           value={watch('winner_selection')}
           onValueChange={(value) => setValue('winner_selection', value as 'auto' | 'manual')}
           className="mt-2"
          >
           <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="auto" id="auto" />
            <Label htmlFor="auto" className="font-normal text-[var(--text)]">
             تلقائي - أعلى مزايد يفوز تلقائياً
            </Label>
           </div>
           <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="manual" id="manual" />
            <Label htmlFor="manual" className="font-normal text-[var(--text)]">
             يدوي - تختارين الفائز يدوياً
            </Label>
           </div>
          </RadioGroup>
         </div>
        </CardContent>
       </Card>

       {/* معلومات مهمة */}
       <div className="bg-[var(--primaryLight)]/20 rounded-lg p-4">
        <h4 className="font-medium text-[var(--primary)] mb-2">معلومات مهمة</h4>
        <ul className="text-sm text-[var(--textSecondary)] space-y-1">
         <li>• سيتم إخفاء المنتج من القائمة العادية أثناء المزاد</li>
         <li>• يمكنك إلغاء المزاد قبل انتهائه إذا لم يكن هناك مزايدات</li>
         <li>• ستتلقين إشعاراً عند كل مزايدة جديدة</li>
        </ul>
       </div>

       <div className="flex gap-3">
        <Button
         type="button"
         variant="outline"
         className="flex-1 border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]"
         onClick={() => router.back()}
        >
         إلغاء
        </Button>
        <Button
         type="submit"
         className="flex-1 bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
         disabled={isPending}
        >
         {isPending ? (
          <>
           <Loader2 className="h-4 w-4 ml-2 animate-spin" />
           جاري الإنشاء...
          </>
         ) : (
          'إنشاء المزاد'
         )}
        </Button>
       </div>
      </form>
     )}
    </div>
   </main>
   <Footer />
   <MobileBottomNav />
  </div>
 );
}