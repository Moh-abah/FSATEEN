// @ts-nocheck
// Create new product page
// src\app\seller\products\new\page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ImagePlus, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { FileUpload } from '@/components/shared';
import { useCreateSellerProduct, useCategories, useCities, useUploadProductImage } from '@/hooks';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const productSchema = z.object({
  title: z.string().min(3, 'العنوان يجب أن يكون 3 أحرف على الأقل'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  price: z.number().min(1, 'السعر مطلوب'),
  condition: z.enum(['new', 'like_new', 'good', 'fair']),
  size: z.string().optional(),
  color: z.string().optional(),
  brand: z.string().optional(),
  city: z.string().min(1, 'المدينة مطلوبة'),
  category: z.string().optional(),
  sub_category: z.string().optional(),
  delivery_available: z.boolean().default(false),
  delivery_price: z.number().optional(),
  purchase_price: z.number().optional(),
  duration_days: z.number().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const conditions = [
  { value: 'new', label: 'جديد' },
  { value: 'like_new', label: 'كالجديد' },
  { value: 'good', label: 'جيد' },
  { value: 'fair', label: 'مقبول' },
];

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const { mutateAsync: uploadImage } = useUploadProductImage();

  const [isUploading, setIsUploading] = useState(false);

  const { mutate: createProduct, isPending } = useCreateSellerProduct();
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

  const handleImageUpload = async (files: FileList) => {
    const filesArray = Array.from(files);
    if (images.length + filesArray.length > 6) {
      toast({ title: 'لا يمكن إضافة أكثر من 6 صور', variant: 'destructive' });
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of filesArray) {
        const url = await uploadImage(file);
        uploadedUrls.push(url);
      }
      setImages(prev => [...prev, ...uploadedUrls].slice(0, 6));
      toast({ title: `تم رفع ${uploadedUrls.length} صورة بنجاح` });
    } catch (error) {
      toast({ title: 'فشل رفع بعض الصور', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };




  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ProductFormData) => {
    if (images.length === 0) {
      toast({
        title: 'يرجى إضافة صورة واحدة على الأقل',
        variant: 'destructive',
      });
      return;
    }

    createProduct(
      {
        ...data,
        images,
      },
      {
        onSuccess: (product) => {
          toast({
            title: 'تم إضافة المنتج بنجاح',
          });
          router.push(`/seller/products`);
        },
        onError: (error) => {
          toast({
            title: 'حدث خطأ أثناء إضافة المنتج',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[var(--text)]">
              <ArrowRight className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">إضافة منتج جديد</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Images */}
            <Card className="border border-[var(--border)] bg-[var(--surface)]">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--primary)]">الصور</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-[var(--surfaceMuted)]">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-[var(--error)] text-[var(--textInverse)] rounded-full flex items-center justify-center"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 6 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--primary)] transition-colors">
                      <ImagePlus className="h-8 w-8 text-[var(--textTertiary)]" />
                      <span className="text-xs text-[var(--textTertiary)] mt-1">إضافة صورة</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-[var(--textTertiary)] mt-2">يمكنك إضافة حتى 6 صور</p>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card className="border border-[var(--border)] bg-[var(--surface)]">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--primary)]">المعلومات الأساسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-[var(--text)]">عنوان المنتج</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="مثال: فستان سهرة حرير أسود"
                    className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                  />
                  {errors.title && (
                    <p className="text-[var(--error)] text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description" className="text-[var(--text)]">الوصف</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="اكتبي وصفاً تفصيلياً للفستان..."
                    rows={4}
                    className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                  />
                  {errors.description && (
                    <p className="text-[var(--error)] text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-[var(--text)]">السعر (ريال)</Label>
                    <Input
                      id="price"
                      type="number"
                      {...register('price', { valueAsNumber: true })}
                      placeholder="0"
                      className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                    {errors.price && (
                      <p className="text-[var(--error)] text-sm mt-1">{errors.price.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="condition" className="text-[var(--text)]">الحالة</Label>
                    <Select
                      onValueChange={(value) => setValue('condition', value as ProductFormData['condition'])}
                      defaultValue="new"
                    >
                      <SelectTrigger className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                      <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
                        {conditions.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="border border-[var(--border)] bg-[var(--surface)]">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--primary)]">التفاصيل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="size" className="text-[var(--text)]">المقاس</Label>
                    <Input
                      id="size"
                      {...register('size')}
                      placeholder="مثال: 38"
                      className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="color" className="text-[var(--text)]">اللون</Label>
                    <Input
                      id="color"
                      {...register('color')}
                      placeholder="مثال: أسود"
                      className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand" className="text-[var(--text)]">الماركة</Label>
                    <Input
                      id="brand"
                      {...register('brand')}
                      placeholder="اختياري"
                      className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="purchase_price" className="text-[var(--text)]">سعر الشراء الأصلي</Label>
                    <Input
                      id="purchase_price"
                      type="number"
                      {...register('purchase_price', { valueAsNumber: true })}
                      placeholder="اختياري"
                      className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>
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

            {/* Delivery */}
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
                      className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
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
                disabled={isPending || isUploading}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                    جاري النشر...
                  </>
                ) : (
                  'نشر المنتج'
                )}
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