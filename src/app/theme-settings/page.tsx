// src/app/theme-settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Check,
  Sparkles,
  Moon,
  Sun,
  Palette,
  Eye,
  Heart,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/hooks/use-theme';
import { AVAILABLE_THEMES, ThemeId } from '@/config/themes';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
// ✨ Theme Preview Card - Premium Component
function ThemePreviewCard({
  id,
  theme,
  isSelected,
  isDark,
  onSelect
}: {
  id: ThemeId;
  theme: any;
  isSelected: boolean;
    isDark: boolean;  onSelect: (id: ThemeId) => void;
}) {
  const palette = isDark ? theme.dark : theme.light;
  // ✨ Elegant gradient based on theme primary
  const gradientStyle = {
    background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark || palette.primary} 50%, ${palette.primaryLight || palette.primary} 100%)`,
  };

  return (
    <button
      onClick={() => onSelect(id)}
      className="group relative w-full text-right"
    >
      <Card className={cn(
        'overflow-hidden border transition-all duration-300 cursor-pointer h-full',
        'bg-[var(--surface)] border-[var(--border)]',
        'hover:shadow-2xl hover:shadow-[var(--primary)]/15 hover:border-[var(--primary)]/40',
        isSelected && 'ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--background)] shadow-xl'
      )}>
        {/* ✨ Decorative Header with Gradient */}
        <div
          className="relative h-20 overflow-hidden"
          style={gradientStyle}
        >
          {/* Animated Sparkles */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-2 right-3 w-2 h-2 bg-white rounded-full animate-ping" />
            <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse" />
            <div className="absolute bottom-3 right-6 w-1 h-1 bg-white/60 rounded-full animate-bounce" />
          </div>

          {/* Theme Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 font-cairo text-xs"
            >
              {theme.tags?.[0] || 'عصري'}
            </Badge>
          </div>

          {/* Selection Indicator */}
          {isSelected && (
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg animate-bounce">
                <Check className="w-5 h-5" style={{ color: palette.primary }} />
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* ✨ Content Section */}
        <CardContent className="p-4 space-y-4">
          {/* Theme Name & Description */}
          <div className="space-y-1">
            <h3 className="font-bold text-[var(--text)] font-cairo text-lg group-hover:text-[var(--primary)] transition-colors">
              {theme.name}
            </h3>
            <p className="text-sm text-[var(--textSecondary)] font-cairo line-clamp-2">
              {theme.description || 'ثيم أنيق يناسب ذوقكِ الرفيع'}
            </p>
          </div>

          {/* ✨ Color Palette Preview */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--textTertiary)] font-cairo font-medium">لوحة الألوان</p>
            <div className="flex items-center gap-1.5">
              {[palette.primary, palette.success, palette.warning, palette.info].map((color, i) => (
                <span
                  key={i}
                  className="w-7 h-7 rounded-lg ring-2 ring-[var(--background)] shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: color }}
                  title={i === 0 ? 'أساسي' : i === 1 ? 'نجاح' : i === 2 ? 'تحذير' : 'معلومات'}
                />
              ))}
              <span
                className="w-7 h-7 rounded-lg ring-2 ring-[var(--background)] shadow-sm flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: palette.background,
                  color: palette.text,
                  border: `1px solid ${palette.border}`
                }}
              >
                A
              </span>
            </div>
          </div>

          {/* ✨ Features Tags */}
          {theme.features && theme.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {theme.features.slice(0, 3).map((feature: string, i: number) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-md text-xs font-cairo bg-[var(--surface-muted)] text-[var(--text-secondary)]"
                >
                  {feature}
                </span>
              ))}
              {theme.features.length > 3 && (
                <span className="px-2 py-1 rounded-md text-xs font-cairo text-[var(--text-tertiary)]">
                  +{theme.features.length - 3}
                </span>
              )}
            </div>
          )}

          {/* ✨ Action Hint */}
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/50">
            <span className="text-xs text-[var(--textTertiary)] font-cairo">
              {isSelected ? 'مُختار حالياً' : 'اضغطي للاختيار'}
            </span>
            <ChevronRight
              className={cn(
                "w-4 h-4 text-[var(--textTertiary)] transition-all duration-200",
                isSelected ? "text-[var(--primary)] scale-110" : "group-hover:translate-x-1"
              )}
            />
          </div>
        </CardContent>

        {/* ✨ Bottom Accent Line */}
        <div
          className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary)] 
            scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"
          style={{ background: `linear-gradient(90deg, ${palette.primaryDark}, ${palette.primary}, ${palette.primaryLight})` }}
        />
      </Card>
    </button>
  );
}


export default function ThemeSettingsPage() {
  const router = useRouter();

  const { currentThemeId, setCurrentThemeId, isDark, toggleTheme } = useTheme();
  const [selectedId, setSelectedId] = useState<ThemeId>(currentThemeId);

  const themeEntries = Object.entries(AVAILABLE_THEMES) as [ThemeId, typeof AVAILABLE_THEMES[ThemeId]][];
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSelect = (id: ThemeId) => {
    if (id !== selectedId) {
      setSelectedId(id);
      setCurrentThemeId(id);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">

      {/* ✨ Premium Header */}
      <header className="sticky top-0 z-20 bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-[var(--textSecondary)] hover:text-[var(--primary)] hover:bg-[var(--surface-muted)] font-cairo gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span className="hidden sm:inline">عودة</span>
            </Button>

            {/* Title with Icon */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] rounded-xl blur-lg opacity-30" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] flex items-center justify-center shadow-lg">
                  <Palette className="w-5 h-5 text-[var(--text-inverse)]" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--primary)] font-cairo">
                  ثيمات فساتيني
                </h1>
                <p className="text-xs text-[var(--textSecondary)] font-cairo">
                  اختاري اللمسة التي تعكس ذوقكِ
                </p>
              </div>
            </div>

            {/* Preview Toggle */}
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-[var(--textSecondary)]" />
              <Switch
                checked={isDark}
                onCheckedChange={toggleTheme}
                aria-label="تبديل الوضع المظلم"
              />
              <Moon className="h-4 w-4 text-[var(--textSecondary)]" />
            </div>
            
                      </div>
        </div>
      </header>

      {/* ✨ Success Toast Animation */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fadeInUp">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[var(--success)] text-[var(--text-inverse)] shadow-xl shadow-[var(--success)]/30 font-cairo">
            <Check className="w-5 h-5" />
            <span className="font-medium">تم تطبيق الثيم بنجاح! ✨</span>
          </div>
        </div>
      )}

      {/* ✨ Main Content */}
      <main className="container mx-auto px-4 py-8">

        {/* Intro Section */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-cairo text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{themeEntries.length} ثيم متاح</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] font-cairo mb-3">
            صمّمي تجربتكِ الخاصة
          </h2>
          <p className="text-[var(--textSecondary)] font-cairo leading-relaxed">
            كل ثيم مصمم بعناية ليناسب شخصيتكِ وأسلوبكِ.
            جرّبي المعاينة واختاري ما يعجبكِ!
          </p>
        </div>

        {/* ✨ Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {themeEntries.map(([id, theme], index) => (
            <div
              key={id}
              className="animate-fadeInUp"
              style={{
                animationDelay: `${Math.min(index * 60, 400)}ms`,
                opacity: 0
              }}
            >
              <ThemePreviewCard
                id={id}
                theme={theme}
                isSelected={selectedId === id}
                isDark={isDark}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>

        {/* ✨ Current Theme Info */}
        {selectedId && AVAILABLE_THEMES[selectedId] && (
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-[var(--primary)]/5 to-[var(--surface-muted)] border border-[var(--border)]/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${AVAILABLE_THEMES[selectedId][isDark ? 'dark' : 'light'].primary}, ${AVAILABLE_THEMES[selectedId][isDark ? 'dark' : 'light'].primaryDark})`
                  }}
                >
                  <Heart className="w-6 h-6 text-[var(--text-inverse)]" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--text)] font-cairo">
                    الثيم الحالي: {AVAILABLE_THEMES[selectedId].name}
                  </p>
                  <p className="text-sm text-[var(--textSecondary)] font-cairo">
                    {isDark ? 'معاينة الوضع الداكن' : 'معاينة الوضع الفاتح'}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] font-cairo gap-2"
              >
                <Eye className="w-4 h-4" />
                معاينة التطبيق
              </Button>
            </div>
          </div>
        )}

        {/* ✨ Tips Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Zap, title: 'سريع التحميل', desc: 'جميع الثيمات مُحسّنة للأداء' },
            { icon: Eye, title: 'معاينة فورية', desc: 'شاهدي التغيير قبل التطبيق' },
            { icon: Heart, title: 'قابل للتغيير', desc: 'عدّلي في أي وقت تريدين' },
          ].map((tip, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] font-cairo"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <tip.icon className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div className="text-right">
                <p className="font-medium text-[var(--text)] text-sm">{tip.title}</p>
                <p className="text-xs text-[var(--textSecondary)]">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* ✨ Floating Action Button (Mobile) */}
      <div className="fixed bottom-20 left-4 right-4 sm:hidden z-10">
        <Button
          className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:from-[var(--primaryDark)] hover:to-[var(--primary)] text-[var(--text-inverse)] shadow-xl shadow-[var(--primary)]/30 font-cairo py-3"
          onClick={() => router.back()}
        >
          <Check className="w-4 h-4 ml-2" />
          حفظ واختيار
        </Button>
      </div>

    </div>
  );
}