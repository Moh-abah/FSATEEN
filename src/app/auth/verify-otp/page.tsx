// src/app/auth/verify-otp/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import {
  ArrowRight,
  RefreshCw,
  Shield,
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
  Smartphone,
  Zap,
  Crown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/auth-store';
import { tokenManager } from '@/lib/api';
import api from '@/lib/api';

// ✨ Animated Verification Visual - Right Panel
function VerificationAnimation({ isVerified, otpLength }: { isVerified: boolean; otpLength: number }) {
  return (
    <div className="
      hidden lg:flex flex-col items-center justify-center 
      min-h-[600px] p-8 relative overflow-hidden
      bg-gradient-to-br from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary-900)]
    ">
      {/* ✨ Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
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
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[var(--primary-light)]/20 rounded-full blur-2xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* ✨ Central Shield Animation */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Animated Shield Container */}
        <div className="relative mb-8">
          {/* Outer Glow Ring */}
          <div className={`
            absolute inset-0 rounded-full blur-xl transition-all duration-500
            ${isVerified
              ? 'bg-[var(--success)]/40 scale-150 opacity-100'
              : otpLength > 0
                ? 'bg-[var(--primary)]/40 scale-125 opacity-100 animate-pulse'
                : 'bg-[var(--primary)]/20 scale-100 opacity-80'
            }
          `} />

          {/* Main Shield Icon */}
          <div className={`
            relative w-32 h-32 rounded-full 
            flex items-center justify-center 
            bg-white/10 backdrop-blur-md 
            ring-2 ring-white/20
            transition-all duration-500
            ${isVerified ? 'animate-bounce-in' : ''}
          `}>
            {isVerified ? (
              <CheckCircle2 className="w-16 h-16 text-[var(--success)] animate-checkmark" />
            ) : otpLength > 0 ? (
              <Lock className="w-14 h-14 text-white animate-pulse-slow" />
            ) : (
              <Shield className="w-14 h-14 text-white/90 animate-float" />
            )}

            {/* Rotating Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 animate-spin-slow" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="44"
                fill="none"
                stroke="url(#gradient-ring)"
                strokeWidth="2"
                strokeDasharray="276"
                strokeDashoffset={isVerified ? "0" : "69"}
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
          {[...Array(4)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute w-4 h-4 text-yellow-300 animate-sparkle"
              style={{
                top: `${i * 25}%`,
                right: `${-15 + i * 10}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* ✨ Dynamic Title */}
        <h2 className="text-2xl font-bold text-white font-cairo mb-3">
          {isVerified ? 'تم التحقق بنجاح! ✨' : 'أدخلي رمز التحقق'}
        </h2>

        {/* ✨ Dynamic Description */}
        <p className="text-white/80 font-cairo max-w-xs leading-relaxed">
          {isVerified
            ? 'جاري تحويلكِ إلى حسابكِ بأمان'
            : otpLength > 0
              ? `أحسنتِ! ${otpLength}/6 أرقام - أكملِ الإدخال`
              : 'رمز مكون من 6 أرقام تم إرساله إلى جوالكِ'
          }
        </p>

        {/* ✨ Progress Dots */}
        <div className="flex items-center gap-2 mt-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-300
                ${i < otpLength
                  ? 'bg-[var(--success)] scale-110'
                  : i === otpLength
                    ? 'bg-white/60 animate-pulse'
                    : 'bg-white/20'
                }
              `}
            />
          ))}
        </div>

        {/* ✨ Security Badges */}
        <div className="flex items-center gap-4 mt-8">
          {[
            { icon: ShieldCheck, label: 'مشفر' },
            { icon: Zap, label: 'فوري' },
            { icon: Smartphone, label: 'آمن' },
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <badge.icon className="w-4.5 h-4.5 text-[var(--primary-light)]" />
              </div>
              <span className="text-xs text-white/70 font-cairo">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ✨ Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </div>
  );
}

// ✨ Premium OTP Slot Component
function PremiumOTPSlot({ index, value, isActive }: { index: number; value: string; isActive: boolean }) {
  return (
    <InputOTPSlot
      index={index}
      className={`
        relative w-12 h-14 sm:w-14 sm:h-16 
        rounded-2xl border-2 transition-all duration-300 font-cairo text-xl font-bold
        ${isActive
          ? 'border-[var(--primary)] bg-[var(--primary)]/5 ring-2 ring-[var(--primary)]/20 scale-105'
          : value
            ? 'border-[var(--success)] bg-[var(--success)]/5 text-[var(--success)]'
            : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40'
        }
      `}
    >
      {value && (
        <span className="absolute inset-0 flex items-center justify-center animate-bounce-in">
          {value}
        </span>
      )}
    </InputOTPSlot>
  );
}

export default function VerifyOTPPage() {
  const router = useRouter();
  const { loginWithOTP, requestOTP, refreshUser } = useAuthStore();

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [phone, setPhone] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);



  const isVerifyingRef = useRef(false);

  
  useEffect(() => {
    const storedPhone = sessionStorage.getItem('register_phone');
    if (!storedPhone) {
      router.push('/auth/register');
      return;
    }
    setPhone(storedPhone);
  }, [router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);





  const handleVerify = async () => {
    // منع الاستدعاء إذا كان هناك طلب قيد التنفيذ أو الرمز غير مكتمل
    if (otp.length !== 6 || !phone || isLoading || isVerifyingRef.current) return;

    isVerifyingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      await loginWithOTP(phone, otp);
      await refreshUser();

      const user = useAuthStore.getState().user;
      const isResetPasswordFlow = sessionStorage.getItem('reset_password') === 'true';

      if (isResetPasswordFlow) {
        sessionStorage.removeItem('reset_password');
        router.push('/auth/set-passwordafterforget');
        return;
      }

      if (user && !user.username) {
        router.push('/auth/set-password');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('رمز التحقق غير صحيح');
      setIsVerified(false);
      // إعادة تعيين الـ ref في حالة الفشل
      isVerifyingRef.current = false;
      setIsLoading(false);
    }
    // لا داعي لإعادة تعيين الـ ref في حالة النجاح لأن المكون سيتفكك
  };

  // const handleVerify = async () => {
  //   if (otp.length !== 6 || !phone) return;

  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     await loginWithOTP(phone, otp);
  //     await refreshUser();

  //     const user = useAuthStore.getState().user;
  //     if (user && !user.username) {
  //       router.push('/auth/set-password');
  //     } else {
  //       router.push('/');
  //     }
  //   } catch (err) {
  //     setError('رمز التحقق غير صحيح');
  //     setIsVerified(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };







  const handleResend = async () => {
    if (!phone || countdown > 0) return;

    setIsResending(true);
    setError(null);

    try {
      await requestOTP(phone);
      setCountdown(60);
    } catch {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--background)]">

      {/* ✨ Right Panel: Animated Verification Visual */}
      <VerificationAnimation isVerified={isVerified} otpLength={otp.length} />

      {/* ✨ Left Panel: OTP Input Form */}
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
              <div className="h-1.5 w-16 mx-auto rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] mb-4" />

              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-[var(--primary)]" />
                <CardTitle className="text-xl font-cairo text-[var(--primary)]">
                  التحقق الآمن
                </CardTitle>
              </div>

              <CardDescription className="text-[var(--textSecondary)] font-cairo">
                أدخلي الرمز المرسل إلى جوالكِ لإكمال التسجيل
              </CardDescription>
            </CardHeader>

            <Separator className="bg-[var(--border)]" />

            <CardContent className="pt-6">
              <div className="space-y-6">

                {/* ✨ Error Message with Animation */}
                {error && (
                  <div className="
                    p-4 rounded-2xl bg-[var(--error)]/10 border border-[var(--error)]/30 
                    text-[var(--error)] text-sm font-cairo text-center
                    animate-fadeInUp
                  ">
                    <span className="font-medium">⚠️</span> {error}
                  </div>
                )}

                {/* ✨ Phone Display - Premium Style */}
                <div className="text-center">
                  <Badge variant="secondary" className="bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30 font-cairo gap-2">
                    <Smartphone className="w-4 h-4" />
                    {phone && (
                      <span dir="ltr" className="font-mono">
                        {phone.replace(/(\+966)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')}
                      </span>
                    )}
                  </Badge>
                </div>

                {/* ✨ Premium OTP Input */}
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      setError(null);

                      if (value.length === 6 && !isVerifyingRef.current) {
                        handleVerify();
                      }
                    }}
                    disabled={isLoading}
                  >
                    <InputOTPGroup className="gap-2 sm:gap-3">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <PremiumOTPSlot
                          key={index}
                          index={index}
                          value={otp[index] || ''}
                          isActive={index === otp.length}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {/* ✨ Verify Button - Premium Style */}
                <Button
                  onClick={handleVerify}
                  className={`
                    w-full rounded-2xl py-6 text-base font-cairo gap-2.5
                    transition-all duration-300 shadow-lg
                    ${isVerified
                      ? 'bg-gradient-to-r from-[var(--success)] to-[var(--success)]/90 hover:shadow-[var(--success)]/40'
                      : 'bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:from-[var(--primaryDark)] hover:to-[var(--primary)] hover:shadow-[var(--primary)]/40'
                    }
                    text-[var(--textInverse)]
                    disabled={otp.length !== 6 || isLoading}
                  `}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>جاري التحقق...</span>
                    </>
                  ) : isVerified ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>تم! جاري التحويل...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>تحقق وأكملي</span>
                    </>
                  )}
                </Button>

                {/* ✨ Resend Section */}
                <div className="text-center pt-2">
                  {countdown > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-[var(--textSecondary)] font-cairo">
                        إعادة الإرسال خلال{' '}
                        <span className="font-bold text-[var(--primary)]">{countdown}s</span>
                      </p>
                      {/* Countdown Progress Bar */}
                      <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden mx-8">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] transition-all duration-1000"
                          style={{ width: `${(countdown / 60) * 100}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="text-[var(--primary)] font-cairo gap-2 hover:bg-[var(--primary)]/10"
                      onClick={handleResend}
                      disabled={isResending}
                    >
                      {isResending ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>جاري الإرسال...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          <span>إعادة إرسال الرمز</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* ✨ Change Phone Link */}
                <div className="text-center pt-2">
                  <Button
                    variant="link"
                    className="text-[var(--textTertiary)] hover:text-[var(--primary)] font-cairo gap-2"
                    onClick={() => router.push('/auth/register')}
                  >
                    <ArrowRight className="w-4 h-4" />
                    تغيير رقم الجوال
                  </Button>
                </div>

                {/* ✨ Security Note */}
                <div className="pt-4">
                  <div className="flex items-center justify-center gap-2 text-xs text-[var(--textTertiary)] font-cairo">
                    <Lock className="w-3.5 h-3.5" />
                    <span>جميع عمليات التحقق مشفرة ومحمية</span>
                  </div>
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