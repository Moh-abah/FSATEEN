// Request seller upgrade page

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Crown, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { FileUpload } from '@/components/shared';
import { useRequestSellerUpgrade } from '@/hooks';
import { useToast } from '@/hooks/use-toast';

const upgradeSchema = z.object({
 business_name: z.string().min(2, 'اسم النشاط مطلوب'),
 business_type: z.string().min(1, 'نوع النشاط مطلوب'),
 commercial_register: z.string().optional(),
 description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
 documents: z.array(z.string()).optional(),
});

type UpgradeFormData = z.infer<typeof upgradeSchema>;

const businessTypes = [
 { value: 'boutique', label: 'بوتيك' },
 { value: 'online_store', label: 'متجر إلكتروني' },
 { value: 'designer', label: 'مصممة أزياء' },
 { value: 'tailor', label: 'خياطة' },
 { value: 'wholesaler', label: 'تاجر جملة' },
 { value: 'other', label: 'أخرى' },
];

export default function SellerUpgradePage() {
 const router = useRouter();
 const { toast } = useToast();
 const [documents, setDocuments] = useState<string[]>([]);
 const [submitted, setSubmitted] = useState(false);

 const { mutate: requestUpgrade, isPending } = useRequestSellerUpgrade();

 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
 } = useForm<UpgradeFormData>({
  resolver: zodResolver(upgradeSchema),
 });

 const handleDocumentUpload = (files: FileList) => {
  const newDocs = Array.from(files).map(file => URL.createObjectURL(file));
  setDocuments(prev => [...prev, ...newDocs]);
  setValue('documents', [...documents, ...newDocs]);
 };

 const onSubmit = (data: UpgradeFormData) => {
  requestUpgrade(
   { ...data, documents },
   {
    onSuccess: () => {
     setSubmitted(true);
     toast({
      title: 'تم إرسال طلبك بنجاح',
      description: 'سيتم مراجعة طلبك خلال 24-48 ساعة',
     });
    },
    onError: () => {
     toast({
      title: 'حدث خطأ أثناء إرسال الطلب',
      variant: 'destructive',
     });
    },
   }
  );
 };

 if (submitted) {
  return (
   <div className="min-h-screen flex flex-col bg-[var(--background)]">
    <Navbar />
    <main className="flex-1 flex items-center justify-center px-4">
     <Card className="max-w-md w-full border border-[var(--border)] bg-[var(--surface)] text-center">
      <CardContent className="py-8">
       <div className="w-16 h-16 rounded-full bg-[var(--successLight)] flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-[var(--success)]" />
       </div>
       <h2 className="text-xl font-bold text-[var(--primary)] mb-2">تم إرسال طلبك</h2>
       <p className="text-[var(--textSecondary)] mb-6">
        سيتم مراجعة طلبك خلال 24-48 ساعة وستتلقين إشعاراً بالنتيجة
       </p>
       <Button
        onClick={() => router.push('/seller/dashboard')}
        className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
       >
        العودة للوحة التحكم
       </Button>
      </CardContent>
     </Card>
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
     {/* Header */}
     <div className="flex items-center gap-3 mb-6">
      <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[var(--text)]">
       <ArrowRight className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">ترقية الحساب</h1>
     </div>

     {/* Benefits */}
     <Card className="border border-[var(--primary)] bg-[var(--primary)]/5 mb-6">
      <CardHeader>
       <CardTitle className="text-lg text-[var(--primary)] flex items-center gap-2">
        <Crown className="h-5 w-5 text-[var(--primary)]" />
        مميزات البائع المحترف
       </CardTitle>
      </CardHeader>
      <CardContent>
       <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
         <CheckCircle className="h-4 w-4 text-[var(--success)]" />
         <span className="text-[var(--text)]">متجر مخصص بعنوان مستقل</span>
        </li>
        <li className="flex items-center gap-2">
         <CheckCircle className="h-4 w-4 text-[var(--success)]" />
         <span className="text-[var(--text)]">ظهور مميز في نتائج البحث</span>
        </li>
        <li className="flex items-center gap-2">
         <CheckCircle className="h-4 w-4 text-[var(--success)]" />
         <span className="text-[var(--text)]">إحصائيات متقدمة للمتجر</span>
        </li>
        <li className="flex items-center gap-2">
         <CheckCircle className="h-4 w-4 text-[var(--success)]" />
         <span className="text-[var(--text)]">دعم أولوية من فريق المنصة</span>
        </li>
        <li className="flex items-center gap-2">
         <CheckCircle className="h-4 w-4 text-[var(--success)]" />
         <span className="text-[var(--text)]">شارة التحقق الاحترافي</span>
        </li>
       </ul>
      </CardContent>
     </Card>

     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Business Info */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
       <CardHeader>
        <CardTitle className="text-lg text-[var(--primary)]">معلومات النشاط</CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
        <div>
         <Label htmlFor="business_name" className="text-[var(--text)]">اسم النشاط التجاري</Label>
         <Input
          id="business_name"
          {...register('business_name')}
          placeholder="مثال: فساتين الأناقة"
          className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
         />
         {errors.business_name && (
          <p className="text-[var(--error)] text-sm mt-1">{errors.business_name.message}</p>
         )}
        </div>

        <div>
         <Label htmlFor="business_type" className="text-[var(--text)]">نوع النشاط</Label>
         <select
          id="business_type"
          {...register('business_type')}
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)]"
         >
          <option value="">اختر نوع النشاط</option>
          {businessTypes.map((type) => (
           <option key={type.value} value={type.value}>
            {type.label}
           </option>
          ))}
         </select>
         {errors.business_type && (
          <p className="text-[var(--error)] text-sm mt-1">{errors.business_type.message}</p>
         )}
        </div>

        <div>
         <Label htmlFor="commercial_register" className="text-[var(--text)]">السجل التجاري (اختياري)</Label>
         <Input
          id="commercial_register"
          {...register('commercial_register')}
          placeholder="رقم السجل التجاري"
          className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
         />
        </div>

        <div>
         <Label htmlFor="description" className="text-[var(--text)]">وصف النشاط</Label>
         <Textarea
          id="description"
          {...register('description')}
          placeholder="اكتبي وصفاً مختصراً لنشاطك التجاري..."
          rows={4}
          className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
         />
         {errors.description && (
          <p className="text-[var(--error)] text-sm mt-1">{errors.description.message}</p>
         )}
        </div>
       </CardContent>
      </Card>

      {/* Documents */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
       <CardHeader>
        <CardTitle className="text-lg text-[var(--primary)]">المستندات</CardTitle>
       </CardHeader>
       <CardContent>
        <p className="text-sm text-[var(--textSecondary)] mb-4">
         أرفقي صوراً واضحة للمستندات التالية (اختياري لكن يسرع عملية الموافقة):
        </p>
        <ul className="text-sm text-[var(--textSecondary)] mb-4 space-y-1">
         <li>• السجل التجاري</li>
         <li>• بطاقة الهوية</li>
         <li>• ترخيص البلدية (إن وجد)</li>
        </ul>

        <div className="grid grid-cols-3 gap-3 mb-3">
         {documents.map((doc, index) => (
          <div key={index} className="aspect-square rounded-lg overflow-hidden bg-[var(--surfaceMuted)]">
           <img src={doc} alt="" className="w-full h-full object-cover" />
          </div>
         ))}
        </div>

        <label className="cursor-pointer">
         <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleDocumentUpload(e.target.files)}
         />
         <Button type="button" variant="outline" className="w-full border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]">
          إضافة مستند
         </Button>
        </label>
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
        disabled={isPending}
       >
        {isPending ? (
         <>
          <Loader2 className="h-4 w-4 ml-2 animate-spin" />
          جاري الإرسال...
         </>
        ) : (
         'إرسال الطلب'
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