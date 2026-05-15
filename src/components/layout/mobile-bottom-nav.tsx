// Mobile bottom navigation component

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'الرئيسية' },
  { href: '/products', icon: Search, label: 'البحث' },
  { href: '/favorites', icon: Heart, label: 'المفضلة' },
  { href: '/chats', icon: MessageCircle, label: 'المحادثات' },
  { href: '/profile', icon: User, label: 'حسابي' },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  // Don't show on auth pages
  if (pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--surface)] border-t border-[var(--border)] safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          // Redirect to login for protected routes
          const href = !isAuthenticated &&
            (item.href === '/favorites' || item.href === '/chats' || item.href === '/profile')
            ? '/auth/login'
            : item.href;

          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                isActive
                  ? "text-[var(--primary)]"
                  : "text-[var(--textSecondary)]"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "fill-[var(--primary)]")} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}