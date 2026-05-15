// // Register page - Request OTP

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Phone } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { useAuthStore } from '@/stores/auth-store';

// const registerSchema = z.object({
//   phone: z.string()
//     .min(10, 'رقم الجوال يجب أن يكون 10 أرقام')
//     .regex(/^05\d{8}$/, 'رقم الجوال يجب أن يبدأ بـ 05'),
// });

// type RegisterFormValues = z.infer<typeof registerSchema>;

// export default function RegisterPage() {
//   const router = useRouter();
//   const { requestOTP } = useAuthStore();

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       phone: '',
//     },
//   });

//   const onSubmit = async (data: RegisterFormValues) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const phoneWithCode = `+966${data.phone.substring(1)}`;
//       await requestOTP(phoneWithCode);
//       sessionStorage.setItem('register_phone', phoneWithCode);
//       router.push('/auth/verify-otp');
//     } catch (err) {
//       setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
//     } finally {
//       setIsLoading(false);
//     }
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
//             <CardTitle className="text-xl font-cairo text-[var(--primary)]">إنشاء حساب جديد</CardTitle>
//             <CardDescription className="text-[var(--textSecondary)]">
//               أدخلي رقم الجوال لتلقي رمز التحقق
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
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-[var(--text)]">رقم الجوال</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--textTertiary)]" />
//                           <Input
//                             {...field}
//                             placeholder="05xxxxxxxx"
//                             className="pr-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
//                             dir="ltr"
//                             disabled={isLoading}
//                             maxLength={10}
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button
//                   type="submit"
//                   className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
//                 </Button>
//               </form>
//             </Form>

//             <p className="mt-6 text-center text-sm text-[var(--textSecondary)]">
//               لديك حساب بالفعل؟{' '}
//               <Link href="/auth/login" className="text-[var(--primary)] hover:underline font-medium">
//                 تسجيل الدخول
//               </Link>
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }




// src/app/auth/register/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Phone, 
  Sparkles, 
  Crown, 
  Heart, 
  Star, 
  Zap, 
  Shield, 
  ArrowRight, 
  CheckCircle2,
  Gift,
  Flower2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/auth-store';

// ✨ Schema with validation
const registerSchema = z.object({
  phone: z.string()
    .min(10, 'رقم الجوال يجب أن يكون 10 أرقام')
    .regex(/^05\d{8}$/, 'رقم الجوال يجب أن يبدأ بـ 05'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// ✨ Animated Welcome Visual - Right Panel
function WelcomeAnimation({ phoneValue, isValid }: { phoneValue: string; isValid: boolean }) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isValid && phoneValue.length === 10) {
      setIsComplete(true);
      const timer = setTimeout(() => setIsComplete(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isValid, phoneValue]);

  return (
    <div className="
      hidden lg:flex flex-col items-center justify-center 
      min-h-screen p-8 relative overflow-hidden
      bg-gradient-to-br from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary-900)]
    ">
      {/* ✨ Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Hearts */}
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute w-4 h-4 text-white/20 animate-float-heart"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Floating Stars */}
        {[...Array(10)].map((_, i) => (
          <Star
            key={i}
            className="absolute w-3 h-3 text-yellow-300/60 animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[var(--primary-light)]/20 rounded-full blur-2xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* ✨ Central Welcome Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Animated Crown & Logo */}
        <div className="relative mb-8">
          {/* Glow Ring */}
          <div className={`
            absolute inset-0 rounded-full blur-xl transition-all duration-500
            ${isComplete 
              ? 'bg-[var(--success)]/40 scale-150 opacity-100' 
              : 'bg-[var(--primary)]/30 scale-125 opacity-80 animate-pulse'
            }
          `} />
          
          {/* Main Logo Container */}
          <div className={`
            relative w-32 h-32 rounded-full 
            flex items-center justify-center 
            bg-white/10 backdrop-blur-md 
            ring-2 ring-white/20
            transition-all duration-500
            ${isComplete ? 'animate-bounce-in' : ''}
          `}>
            <span className="text-5xl font-bold text-[var(--textInverse)] font-cairo">
              ف
            </span>
            
            {/* Floating Crown */}
            <Crown className="absolute -top-3 -right-2 w-8 h-8 text-yellow-400 animate-float drop-shadow-lg" />
            
            {/* Floating Sparkles */}
            {[...Array(4)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute w-4 h-4 text-yellow-300 animate-sparkle"
                style={{
                  top: `${i * 25}%`,
                  right: `${-12 + i * 8}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* ✨ Dynamic Welcome Title */}
        <h2 className="text-3xl font-bold text-white font-cairo mb-4 animate-fadeInUp">
          أهلاً بكِ في عالم <span className="text-[var(--primary-light)]">فساتيني</span> ✨
        </h2>
        
        {/* ✨ Dynamic Description */}
        <p className="text-white/85 font-cairo max-w-sm leading-relaxed mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          {isComplete 
            ? 'رائع! جاري إرسال رمز التحقق إلى جوالكِ' 
            : 'انضمي لمجتمعنا الفاخر واكتشفي تشكيلة حصرية من الفساتين الجديدة والمستعملة'
          }
        </p>

        {/* ✨ Progress Indicator */}
        <div className="flex items-center gap-2 mb-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${i === 0 
                  ? 'bg-[var(--success)] scale-110' 
                  : i === 1 && phoneValue.length > 0
                    ? 'bg-white/60 animate-pulse' 
                    : 'bg-white/20'
                }
              `}
            />
          ))}
        </div>
        <p className="text-xs text-white/60 font-cairo animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          {isComplete ? '✓ خطوة 1 من 2' : phoneValue.length > 0 ? 'أدخلي الرقم الكامل' : 'ابدئي رحلتكِ معنا'}
        </p>

        {/* ✨ Feature Badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          {[
            { icon: Shield, label: 'حماية كاملة', color: 'var(--success)' },
            { icon: Gift, label: 'عروض حصرية', color: 'var(--warning)' },
            { icon: Zap, label: 'تجربة سريعة', color: 'var(--primary-light)' },
          ].map((badge, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm animate-fadeInUp"
              style={{ animationDelay: `${500 + i * 100}ms` }}
            >
              <badge.icon className="w-4 h-4" style={{ color: badge.color }} />
              <span className="text-xs text-white/90 font-cairo">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* ✨ Decorative Flower */}
        <Flower2 className="absolute bottom-20 left-10 w-12 h-12 text-[var(--primary-light)]/40 animate-float delay-700" />
        <Flower2 className="absolute top-20 right-10 w-10 h-10 text-white/30 animate-float delay-300" />
      </div>

      {/* ✨ Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </div>
  );
}

// ✨ Premium Phone Input Component
function PremiumPhoneInput({ 
  field, 
  label, 
  placeholder, 
  error,
  isLoading,
}: any) {
  const [isFocused, setIsFocused] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    
    // Format as user types: 05xx xxx xxx
    if (value.length > 2) {
      value = `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 8)} ${value.slice(8)}`.trim();
    }
    
    setFormattedValue(value);
    field.onChange(value.replace(/\s/g, ''));
  };

  return (
    <FormItem>
      <FormLabel className="flex items-center gap-2 text-[var(--text)] font-cairo font-medium">
        <Phone className={`
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
              value={formattedValue}
              onChange={handleChange}
              onFocus={() => {
                setIsFocused(true);
                field.onFocus?.();
              }}
              onBlur={() => {
                setIsFocused(false);
                field.onBlur?.();
              }}
              placeholder={placeholder}
              dir="ltr"
              disabled={isLoading}
              maxLength={14}
              className={`
                w-full h-13 pr-12 pl-4 rounded-xl
                bg-[var(--surface)] border-2 
                text-[var(--text)] placeholder:text-[var(--textTertiary)]
                transition-all duration-300 font-cairo font-mono text-base
                focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20
                ${error 
                  ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/20' 
                  : 'border-[var(--border)] hover:border-[var(--primary)]/40'
                }
              `}
            />
            
            {/* Country Code Badge */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Badge variant="secondary" className="bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30 font-cairo text-xs">
                +966
              </Badge>
            </div>
            
            {/* Phone Icon */}
            <Phone className={`
              absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5
              transition-colors duration-300
              ${isFocused ? 'text-[var(--primary)]' : 'text-[var(--textTertiary)]'}
            `} />
          </div>
        </div>
      </FormControl>
      <FormMessage className="text-[var(--error)] font-cairo text-sm" />
    </FormItem>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const { requestOTP } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: '',
    },
  });

  const phoneValue = form.watch('phone');
  const isValid = form.formState.isValid;

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const phoneWithCode = `+966${data.phone.substring(1)}`;
      await requestOTP(phoneWithCode);
      sessionStorage.setItem('register_phone', phoneWithCode);
      // ✅ إضافة التوجيه إلى صفحة إدخال رمز التحقق
      router.push('/auth/verify-otp');
    } catch (err) {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--background)]">
      
      {/* ✨ Right Panel: Animated Welcome Visual */}
      <WelcomeAnimation phoneValue={phoneValue} isValid={isValid} />

      {/* ✨ Left Panel: Registration Form */}
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
                  إنشاء حساب جديد
                </CardTitle>
              </div>
              
              <CardDescription className="text-[var(--textSecondary)] font-cairo">
                أدخلي رقم جوالكِ للبدء في رحلة التسوق الفاخرة
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
                      <Shield className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  {/* ✨ Phone Input */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <PremiumPhoneInput
                        field={field}
                        label="رقم الجوال"
                        placeholder="05xxxxxxxx"
                        error={form.formState.errors.phone}
                        isLoading={isLoading}
                      />
                    )}
                  />

                  {/* ✨ Submit Button */}
                  <Button
                    type="submit"
                    className={`
                      w-full h-13 rounded-2xl text-base font-cairo gap-2.5
                      transition-all duration-300 shadow-lg
                      ${isValid && phoneValue.length === 10
                        ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:from-[var(--primaryDark)] hover:to-[var(--primary)] hover:shadow-[var(--primary)]/40' 
                        : 'bg-[var(--surfaceMuted)] text-[var(--textTertiary)] cursor-not-allowed'
                      }
                      text-[var(--textInverse)]
                      disabled={isLoading || !isValid || phoneValue.length !== 10}
                    `}
                  >
                    {isLoading ? (
                      <>
                        <Sparkles className="w-5 h-5 animate-spin" />
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <Phone className="w-5 h-5" />
                        <span>إرسال رمز التحقق</span>
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

              {/* ✨ Login Link */}
              <p className="text-center text-sm text-[var(--textSecondary)] font-cairo">
                لديكِ حساب بالفعل؟{' '}
                <Link 
                  href="/auth/login" 
                  className="text-[var(--primary)] hover:text-[var(--primaryDark)] hover:underline font-medium transition-colors inline-flex items-center gap-1 group"
                >
                  تسجيل الدخول
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                </Link>
              </p>

              {/* ✨ Security Note */}
              <div className="mt-6 pt-5 border-t border-[var(--border)]/50">
                <div className="flex items-center justify-center gap-2 text-xs text-[var(--textTertiary)] font-cairo">
                  <Shield className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>رقمكِ محمي ومشفّر بأعلى معايير الأمان</span>
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