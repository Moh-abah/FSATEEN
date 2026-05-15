// src/app/auth/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Phone,
  ArrowRight,
  Shield,
  ShieldCheck,
  KeyRound,
  Sparkles,
  Lock,
  CheckCircle2,
  RefreshCw,
  Crown,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/auth-store';

// ✨ Schema with validation
const forgotPasswordSchema = z.object({
  phone: z.string()
    .min(10, 'رقم الجوال يجب أن يكون 10 أرقام')
    .regex(/^05\d{8}$/, 'رقم الجوال يجب أن يبدأ بـ 05'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// ✨ Animated Security Visual - Right Panel
function RecoveryAnimation({ phoneValue, isValid, isSubmitted }: {
  phoneValue: string;
  isValid: boolean;
  isSubmitted: boolean;
}) {
  return (
    <div className="
      hidden lg:flex flex-col items-center justify-center 
      min-h-screen p-8 relative overflow-hidden
      bg-gradient-to-br from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary-900)]
    ">
      {/* ✨ Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Keys */}
        {[...Array(8)].map((_, i) => (
          <KeyRound
            key={i}
            className="absolute w-4 h-4 text-white/20 animate-float-key"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute w-3 h-3 text-[var(--primary-light)]/30 animate-float-heart"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
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
            ${isSubmitted
              ? 'bg-[var(--success)]/40 scale-150 opacity-100'
              : isValid && phoneValue.length === 10
                ? 'bg-[var(--primary)]/40 scale-125 opacity-100 animate-pulse'
                : 'bg-[var(--primary)]/20 scale-100 opacity-80'
            }
          `} />

          {/* Main Lock/Key Animation */}
          <div className={`
            relative w-36 h-36 rounded-full 
            flex items-center justify-center 
            bg-white/10 backdrop-blur-md 
            ring-2 ring-white/20
            transition-all duration-500
            ${isSubmitted ? 'animate-bounce-in' : ''}
          `}>
            {isSubmitted ? (
              <CheckCircle2 className="w-16 h-16 text-[var(--success)] animate-checkmark" />
            ) : isValid && phoneValue.length === 10 ? (
              <>
                <Lock className="w-12 h-12 text-white/90 animate-unlock" />
                <KeyRound className="absolute -right-3 -bottom-3 w-10 h-10 text-[var(--primary-light)] animate-key-turn drop-shadow-lg" />
              </>
            ) : (
              <Shield className="w-14 h-14 text-white/90 animate-float" />
            )}

            {/* Rotating Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 animate-spin-slow" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="url(#gradient-ring)"
                strokeWidth="2"
                strokeDasharray="289"
                strokeDashoffset={isSubmitted ? "0" : isValid ? "145" : "289"}
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

          {/* Floating Crown */}
          <Crown className="absolute -top-3 -right-3 w-8 h-8 text-yellow-400 animate-float delay-500 drop-shadow-lg" />

          {/* Floating Sparkles */}
          {[...Array(5)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute w-4 h-4 text-yellow-300 animate-sparkle"
              style={{
                top: `${i * 20}%`,
                right: `${-15 + i * 10}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* ✨ Dynamic Title */}
        <h2 className="text-3xl font-bold text-white font-cairo mb-4 animate-fadeInUp">
          {isSubmitted ? 'تم الإرسال! ✨' : 'استعادة آمنة'}
        </h2>

        {/* ✨ Dynamic Description */}
        <p className="text-white/85 font-cairo max-w-sm leading-relaxed mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          {isSubmitted
            ? 'راجعي رسائل الجوال، رمز التحقق في الطريق إليكِ'
            : isValid && phoneValue.length === 10
              ? 'ممتاز! جاري إرسال رمز التحقق الآن'
              : 'أدخلي رقم جوالكِ المسجل وسنرسل لكِ رمزاً لاستعادة الوصول'
          }
        </p>

        {/* ✨ Progress Steps */}
        <div className="flex items-center gap-2 mb-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          {[
            { step: 1, label: 'أدخلي الرقم', done: phoneValue.length > 0 },
            { step: 2, label: 'استلمي الرمز', done: isSubmitted },
            { step: 3, label: 'عيّني كلمة جديدة', done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                ${item.done
                  ? 'bg-[var(--success)] text-[var(--textInverse)]'
                  : 'bg-white/20 text-white/60'
                }
              `}>
                {item.done ? <CheckCircle2 className="w-4 h-4" /> : item.step}
              </div>
              {i < 2 && (
                <div className={`w-10 h-0.5 ${item.done ? 'bg-[var(--success)]' : 'bg-white/20'}`} />
              )}
            </div>
          ))}
        </div>

        {/* ✨ Security Badges */}
        <div className="flex flex-wrap justify-center gap-3 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          {[
            { icon: ShieldCheck, label: 'مشفر', color: 'var(--success)' },
            { icon: Lock, label: 'آمن', color: 'var(--primary-light)' },
            { icon: RefreshCw, label: 'فوري', color: 'var(--warning)' },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm animate-fadeInUp"
              style={{ animationDelay: `${400 + i * 100}ms` }}
            >
              <badge.icon className="w-4 h-4" style={{ color: badge.color }} />
              <span className="text-xs text-white/90 font-cairo">{badge.label}</span>
            </div>
          ))}
        </div>
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
  formattedValue,
  onFormatChange,
}: any) {
  const [isFocused, setIsFocused] = useState(false);

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
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 10) value = value.slice(0, 10);
                if (value.length > 2) {
                  value = `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 8)} ${value.slice(8)}`.trim();
                }
                onFormatChange(value);
                field.onChange(value.replace(/\s/g, ''));
              }}
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
                w-full h-13 pr-14 pl-4 rounded-xl
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

// ✨ Success Animation Component
function RecoverySuccess({ phone, onBack }: { phone: string; onBack: () => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="
          max-w-md w-full border border-[var(--border)] 
          bg-gradient-to-br from-[var(--surface)] to-[var(--surfaceMuted)]/30
          text-center overflow-hidden rounded-3xl
          animate-fadeInUp
        ">
          {/* Animated Header */}
          <div className="relative h-36 bg-gradient-to-br from-[var(--success)] to-[var(--success)]/90 flex items-center justify-center">
            {/* Floating Particles */}
            {[...Array(10)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute w-3 h-3 text-yellow-300 animate-sparkle"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}

            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-bounce-in">
                <CheckCircle2 className="w-10 h-10 text-[var(--textInverse)]" />
              </div>
              <Crown className="absolute -top-2 -right-2 w-7 h-7 text-yellow-400 animate-float drop-shadow-lg" />
            </div>
          </div>

          <CardContent className="py-8 px-6">
            {/* Success Badge */}
            <div className="flex justify-center mb-4">
              <Badge className="bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30 gap-2 px-4 py-2 font-cairo">
                <ShieldCheck className="w-4 h-4" />
                رمز في الطريق!
              </Badge>
            </div>

            <h2 className="text-2xl font-bold text-[var(--text)] font-cairo mb-3">
              تم إرسال رمز التحقق ✨
            </h2>

            <p className="text-[var(--textSecondary)] font-cairo mb-6 leading-relaxed">
              راجعي رسائل الجوال على الرقم{' '}
              <span className="font-bold text-[var(--primary)] font-mono" dir="ltr">
                {phone}
              </span>
            </p>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[
                { step: 1, label: 'أدخلي الرقم', done: true },
                { step: 2, label: 'أدخلي الرمز', done: false },
                { step: 3, label: 'كلمة جديدة', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                    ${item.done
                      ? 'bg-[var(--success)] text-[var(--textInverse)]'
                      : 'bg-[var(--surfaceMuted)] text-[var(--textTertiary)]'
                    }
                  `}>
                    {item.done ? <CheckCircle2 className="w-4 h-4" /> : item.step}
                  </div>
                  {i < 2 && (
                    <div className={`w-10 h-0.5 ${item.done ? 'bg-[var(--success)]' : 'bg-[var(--border)]'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="
                  w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)]
                  hover:from-[var(--primaryDark)] hover:to-[var(--primary)]
                  text-[var(--textInverse)] shadow-lg shadow-[var(--primary)]/25
                  hover:shadow-xl hover:shadow-[var(--primary)]/40
                  font-cairo gap-2 transition-all duration-300
                "
                onClick={() => { }}
              >
                <KeyRound className="w-4 h-4" />
                الانتقال للتحقق
              </Button>

              <Button
                variant="ghost"
                onClick={onBack}
                className="text-[var(--textTertiary)] hover:text-[var(--primary)] font-cairo"
              >
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { requestOTP } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formattedPhone, setFormattedPhone] = useState('');

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: '',
    },
  });

  const phoneValue = form.watch('phone');
  const isValid = form.formState.isValid;

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const phoneWithCode = `+966${data.phone.substring(1)}`;
      await requestOTP(phoneWithCode);
      sessionStorage.setItem('register_phone', phoneWithCode);
      sessionStorage.setItem('reset_password', 'true');
      setIsSubmitted(true);
    } catch {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show success animation
  if (isSubmitted) {
    return <RecoverySuccess phone={formattedPhone || phoneValue} onBack={() => router.push('/auth/login')} />;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--background)]">

      {/* ✨ Right Panel: Animated Security Visual */}
      <RecoveryAnimation
        phoneValue={phoneValue}
        isValid={isValid}
        isSubmitted={isSubmitted}
      />

      {/* ✨ Left Panel: Recovery Form */}
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
                <KeyRound className="w-5 h-5 text-[var(--primary)] animate-pulse" />
                <CardTitle className="text-xl font-cairo text-[var(--primary)]">
                  استعادة كلمة المرور
                </CardTitle>
              </div>

              <CardDescription className="text-[var(--textSecondary)] font-cairo">
                أدخلي رقم جوالكِ المسجل وسنرسل لكِ رمز التحقق
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
                        label="رقم الجوال المسجل"
                        placeholder="05xxxxxxxx"
                        error={form.formState.errors.phone}
                        isLoading={isLoading}
                        formattedValue={formattedPhone}
                        onFormatChange={setFormattedPhone}
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
                        <RefreshCw className="w-5 h-5 animate-spin" />
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
              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-sm text-[var(--primary)] hover:text-[var(--primaryDark)] hover:underline font-cairo transition-colors group"
                >
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:-translate-x-1" />
                  العودة لتسجيل الدخول
                </Link>
              </div>

              {/* ✨ Security Note */}
              <div className="mt-6 pt-5 border-t border-[var(--border)]/50">
                <div className="flex items-center justify-center gap-2 text-xs text-[var(--textTertiary)] font-cairo">
                  <Shield className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>جميع عمليات الاستعادة مشفرة ومحمية</span>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* ✨ Footer Note */}
          <p className="text-center text-xs text-[var(--textTertiary)] font-cairo mt-6">
            💡 لم يصلكِ الرمز؟ تفقدي مجلد الرسائل غير المرغوب فيها
          </p>

        </div>
      </main>
    </div>
  );
}