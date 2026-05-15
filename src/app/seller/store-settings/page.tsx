// @ts-nocheck
// Store settings page

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Store, Save, Loader2, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton } from '@/components/shared';
import { useSellerStore, useUpdateSellerStore } from '@/hooks';
import { useToast } from '@/hooks/use-toast';

const storeSchema = z.object({
  store_name: z.string().min(2, 'اسم المتجر يجب أن يكون حرفين على الأقل'),
  store_slug: z.string().min(2, 'رابط المتجر يجب أن يكون حرفين على الأقل'),
  store_description: z.string().optional(),
  store_logo_url: z.string().optional(),
  store_banner_url: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_email: z.string().email('البريد غير صالح').optional().or(z.literal('')),
  contact_whatsapp: z.string().optional(),
  social_instagram: z.string().optional(),
  social_twitter: z.string().optional(),
  social_snapchat: z.string().optional(),
  is_store_active: z.boolean().default(true),
});

type StoreFormData = z.infer<typeof storeSchema>;

export default function StoreSettingsPage() {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [bannerPreview, setBannerPreview] = useState<string>('');

  const { data: store, isLoading } = useSellerStore();
  const { mutate: updateStore, isPending } = useUpdateSellerStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
  });

  useEffect(() => {
    if (store) {
      reset({
        store_name: store.store_name || '',
        store_slug: store.store_slug || '',
        store_description: store.store_description || '',
        store_logo_url: store.store_logo_url || '',
        store_banner_url: store.store_banner_url || '',
        contact_phone: store.contact_phone || '',
        contact_email: store.contact_email || '',
        contact_whatsapp: store.contact_whatsapp || '',
        social_instagram: store.social_instagram || '',
        social_twitter: store.social_twitter || '',
        social_snapchat: store.social_snapchat || '',
        is_store_active: store.is_store_active ?? true,
      });
      setLogoPreview(store.store_logo_url || '');
      setBannerPreview(store.store_banner_url || '');
    }
  }, [store, reset]);

  const isStoreActive = watch('is_store_active');
  const storeSlug = watch('store_slug');

  const handleImageUpload = (type: 'logo' | 'banner') => (files: FileList) => {
    const file = files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'logo') {
        setLogoPreview(url);
        setValue('store_logo_url', url);
      } else {
        setBannerPreview(url);
        setValue('store_banner_url', url);
      }
    }
  };

  const onSubmit = (data: StoreFormData) => {
    updateStore(data, {
      onSuccess: () => {
        toast({
          title: 'تم حفظ إعدادات المتجر',
        });
      },
      onError: () => {
        toast({
          title: 'حدث خطأ أثناء الحفظ',
          variant: 'destructive',
        });
      },
    });
  };

  if (isLoading) {
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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <Store className="h-5 w-5 text-[var(--textInverse)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">إعدادات المتجر</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <Card className="border border-[var(--border)] bg-[var(--surface)]">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--primary)]">المعلومات الأساسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="store_name" className="text-[var(--text)]">اسم المتجر</Label>
                  <Input
                    id="store_name"
                    {...register('store_name')}
                    placeholder="مثال: فساتين الأناقة"
                    className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                  />
                  {errors.store_name && (
                    <p className="text-[var(--error)] text-sm mt-1">{errors.store_name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="store_slug" className="text-[var(--text)]">رابط المتجر</Label>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-[var(--textSecondary)] bg-[var(--surfaceMuted)] px-3 py-2 rounded-r-lg border border-l-0 border-[var(--border)]">
                      fusateen.com/store/
                    </span>
                    <Input
                      id="store_slug"
                      {...register('store_slug')}
                      placeholder="my-store"
                      className="rounded-r-none bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>
                  {errors.store_slug && (
                    <p className="text-[var(--error)] text-sm mt-1">{errors.store_slug.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="store_description" className="text-[var(--text)]">وصف المتجر</Label>
                  <Textarea
                    id="store_description"
                    {...register('store_description')}
                    placeholder="اكتبي وصفاً مختصراً لمتجرك..."
                    rows={3}
                    className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[var(--text)]">حالة المتجر</Label>
                    <p className="text-xs text-[var(--textSecondary)]">
                      المتجر النشط يظهر للمشترين
                    </p>
                  </div>
                  <Switch
                    checked={isStoreActive}
                    onCheckedChange={(checked) => setValue('is_store_active', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Store Appearance */}
            <Card className="border border-[var(--border)] bg-[var(--surface)]">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--primary)]">مظهر المتجر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-[var(--text)]">شعار المتجر</Label>
                  <div className="mt-2 flex items-center gap-4">
                    {logoPreview && (
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-[var(--surfaceMuted)]">
                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files && handleImageUpload('logo')(e.target.files)}
                      />
                      <Button type="button" variant="outline" size="sm" className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]">
                        <ImagePlus className="h-4 w-4 ml-2" />
                        تغيير الشعار
                      </Button>
                    </label>
                  </div>
                </div>

                <div>
                  <Label className="text-[var(--text)]">صورة الغلاف</Label>
                  <div className="mt-2">
                    {bannerPreview && (
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-[var(--surfaceMuted)] mb-2">
                        <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files && handleImageUpload('banner')(e.target.files)}
                      />
                      <Button type="button" variant="outline" size="sm" className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]">
                        <ImagePlus className="h-4 w-4 ml-2" />
                        تغيير الغلاف
                      </Button>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border border-[var(--border)] bg-[var(--surface)]">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--primary)]">معلومات التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_phone" className="text-[var(--text)]">رقم الهاتف</Label>
                    <Input
                      id="contact_phone"
                      {...register('contact_phone')}
                      placeholder="+966 5X XXX XXXX"
                      className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_whatsapp" className="text-[var(--text)]">واتساب</Label>
                    <Input
                      id="contact_whatsapp"
                      {...register('contact_whatsapp')}
                      placeholder="+966 5X XXX XXXX"
                      className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact_email" className="text-[var(--text)]">البريد الإلكتروني</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    {...register('contact_email')}
                    placeholder="store@example.com"
                    className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                  />
                  {errors.contact_email && (
                    <p className="text-[var(--error)] text-sm mt-1">{errors.contact_email.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border border-[var(--border)] bg-[var(--surface)]">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--primary)]">وسائل التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="social_instagram" className="text-[var(--text)]">انستقرام</Label>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-[var(--textSecondary)] bg-[var(--surfaceMuted)] px-3 py-2 rounded-r-lg border border-l-0 border-[var(--border)]">
                      @
                    </span>
                    <Input
                      id="social_instagram"
                      {...register('social_instagram')}
                      placeholder="username"
                      className="rounded-r-none bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="social_twitter" className="text-[var(--text)]">تويتر</Label>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-[var(--textSecondary)] bg-[var(--surfaceMuted)] px-3 py-2 rounded-r-lg border border-l-0 border-[var(--border)]">
                      @
                    </span>
                    <Input
                      id="social_twitter"
                      {...register('social_twitter')}
                      placeholder="username"
                      className="rounded-r-none bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="social_snapchat" className="text-[var(--text)]">سناب شات</Label>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-[var(--textSecondary)] bg-[var(--surfaceMuted)] px-3 py-2 rounded-r-lg border border-l-0 border-[var(--border)]">
                      @
                    </span>
                    <Input
                      id="social_snapchat"
                      {...register('social_snapchat')}
                      placeholder="username"
                      className="rounded-r-none bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
              disabled={isPending || !isDirty}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 ml-2" />
                  حفظ التغييرات
                </>
              )}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}