// // Change password page

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
// import api from '@/lib/api';
// import { useToast } from '@/hooks/use-toast';

// const passwordSchema = z.object({
//  current_password: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
//  new_password: z.string()
//   .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
//   .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
//   .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير')
//   .regex(/[0-9]/, 'يجب أن تحتوي على رقم'),
//  confirm_password: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
// }).refine((data) => data.new_password === data.confirm_password, {
//  message: 'كلمتا المرور غير متطابقتين',
//  path: ['confirm_password'],
// });

// type PasswordFormData = z.infer<typeof passwordSchema>;

// export default function ChangePasswordPage() {
//  const router = useRouter();
//  const { toast } = useToast();
//  const [showCurrent, setShowCurrent] = useState(false);
//  const [showNew, setShowNew] = useState(false);
//  const [showConfirm, setShowConfirm] = useState(false);
//  const [isLoading, setIsLoading] = useState(false);

//  const {
//   register,
//   handleSubmit,
//   formState: { errors },
//  } = useForm<PasswordFormData>({
//   resolver: zodResolver(passwordSchema),
//  });

//  const onSubmit = async (data: PasswordFormData) => {
//   setIsLoading(true);
//   try {
//    await api.patch('/auth/me/password', {
//     current_password: data.current_password,
//     new_password: data.new_password,
//    });

//    toast({
//     title: 'تم تغيير كلمة المرور بنجاح',
//    });
//    router.push('/profile');
//   } catch (error: unknown) {
//    const err = error as { response?: { data?: { message?: string } } };
//    toast({
//     title: err.response?.data?.message || 'حدث خطأ أثناء تغيير كلمة المرور',
//     variant: 'destructive',
//    });
//   } finally {
//    setIsLoading(false);
//   }
//  };

//  return (
//   <div className="min-h-screen flex flex-col bg-[var(--background)]">
//    <Navbar />

//    <main className="flex-1 py-6">
//     <div className="container mx-auto px-4 max-w-md">
//      {/* Header */}
//      <div className="flex items-center gap-3 mb-6">
//       <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
//        <Lock className="h-5 w-5 text-[var(--textInverse)]" />
//       </div>
//       <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">تغيير كلمة المرور</h1>
//      </div>

//      <Card className="border border-[var(--border)] bg-[var(--surface)]">
//       <CardContent className="pt-6">
//        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//          <Label htmlFor="current_password" className="text-[var(--text)]">كلمة المرور الحالية</Label>
//          <div className="relative mt-1">
//           <Input
//            id="current_password"
//            type={showCurrent ? 'text' : 'password'}
//            {...register('current_password')}
//            className="pl-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
//           />
//           <button
//            type="button"
//            onClick={() => setShowCurrent(!showCurrent)}
//            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--textTertiary)] hover:text-[var(--text)]"
//           >
//            {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//           </button>
//          </div>
//          {errors.current_password && (
//           <p className="text-[var(--error)] text-sm mt-1">{errors.current_password.message}</p>
//          )}
//         </div>

//         <div>
//          <Label htmlFor="new_password" className="text-[var(--text)]">كلمة المرور الجديدة</Label>
//          <div className="relative mt-1">
//           <Input
//            id="new_password"
//            type={showNew ? 'text' : 'password'}
//            {...register('new_password')}
//            className="pl-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
//           />
//           <button
//            type="button"
//            onClick={() => setShowNew(!showNew)}
//            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--textTertiary)] hover:text-[var(--text)]"
//           >
//            {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//           </button>
//          </div>
//          {errors.new_password && (
//           <p className="text-[var(--error)] text-sm mt-1">{errors.new_password.message}</p>
//          )}
//         </div>

//         <div>
//          <Label htmlFor="confirm_password" className="text-[var(--text)]">تأكيد كلمة المرور الجديدة</Label>
//          <div className="relative mt-1">
//           <Input
//            id="confirm_password"
//            type={showConfirm ? 'text' : 'password'}
//            {...register('confirm_password')}
//            className="pl-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
//           />
//           <button
//            type="button"
//            onClick={() => setShowConfirm(!showConfirm)}
//            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--textTertiary)] hover:text-[var(--text)]"
//           >
//            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//           </button>
//          </div>
//          {errors.confirm_password && (
//           <p className="text-[var(--error)] text-sm mt-1">{errors.confirm_password.message}</p>
//          )}
//         </div>

//         {/* Password requirements */}
//         <Alert className="bg-[var(--surfaceMuted)] border-[var(--border)]">
//          <AlertDescription className="text-xs text-[var(--textSecondary)]">
//           <p className="font-medium mb-1">متطلبات كلمة المرور:</p>
//           <ul className="space-y-0.5">
//            <li>• 8 أحرف على الأقل</li>
//            <li>• حرف كبير واحد على الأقل</li>
//            <li>• حرف صغير واحد على الأقل</li>
//            <li>• رقم واحد على الأقل</li>
//           </ul>
//          </AlertDescription>
//         </Alert>

//         <Button
//          type="submit"
//          className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
//          disabled={isLoading}
//         >
//          {isLoading ? (
//           <>
//            <Loader2 className="h-4 w-4 ml-2 animate-spin" />
//            جاري الحفظ...
//           </>
//          ) : (
//           'تغيير كلمة المرور'
//          )}
//         </Button>
//        </form>
//       </CardContent>
//      </Card>
//     </div>
//    </main>

//    <Footer />
//    <MobileBottomNav />
//   </div>
//  );
// }




// src/app/profile/change-password/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
 Lock,
 Eye,
 EyeOff,
 Loader2,
 Shield,
 CheckCircle2,
 XCircle,
 Sparkles,
 KeyRound,
 AlertCircle,
 ShieldCheck,
 Key,
 Fingerprint,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// ✨ Schema with real-time validation
const passwordSchema = z.object({
 current_password: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
 new_password: z.string()
  .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
  .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
  .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير')
  .regex(/[0-9]/, 'يجب أن تحتوي على رقم')
  .regex(/[^A-Za-z0-9]/, 'يجب أن تحتوي على رمز خاص'),
 confirm_password: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
}).refine((data) => data.new_password === data.confirm_password, {
 message: 'كلمتا المرور غير متطابقتين',
 path: ['confirm_password'],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

// ✨ Animated Security Visual - Left Panel
function SecurityVisualPanel() {
 return (
  <div className="
      relative hidden lg:flex flex-col items-center justify-center 
      min-h-[calc(100vh-80px)] p-8 overflow-hidden
      bg-gradient-to-br from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary-900)]
    ">
   {/* ✨ Animated Background Elements */}
   <div className="absolute inset-0 overflow-hidden">
    {/* Floating Particles */}
    {[...Array(20)].map((_, i) => (
     <div
      key={i}
      className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-float"
      style={{
       top: `${Math.random() * 100}%`,
       left: `${Math.random() * 100}%`,
       animationDelay: `${Math.random() * 3}s`,
       animationDuration: `${3 + Math.random() * 4}s`,
      }}
     />
    ))}

    {/* Glowing Orbs */}
    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse-slow" />
    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[var(--primary-light)]/20 rounded-full blur-xl animate-pulse-slow delay-1000" />
   </div>

   {/* ✨ Central Security Icon Animation */}
   <div className="relative z-10 flex flex-col items-center">
    {/* Animated Lock Container */}
    <div className="relative mb-8">
     {/* Outer Glow Ring */}
     <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] blur-xl opacity-40 animate-pulse" />

     {/* Main Lock Icon */}
     <div className="relative w-28 h-28 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center ring-2 ring-white/20">
      <Lock className="w-14 h-14 text-white animate-bounce-slow" />

      {/* Rotating Key Animation */}
      <div className="absolute -right-4 -bottom-4 w-10 h-10">
       <Key className="w-full h-full text-[var(--primary-light)] animate-rotate-slow" />
      </div>
     </div>

     {/* Floating Shield */}
     <div className="absolute -left-6 top-0 w-12 h-12">
      <Shield className="w-full h-full text-white/80 animate-float" />
     </div>

     {/* Floating Fingerprint */}
     <div className="absolute -right-8 top-8 w-10 h-10">
      <Fingerprint className="w-full h-full text-[var(--primary-light)]/80 animate-float delay-500" />
     </div>
    </div>

    {/* ✨ Title & Description */}
    <h2 className="text-2xl font-bold text-white font-cairo mb-3 text-center">
     أمان حسابكِ أولويتنا
    </h2>
    <p className="text-white/80 text-center max-w-xs font-cairo leading-relaxed">
     نستخدم أعلى معايير التشفير لحماية بياناتكِ.
     كلمة مرور قوية = حماية أقوى 🔐
    </p>

    {/* ✨ Security Badges */}
    <div className="flex items-center gap-4 mt-8">
     {[
      { icon: ShieldCheck, label: 'تشفير متقدم' },
      { icon: KeyRound, label: 'تحقق ثنائي' },
      { icon: Sparkles, label: 'حماية 24/7' },
     ].map((badge, i) => (
      <div key={i} className="flex flex-col items-center gap-2">
       <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        <badge.icon className="w-5 h-5 text-[var(--primary-light)]" />
       </div>
       <span className="text-xs text-white/70 font-cairo">{badge.label}</span>
      </div>
     ))}
    </div>
   </div>

   {/* ✨ Decorative Bottom Wave */}
   <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
  </div>
 );
}

// ✨ Password Strength Indicator
function PasswordStrengthMeter({ password }: { password: string }) {
 const getStrength = (pwd: string) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return Math.min(score, 5);
 };

 const strength = getStrength(password);
 const labels = ['ضعيف', 'ضعيف', 'متوسط', 'جيد', 'قوي', 'ممتاز'];
 const colors = [
  'bg-[var(--error)]',
  'bg-[var(--warning)]',
  'bg-[var(--info)]',
  'bg-[var(--success)]/70',
  'bg-[var(--success)]',
  'bg-[var(--primary)]',
 ];

 if (!password) return null;

 return (
  <div className="space-y-2 mt-3">
   <div className="flex items-center justify-between">
    <span className="text-xs text-[var(--textSecondary)] font-cairo">قوة كلمة المرور</span>
    <span className={`text-xs font-medium font-cairo ${colors[strength].replace('bg-', 'text-')}`}>
     {labels[strength]}
    </span>
   </div>
   <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
     <div
      key={i}
      className={`
              h-1.5 flex-1 rounded-full transition-all duration-300
              ${i < strength ? colors[strength] : 'bg-[var(--border)]'}
            `}
     />
    ))}
   </div>
  </div>
 );
}

// ✨ Password Requirements Checklist
function PasswordRequirements({ password }: { password: string }) {
 const requirements = [
  { label: '8 أحرف على الأقل', test: (p: string) => p.length >= 8 },
  { label: 'حرف كبير (A-Z)', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'حرف صغير (a-z)', test: (p: string) => /[a-z]/.test(p) },
  { label: 'رقم (0-9)', test: (p: string) => /[0-9]/.test(p) },
  { label: 'رمز خاص (!@#$)', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
 ];

 return (
  <div className="space-y-2 mt-3 p-3 rounded-xl bg-[var(--surfaceMuted)]/50 border border-[var(--border)]">
   <p className="text-xs font-medium text-[var(--textSecondary)] font-cairo mb-2">
    متطلبات الأمان:
   </p>
   <div className="space-y-1.5">
    {requirements.map((req, i) => {
     const met = req.test(password);
     return (
      <div key={i} className="flex items-center gap-2 text-xs font-cairo">
       {met ? (
        <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
       ) : (
        <XCircle className="w-4 h-4 text-[var(--textTertiary)] shrink-0" />
       )}
       <span className={met ? 'text-[var(--text)]' : 'text-[var(--textTertiary)]'}>
        {req.label}
       </span>
      </div>
     );
    })}
   </div>
  </div>
 );
}

// ✨ Premium Password Input
function PremiumPasswordInput({
 label,
 name,
 register,
 errors,
 showPassword,
 onToggle,
 placeholder,
 showStrength = false,
 showRequirements = false,
 value,
}: any) {
 return (
  <div className="space-y-2">
   <Label
    htmlFor={name}
    className="flex items-center gap-2 text-[var(--text)] font-cairo font-medium"
   >
    <Lock className="w-4 h-4 text-[var(--primary)]" />
    {label}
   </Label>

   <div className="relative">
    <Input
     id={name}
     type={showPassword ? 'text' : 'password'}
     {...register(name)}
     placeholder={placeholder}
     className={`
            w-full pr-10 bg-[var(--surface)] border-[var(--border)] 
            text-[var(--text)] placeholder:text-[var(--textTertiary)] 
            focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 
            transition-all duration-200 font-cairo
            ${errors?.[name] ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/20' : ''}
          `}
    />

    {/* Toggle Visibility */}
    <button
     type="button"
     onClick={onToggle}
     className="
            absolute left-3 top-1/2 -translate-y-1/2 
            text-[var(--textTertiary)] hover:text-[var(--text)] 
            transition-colors duration-200 p-1 rounded-md
            hover:bg-[var(--surfaceMuted)]
          "
     title={showPassword ? 'إخفاء' : 'إظهار'}
    >
     {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
    </button>

    {/* Validation Icon */}
    {errors?.[name] && (
     <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--error)]" />
    )}
   </div>

   {/* Error */}
   {errors?.[name] && (
    <p className="text-[var(--error)] text-sm font-cairo flex items-center gap-1 animate-fadeInUp">
     <span className="w-1 h-1 rounded-full bg-[var(--error)]" />
     {errors[name].message}
    </p>
   )}

   {/* Strength & Requirements */}
   {showStrength && value && <PasswordStrengthMeter password={value} />}
   {showRequirements && value && <PasswordRequirements password={value} />}
  </div>
 );
}

// ✨ Success Animation
function SuccessToast({ show, message }: { show: boolean; message: string }) {
 if (!show) return null;

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
   <div className="animate-fadeInUp">
    <div className="
          flex items-center gap-3 px-6 py-4 rounded-2xl 
          bg-[var(--success)] text-[var(--textInverse)] 
          shadow-2xl shadow-[var(--success)]/30 font-cairo
        ">
     <CheckCircle2 className="w-6 h-6" />
     <span className="font-medium">{message}</span>
    </div>
   </div>
  </div>
 );
}

export default function ChangePasswordPage() {
 const router = useRouter();
 const { toast } = useToast();

 const [showCurrent, setShowCurrent] = useState(false);
 const [showNew, setShowNew] = useState(false);
 const [showConfirm, setShowConfirm] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [showSuccess, setShowSuccess] = useState(false);

 const {
  register,
  handleSubmit,
  watch,
  formState: { errors, isValid },
 } = useForm<PasswordFormData>({
  resolver: zodResolver(passwordSchema),
  mode: 'onChange',
  defaultValues: {
   current_password: '',
   new_password: '',
   confirm_password: '',
  },
 });

 const newPassword = watch('new_password');

 const onSubmit = async (data: PasswordFormData) => {
  setIsLoading(true);
  try {
   await api.patch('/auth/me/password', {
    current_password: data.current_password,
    new_password: data.new_password,
   });

   setShowSuccess(true);
   toast({
    title: 'تم تغيير كلمة المرور ✨',
    description: 'تم تحديث بيانات الدخول بنجاح',
   });

   setTimeout(() => {
    setShowSuccess(false);
    router.push('/profile');
   }, 2000);

  } catch (error: any) {
   toast({
    title: 'حدث خطأ',
    description: error?.response?.data?.message || 'لم نتمكن من تغيير كلمة المرور',
    variant: 'destructive',
   });
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex flex-col bg-[var(--background)]">
   <Navbar />

   <main className="flex-1">
    {/* ✨ Split Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">

     {/* Left: Security Visual */}
     <SecurityVisualPanel />

     {/* Right: Password Form - Shifted Right */}
     <div className="
            flex items-center justify-center 
            bg-[var(--background)] 
            px-4 py-8 lg:py-12 lg:pr-16 lg:pl-8
          ">
      <div className="w-full max-w-md">

       {/* ✨ Form Header */}
       <div className="text-center lg:text-right mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-cairo text-sm mb-4">
         <Shield className="w-4 h-4" />
         <span>أمان متقدم</span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">
         تغيير كلمة المرور
        </h1>
        <p className="text-sm text-[var(--textSecondary)] font-cairo mt-2">
         اختاري كلمة مرور قوية لحماية حسابكِ
        </p>
       </div>

       {/* ✨ Success Toast */}
       <SuccessToast show={showSuccess} message="تم حفظ التغييرات بنجاح! 🔐" />

       {/* ✨ Form Card */}
       <Card className="
                border border-[var(--border)] bg-[var(--surface)]
                shadow-lg shadow-[var(--primary)]/5
              ">
        <CardContent className="pt-6">
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Current Password */}
          <PremiumPasswordInput
           label="كلمة المرور الحالية"
           name="current_password"
           register={register}
           errors={errors}
           showPassword={showCurrent}
           onToggle={() => setShowCurrent(!showCurrent)}
           placeholder="••••••••"
          />

          <Separator className="bg-[var(--border)]/50" />

          {/* New Password */}
          <PremiumPasswordInput
           label="كلمة المرور الجديدة"
           name="new_password"
           register={register}
           errors={errors}
           showPassword={showNew}
           onToggle={() => setShowNew(!showNew)}
           placeholder="أدخلي كلمة مرور جديدة"
           showStrength
           showRequirements
           value={newPassword}
          />

          {/* Confirm Password */}
          <PremiumPasswordInput
           label="تأكيد كلمة المرور"
           name="confirm_password"
           register={register}
           errors={errors}
           showPassword={showConfirm}
           onToggle={() => setShowConfirm(!showConfirm)}
           placeholder="أعدِي إدخال كلمة المرور"
          />

          {/* Security Tip */}
          <Alert className="
                      bg-[var(--primary)]/5 border-[var(--primary)]/20 
                      rounded-xl flex items-start gap-3
                    ">
           <Shield className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
           <AlertDescription className="text-xs text-[var(--textSecondary)] font-cairo">
            <p className="font-medium text-[var(--text)] mb-1">نصيحة أمان:</p>
            <p>لا تستخدمي نفس كلمة المرور في مواقع أخرى، وغيريها كل 3-6 أشهر</p>
           </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Button
           type="submit"
           className="
                        w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] 
                        hover:from-[var(--primaryDark)] hover:to-[var(--primary)] 
                        text-[var(--textInverse)] shadow-lg shadow-[var(--primary)]/25 
                        hover:shadow-xl hover:shadow-[var(--primary)]/30 
                        font-cairo gap-2 transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed
                        py-6 text-base
                      "
           disabled={isLoading || !isValid}
          >
           {isLoading ? (
            <>
             <Loader2 className="w-5 h-5 animate-spin" />
             <span>جاري التحديث...</span>
            </>
           ) : (
            <>
             <Lock className="w-5 h-5" />
             <span>تغيير كلمة المرور</span>
            </>
           )}
          </Button>

          {/* Cancel */}
          <Button
           type="button"
           variant="ghost"
           onClick={() => router.back()}
           className="
                        w-full text-[var(--textTertiary)] hover:text-[var(--text)] 
                        hover:bg-[var(--surfaceMuted)] font-cairo
                      "
          >
           إلغاء والعودة
          </Button>

         </form>
        </CardContent>
       </Card>

       {/* ✨ Footer Note */}
       <p className="text-center text-xs text-[var(--textTertiary)] font-cairo mt-6">
        🔒 جميع كلمات المرور مشفرة ومحمية بأعلى المعايير
       </p>

      </div>
     </div>

    </div>
   </main>

   <Footer />
   <MobileBottomNav />
  </div>
 );
}