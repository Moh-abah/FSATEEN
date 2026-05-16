// src/app/profile/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  User,
  Settings,
  Heart,
  ShoppingBag,
  Store,
  Bell,
  Shield,
  ChevronLeft,
  LogOut,
  BadgeCheck,
  Sparkles,
  Crown,
  Star,
  MapPin,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Package,
  MessageCircle,
  Eye,
  Award,
  Zap,
  Lock,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { RatingStars } from '@/components/shared';
import { useAuthStore } from '@/stores/auth-store';
import { formatDate, getAvatarUrl } from '@/lib/utils';

// ✨ Animated Background Component
function AnimatedProfileHeader() {
  return (
    <div className="relative h-80 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary-900)]">
        {/* Animated Waves */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[var(--primary-light)]/20 rounded-full blur-3xl animate-float-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl animate-pulse-slow" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20">
        <Sparkles className="w-8 h-8 text-yellow-300/60 animate-sparkle" />
      </div>
      <div className="absolute bottom-20 left-20">
        <Star className="w-6 h-6 text-white/40 animate-pulse" />
      </div>
    </div>
  );
}

// ✨ Premium Stats Card
function StatsCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="flex flex-col items-center p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/40 hover:shadow-lg hover:shadow-[var(--primary)]/10 transition-all duration-300 group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-2xl font-bold text-[var(--text)] font-cairo">{value}</span>
      <span className="text-xs text-[var(--textSecondary)] font-cairo">{label}</span>
    </div>
  );
}

// ✨ Premium Menu Card
function PremiumMenuCard({
  href,
  icon: Icon,
  label,
  description,
  badge,
  color,
  index
}: any) {
  return (
    <Link href={href} className="group block animate-fadeInUp" style={{ animationDelay: `${index * 80}ms` }}>
      <Card className="
        relative overflow-hidden rounded-3xl border border-[var(--border)] 
        bg-gradient-to-br from-[var(--surface)] to-[var(--surfaceMuted)]/30
        hover:shadow-2xl hover:shadow-[var(--primary)]/15 hover:border-[var(--primary)]/40
        transition-all duration-500 ease-out cursor-pointer
        group-hover:-translate-y-1
      ">
        {/* Animated Background Glow */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-100 
          transition-opacity duration-500 pointer-events-none
          bg-gradient-to-br ${color}
        `} />

        <CardContent className="p-5 relative z-10">
          <div className="flex items-center gap-4">
            {/* Icon Container */}
            <div className={`
              relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
              transition-all duration-500 ease-out
              bg-gradient-to-br ${color}
              ring-2 ring-transparent group-hover:ring-[var(--primary)]/30
              group-hover:scale-110 group-hover:rotate-3
            `}>
              <Icon className="w-6 h-6 text-[var(--textInverse)]" />

              {/* Badge */}
              {badge && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--error)] text-white text-xs flex items-center justify-center font-bold animate-bounce-in">
                  {badge}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[var(--text)] font-cairo text-base group-hover:text-[var(--primary)] transition-colors">
                {label}
              </h3>
              <p className="text-xs text-[var(--textSecondary)] font-cairo mt-0.5 line-clamp-1">
                {description}
              </p>
            </div>

            {/* Arrow */}
            <ChevronLeft className="
              w-5 h-5 text-[var(--textTertiary)] 
              transition-all duration-300 
              group-hover:translate-x-1 group-hover:text-[var(--primary)]
            " />
          </div>
        </CardContent>

        {/* Bottom Accent Line */}
        <div className={`
          absolute inset-x-4 bottom-0 h-0.5 rounded-full
          bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent
          scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center
        `} />
      </Card>
    </Link>
  );
}

// ✨ Verification Badge Animation
function VerificationBadge({ isVerified }: { isVerified: boolean }) {
  if (!isVerified) return null;

  return (
    <div className="relative inline-block animate-float">
      <div className="absolute inset-0 bg-[var(--success)] rounded-full blur-lg opacity-40 animate-pulse" />
      <BadgeCheck className="relative w-6 h-6 text-[var(--success)] bg-[var(--background)] rounded-full p-1 shadow-lg" />
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Menu items with descriptions
  const menuItems = [
    {
      href: '/orders',
      icon: Package,
      label: 'طلباتي',
      description: 'تتبعي طلباتكِ وحالة الشحن',
      badge: null,
      color: 'from-[var(--primary)] to-[var(--primaryDark)]',
    },
    {
      href: '/favorites',
      icon: Heart,
      label: 'المفضلة',
      description: 'فساتينكِ المحفوظة للرجوع إليها',
      badge: null,
      color: 'from-[var(--error)] to-[var(--error)]/80',
    },
    {
      href: '/chats',
      icon: MessageCircle,
      label: 'المحادثات',
      description: 'راسلي البائعات والمشترين',
      badge: '3',
      color: 'from-[var(--info)] to-[var(--info)]/80',
    },
    {
      href: '/notifications',
      icon: Bell,
      label: 'الإشعارات',
      description: 'تحديثات وعروض حصرية لكِ',
      badge: null,
      color: 'from-[var(--warning)] to-[var(--warning)]/80',
    },
    {
      href: '/profile/edit',
      icon: Settings,
      label: 'تعديل الملف',
      description: 'خصّصي ملفكِ الشخصي بأناقة',
      badge: null,
      color: 'from-[var(--success)] to-[var(--success)]/80',
    },
    {
      href: '/profile/password',
      icon: Lock,
      label: 'كلمة المرور',
      description: 'حافظي على أمان حسابكِ',
      badge: null,
      color: 'from-[var(--primary)] to-[var(--primaryDark)]',
    },
    {
      href: '/profile/privacy',
      icon: Shield,
      label: 'الخصوصية',
      description: 'تحكمي في ظهور معلوماتكِ',
      badge: null,
      color: 'from-[var(--info)] to-[var(--info)]/80',
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-[var(--textSecondary)] font-cairo">جاري التحميل...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--primary)]/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--primary-light)]/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <Navbar />

      <main className="flex-1 py-6 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* ✨ Profile Header with Animated Background */}
          <div className="relative mb-20">
            <AnimatedProfileHeader />

            {/* Profile Info Card - Overlapping */}
            <div className="absolute -bottom-16 left-0 right-0 px-4">
              <Card className="
                border border-[var(--border)] bg-[var(--surface)] 
                shadow-2xl shadow-[var(--primary)]/10 rounded-3xl
                animate-fadeInUp
              ">
                <CardContent className="p-6">

                  <div className="flex justify-end -mt-10 -mr-2 mb-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="text-[var(--textTertiary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-200"
                    >
                      <Link href="/profile/edit">
                        <Settings className="w-6 h-6" />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

                    {/* Avatar - Overlapping */}
                    <div className="relative -mt-20 md:-mt-24">
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] rounded-full blur-lg opacity-40 animate-pulse-glow" />
                      <Avatar className="
                        relative w-32 h-32 md:w-40 md:h-40 
                        ring-4 ring-[var(--background)] 
                        shadow-xl shadow-[var(--primary)]/20
                        hover:scale-105 transition-transform duration-500
                      ">
                        <AvatarImage
                          src={getAvatarUrl(user?.avatar_url, user?.full_name)}
                          alt={user?.full_name || 'صورة شخصية'}
                          className="object-cover"
                        />
                        <AvatarFallback className="
                          bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] 
                          text-[var(--textInverse)] text-3xl font-bold font-cairo
                        ">
                          {user?.full_name?.charAt(0) || user?.username?.charAt(0) || 'م'}


                          
                        </AvatarFallback>



                      </Avatar>

                      

                      {/* Verification Badge */}
                      <div className="absolute -bottom-1 -right-1">
                        <VerificationBadge isVerified={user?.is_verified || false} />
                      </div>



                      {/* Crown for Premium Users */}
                      {(user?.account_type === 'seller' || user?.is_professional_seller) && (
                        <div className="absolute -top-2 -right-2 animate-float">
                          <Crown className="w-7 h-7 text-yellow-500 drop-shadow-lg" />
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary)] font-cairo">
                              {user?.full_name || user?.username || 'مستخدم'}
                            </h1>
                            {user?.is_verified && (
                              <Badge className="bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30 text-xs font-cairo gap-1">
                                <BadgeCheck className="w-3 h-3" />
                                موثق
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-[var(--textSecondary)] font-cairo">@{user?.username || 'username'}</p>
                        </div>

                   
                      </div>

                      {/* User Details */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--textSecondary)] font-cairo">
                        {user?.city && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[var(--primary)]" />
                            <span>{user.city}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[var(--primary)]" />
          
                          <span>{formatDate(user?.created_at || '')}</span>
                        </div>
                      </div>

                      

                      {user?.bio && (
                        <p className="text-sm text-[var(--textSecondary)] font-cairo mt-2 max-w-md">
                          {user.bio}
                        </p>
                      )}

                      {/* Rating */}
                      <div className="flex items-center gap-2 mt-3">
                        <RatingStars rating={user?.rating_avg || 0} size="md" />
                        <span className="text-sm font-bold text-[var(--text)] font-cairo">
                          {user?.rating_avg?.toFixed(1) || '0.0'}
                        </span>
                        <span className="text-xs text-[var(--textTertiary)] font-cairo">
                          ({user?.rating_count || 0} تقييم)
                        </span>
                      </div>



                      



                    </div>

                    {/* Stats Section - Horizontal Design (مصغر) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 animate-fadeInUp">
                      {/* المنتجات */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[var(--primary)]/5 to-[var(--surface)] border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-all duration-300 group">
                        <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Package className="w-4 h-4 text-[var(--primary)]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] text-[var(--textSecondary)] font-cairo">المنتجات</p>
                          <p className="text-base font-bold text-[var(--text)] font-cairo">{user?.products_count || 0}</p>
                        </div>
                      </div>

                      {/* المبيعات */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[var(--success)]/5 to-[var(--surface)] border border-[var(--success)]/20 hover:border-[var(--success)]/40 transition-all duration-300 group">
                        <div className="w-9 h-9 rounded-lg bg-[var(--success)]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <TrendingUp className="w-4 h-4 text-[var(--success)]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] text-[var(--textSecondary)] font-cairo">المبيعات</p>
                          <p className="text-base font-bold text-[var(--text)] font-cairo">{user?.sales_count || 0}</p>
                        </div>
                      </div>
                    </div>
                    {/* Stats */}


                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Spacer for overlapping card */}
          <div className="h-24" />



          {/* ✨ Seller Dashboard Card */}
          {(user?.account_type === 'seller' || user?.is_professional_seller) && (
            <Card className="
              mb-6 border border-[var(--primary)]/30 
              bg-gradient-to-br from-[var(--primary)]/5 via-[var(--surface)] to-[var(--surfaceMuted)]/20
              hover:shadow-xl hover:shadow-[var(--primary)]/10 transition-all duration-500
              animate-fadeInUp
            ">
              <CardContent className="p-6">

                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[var(--primary)]/20 rounded-2xl blur-md animate-pulse" />
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] flex items-center justify-center">
                        <Store className="w-7 h-7 text-[var(--textInverse)]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text)] font-cairo text-lg">لوحة البائعة</h3>
                      <p className="text-sm text-[var(--textSecondary)] font-cairo">إدارة متجركِ ومنتجاتكِ</p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="
                      bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] 
                      hover:from-[var(--primaryDark)] hover:to-[var(--primary)]
                      text-[var(--textInverse)] shadow-lg shadow-[var(--primary)]/25
                      hover:shadow-xl hover:shadow-[var(--primary)]/40
                      font-cairo gap-2 transition-all duration-300
                      group
                    "
                  >
                    <Link href="/seller/dashboard" className="flex items-center">
                      اذهبي للوحة
                      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ✨ Verification Card */}
          {!user?.is_verified && (
            <Card className="
              mb-6 border border-[var(--border)] 
              bg-gradient-to-br from-[var(--surface)] to-[var(--surfaceMuted)]/30
              hover:border-[var(--primary)]/40 hover:shadow-lg hover:shadow-[var(--primary)]/5
              transition-all duration-500
              animate-fadeInUp
            ">
              <CardContent className="p-6">

                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--success)]/20 to-[var(--success)]/5 flex items-center justify-center">
                      <Shield className="w-7 h-7 text-[var(--success)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text)] font-cairo text-lg">توثيق الحساب</h3>
                      <p className="text-sm text-[var(--textSecondary)] font-cairo">زيادة الثقة مع المشترين</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    asChild
                    className="
                      border-[var(--success)]/40 text-[var(--success)] 
                      hover:bg-[var(--success)]/10 hover:border-[var(--success)]
                      font-cairo gap-2 transition-all duration-300
                      group
                    "
                  >
                    <Link href="/profile/verification" className="flex items-center">
                      توثيق
                      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ✨ Premium Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {menuItems.map((item, index) => (
              <PremiumMenuCard
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                description={item.description}
                badge={item.badge}
                color={item.color}
                index={index}
              />
            ))}
          </div>

          {/* ✨ Logout Button */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="
              w-full mt-6 rounded-2xl 
              text-[var(--error)] border-[var(--error)]/20 
              hover:bg-[var(--error)]/10 hover:border-[var(--error)]/40
              font-cairo gap-3 transition-all duration-300
              group animate-fadeInUp
            "
            style={{ animationDelay: '400ms' }}
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>تسجيل الخروج</span>
          </Button>

          {/* ✨ Footer Note */}
          <p className="text-center text-xs text-[var(--textTertiary)] font-cairo mt-6 pb-4 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            💕 جميع بياناتكِ محمية ومشفرة بأعلى معايير الأمان
          </p>

        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}