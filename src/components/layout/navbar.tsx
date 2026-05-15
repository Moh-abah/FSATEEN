// Main navigation bar component

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Bell,
  BellOff,
  User,
  Menu,
  X,
  Search,
  ShoppingBag,
  LogIn,
  LogOut,
  Settings,
  Store,
  LayoutDashboard,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/stores/auth-store';
import { useUnreadCount, useNotificationStatus, usePushNotifications } from '@/hooks';
import { cn, getAvatarUrl } from '@/lib/utils';
import { NotificationsDropdown } from '@/components/notifications/notifications-dropdown';



const NAV_LINKS = [
  { href: '/', label: 'الرئيسية' },
  { href: '/products', label: 'الفساتين' },
  { href: '/auctions', label: 'المزادات' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { data: unreadData } = useUnreadCount();
  const notificationStatus = useNotificationStatus();
  const { registerDevice, isLoading: isRegistering } = usePushNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const handleEnableNotifications = async () => {
    await registerDevice();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundImage: 'var(--gradient-warm)' }}
            >
              <span className="text-white font-bold text-lg font-cairo">ف</span>
            </div>
            <span className="text-xl font-bold text-[var(--primaryDark)] font-cairo hidden sm:inline">
              فساتين
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[var(--primary)]",
                  pathname === link.href
                    ? "text-[var(--primary)] border-b-2 border-[var(--primary)] pb-1"
                    : "text-[var(--text)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--textSecondary)]" />
              <Input
                type="search"
                placeholder="ابحثي عن فستان..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 bg-[var(--surfaceMuted)] border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5 text-[var(--text)]" />
            </Button>

            {isAuthenticated ? (
              <>
                {/* Notifications Dropdown */}
                <NotificationsDropdown />

                {/* Theme Settings */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" asChild aria-label="الثيمات">
                        <Link href="/theme-settings">
                          <Palette className="h-5 w-5 text-[var(--text)]" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">اختيار الثيم</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Favorites */}
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/favorites">
                    <Heart className="h-5 w-5 text-[var(--text)]" />
                  </Link>
                </Button>

                {/* Chat */}
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/chats">
                    <MessageCircle className="h-5 w-5 text-[var(--text)]" />
                  </Link>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9 border-2 border-[var(--primary)]">
                        <AvatarImage src={getAvatarUrl(user?.avatar_url, user?.full_name)} />
                        <AvatarFallback className="bg-[var(--primary)] text-white">
                          {user?.full_name?.charAt(0) || user?.username?.charAt(0) || 'م'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.full_name || user?.username}</p>
                      <p className="text-xs text-[var(--textSecondary)]">{user?.phone}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>ملفي الشخصي</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        <span>طلباتي</span>
                      </Link>
                    </DropdownMenuItem>
                    {(user?.account_type === 'seller' || user?.is_professional_seller) && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/seller/dashboard" className="flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            <span>لوحة البائعة</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/seller/products" className="flex items-center gap-2">
                            <Store className="h-4 w-4" />
                            <span>منتجاتي</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile/edit" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>الإعدادات</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="h-4 w-4 ml-2" />
                      <span>تسجيل الخروج</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">
                    <LogIn className="h-4 w-4 ml-2" />
                    دخول
                  </Link>
                </Button>
                <Button asChild className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-white">
                  <Link href="/auth/register">تسجيل</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5 text-[var(--text)]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-[var(--border)]">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[var(--primaryDark)] font-cairo">فساتين</span>
                      <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Mobile Search */}
                  <div className="p-4 border-b border-[var(--border)]">
                    <form onSubmit={handleSearch}>
                      <Input
                        type="search"
                        placeholder="ابحثي عن فستان..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[var(--surfaceMuted)]"
                      />
                    </form>
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                      {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "block px-4 py-2 rounded-lg transition-colors",
                              pathname === link.href
                                ? "bg-[var(--primary)] text-white"
                                : "hover:bg-[var(--surfaceMuted)] text-[var(--text)]"
                            )}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                      {/* Theme Settings in mobile menu */}
                      <li>
                        <Link
                          href="/theme-settings"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2 rounded-lg transition-colors hover:bg-[var(--surfaceMuted)] text-[var(--text)]"
                        >
                          <Palette className="h-4 w-4 inline ml-2" />
                          الثيمات
                        </Link>
                      </li>
                    </ul>
                  </nav>

                  {isAuthenticated && (
                    <div className="p-4 border-t border-[var(--border)]">
                      <Button
                        variant="outline"
                        className="w-full text-red-600 border-red-900"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 ml-2" />
                        تسجيل الخروج
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}