// Set password page (for new users after OTP)

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useSetPassword, useUpdateProfileDetails } from '@/hooks';
import { useAuthStore } from '@/stores/auth-store';

const setPasswordSchema = z.object({
  password: z.string()
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    .regex(/[A-Za-z]/, 'يجب أن تحتوي على حرف واحد على الأقل')
    .regex(/[0-9]/, 'يجب أن تحتوي على رقم واحد على الأقل'),
  confirmPassword: z.string(),
  fullName: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  username: z.string()
    .min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل')
    .regex(/^[a-zA-Z0-9_]+$/, 'اسم المستخدم يجب أن يحتوي على أحرف إنجليزية وأرقام فقط'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمتا المرور غير متطابقتين',
  path: ['confirmPassword'],
});

type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;

export default function SetPasswordPage() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const setPassword = useSetPassword();
  const updateProfileDetails = useUpdateProfileDetails();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      fullName: '',
      username: '',
    },
  });

  const password = form.watch('password');
  const hasMinLength = password.length >= 6;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const onSubmit = async (data: SetPasswordFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await setPassword.mutateAsync(data.password);
      await updateProfileDetails.mutateAsync({
        full_name: data.fullName,
        username: data.username,
      });
      updateUser({
        full_name: data.fullName,
        username: data.username
      });
      router.push('/');
    } catch (err) {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
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
            <CardTitle className="text-xl font-cairo text-[var(--primary)]">إكمال التسجيل</CardTitle>
            <CardDescription className="text-[var(--textSecondary)]">
              أنشئي كلمة المرور وأكملي بياناتك
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
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--text)]">الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="أدخلي اسمك الكامل"
                          className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--text)]">اسم المستخدم</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="أدخلي اسم المستخدم"
                          dir="ltr"
                          className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--text)]">كلمة المرور</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--textTertiary)]" />
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••"
                            className="pr-10 pl-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                            disabled={isSubmitting}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--textTertiary)] hover:text-[var(--text)]"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />

                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className={`flex items-center gap-1 text-xs ${hasMinLength ? 'text-[var(--success)]' : 'text-[var(--textTertiary)]'}`}>
                          <CheckCircle2 className="h-3 w-3" />
                          6 أحرف على الأقل
                        </span>
                        <span className={`flex items-center gap-1 text-xs ${hasLetter ? 'text-[var(--success)]' : 'text-[var(--textTertiary)]'}`}>
                          <CheckCircle2 className="h-3 w-3" />
                          حرف واحد
                        </span>
                        <span className={`flex items-center gap-1 text-xs ${hasNumber ? 'text-[var(--success)]' : 'text-[var(--textTertiary)]'}`}>
                          <CheckCircle2 className="h-3 w-3" />
                          رقم واحد
                        </span>
                      </div>
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
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••"
                            className="pr-10 pl-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
                            disabled={isSubmitting}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--textTertiary)] hover:text-[var(--text)]"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري الحفظ...' : 'إنشاء الحساب'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}