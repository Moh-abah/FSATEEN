// @ts-nocheck
// app/products/create/page.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ImagePlus, X, Loader2, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { useCreateProduct, useUploadProductImage, useCategories, useCities } from '@/hooks';
import { useToast } from '@/hooks/use-toast';

const CONDITIONS = [
 { value: 'new', label: 'جديد' },
 { value: 'like_new', label: 'كالجديد' },
 { value: 'good', label: 'جيد' },
 { value: 'fair', label: 'مقبول' },
];

const productSchema = z.object({
 title: z.string().min(3, 'العنوان قصير جداً').max(100, 'العنوان طويل جداً'),
 description: z.string().min(10, 'الوصف قصير جداً'),
 price: z.coerce.number().min(1, 'السعر مطلوب'),
 compare_at_price: z.coerce.number().optional(),
 category: z.string().optional(),
 sub_category: z.string().optional(),
 city: z.string().min(1, 'يرجى اختيار مدينة'),
 condition: z.enum(['new', 'like_new', 'good', 'fair']),
 size: z.string().optional(),
 color: z.string().optional(),
 brand: z.string().optional(),
 delivery_available: z.boolean().default(false),
 delivery_price: z.coerce.number().optional(),
 purchase_price: z.coerce.number().optional(),
 duration_days: z.coerce.number().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function NewProductPage() {
 const router = useRouter();
 const { toast } = useToast();
 const createProduct = useCreateProduct();
 const { mutateAsync: uploadImage } = useUploadProductImage();
 const { data: categories = [] } = useCategories();
 const { data: cities = [] } = useCities();

 const [uploadedImages, setUploadedImages] = useState<string[]>([]);
 const [uploading, setUploading] = useState(false);
 const fileInputRef = useRef<HTMLInputElement>(null);



 const { data: categoriesData } = useCategories();
 const { data: citiesData } = useCities();

 
 const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors },
 } = useForm<ProductFormData>({
  resolver: zodResolver(productSchema),
  defaultValues: {
   condition: 'new',
   delivery_available: false,
  },
 });

 const deliveryAvailable = watch('delivery_available');

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;
  if (uploadedImages.length + files.length > 6) {
   toast({ title: 'لا يمكن إضافة أكثر من 6 صور', variant: 'destructive' });
   return;
  }
  setUploading(true);
  const uploadedUrls: string[] = [];
  try {
   for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')) continue;
    const url = await uploadImage(file);
    uploadedUrls.push(url);
   }
   setUploadedImages(prev => [...prev, ...uploadedUrls].slice(0, 6));
   toast({ title: `تم رفع ${uploadedUrls.length} صورة بنجاح` });
  } catch {
   toast({ title: 'فشل رفع بعض الصور', variant: 'destructive' });
  } finally {
   setUploading(false);
   if (fileInputRef.current) fileInputRef.current.value = '';
  }
 };

 const removeImage = (index: number) => {
  setUploadedImages(prev => prev.filter((_, i) => i !== index));
 };

 const onSubmit = async (data: ProductFormData) => {
  if (uploadedImages.length === 0) {
   toast({ title: 'يرجى إضافة صورة واحدة على الأقل', variant: 'destructive' });
   return;
  }
  try {
   const productData = {
    ...data,
    images: uploadedImages, // إرسال مصفوفة من الروابط مباشرة
   };
   const product = await createProduct.mutateAsync(productData);
   toast({ title: 'تم إضافة المنتج بنجاح' });
   router.push(`/products/${product.id}`);
  } catch {
   toast({ title: 'حدث خطأ أثناء إضافة المنتج', variant: 'destructive' });
  }
 };

 return (
  <div className="min-h-screen flex flex-col bg-[var(--background)]">
   <Navbar />
   <main className="flex-1 py-6">
    <div className="container mx-auto px-4 max-w-2xl">
     <div className="flex items-center gap-3 mb-6">
      <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[var(--text)]">
       <ArrowRight className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">إضافة منتج جديد</h1>
     </div>

     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* الصور */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
       <CardHeader>
        <CardTitle className="text-lg text-[var(--primary)]">صور المنتج</CardTitle>
       </CardHeader>
       <CardContent>
        <div className="grid grid-cols-3 gap-3">
         {uploadedImages.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-[var(--border)]">
           <img src={url} alt={`صورة ${index + 1}`} className="w-full h-full object-cover" />
           <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute top-1 right-1 bg-[var(--surface)] rounded-full p-0.5 shadow"
           >
            <X className="w-4 h-4 text-[var(--error)]" />
           </button>
          </div>
         ))}
         {uploadedImages.length < 6 && (
          <button
           type="button"
           onClick={() => fileInputRef.current?.click()}
           disabled={uploading}
           className="aspect-square rounded-lg border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-1 hover:border-[var(--primary)] transition-colors"
          >
           {uploading ? (
            <Loader2 className="h-6 w-6 text-[var(--primary)] animate-spin" />
           ) : (
            <>
             <ImagePlus className="h-6 w-6 text-[var(--textSecondary)]" />
             <span className="text-xs text-[var(--textSecondary)]">إضافة</span>
            </>
           )}
          </button>
         )}
         <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
         />
        </div>
        <p className="text-xs text-[var(--textSecondary)] mt-2">يمكنك إضافة حتى 6 صور</p>
       </CardContent>
      </Card>

      {/* المعلومات الأساسية */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
       <CardHeader>
        <CardTitle className="text-lg text-[var(--primary)]">المعلومات الأساسية</CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
        <div>
         <Label htmlFor="title" className="text-[var(--text)]">العنوان</Label>
         <Input id="title" {...register('title')} placeholder="مثلاً: فستان زفاف أنيق" className="mt-1 bg-[var(--surface)] border-[var(--border)]" />
         {errors.title && <p className="text-[var(--error)] text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
         <Label htmlFor="description" className="text-[var(--text)]">الوصف</Label>
         <Textarea id="description" {...register('description')} rows={4} placeholder="أضف وصفاً تفصيلياً..." className="mt-1 bg-[var(--surface)] border-[var(--border)]" />
         {errors.description && <p className="text-[var(--error)] text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div>
          <Label htmlFor="price" className="text-[var(--text)]">السعر (ريال)</Label>
          <Input id="price" type="number" {...register('price', { valueAsNumber: true })} placeholder="0" className="mt-1 bg-[var(--surface)] border-[var(--border)]" />
          {errors.price && <p className="text-[var(--error)] text-sm mt-1">{errors.price.message}</p>}
         </div>
         <div>
          <Label htmlFor="condition" className="text-[var(--text)]">الحالة</Label>
          <Select onValueChange={(value) => setValue('condition', value as ProductFormData['condition'])} defaultValue="new">
           <SelectTrigger className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
            <SelectValue placeholder="اختر الحالة" />
           </SelectTrigger>
           <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
            {CONDITIONS.map((c) => (
             <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
            ))}
           </SelectContent>
          </Select>
         </div>
        </div>

        <div className="grid grid-cols-2 gap-4">

         <div>
          <Label htmlFor="purchase_price" className="text-[var(--text)]">سعر الشراء الأصلي (اختياري)</Label>
          <Input id="purchase_price" type="number" {...register('purchase_price', { valueAsNumber: true })} placeholder="0" className="mt-1 bg-[var(--surface)] border-[var(--border)]" />
         </div>
        </div>
       </CardContent>
      </Card>

      {/* التفاصيل */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
       <CardHeader>
        <CardTitle className="text-lg text-[var(--primary)]">التفاصيل</CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
         <div>
          <Label htmlFor="size" className="text-[var(--text)]">المقاس (اختياري)</Label>
          <Input id="size" {...register('size')} placeholder="مثلاً: M، L، 40" className="mt-1 bg-[var(--surface)] border-[var(--border)]" />
         </div>
         <div>
          <Label htmlFor="color" className="text-[var(--text)]">اللون (اختياري)</Label>
          <Input id="color" {...register('color')} placeholder="مثلاً: أزرق، أسود" className="mt-1 bg-[var(--surface)] border-[var(--border)]" />
         </div>
        </div>
        <div>
         <Label htmlFor="brand" className="text-[var(--text)]">العلامة التجارية (اختياري)</Label>
         <Input id="brand" {...register('brand')} placeholder="اسم الماركة" className="mt-1 bg-[var(--surface)] border-[var(--border)]" />
        </div>
       </CardContent>
      </Card>

      {/* Location & Category */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
       <CardHeader>
        <CardTitle className="text-lg text-[var(--primary)]">الموقع والتصنيف</CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
        <div>
         <Label htmlFor="city" className="text-[var(--text)]">المدينة</Label>
         <Select onValueChange={(value) => setValue('city', value)}>
          <SelectTrigger className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
           <SelectValue placeholder="اختر المدينة" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
           {citiesData?.map((city) => (
            <SelectItem key={city.id} value={city.id}>
             {city.name_ar || city.name}
            </SelectItem>
           ))}
          </SelectContent>
         </Select>
         {errors.city && (
          <p className="text-[var(--error)] text-sm mt-1">{errors.city.message}</p>
         )}
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div>
          <Label htmlFor="category" className="text-[var(--text)]">التصنيف</Label>
          <Select onValueChange={(value) => setValue('category', value)}>
           <SelectTrigger className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
            <SelectValue placeholder="اختر التصنيف" />
           </SelectTrigger>
           <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
            {categoriesData?.map((cat) => (
             <SelectItem key={cat.id} value={cat.id}>
              {cat.name_ar || cat.name}
             </SelectItem>
            ))}
           </SelectContent>
          </Select>
         </div>

         <div>
          <Label htmlFor="duration" className="text-[var(--text)]">مدة النشر</Label>
          <Select onValueChange={(value) => setValue('duration_days', parseInt(value))}>
           <SelectTrigger className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
            <SelectValue placeholder="اختر المدة" />
           </SelectTrigger>
           <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
            <SelectItem value="3">3 ايام</SelectItem>
            <SelectItem value="1">1 يوم</SelectItem>
            <SelectItem value="7">7 ايام</SelectItem>
           </SelectContent>
          </Select>
         </div>
        </div>
       </CardContent>
      </Card>


      {/* التوصيل */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
       <CardHeader>
        <CardTitle className="text-lg text-[var(--primary)]">التوصيل</CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
         <Label htmlFor="delivery_available" className="text-[var(--text)]">توفر التوصيل</Label>
         <Switch
          id="delivery_available"
          checked={deliveryAvailable}
          onCheckedChange={(checked) => setValue('delivery_available', checked)}
         />
        </div>
        {deliveryAvailable && (
         <div>
          <Label htmlFor="delivery_price" className="text-[var(--text)]">سعر التوصيل (ريال)</Label>
          <Input
           id="delivery_price"
           type="number"
           {...register('delivery_price', { valueAsNumber: true })}
           placeholder="0"
           className="mt-1 bg-[var(--surface)] border-[var(--border)]"
          />
         </div>
        )}
       </CardContent>
      </Card>

      {/* أزرار الإرسال */}
      <div className="flex gap-3">
       <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>إلغاء</Button>
       <Button type="submit" className="flex-1 bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]" disabled={createProduct.isPending || uploading}>
        {createProduct.isPending ? <><Loader2 className="h-4 w-4 ml-2 animate-spin" /> جاري النشر...</> : 'نشر المنتج'}
       </Button>
      </div>
     </form>
    </div>
   </main>
   <Footer />
   <MobileBottomNav />
  </div>
 );
}