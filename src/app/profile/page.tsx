// Profile page

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { RatingStars } from '@/components/shared';
import { useAuthStore } from '@/stores/auth-store';
import { getAvatarUrl } from '@/lib/utils';

const MENU_ITEMS = [
  { href: '/orders', icon: ShoppingBag, label: 'طلباتي' },
  { href: '/favorites', icon: Heart, label: 'المفضلة' },
  { href: '/chats', icon: User, label: 'المحادثات' },
  { href: '/notifications', icon: Bell, label: 'الإشعارات' },
  { href: '/profile/edit', icon: Settings, label: 'تعديل الملف الشخصي' },
  { href: '/profile/password', icon: Shield, label: 'تغيير كلمة المرور' },
  { href: '/profile/privacy', icon: Shield, label: 'إعدادات الخصوصية' },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Profile Card */}
          <Card className="border border-[var(--border)] mb-6 bg-[var(--surface)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-[var(--primary)]">
                  <AvatarImage src={getAvatarUrl(user?.avatar_url, user?.full_name)} />
                  <AvatarFallback className="bg-[var(--primary)] text-[var(--textInverse)] text-2xl">
                    {user?.full_name?.charAt(0) || user?.username?.charAt(0) || 'م'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-[var(--primary)]">
                      {user?.full_name || user?.username || 'مستخدم'}
                    </h1>
                    {user?.is_verified && (
                      <BadgeCheck className="h-5 w-5 text-[var(--primary)]" />
                    )}
                  </div>
                  {user?.username && (
                    <p className="text-sm text-[var(--textSecondary)]">@{user.username}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <RatingStars rating={user?.rating || 0} size="sm" />
                    {user?.city && (
                      <span className="text-sm text-[var(--textSecondary)]">{user.city}</span>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" asChild className="text-[var(--text)]">
                  <Link href="/profile/edit">
                    <Settings className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Seller Section */}
          {(user?.account_type === 'seller' || user?.is_professional_seller) && (
            <Card className="border border-[var(--primary)] bg-[var(--surfaceMuted)] mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Store className="h-5 w-5 text-[var(--primary)]" />
                    <span className="font-medium text-[var(--primary)]">لوحة البائعة</span>
                  </div>
                  <Button asChild className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]">
                    <Link href="/seller/dashboard">الذهاب للوحة</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Verification */}
          {!user?.is_verified && (
            <Card className="border border-[var(--border)] mb-6 bg-[var(--surface)]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--primary)]">توثيق الحساب</p>
                    <p className="text-sm text-[var(--textSecondary)]">زيادة الثقة مع المشتريات</p>
                  </div>
                  <Button variant="outline" asChild className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10">
                    <Link href="/profile/verification">توثيق</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Menu Items */}
          <div className="space-y-2">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-[var(--primary)]" />
                  <span className="text-[var(--text)]">{item.label}</span>
                </div>
                <ChevronLeft className="h-5 w-5 text-[var(--textTertiary)]" />
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <Button
            variant="outline"
            className="w-full mt-6 text-[var(--error)] border-[var(--error)]/20 hover:bg-[var(--error)]/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}