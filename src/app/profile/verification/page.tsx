// ID verification request page

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BadgeCheck, ArrowRight, Loader2, CheckCircle, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const verificationSchema = z.object({
 full_name: z.string().min(2, 'الاسم الكامل مطلوب'),
 id_type: z.enum(['national_id', 'passport', 'drivers_license', 'other']),
 id_number: z.string().min(5, 'رقم الهوية مطلوب'),
 id_document_url: z.string().min(1, 'صورة الهوية مطلوبة'),
 selfie_url: z.string().optional(),
 address: z.string().optional(),
 reason: z.string().optional(),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

const idTypes = [
 { value: 'national_id', label: 'الهوية الوطنية' },
 { value: 'passport', label: 'جواز السفر' },
 { value: 'drivers_license', label: 'رخصة القيادة' },
 { value: 'other', label: 'أخرى' },
];

export default function VerificationPage() {
 const router = useRouter();
 const { toast } = useToast();
 const [submitted, setSubmitted] = useState(false);
 const [idDocument, setIdDocument] = useState<string>('');
 const [selfie, setSelfie] = useState<string>('');

 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors, isSubmitting },
 } = useForm<VerificationFormData>({
  resolver: zodResolver(verificationSchema),
 });

 const handleDocumentUpload = (type: 'id' | 'selfie') => (files: FileList) => {
  const file = files[0];
  if (file) {
   const url = URL.createObjectURL(file);
   if (type === 'id') {
    setIdDocument(url);
    setValue('id_document_url', url);
   } else {
    setSelfie(url);
    setValue('selfie_url', url);
   }
  }
 };

 const onSubmit = async (data: VerificationFormData) => {
  try {
   await api.post('/verification/request', data);
   setSubmitted(true);
   toast({
    title: 'تم إرسال طلب التحقق',
    description: 'سيتم مراجعة طلبك خلال 24-48 ساعة',
   });
  } catch (error: unknown) {
   const err = error as { response?: { data?: { message?: string } } };
   toast({
    title: err.response?.data?.message || 'حدث خطأ أثناء إرسال الطلب',
    variant: 'destructive',
   });
  }
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
       <h2 className="text-xl font-bold text-[var(--primary)] mb-2">تم إرسال طلب التحقق</h2>
       <p className="text-[var(--textSecondary)] mb-6">
        سيتم مراجعة طلبك خلال 24-48 ساعة وستتلقين إشعاراً بالنتيجة
       </p>
       <Button
        onClick={() => router.push('/profile')}
        className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
       >
        العودة للملف الشخصي
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
      <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">طلب التحقق</h1>
     </div>

     {/* Benefits */}
     <Card className="border border-[var(--primary)] bg-[var(--primary)]/5 mb-6">
      <CardHeader>
       <CardTitle className="text-lg text-[var(--primary)] flex items-center gap-2">
        <BadgeCheck className="h-5 w-5 text-[var(--primary)]" />
        مميزات التحقق
       </CardTitle>
      </CardHeader>
      <CardContent>
       <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
         <CheckCircle className="h-4 w-4 text-[var(--success)]" />
         <span className="text-[var(--text)]">شارة التحقق على ملفك الشخصي</span>
        </li>
        <li className="flex items-center gap-2">
         <CheckCircle className="h-4 w-4 text-[var(--success)]" />
         <span className="text-[var(--text)]">ثقة أكبر من المشترين</span>
        </li>
        <li className="flex items-center gap-2">
         <CheckCircle className="h-4 w-4 text-[var(--success)]" />
         <span className="text-[var(--text)]">ظهور مميز في نتائج البحث</span>
        </li>
       </ul>
      </CardContent>
     </Card>

     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Info */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
       <CardHeader>
        <CardTitle className="text-lg text-[var(--primary)]">المعلومات الشخصية</CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
        <div>
         <Label htmlFor="full_name" className="text-[var(--text)]">الاسم الكامل (كما في الهوية)</Label>
         <Input
          id="full_name"
          {...register('full_name')}
          className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
         />
         {errors.full_name && (
          <p className="text-[var(--error)] text-sm mt-1">{errors.full_name.message}</p>
         )}
        </div>

        <div>
         <Label htmlFor="id_type" className="text-[var(--text)]">نوع الهوية</Label>
         <Select onValueChange={(value) => setValue('id_type', value as VerificationFormData['id_type'])}>
          <SelectTrigger className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
           <SelectValue placeholder="اختر نوع الهوية" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
           {idTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
             {type.label}
            </SelectItem>
           ))}
          </SelectContent>
         </Select>
         {errors.id_type && (
          <p className="text-[var(--error)] text-sm mt-1">{errors.id_type.message}</p>
         )}
        </div>

        <div>
         <Label htmlFor="id_number" className="text-[var(--text)]">رقم الهوية</Label>
         <Input
          id="id_number"
          {...register('id_number')}
          className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
         />
         {errors.id_number && (
          <p className="text-[var(--error)] text-sm mt-1">{errors.id_number.message}</p>
         )}
        </div>
       </CardContent>
      </Card>

      {/* Documents */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
       <CardHeader>
        <CardTitle className="text-lg text-[var(--primary)]">المستندات</CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
        <div>
         <Label className="text-[var(--text)]">صورة الهوية</Label>
         <p className="text-xs text-[var(--textSecondary)] mb-2">
          صورة واضحة من الجهة الأمامية للهوية
         </p>
         {idDocument ? (
          <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-[var(--surfaceMuted)]">
           <img src={idDocument} alt="ID" className="w-full h-full object-cover" />
           <button
            type="button"
            onClick={() => {
             setIdDocument('');
             setValue('id_document_url', '');
            }}
            className="absolute top-1 right-1 w-5 h-5 bg-[var(--error)] text-[var(--textInverse)] rounded-full flex items-center justify-center"
           >
            <X className="h-3 w-3" />
           </button>
          </div>
         ) : (
          <label className="block">
           <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleDocumentUpload('id')(e.target.files)}
           />
           <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-4 text-center cursor-pointer hover:border-[var(--primary)] transition-colors">
            <Upload className="h-8 w-8 text-[var(--textTertiary)] mx-auto mb-2" />
            <p className="text-sm text-[var(--textSecondary)]">اضغطي لرفع الصورة</p>
           </div>
          </label>
         )}
         {errors.id_document_url && (
          <p className="text-[var(--error)] text-sm mt-1">{errors.id_document_url.message}</p>
         )}
        </div>

        <div>
         <Label className="text-[var(--text)]">صورة شخصية مع الهوية (اختياري)</Label>
         <p className="text-xs text-[var(--textSecondary)] mb-2">
          صورة لكِ وأنتِ تحملين الهوية
         </p>
         {selfie ? (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-[var(--surfaceMuted)]">
           <img src={selfie} alt="Selfie" className="w-full h-full object-cover" />
           <button
            type="button"
            onClick={() => {
             setSelfie('');
             setValue('selfie_url', '');
            }}
            className="absolute top-1 right-1 w-5 h-5 bg-[var(--error)] text-[var(--textInverse)] rounded-full flex items-center justify-center"
           >
            <X className="h-3 w-3" />
           </button>
          </div>
         ) : (
          <label className="block">
           <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleDocumentUpload('selfie')(e.target.files)}
           />
           <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-4 text-center cursor-pointer hover:border-[var(--primary)] transition-colors">
            <Upload className="h-8 w-8 text-[var(--textTertiary)] mx-auto mb-2" />
            <p className="text-sm text-[var(--textSecondary)]">اضغطي لرفع الصورة</p>
           </div>
          </label>
         )}
        </div>
       </CardContent>
      </Card>

      {/* Info */}
      <div className="bg-[var(--primaryLight)]/20 rounded-lg p-4">
       <p className="text-sm text-[var(--textSecondary)]">
        ستتم مراجعة طلبك خلال 24-48 ساعة. نحتفظ بمعلوماتك بسرية تامة ولا نشاركها مع أي طرف ثالث.
       </p>
      </div>

      {/* Submit */}
      <Button
       type="submit"
       className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
       disabled={isSubmitting}
      >
       {isSubmitting ? (
        <>
         <Loader2 className="h-4 w-4 ml-2 animate-spin" />
         جاري الإرسال...
        </>
       ) : (
        'إرسال طلب التحقق'
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