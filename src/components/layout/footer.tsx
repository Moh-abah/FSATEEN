// Footer component - متوافق مع الثيم الديناميكي وصلاحيات المستخدم

'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';
import {
  Instagram,
  Twitter,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const FOOTER_LINKS = {
  discover: [
    { href: '/products', label: 'تصفح الفساتين' },
    { href: '/auctions', label: 'المزادات' },
    { href: '/products?condition=new', label: 'فساتين جديدة' },
    { href: '/products?condition=like_new', label: 'فساتين مستعملة' },
  ],
  account: [
    { href: '/auth/login', label: 'تسجيل الدخول' },
    { href: '/auth/register', label: 'إنشاء حساب' },
    { href: '/favorites', label: 'المفضلة' },
    { href: '/orders', label: 'طلباتي' },
  ],
  // روابط البائع (تُصفى حسب الصلاحية)
  seller: [
    { href: '/seller/dashboard', label: 'لوحة البائعة' },
    { href: '/seller/products/new', label: 'إضافة منتج' },
    { href: '/seller/auctions/new', label: 'إنشاء مزاد' },
    { href: '/seller/upgrade', label: 'ترقية الحساب' },
    { href: '/seller/store-settings', label: 'إعدادات المتجر' },
  ],
  support: [
    { href: '/static/about', label: 'من نحن' },
    { href: '/static/terms', label: 'الشروط والأحكام' },
    { href: '/static/privacy', label: 'سياسة الخصوصية' },
    { href: '/static/contact', label: 'تواصلي معنا' },
  ],
};

const SOCIAL_LINKS = [
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://wa.me/966500000000', icon: MessageCircle, label: 'WhatsApp' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { user, isAuthenticated } = useAuthStore();

  const isProfessionalSeller = user?.is_professional_seller || false;
  const isVerifiedSeller = user?.is_verified || false;

  // هل نعرض أي روابط بائع؟
  const showSellerLinks = isAuthenticated && (isProfessionalSeller || isVerifiedSeller);

  // عنوان القسم وروابطه حسب نوع المستخدم
  let sellerSectionTitle = '';
  let sellerLinksToShow: typeof FOOTER_LINKS.seller = [];

  if (isProfessionalSeller) {
    // تاجر محترف
    sellerSectionTitle = 'لوحة تحكم التاجر';
    sellerLinksToShow = FOOTER_LINKS.seller.filter(
      link => link.href !== '/seller/upgrade' // إخفاء الترقية
    );
  } else if (isVerifiedSeller) {
    // بائع موثّق فقط (غير محترف)
    sellerSectionTitle = 'لوحة تحكم البائع';
    sellerLinksToShow = FOOTER_LINKS.seller.filter(
      link =>
        link.href === '/seller/products/new' ||
        link.href === '/seller/auctions/new' ||
        link.href === '/seller/upgrade'
    );
  }

  return (
    <footer className="bg-[var(--surface)] dark:bg-[var(--surface)] border-t border-[var(--border)] mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundImage: 'var(--gradient-warm)' }}
              >
                <span className="text-white font-bold text-lg font-cairo">ف</span>
              </div>
              <span className="text-xl font-bold text-[var(--primary)] font-cairo">
                فساتين
              </span>
            </Link>
            <p className="text-[var(--textSecondary)] text-sm mb-4">
              منصة متكاملة لبيع وشراء الفساتين المستعملة والجديدة في المملكة العربية السعودية
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[var(--surfaceMuted)] flex items-center justify-center hover:bg-[var(--primary)] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-[var(--text)] hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Discover Links */}
          <div>
            <h4 className="font-bold text-[var(--primary)] mb-4 font-cairo">اكتشفي</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.discover.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--textSecondary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="font-bold text-[var(--primary)] mb-4 font-cairo">حسابك</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--textSecondary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Seller Links - تظهر فقط للبائعين الموثقين أو التجار */}
          {showSellerLinks && (
            <div>
              <h4 className="font-bold text-[var(--primary)] mb-4 font-cairo">
                {sellerSectionTitle}
              </h4>
              <ul className="space-y-2">
                {sellerLinksToShow.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--textSecondary)] hover:text-[var(--primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-[var(--primary)] mb-4 font-cairo">الدعم</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--textSecondary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-[var(--border)]">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--textSecondary)]">
            <a
              href="mailto:support@fusateen.sa"
              className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors"
            >
              <Mail className="h-4 w-4" />
              support@fusateen.sa
            </a>
            <a
              href="tel:+966500000000"
              className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors"
            >
              <Phone className="h-4 w-4" />
              966-50-000-0000
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              الرياض، المملكة العربية السعودية
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--textSecondary)]">
            <p>© {currentYear} فساتين. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-4">
              <Link
                href="/static/terms"
                className="hover:text-[var(--primary)] transition-colors"
              >
                الشروط والأحكام
              </Link>
              <Link
                href="/static/privacy"
                className="hover:text-[var(--primary)] transition-colors"
              >
                سياسة الخصوصية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}