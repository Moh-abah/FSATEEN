// // Login page

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Phone, Lock, Eye, EyeOff } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { useAuthStore } from '@/stores/auth-store';
// import api from '@/lib/api';
// import { tokenManager } from '@/lib/api';

// const loginSchema = z.object({
//   identifier: z.string().min(1, 'يرجى إدخال رقم الجوال أو اسم المستخدم'),
//   password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirect = searchParams.get('redirect') || '/';
//   const { setUser, refreshUser } = useAuthStore();

//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       identifier: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data: LoginFormValues) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const tokens = await api.post<{ access_token: string; refresh_token: string }>(
//         '/auth/login',
//         { identifier: data.identifier, password: data.password }
//       );
//       tokenManager.setTokens(tokens.access_token, tokens.refresh_token);
//       await refreshUser();
//       router.push(redirect);
//     } catch (err) {
//       setError('رقم الجوال أو كلمة المرور غير صحيحة');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOTPLogin = () => {
//     router.push('/auth/register');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Link href="/" className="inline-flex items-center gap-2">
//             <div
//               className="w-12 h-12 rounded-full flex items-center justify-center"
//               style={{ backgroundImage: 'var(--gradient-primary)' }}
//             >
//               <span className="text-[var(--textInverse)] font-bold text-xl font-cairo">ف</span>
//             </div>
//             <span className="text-2xl font-bold text-[var(--primary)] font-cairo">فساتين</span>
//           </Link>
//         </div>

//         <Card className="border border-[var(--border)] shadow-lg bg-[var(--surface)]">
//           <CardHeader className="text-center">
//             <CardTitle className="text-xl font-cairo text-[var(--primary)]">تسجيل الدخول</CardTitle>
//             <CardDescription className="text-[var(--textSecondary)]">
//               أدخلي بياناتك للوصول إلى حسابك
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                 {error && (
//                   <div className="p-3 text-sm text-[var(--error)] bg-[var(--errorLight)] rounded-lg text-center">
//                     {error}
//                   </div>
//                 )}

//                 <FormField
//                   control={form.control}
//                   name="identifier"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-[var(--text)]">رقم الجوال أو اسم المستخدم</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--textTertiary)]" />
//                           <Input
//                             {...field}
//                             placeholder="05xxxxxxxx أو اسم المستخدم"
//                             className="pr-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
//                             disabled={isLoading}
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-[var(--text)]">كلمة المرور</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--textTertiary)]" />
//                           <Input
//                             {...field}
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder="••••••"
//                             className="pr-10 pl-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
//                             disabled={isLoading}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--textTertiary)] hover:text-[var(--text)]"
//                           >
//                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="text-left">
//                   <Link
//                     href="/auth/forgot-password"
//                     className="text-sm text-[var(--primary)] hover:underline"
//                   >
//                     نسيتي كلمة المرور؟
//                   </Link>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
//                 </Button>
//               </form>
//             </Form>

//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-[var(--border)]" />
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-[var(--surface)] px-2 text-[var(--textSecondary)]">أو</span>
//               </div>
//             </div>

//             <Button
//               variant="outline"
//               className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10"
//               onClick={handleOTPLogin}
//             >
//               تسجيل الدخول برمز التحقق
//             </Button>

//             <p className="mt-6 text-center text-sm text-[var(--textSecondary)]">
//               ليس لديك حساب؟{' '}
//               <Link href="/auth/register" className="text-[var(--primary)] hover:underline font-medium">
//                 سجلي الآن
//               </Link>
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



// src/app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  Shield,
  ShieldCheck,
  Sparkles,
  Crown,
  Heart,
  Zap,
  Star,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/auth-store';
import api from '@/lib/api';
import { tokenManager } from '@/lib/api';

// ✨ Schema with validation
const loginSchema = z.object({
  identifier: z.string().min(1, 'يرجى إدخال رقم الجوال أو اسم المستخدم'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// ✨ Animated Security Visual - Right Panel
function LoginAnimation({ isFocused, hasError }: { isFocused: boolean; hasError: boolean }) {
  return (
    <div className="
      hidden lg:flex flex-col items-center justify-center 
      min-h-screen p-8 relative overflow-hidden
      bg-gradient-to-br from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary-900)]
    ">
      {/* ✨ Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
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
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[var(--primary-light)]/20 rounded-full blur-2xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* ✨ Central Lock Animation */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Animated Lock Container */}
        <div className="relative mb-8">
          {/* Outer Glow Ring */}
          <div className={`
            absolute inset-0 rounded-full blur-xl transition-all duration-500
            ${hasError
              ? 'bg-[var(--error)]/40 scale-125 animate-pulse'
              : isFocused
                ? 'bg-[var(--primary)]/40 scale-125 opacity-100 animate-pulse'
                : 'bg-[var(--primary)]/20 scale-100 opacity-80'
            }
          `} />

          {/* Main Lock Icon */}
          <div className={`
            relative w-36 h-36 rounded-full 
            flex items-center justify-center 
            bg-white/10 backdrop-blur-md 
            ring-2 ring-white/20
            transition-all duration-500
            ${hasError ? 'animate-shake' : isFocused ? 'animate-pulse-glow' : ''}
          `}>
            {hasError ? (
              <ShieldCheck className="w-16 h-16 text-[var(--error)] animate-bounce-in" />
            ) : (
              <>
                <Lock className={`
                  w-14 h-14 text-white/90 
                  ${isFocused ? 'animate-unlock' : 'animate-float'}
                `} />
                {/* Key Animation */}
                {isFocused && (
                  <div className="absolute -right-2 -bottom-2 animate-key-turn">
                    <Crown className="w-8 h-8 text-[var(--primary-light)] drop-shadow-lg" />
                  </div>
                )}
              </>
            )}

            {/* Rotating Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 animate-spin-slow" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="url(#gradient-ring)"
                strokeWidth="2"
                strokeDasharray="289"
                strokeDashoffset={isFocused ? "0" : "72"}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary-light)" />
                  <stop offset="100%" stopColor="var(--primary)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating Hearts */}
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className={`
                absolute w-4 h-4 text-[var(--primary-light)]/60 
                animate-float-heart
              `}
              style={{
                top: `${10 + i * 20}%`,
                right: `${-10 + i * 8}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* ✨ Dynamic Title */}
        <h2 className="text-3xl font-bold text-white font-cairo mb-4">
          أهلاً بكِ في فساتيني ✨
        </h2>

        {/* ✨ Dynamic Description */}
        <p className="text-white/85 font-cairo max-w-sm leading-relaxed mb-6">
          {hasError
            ? 'يرجى التحقق من بيانات الدخول والمحاولة مرة أخرى'
            : isFocused
              ? 'أدخلي بياناتكِ للدخول إلى عالم الأناقة'
              : 'منصتكِ الفاخرة للفساتين الجديدة والمستعملة'
          }
        </p>

        {/* ✨ Feature Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { icon: ShieldCheck, label: 'دخول آمن', color: 'var(--success)' },
            { icon: Zap, label: 'سريع', color: 'var(--warning)' },
            { icon: Star, label: 'موثوق', color: 'var(--primary-light)' },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
            >
              <badge.icon className="w-4 h-4" style={{ color: badge.color }} />
              <span className="text-xs text-white/90 font-cairo">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* ✨ Progress Indicator */}
        <div className="flex items-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${i === 0
                  ? 'bg-[var(--success)] scale-110'
                  : i === 1 && isFocused
                    ? 'bg-white/60 animate-pulse'
                    : 'bg-white/20'
                }
              `}
            />
          ))}
        </div>
        <p className="text-xs text-white/60 font-cairo mt-3">
          {isFocused ? 'خطوة 2 من 2' : hasError ? 'حاولي مرة أخرى' : 'خطوة 1 من 2'}
        </p>
      </div>

      {/* ✨ Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </div>
  );
}

// ✨ Premium Input Field Component
function PremiumInput({
  field,
  label,
  placeholder,
  icon: Icon,
  type = 'text',
  showToggle,
  onToggle,
  isToggled,
  isLoading,
  hasError,
}: any) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormItem>
      <FormLabel className="flex items-center gap-2 text-[var(--text)] font-cairo font-medium">
        <Icon className={`
          w-4 h-4 transition-colors duration-300
          ${isFocused ? 'text-[var(--primary)]' : 'text-[var(--textTertiary)]'}
        `} />
        {label}
      </FormLabel>
      <FormControl>
        <div className="relative group">
          {/* Animated Border Glow */}
          <div className={`
            absolute -inset-0.5 rounded-xl opacity-0 group-focus-within:opacity-100 
            transition-opacity duration-300 pointer-events-none
            bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] blur-sm
          `} />

          <div className="relative">
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                field.onBlur?.();
              }}
              disabled={isLoading}
              className={`
                w-full h-12 pr-11 pl-11 rounded-xl
                bg-[var(--surface)] border-2 
                text-[var(--text)] placeholder:text-[var(--textTertiary)]
                transition-all duration-300 font-cairo
                focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20
                ${hasError
                  ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/20'
                  : 'border-[var(--border)] hover:border-[var(--primary)]/40'
                }
              `}
            />

            {/* Left Icon */}
            <Icon className={`
              absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5
              transition-colors duration-300
              ${isFocused ? 'text-[var(--primary)]' : 'text-[var(--textTertiary)]'}
            `} />

            {/* Toggle Button */}
            {showToggle && (
              <button
                type="button"
                onClick={onToggle}
                className="
                  absolute left-4 top-1/2 -translate-y-1/2 
                  text-[var(--textTertiary)] hover:text-[var(--text)] 
                  transition-all duration-200 p-1 rounded-md
                  hover:bg-[var(--surfaceMuted)]
                "
                title={isToggled ? 'إخفاء' : 'إظهار'}
              >
                {isToggled ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            )}
          </div>
        </div>
      </FormControl>
      <FormMessage className="text-[var(--error)] font-cairo text-sm" />
    </FormItem>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { setUser, refreshUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const tokens = await api.post<{ access_token: string; refresh_token: string }>(
        '/auth/login',
        { identifier: data.identifier, password: data.password }
      );
      tokenManager.setTokens(tokens.access_token, tokens.refresh_token);
      await refreshUser();
      router.push(redirect);
    } catch (err) {
      setError('رقم الجوال أو كلمة المرور غير صحيحة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPLogin = () => {
    router.push('/auth/register');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--background)]">

      {/* ✨ Right Panel: Animated Security Visual */}
      <LoginAnimation
        isFocused={focusedField !== null}
        hasError={error !== null}
      />

      {/* ✨ Left Panel: Login Form */}
      <main className="
        flex-1 flex items-center justify-center 
        p-4 sm:p-6 lg:p-12 
        bg-gradient-to-br from-[var(--surface)] to-[var(--surfaceMuted)]/30
      ">
        <div className="w-full max-w-md">

          {/* ✨ Logo - Mobile Only */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center gap-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundImage: 'var(--gradient-primary)' }}
              >
                <span className="text-[var(--textInverse)] font-bold text-xl font-cairo">ف</span>
              </div>
              <span className="text-2xl font-bold text-[var(--primary)] font-cairo">فساتين</span>
            </Link>
          </div>

          {/* ✨ Premium Card */}
          <Card className="
            border border-[var(--border)] shadow-2xl shadow-[var(--primary)]/10 
            bg-[var(--surface)] rounded-3xl overflow-hidden
            animate-fadeInUp
          ">
            <CardHeader className="text-center pb-4">
              {/* Decorative Top Bar */}
              <div className="h-1.5 w-20 mx-auto rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] mb-4" />

              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-[var(--primary)] animate-pulse" />
                <CardTitle className="text-xl font-cairo text-[var(--primary)]">
                  تسجيل الدخول
                </CardTitle>
              </div>

              <CardDescription className="text-[var(--textSecondary)] font-cairo">
                أدخلي بياناتكِ للوصول إلى حسابكِ الشخصي
              </CardDescription>
            </CardHeader>

            <Separator className="bg-[var(--border)]" />

            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                  {/* ✨ Error Message with Animation */}
                  {error && (
                    <div className="
                      p-4 rounded-2xl bg-[var(--error)]/10 border border-[var(--error)]/30 
                      text-[var(--error)] text-sm font-cairo text-center
                      animate-fadeInUp flex items-center justify-center gap-2
                    ">
                      <ShieldCheck className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  {/* ✨ Identifier Field */}
                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <PremiumInput
                        field={field}
                        label="رقم الجوال أو اسم المستخدم"
                        placeholder="05xxxxxxxx أو اسم المستخدم"
                        icon={Phone}
                        isLoading={isLoading}
                        hasError={!!error && !form.formState.errors.identifier}
                        onFocus={() => setFocusedField('identifier')}
                        onBlur={() => setFocusedField(null)}
                      />
                    )}
                  />

                  {/* ✨ Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <PremiumInput
                        field={field}
                        label="كلمة المرور"
                        placeholder="••••••"
                        icon={Lock}
                        type={showPassword ? 'text' : 'password'}
                        showToggle
                        onToggle={() => setShowPassword(!showPassword)}
                        isToggled={showPassword}
                        isLoading={isLoading}
                        hasError={!!form.formState.errors.password}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                      />
                    )}
                  />

                  {/* ✨ Forgot Password */}
                  <div className="text-left">
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-[var(--primary)] hover:text-[var(--primaryDark)] hover:underline transition-colors font-cairo inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                      نسيتِ كلمة المرور؟
                    </Link>
                  </div>

                  {/* ✨ Submit Button */}
                  <Button
                    type="submit"
                    className={`
                      w-full h-13 rounded-2xl text-base font-cairo gap-2.5
                      transition-all duration-300 shadow-lg
                      ${error
                        ? 'bg-gradient-to-r from-[var(--error)] to-[var(--error)]/90 hover:shadow-[var(--error)]/40'
                        : 'bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:from-[var(--primaryDark)] hover:to-[var(--primary)] hover:shadow-[var(--primary)]/40'
                      }
                      text-[var(--textInverse)]
                      disabled={isLoading}
                    `}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Sparkles className="w-5 h-5 animate-spin" />
                        <span>جاري تسجيل الدخول...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>تسجيل الدخول</span>
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              {/* ✨ Divider */}
              <div className="relative my-7">
                <Separator className="bg-[var(--border)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-[var(--surface)] px-4 text-xs uppercase text-[var(--textTertiary)] font-cairo">
                    أو
                  </span>
                </div>
              </div>

              {/* ✨ OTP Login Button */}
              <Button
                variant="outline"
                className="
                  w-full h-12 rounded-2xl border-2 
                  border-[var(--primary)]/40 text-[var(--primary)] 
                  hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]
                  font-cairo gap-2.5 transition-all duration-300
                  group
                "
                onClick={handleOTPLogin}
              >
                <Zap className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
                تسجيل الدخول برمز التحقق
              </Button>

              {/* ✨ Sign Up Link */}
              <p className="mt-7 text-center text-sm text-[var(--textSecondary)] font-cairo">
                ليس لديكِ حساب؟{' '}
                <Link
                  href="/auth/register"
                  className="text-[var(--primary)] hover:text-[var(--primaryDark)] hover:underline font-medium transition-colors inline-flex items-center gap-1 group"
                >
                  سجلي الآن
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                </Link>
              </p>

              {/* ✨ Security Note */}
              <div className="mt-6 pt-5 border-t border-[var(--border)]/50">
                <div className="flex items-center justify-center gap-2 text-xs text-[var(--textTertiary)] font-cairo">
                  <Shield className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>جميع جلسات الدخول مشفرة ومحمية</span>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* ✨ Footer Note */}
          <p className="text-center text-xs text-[var(--textTertiary)] font-cairo mt-6">
            💕 بحمايتكِ نبدأ • فساتيني
          </p>

        </div>
      </main>
    </div>
  );
}