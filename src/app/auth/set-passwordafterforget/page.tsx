'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import Link from 'next/link';
import { useSetPassword } from '@/hooks';

const setPasswordSchema = z.object({
 password: z
  .string()
  .min(6, 'كلمة المرور يجب أن لا تقل عن 6 أحرف'),
 confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
 message: 'كلمات المرور غير متطابقة',
 path: ['confirmPassword'],
});

type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;

export default function SetPasswordAfterForgotPage() {
 const router = useRouter();
 const { mutate: setPassword, isPending } = useSetPassword();
 const [error, setError] = useState<string | null>(null);

 const form = useForm<SetPasswordFormValues>({
  resolver: zodResolver(setPasswordSchema),
  defaultValues: {
   password: '',
   confirmPassword: '',
  },
 });

 const onSubmit = (data: SetPasswordFormValues) => {
  setError(null);
  setPassword(data.password, {
   onSuccess: () => {
    // مسح بيانات الجلسة المؤقتة
    sessionStorage.removeItem('register_phone');
    sessionStorage.removeItem('reset_password');
    // التوجيه إلى الصفحة الرئيسية (أو أي صفحة أخرى بعد النجاح)
    router.push('/');
   },
   onError: (err: any) => {
    const message = err?.response?.data?.message || 'حدث خطأ، الرجاء المحاولة لاحقاً';
    setError(message);
   },
  });
 };

 return (
  <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
   <div className="w-full max-w-md">
    {/* الشعار */}
    <div className="text-center mb-8">
     <Link href="/" className="inline-flex items-center gap-2">
      <div
       className="w-12 h-12 rounded-full flex items-center justify-center"
       style={{ backgroundImage: 'var(--gradient-primary)' }}
      >
       <span className="text-[var(--textInverse)] font-bold text-xl font-cairo">ف</span>
      </div>
      <span className="text-2xl font-bold text-[var(--primary)] font-cairo">فساتين</span>
     </Link>
    </div>

    <Card className="border border-[var(--border)] shadow-lg bg-[var(--surface)]">
     <CardHeader className="text-center">
      <CardTitle className="text-xl font-cairo text-[var(--primary)]">
       تعيين كلمة مرور جديدة
      </CardTitle>
      <CardDescription className="text-[var(--textSecondary)]">
       أدخلي كلمة المرور الجديدة لحسابك
      </CardDescription>
     </CardHeader>
     <CardContent>
      <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
         <div className="p-3 text-sm text-[var(--error)] bg-[var(--errorLight)] rounded-lg text-center">
          {error}
         </div>
        )}

        <FormField
         control={form.control}
         name="password"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-[var(--text)]">كلمة المرور الجديدة</FormLabel>
           <FormControl>
            <div className="relative">
             <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--textTertiary)]" />
             <Input
              {...field}
              type="password"
              placeholder="أدخلي كلمة المرور"
              className="pr-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
              disabled={isPending}
             />
            </div>
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        <FormField
         control={form.control}
         name="confirmPassword"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-[var(--text)]">تأكيد كلمة المرور</FormLabel>
           <FormControl>
            <div className="relative">
             <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--textTertiary)]" />
             <Input
              {...field}
              type="password"
              placeholder="أعيدي كتابة كلمة المرور"
              className="pr-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
              disabled={isPending}
             />
            </div>
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        <Button
         type="submit"
         className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
         disabled={isPending}
        >
         {isPending ? 'جاري الحفظ...' : 'حفظ كلمة المرور'}
        </Button>
       </form>
      </Form>

      <div className="mt-6 text-center">
       <Link
        href="/auth/login"
        className="inline-flex items-center text-sm text-[var(--primary)] hover:underline"
       >
        <ArrowRight className="h-4 w-4 ml-2" />
        العودة لتسجيل الدخول
       </Link>
      </div>
     </CardContent>
    </Card>
   </div>
  </div>
 );
}