// // Privacy settings page

// 'use client';

// import { useState, useEffect } from 'react';
// import { Shield, Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
// import { LoadingSkeleton } from '@/components/shared';
// import api from '@/lib/api';
// import { useToast } from '@/hooks/use-toast';
// import { PrivacySettings } from '@/types';

// export default function PrivacySettingsPage() {
//  const { toast } = useToast();
//  const [settings, setSettings] = useState<PrivacySettings>({
//   show_phone: true,
//   show_city: true,
//   show_rating: true,
//   show_active_listings: true,
//  });
//  const [isLoading, setIsLoading] = useState(true);
//  const [isSaving, setIsSaving] = useState(false);

//  useEffect(() => {
//   fetchSettings();
//  }, []);

//  const fetchSettings = async () => {
//   try {
//    const data = await api.get<PrivacySettings>('/auth/privacy');
//    setSettings(data);
//   } catch (error) {
//    console.error('Failed to fetch privacy settings:', error);
//   } finally {
//    setIsLoading(false);
//   }
//  };

//  const handleToggle = (key: keyof PrivacySettings) => {
//   setSettings(prev => ({ ...prev, [key]: !prev[key] }));
//  };

//  const handleSave = async () => {
//   setIsSaving(true);
//   try {
//    await api.put('/auth/privacy', settings);
//    toast({
//     title: 'تم حفظ إعدادات الخصوصية',
//    });
//   } catch (error) {
//    toast({
//     title: 'حدث خطأ أثناء الحفظ',
//     variant: 'destructive',
//    });
//   } finally {
//    setIsSaving(false);
//   }
//  };

//  if (isLoading) {
//   return (
//    <div className="min-h-screen flex flex-col bg-[var(--background)]">
//     <Navbar />
//     <main className="flex-1 container mx-auto px-4 py-6">
//      <LoadingSkeleton type="card" count={2} />
//     </main>
//     <Footer />
//     <MobileBottomNav />
//    </div>
//   );
//  }

//  return (
//   <div className="min-h-screen flex flex-col bg-[var(--background)]">
//    <Navbar />

//    <main className="flex-1 py-6">
//     <div className="container mx-auto px-4 max-w-2xl">
//      {/* Header */}
//      <div className="flex items-center gap-3 mb-6">
//       <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
//        <Shield className="h-5 w-5 text-[var(--textInverse)]" />
//       </div>
//       <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">إعدادات الخصوصية</h1>
//      </div>

//      <div className="space-y-4">
//       {/* Profile Visibility */}
//       <Card className="border border-[var(--border)] bg-[var(--surface)]">
//        <CardHeader>
//         <CardTitle className="text-lg text-[var(--primary)]">ظهور الملف الشخصي</CardTitle>
//         <CardDescription className="text-[var(--textSecondary)]">
//          تحكمي في المعلومات التي تظهر للآخرين في ملفك الشخصي
//         </CardDescription>
//        </CardHeader>
//        <CardContent className="space-y-6">
//         <div className="flex items-center justify-between">
//          <div>
//           <Label htmlFor="show_phone" className="text-[var(--text)]">إظهار رقم الهاتف</Label>
//           <p className="text-sm text-[var(--textSecondary)]">
//            يظهر رقم هاتفك للمستخدمين الآخرين
//           </p>
//          </div>
//          <Switch
//           id="show_phone"
//           checked={settings.show_phone}
//           onCheckedChange={() => handleToggle('show_phone')}
//          />
//         </div>

//         <div className="flex items-center justify-between">
//          <div>
//           <Label htmlFor="show_city" className="text-[var(--text)]">إظهار المدينة</Label>
//           <p className="text-sm text-[var(--textSecondary)]">
//            يظهر موقع مدينتك في ملفك الشخصي
//           </p>
//          </div>
//          <Switch
//           id="show_city"
//           checked={settings.show_city}
//           onCheckedChange={() => handleToggle('show_city')}
//          />
//         </div>

//         <div className="flex items-center justify-between">
//          <div>
//           <Label htmlFor="show_rating" className="text-[var(--text)]">إظهار التقييم</Label>
//           <p className="text-sm text-[var(--textSecondary)]">
//            يظهر تقييمك وعدد التقييمات للآخرين
//           </p>
//          </div>
//          <Switch
//           id="show_rating"
//           checked={settings.show_rating}
//           onCheckedChange={() => handleToggle('show_rating')}
//          />
//         </div>

//         <div className="flex items-center justify-between">
//          <div>
//           <Label htmlFor="show_active_listings" className="text-[var(--text)]">إظهار المنتجات النشطة</Label>
//           <p className="text-sm text-[var(--textSecondary)]">
//            يظهر عدد منتجاتك النشطة في ملفك الشخصي
//           </p>
//          </div>
//          <Switch
//           id="show_active_listings"
//           checked={settings.show_active_listings}
//           onCheckedChange={() => handleToggle('show_active_listings')}
//          />
//         </div>
//        </CardContent>
//       </Card>

//       {/* Info */}
//       <div className="bg-[var(--primaryLight)]/20 rounded-lg p-4">
//        <p className="text-sm text-[var(--textSecondary)]">
//         ملاحظة: بعض المعلومات مثل التقييمات قد تكون مرئية للأشخاص الذين قمتِ بالتعامل معهم
//        </p>
//       </div>

//       {/* Save Button */}
//       <Button
//        onClick={handleSave}
//        className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
//        disabled={isSaving}
//       >
//        {isSaving ? (
//         <>
//          <Loader2 className="h-4 w-4 ml-2 animate-spin" />
//          جاري الحفظ...
//         </>
//        ) : (
//         'حفظ الإعدادات'
//        )}
//       </Button>
//      </div>
//     </div>
//    </main>

//    <Footer />
//    <MobileBottomNav />
//   </div>
//  );
// }





// src/app/settings/privacy/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
 Shield,
 ShieldCheck,
 ShieldAlert,
 Lock,
 Eye,
 Users,
 Globe,
 Loader2,
 CheckCircle2,
 Info,
 Sparkles,
 Fingerprint,
 KeyRound,
 UserCheck,
 ChevronDown,
 ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from '@/components/ui/tooltip';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton } from '@/components/shared';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { PrivacySettings } from '@/types';

// ✨ Privacy Level Configuration
const PRIVACY_LEVELS = {
 public: {
  id: 'public',
  label: 'عام',
  icon: Globe,
  color: 'var(--info)',
  bg: 'var(--info)/10',
  description: 'يمكن للجميع رؤية هذه المعلومات',
  value: true,
 },
 members: {
  id: 'members',
  label: 'للمستخدمين فقط',
  icon: Users,
  color: 'var(--warning)',
  bg: 'var(--warning)/10',
  description: 'فقط الأعضاء المسجلون يمكنهم الرؤية',
  value: true,
 },
 private: {
  id: 'private',
  label: 'خاص',
  icon: Lock,
  color: 'var(--primary)',
  bg: 'var(--primary)/10',
  description: 'أنتِ فقط من يمكنه رؤية هذه المعلومات',
  value: false,
 },
} as const;

type PrivacyLevelKey = keyof typeof PRIVACY_LEVELS;

// ✨ Privacy Settings Configuration
const PRIVACY_SETTINGS_CONFIG: Array<{
 key: keyof PrivacySettings;
 title: string;
 description: string;
 info?: string;
 icon: React.ElementType;
 defaultLevel: PrivacyLevelKey;
}> = [
  {
   key: 'show_phone',
   title: 'إظهار رقم الهاتف',
   description: 'التحكم في من يمكنه رؤية رقم هاتفك',
   info: 'حتى عند الإخفاء، يمكن للمستخدمين الموثوقين مراسلتكِ عبر التطبيق',
   icon: Lock,
   defaultLevel: 'private',
  },
  {
   key: 'show_city',
   title: 'إظهار المدينة',
   description: 'التحكم في ظهور موقع مدينتك للآخرين',
   info: 'مهم لتسهيل عمليات الاستلام والتوصيل',
   icon: Globe,
   defaultLevel: 'members',
  },
  {
   key: 'show_rating',
   title: 'إظهار التقييم',
   description: 'التحكم في ظهور تقييمك وعدد المراجعات',
   info: 'التقييمات تساعد في بناء الثقة بين المستخدمات',
   icon: ShieldCheck,
   defaultLevel: 'public',
  },
  {
   key: 'show_active_listings',
   title: 'إظهار المنتجات النشطة',
   description: 'التحكم في ظهور عدد منتجاتك المعروضة',
   info: 'يساعد المشترين على معرفة نشاطك في المتجر',
   icon: Eye,
   defaultLevel: 'public',
  },

 ];

// ✨ Interactive Privacy Card with Expandable Options
function PrivacySettingCard({
 setting,
 currentValue,
 onChange,
 isSaving,
 index
}: {
 setting: typeof PRIVACY_SETTINGS_CONFIG[0];
 currentValue: boolean;
 onChange: (key: keyof PrivacySettings, level: PrivacyLevelKey) => void;
 isSaving: boolean;
 index: number;
}) {
 const [isOpen, setIsOpen] = useState(false);

 const currentLevel: PrivacyLevelKey = useMemo(() => {
  if (!currentValue) return 'private';
  return setting.defaultLevel;
 }, [currentValue, setting.defaultLevel]);

 const currentLevelConfig = PRIVACY_LEVELS[currentLevel];
 const Icon = setting.icon;

 return (
  <div className="space-y-2 animate-fadeInUp" style={{ animationDelay: `${100 + index * 60}ms` }}>
   {/* Main Card */}
   <button
    onClick={() => !isSaving && setIsOpen(!isOpen)}
    disabled={isSaving}
    className={`
          w-full text-right p-4 rounded-2xl
          border-2 transition-all duration-300 font-cairo
          ${isOpen
      ? 'border-[var(--primary)] bg-[var(--primary)]/5 shadow-lg shadow-[var(--primary)]/10'
      : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40 hover:shadow-xl hover:shadow-[var(--primary)]/5'
     }
          ${isSaving ? 'opacity-60 cursor-wait' : 'cursor-pointer'}
          group
        `}
   >
    <div className="flex items-start justify-between gap-4">
     {/* Icon + Content */}
     <div className="flex items-start gap-3 flex-1">
      <div className={`
              relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0
              transition-all duration-300
              ${isOpen ? 'bg-[var(--primary)]/20 scale-110' : 'bg-[var(--surface-muted)]'}
            `}>
       <Icon className={`
                w-5.5 h-5.5 transition-colors duration-300
                ${isOpen ? 'text-[var(--primary)]' : 'text-[var(--text-tertiary)]'}
              `} />
       <span className={`
                absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--surface)]
                transition-all duration-300
                ${currentValue ? 'bg-[var(--success)] animate-pulse' : 'bg-[var(--text-tertiary)]'}
              `} />
      </div>

      <div className="flex-1 min-w-0">
       <div className="flex items-center gap-2 mb-1">
        <span className="font-medium text-[var(--text)] text-sm">
         {setting.title}
        </span>
        <Badge
         variant="secondary"
         className={`
                    text-xs gap-1 px-2 py-0.5 transition-colors duration-300
                    ${currentValue
           ? 'bg-[var(--success)]/10 text-[var(--success)]'
           : 'bg-[var(--text-tertiary)]/10 text-[var(--text-tertiary)]'
          }
                  `}
        >
         {currentValue ? 'مفعّل' : 'معطّل'}
        </Badge>
       </div>
       <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">
        {setting.description}
       </p>
      </div>
     </div>

     {/* Expand Arrow */}
     <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            bg-[var(--surface-muted)] transition-transform duration-300
            ${isOpen ? 'rotate-180' : ''}
          `}>
      <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
     </div>
    </div>

    {/* Current Level */}
    <div className="mt-3 pt-3 border-t border-[var(--border-light)] flex items-center gap-2">
     <currentLevelConfig.icon className="w-4 h-4 shrink-0" style={{ color: currentLevelConfig.color }} />
     <span className="text-xs text-[var(--text-tertiary)]">
      المستوى الحالي: <span className="text-[var(--text)] font-medium">{currentLevelConfig.label}</span>
     </span>
    </div>
   </button>

   {/* Expanded Options */}
   <div className={`
        overflow-hidden transition-all duration-300 ease-out font-cairo
        ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
      `}>
    <div className="
          p-4 rounded-xl bg-[var(--surface-elevated)] 
          border border-[var(--border-light)] 
          space-y-2 animate-fadeInUp
        ">
     <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-medium text-[var(--text-secondary)]">
       اختاري مستوى الخصوصية:
      </span>
      <Badge variant="outline" className="text-xs border-[var(--border)]">
       {setting.title}
      </Badge>
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {(Object.entries(PRIVACY_LEVELS) as [PrivacyLevelKey, typeof PRIVACY_LEVELS[PrivacyLevelKey]][]).map(([levelKey, levelConfig]) => {
       const LevelIcon = levelConfig.icon;
       const isSelected = currentLevel === levelKey;

       return (
        <button
         key={levelKey}
         onClick={(e) => {
          e.stopPropagation();
          onChange(setting.key, levelKey);
         }}
         disabled={isSaving}
         className={`
                    relative p-3 rounded-xl border-2 text-right
                    transition-all duration-200 disabled:opacity-50
                    ${isSelected
           ? 'border-[var(--primary)] bg-[var(--primary)]/10 shadow-md'
           : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40'
          }
                  `}
        >
         {isSelected && (
          <CheckCircle2 className="absolute top-2 left-2 w-4 h-4 text-[var(--primary)]" />
         )}
         <div className="flex flex-col items-start gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: levelConfig.bg }}>
           <LevelIcon className="w-4.5 h-4.5" style={{ color: levelConfig.color }} />
          </div>
          <div>
           <p className={`text-xs font-medium ${isSelected ? 'text-[var(--primary)]' : 'text-[var(--text)]'}`}>
            {levelConfig.label}
           </p>
           <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5 line-clamp-2">
            {levelConfig.description}
           </p>
          </div>
         </div>
        </button>
       );
      })}
     </div>

     {setting.info && (
      <TooltipProvider>
       <Tooltip>
        <TooltipTrigger asChild>
         <button className="flex items-center gap-1.5 text-[10px] text-[var(--text-tertiary)] hover:text-[var(--primary)] transition-colors mt-2">
          <Info className="w-3 h-3" />
          <span>معلومة إضافية</span>
         </button>
        </TooltipTrigger>
        <TooltipContent className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)] text-xs font-cairo max-w-xs">
         <p>{setting.info}</p>
        </TooltipContent>
       </Tooltip>
      </TooltipProvider>
     )}
    </div>
   </div>
  </div>
 );
}

// ✨ Fixed Privacy Score Bar (Top of list)
function PrivacyScoreBar({ settings }: { settings: PrivacySettings }) {
 const score = useMemo(() => {
  const values = Object.values(settings);
  const privateCount = values.filter(v => !v).length;
  return Math.round((privateCount / values.length) * 100);
 }, [settings]);

 const getScoreLabel = (s: number) => {
  if (s >= 75) return { label: 'ممتاز', color: 'var(--success)', icon: ShieldCheck };
  if (s >= 50) return { label: 'جيد', color: 'var(--warning)', icon: Shield };
  return { label: 'يمكن التحسين', color: 'var(--info)', icon: ShieldAlert };
 };

 const { label, color, icon: ScoreIcon } = getScoreLabel(score);

 return (
  <div className="
      p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]
      flex items-center justify-between gap-4
    ">
   <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
     <ScoreIcon className="w-5 h-5" style={{ color }} />
    </div>
    <div>
     <p className="text-sm font-medium text-[var(--text)] font-cairo">مؤشر الخصوصية</p>
     <p className="text-xs text-[var(--text-secondary)] font-cairo">مستوى حماية حسابك</p>
    </div>
   </div>

   <div className="text-left">
    <div className="text-2xl font-bold text-[var(--primary)] font-cairo">{score}%</div>
    <Badge className="font-cairo gap-1 text-xs" style={{ backgroundColor: `${color}20`, color }}>
     <Sparkles className="w-3 h-3" />
     {label}
    </Badge>
   </div>
  </div>
 );
}

// ✨ Fixed Action Buttons (Bottom of list area)
function ActionButtons({
 hasChanges,
 isSaving,
 originalSettings,
 settings,
 setSettings,
 onSave
}: {
 hasChanges: boolean;
 isSaving: boolean;
 originalSettings: PrivacySettings | null;
 settings: PrivacySettings;
 setSettings: (s: PrivacySettings) => void;
 onSave: () => void;
}) {
 return (
  <div className="space-y-3">
   <div className="flex flex-col sm:flex-row gap-3">
    <Button
     variant="outline"
     onClick={() => {
      if (originalSettings) setSettings(originalSettings);
     }}
     disabled={!hasChanges || isSaving}
     className="flex-1 border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-muted)] font-cairo gap-2 disabled:opacity-50"
    >
     إلغاء التغييرات
    </Button>
    <Button
     onClick={onSave}
     disabled={!hasChanges || isSaving}
     className="flex-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-[var(--text-inverse)] shadow-lg shadow-[var(--primary)]/25 hover:shadow-xl font-cairo gap-2 transition-all duration-300 disabled:opacity-50"
    >
     {isSaving ? (
      <><Loader2 className="w-4 h-4 animate-spin" /> جاري الحفظ...</>
     ) : (
      <><ShieldCheck className="w-4 h-4" /> حفظ الإعدادات</>
     )}
    </Button>
   </div>
   {hasChanges && !isSaving && (
    <p className="text-center text-xs text-[var(--warning)] font-cairo animate-pulse">
     ️ لديكِ تغييرات غير محفوظة
    </p>
   )}
  </div>
 );
}

// ✨ FIXED Side Panel - Decorative (Doesn't scroll)
function PrivacySidePanel({ privacyScore }: { privacyScore: number }) {
 return (
  <div className="hidden lg:flex flex-col sticky top-24 h-[calc(100vh-8rem)]">
   <Card className="
        border border-[var(--border)] bg-[var(--surface-elevated)]
        overflow-hidden relative h-full flex flex-col
      ">
    {/* Animated Background */}
    <div className="absolute inset-0 opacity-30 pointer-events-none">
     <div className="absolute top-1/4 -right-10 w-32 h-32 bg-[var(--primary)]/20 rounded-full blur-3xl animate-pulse-glow" />
     <div className="absolute bottom-1/4 -left-10 w-24 h-24 bg-[var(--primary-dark)]/15 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
    </div>

    <CardContent className="p-6 relative z-10 flex flex-col items-center justify-center h-full text-center flex-1">

     {/* Floating Shield */}
     <div className="relative mb-6 animate-float">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-3xl blur-xl opacity-40 animate-pulse" />
      <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center shadow-2xl shadow-[var(--primary)]/40">
       <ShieldCheck className="w-12 h-12 text-[var(--text-inverse)]" />
      </div>
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
       <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--primary-light)] border-2 border-[var(--surface)]" />
      </div>
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
       <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[var(--success)] border-2 border-[var(--surface)]" />
      </div>
     </div>

     {/* Score Display */}
     <div className="mb-6">
      <p className="text-sm text-[var(--text-tertiary)] font-cairo mb-2">مستوى حماية حسابك</p>
      <div className="text-4xl font-bold text-[var(--primary)] font-cairo mb-1">{privacyScore}%</div>
      <Badge
       className="font-cairo gap-1.5"
       style={{
        backgroundColor: privacyScore >= 75 ? 'var(--success)/10' : privacyScore >= 50 ? 'var(--warning)/10' : 'var(--info)/10',
        color: privacyScore >= 75 ? 'var(--success)' : privacyScore >= 50 ? 'var(--warning)' : 'var(--info)'
       }}
      >
       <Sparkles className="w-3.5 h-3.5" />
       {privacyScore >= 75 ? 'ممتاز' : privacyScore >= 50 ? 'جيد' : 'يمكن التحسين'}
      </Badge>
     </div>

     {/* Progress Bar */}
     <div className="w-full mb-6">
      <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
       <div
        className="h-full rounded-full transition-all duration-500 bg-gradient-to-l from-[var(--primary)] to-[var(--primary-light)]"
        style={{ width: `${privacyScore}%` }}
       />
      </div>
     </div>

     {/* Feature Badges */}
     <div className="space-y-3 w-full max-w-xs">
      {[
       { icon: Fingerprint, label: 'تشفير كامل' },
       { icon: KeyRound, label: 'تحكم كامل' },
       { icon: Lock, label: 'خصوصية تامة' },
      ].map((item, index) => (
       <div
        key={item.label}
        className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface)]/60 border border-[var(--border-light)] animate-fadeInUp"
        style={{ animationDelay: `${200 + index * 100}ms` }}
       >
        <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
         <item.icon className="w-4.5 h-4.5 text-[var(--primary)]" />
        </div>
        <span className="text-sm text-[var(--text-secondary)] font-cairo">{item.label}</span>
       </div>
      ))}
     </div>

     {/* Bottom Line */}
     <div className="mt-6 w-full">
      <div className="h-1 rounded-full bg-gradient-to-l from-[var(--primary)] via-[var(--primary-light)] to-transparent" />
     </div>
    </CardContent>
   </Card>
  </div>
 );
}

export default function PrivacySettingsPage() {
 const { toast } = useToast();
 const [settings, setSettings] = useState<PrivacySettings>({
  show_phone: true,
  show_city: true,
  show_rating: true,
  show_active_listings: true,
  show_online_status: true,
  show_profile_visits: true,
 } as PrivacySettings);
 const [isLoading, setIsLoading] = useState(true);
 const [isSaving, setIsSaving] = useState(false);
 const [hasChanges, setHasChanges] = useState(false);
 const [originalSettings, setOriginalSettings] = useState<PrivacySettings | null>(null);

 useEffect(() => {
  fetchSettings();
 }, []);

 useEffect(() => {
  if (originalSettings) {
   setHasChanges(JSON.stringify(settings) !== JSON.stringify(originalSettings));
  }
 }, [settings, originalSettings]);

 const fetchSettings = async () => {
  try {
   const data = await api.get<PrivacySettings>('/auth/privacy');
   setSettings(data);
   setOriginalSettings(data);
  } catch (error) {
   console.error('Failed to fetch privacy settings:', error);
   toast({
    title: 'تنبيه',
    description: 'تم تحميل الإعدادات الافتراضية',
    variant: 'default',
   });
  } finally {
   setIsLoading(false);
  }
 };

 const handlePrivacyLevelChange = (key: keyof PrivacySettings, level: PrivacyLevelKey) => {
  const levelConfig = PRIVACY_LEVELS[level];
  setSettings(prev => ({ ...prev, [key]: levelConfig.value }));
 };

 const handleSave = async () => {
  setIsSaving(true);
  try {
   await api.put('/auth/privacy', settings);
   setOriginalSettings(settings);
   toast({
    title: 'تم الحفظ بنجاح ',
    description: 'تم تحديث إعدادات الخصوصية',
   });
  } catch (error) {
   toast({
    title: 'حدث خطأ',
    description: 'لم نتمكن من حفظ التغييرات. حاولي مرة أخرى',
    variant: 'destructive',
   });
  } finally {
   setIsSaving(false);
  }
 };

 const privacyScore = useMemo(() => {
  const values = Object.values(settings);
  const privateCount = values.filter(v => !v).length;
  return Math.round((privateCount / values.length) * 100);
 }, [settings]);

 if (isLoading) {
  return (
   <div className="min-h-screen flex flex-col bg-[var(--background)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-6">
     <LoadingSkeleton type="card" count={3} />
    </main>
    <Footer />
    <MobileBottomNav />
   </div>
  );
 }

 return (
  <div className="min-h-screen flex flex-col bg-[var(--background)]">
   <Navbar />

   {/* 🔹 Fixed Layout Area - Page doesn't scroll */}
   <main className="flex-1 py-6">
    <div className="container mx-auto px-4 max-w-6xl">

     {/* Header */}
     <header className="mb-6 flex items-center gap-4">
      <div className="relative">
       <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl blur-lg opacity-40 animate-pulse" />
       <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center shadow-xl shadow-[var(--primary)]/30">
        <Shield className="h-7 w-7 text-[var(--text-inverse)]" />
       </div>
      </div>
      <div>
       <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo tracking-tight">
        إعدادات الخصوصية
       </h1>
       <p className="text-sm text-[var(--text-secondary)] font-cairo mt-0.5">
        تحكمي في من يرى معلوماتكِ الشخصية
       </p>
      </div>
     </header>

     {/* 🔹 Two Column Layout: Scrollable List (Right) + Fixed Panel (Left) */}
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

      {/* RIGHT COLUMN: Scrollable Settings List */}
      <div className="lg:col-span-2 space-y-4 animate-fadeInUp" style={{ animationDelay: '0ms' }}>

       {/* Score Bar (Fixed at top of scroll area) */}
       <PrivacyScoreBar settings={settings} />

       {/* 🔹 SCROLLABLE AREA - Only this scrolls! */}
       <div className="max-h-[calc(100vh-20rem)] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-[var(--border)] scrollbar-track-transparent">

        {/* Settings Cards */}
        {PRIVACY_SETTINGS_CONFIG.map((setting, index) => (
         <PrivacySettingCard
          key={setting.key}
          setting={setting}
          currentValue={settings[setting.key]}
          onChange={handlePrivacyLevelChange}
          isSaving={isSaving}
          index={index}
         />
        ))}

        {/* Security Notice */}
        <Card className="border border-[var(--primary)]/30 bg-[var(--primary)]/5">
         <CardContent className="p-4">
          <div className="flex items-start gap-3">
           <ShieldAlert className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
           <div>
            <p className="text-sm font-medium text-[var(--text)] font-cairo">
             حماية بياناتكِ أولويتنا
            </p>
            <p className="text-xs text-[var(--text-secondary)] font-cairo mt-1 leading-relaxed">
             جميع إعدادات الخصوصية تُحفظ بشكل مشفر على خوادمنا الآمنة.
            </p>
           </div>
          </div>
         </CardContent>
        </Card>
       </div>

       {/* Action Buttons (Below scroll area) */}
       <ActionButtons
        hasChanges={hasChanges}
        isSaving={isSaving}
        originalSettings={originalSettings}
        settings={settings}
        setSettings={setSettings}
        onSave={handleSave}
       />
      </div>

      {/* LEFT COLUMN: Fixed Side Panel */}
      <div className="lg:col-span-1">
       <PrivacySidePanel privacyScore={privacyScore} />
      </div>

     </div>
    </div>
   </main>

   {/* Footer only shows when scrolling past the list */}
   <Footer />
   <MobileBottomNav />
  </div>
 );
}