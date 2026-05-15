// src/config/themes.ts
// ==========================================
// نظام ثيمات فساتين - منصة الويب
// ==========================================

export interface ThemePalette {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
  warm50: string;
  warm100: string;
  warm200: string;
  warm300: string;
  warm400: string;
  warm500: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  surfaceElevated: string;
  border: string;
  borderLight: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;
  tabBar: string;
  tabBarBorder: string;
  tabActive: string;
  tabInactive: string;
  gradients: {
    primary: readonly [string, string, string];
    warm: readonly [string, string];
    rose: readonly [string, string];
    auction: readonly [string, string];
  };
  chatBubbleSent: string;
  chatBubbleReceived: string;
  chatBubbleTextSent: string;
  chatBubbleTextReceived: string;
  overlay: string;
  overlayLight: string;
  cardBackground: string;
  cardBorder: string;
  cardShadow: string;
  inputBackground: string;
  inputBorder: string;
  inputFocusBorder: string;
  inputText: string;
  inputPlaceholder: string;
  headerBackground: string;
  headerBorder: string;
  switchActive: string;
  switchInactive: string;
  switchThumb: string;
  switchTrack: string;
  warningDark?: string;
  errorDark?: string;
  successDark?: string;
  infoDark?: string;


  /**
  * متغيرات CSS الخاصة بمكتبة shadcn/ui.
  * يتم تطبيقها على :root عند تغيير الثيم لتوحيد ألوان المكونات الجاهزة.
  * جميع القيم يجب أن تكون بصيغة OKLCH أو HSL أو HEX (يفضل OKLCH لمطابقة globals.css).
  */
  shadcn?: {
    background: string;           // --background
    foreground: string;           // --foreground
    card: string;                 // --card
    cardForeground: string;       // --card-foreground
    popover: string;              // --popover
    popoverForeground: string;    // --popover-foreground
    primary: string;              // --primary
    primaryForeground: string;    // --primary-foreground
    secondary: string;            // --secondary
    secondaryForeground: string;  // --secondary-foreground
    muted: string;                // --muted
    mutedForeground: string;      // --muted-foreground
    accent: string;               // --accent
    accentForeground: string;     // --accent-foreground
    destructive: string;          // --destructive
    destructiveForeground: string; // --destructive-foreground
    border: string;               // --border
    input: string;                // --input
    ring: string;                 // --ring
    radius?: string;              // --radius (اختياري، مثلاً "0.625rem")
    // متغيرات إضافية قد تستخدمها بعض المكونات
    chart1?: string;              // --chart-1
    chart2?: string;              // --chart-2
    chart3?: string;              // --chart-3
    chart4?: string;              // --chart-4
    chart5?: string;              // --chart-5
    sidebar?: string;             // --sidebar
    sidebarForeground?: string;   // --sidebar-foreground
    sidebarPrimary?: string;      // --sidebar-primary
    sidebarPrimaryForeground?: string; // --sidebar-primary-foreground
    sidebarAccent?: string;       // --sidebar-accent
    sidebarAccentForeground?: string; // --sidebar-accent-foreground
    sidebarBorder?: string;       // --sidebar-border
    sidebarRing?: string;         // --sidebar-ring
  };
}

// ==========================================
// تعريفات الثيمات (33 ثيم)
// ==========================================

export const themeRose = {
  light: {
    // 🔴 Primary Rose - Fashion Brand Color
    primary: "oklch(0.637 0.237 14.548)",
    primaryLight: "oklch(0.928 0.042 14.548)",
    primaryDark: "oklch(0.473 0.191 14.548)",

    // 🎨 Primary Scale (50-900)
    primary50: "oklch(0.973 0.014 14.548)",
    primary100: "oklch(0.928 0.042 14.548)",
    primary200: "oklch(0.865 0.078 14.548)",
    primary300: "oklch(0.782 0.124 14.548)",
    primary400: "oklch(0.707 0.185 14.548)",
    primary500: "oklch(0.637 0.237 14.548)",
    primary600: "oklch(0.577 0.245 14.548)",
    primary700: "oklch(0.514 0.223 14.548)",
    primary800: "oklch(0.473 0.191 14.548)",
    primary900: "oklch(0.391 0.152 14.548)",

    // 🧡 Warm Accents
    warm50: "oklch(0.985 0.008 73.684)",
    warm100: "oklch(0.962 0.022 73.684)",
    warm200: "oklch(0.924 0.048 73.684)",
    warm300: "oklch(0.875 0.089 73.684)",
    warm400: "oklch(0.816 0.134 73.684)",
    warm500: "oklch(0.742 0.183 73.684)",

    // 🖼️ Base Surfaces
    background: "oklch(1 0 0)",
    surface: "oklch(0.985 0.002 247.839)",
    surfaceMuted: "oklch(0.929 0.013 255.508)", // ✅ تعديل: أغمق من 0.968
    surfaceElevated: "oklch(1 0 0)",

    // 📐 Borders & Dividers
    border: "oklch(0.873 0.018 255.508)",       // ✅ تعديل: أغمق من 0.929
    borderLight: "oklch(0.929 0.013 255.508)",  // ✅ تعديل: أغمق من 0.968

    // ✍️ Text Colors
    text: "oklch(0.21 0.034 264.665)",
    textSecondary: "oklch(0.373 0.034 264.665)", // ✅ تعديل: أغمق من 0.554
    textTertiary: "oklch(0.445 0.04 256.788)",   // ✅ تعديل: أغمق من 0.704
    textInverse: "oklch(1 0 0)",

    // ✅ Status Colors
    success: "oklch(0.723 0.145 149.45)",
    successLight: "oklch(0.89 0.058 149.45)",    // ✅ تعديل: أقل بهرجة
    warning: "oklch(0.769 0.188 70.08)",
    warningLight: "oklch(0.92 0.05 70.08)",      // ✅ تعديل: أقل بهرجة
    error: "oklch(0.637 0.237 25.331)",
    errorLight: "oklch(0.89 0.06 25.331)",       // ✅ تعديل: أقل بهرجة
    info: "oklch(0.623 0.214 259.815)",
    infoLight: "oklch(0.88 0.04 259.815)",       // ✅ تعديل: أقل بهرجة

    // 📱 Navigation & Tabs
    tabBar: "oklch(1 0 0)",
    tabBarBorder: "oklch(0.929 0.013 255.508)",
    tabActive: "oklch(0.637 0.237 14.548)",
    tabInactive: "oklch(0.704 0.04 256.788)",

    // 🌈 Gradients
    gradients: {
      primary: ["oklch(0.707 0.185 14.548)", "oklch(0.637 0.237 14.548)", "oklch(0.473 0.191 14.548)"] as const,
      warm: ["oklch(0.875 0.089 73.684)", "oklch(0.742 0.183 73.684)"] as const,
      rose: ["oklch(0.865 0.078 14.548)", "oklch(0.473 0.191 14.548)"] as const,
      auction: ["oklch(0.514 0.223 14.548)", "oklch(0.391 0.152 14.548)"] as const,
    },

    // 💬 Chat Bubbles
    chatBubbleSent: "oklch(0.637 0.237 14.548)",
    chatBubbleReceived: "oklch(0.929 0.013 255.508)", // ✅ تعديل: أغمق من 0.968
    chatBubbleTextSent: "oklch(1 0 0)",
    chatBubbleTextReceived: "oklch(0.21 0.034 264.665)",

    // 🎭 Overlays
    overlay: "oklch(0 0 0 / 0.5)",
    overlayLight: "oklch(0 0 0 / 0.1)",

    // 🃏 Cards & Inputs
    cardBackground: "oklch(1 0 0)",
    cardBorder: "oklch(0.968 0.007 247.839)",
    cardShadow: "oklch(0 0 0 / 0.08)",
    inputBackground: "oklch(1 0 0)",               // ✅ تعديل: أبيض ناصع
    inputBorder: "oklch(0.873 0.018 255.508)",     // ✅ تعديل: أغمق
    inputFocusBorder: "oklch(0.637 0.237 14.548)",
    inputText: "oklch(0.21 0.034 264.665)",
    inputPlaceholder: "oklch(0.554 0.046 257.417)", // ✅ تعديل: أغمق من 0.704
    headerBackground: "oklch(1 0 0)",
    headerBorder: "oklch(0.929 0.013 255.508)",

    // 🔘 Switch/Toggle
    switchActive: "oklch(0.637 0.237 14.548)",
    switchInactive: "oklch(0.873 0.018 255.508)",   // ✅ تعديل: أغمق
    switchThumb: "oklch(1 0 0)",
    switchTrack: "oklch(0.929 0.013 255.508)",

    // ✅ shadcn/ui Variables - كاملة بعد التعديل
    shadcn: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.21 0.034 264.665)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.21 0.034 264.665)",
      popover: "oklch(1 0 0)",
      popoverForeground: "oklch(0.21 0.034 264.665)",
      primary: "oklch(0.637 0.237 14.548)",
      primaryForeground: "oklch(1 0 0)",
      secondary: "oklch(0.929 0.013 255.508)",          // ✅ أغمق
      secondaryForeground: "oklch(0.21 0.034 264.665)", // ✅ نص داكن
      muted: "oklch(0.968 0.007 247.839)",
      mutedForeground: "oklch(0.373 0.034 264.665)",    // ✅ أغمق
      accent: "oklch(0.865 0.078 14.548)",              // ✅ أغمق قليلاً
      accentForeground: "oklch(0.21 0.034 264.665)",
      destructive: "oklch(0.637 0.237 25.331)",
      destructiveForeground: "oklch(1 0 0)",
      border: "oklch(0.873 0.018 255.508)",             // ✅ أغمق
      input: "oklch(0.873 0.018 255.508)",              // ✅ أغمق
      ring: "oklch(0.637 0.237 14.548)",
      radius: "0.625rem",
      chart1: "oklch(0.637 0.237 14.548)",
      chart2: "oklch(0.742 0.183 73.684)",
      chart3: "oklch(0.623 0.214 259.815)",
      chart4: "oklch(0.723 0.145 149.45)",
      chart5: "oklch(0.704 0.04 256.788)",
      sidebar: "oklch(0.985 0.002 247.839)",
      sidebarForeground: "oklch(0.21 0.034 264.665)",
      sidebarPrimary: "oklch(0.637 0.237 14.548)",
      sidebarPrimaryForeground: "oklch(1 0 0)",
      sidebarAccent: "oklch(0.928 0.042 14.548)",
      sidebarAccentForeground: "oklch(0.21 0.034 264.665)",
      sidebarBorder: "oklch(0.929 0.013 255.508)",
      sidebarRing: "oklch(0.637 0.237 14.548)",
    },
  } as ThemePalette,

  dark: {
    // 🔴 Primary Rose - Dark Mode (LIGHTER for contrast on dark bg)
    primary: "oklch(0.707 0.185 14.548)", // #FB7185 - Rose 400
    primaryLight: "oklch(0.865 0.078 14.548)", // #FECDD3 - Rose 200
    primaryDark: "oklch(0.514 0.223 14.548)", // #BE123C - Rose 700

    // 🎨 Primary Scale (Dark Mode - Inverted Logic)
    primary50: "oklch(0.21 0.034 14.548)", // Darkest for backgrounds
    primary100: "oklch(0.28 0.058 14.548)",
    primary200: "oklch(0.391 0.152 14.548)",
    primary300: "oklch(0.473 0.191 14.548)",
    primary400: "oklch(0.577 0.245 14.548)",
    primary500: "oklch(0.637 0.237 14.548)",
    primary600: "oklch(0.707 0.185 14.548)", // Main primary in dark
    primary700: "oklch(0.782 0.124 14.548)",
    primary800: "oklch(0.865 0.078 14.548)",
    primary900: "oklch(0.928 0.042 14.548)",

    // 🧡 Warm Accents - Dark Mode
    warm50: "oklch(0.21 0.034 73.684)",
    warm100: "oklch(0.28 0.058 73.684)",
    warm200: "oklch(0.391 0.089 73.684)",
    warm300: "oklch(0.514 0.134 73.684)",
    warm400: "oklch(0.642 0.183 73.684)",
    warm500: "oklch(0.742 0.183 73.684)",

    // 🖼️ Base Surfaces - Dark
    background: "oklch(0.21 0.034 264.665)", // #0F172A - Slate 900
    surface: "oklch(0.279 0.041 260.031)", // #1E293B - Slate 800
    surfaceMuted: "oklch(0.391 0.046 257.417)", // #334155 - Slate 700
    surfaceElevated: "oklch(0.279 0.041 260.031)", // Cards

    // 📐 Borders & Dividers - Dark
    border: "oklch(0.391 0.046 257.417)", // #334155
    borderLight: "oklch(0.314 0.041 260.031)", // #283548

    // ✍️ Text Colors - Dark Mode (LIGHTER for contrast)
    text: "oklch(0.968 0.007 247.839)", // #F1F5F9 - Slate 100
    textSecondary: "oklch(0.704 0.04 256.788)", // #94A3B8 - Slate 400
    textTertiary: "oklch(0.554 0.046 257.417)", // #64748B - Slate 500
    textInverse: "oklch(0.21 0.034 264.665)", // #0F172A - On primary

    // ✅ Status Colors - Dark Mode
    success: "oklch(0.793 0.124 149.45)", // #34D399
    successLight: "oklch(0.21 0.034 149.45)",
    warning: "oklch(0.828 0.188 70.08)", // #FBBF24
    warningLight: "oklch(0.21 0.034 70.08)",
    error: "oklch(0.739 0.214 25.331)", // #F87171
    errorLight: "oklch(0.21 0.034 25.331)",
    info: "oklch(0.707 0.185 259.815)", // #60A5FA
    infoLight: "oklch(0.21 0.034 259.815)",

    // 📱 Navigation & Tabs - Dark
    tabBar: "oklch(0.279 0.041 260.031)",
    tabBarBorder: "oklch(0.391 0.046 257.417)",
    tabActive: "oklch(0.707 0.185 14.548)",
    tabInactive: "oklch(0.554 0.046 257.417)",

    // 🌈 Gradients - Dark Mode
    gradients: {
      primary: [
        "oklch(0.577 0.245 14.548)", // primary500
        "oklch(0.707 0.185 14.548)", // primary600 (main)
        "oklch(0.782 0.124 14.548)", // primary700
      ] as const,
      warm: [
        "oklch(0.514 0.134 73.684)", // warm300
        "oklch(0.742 0.183 73.684)", // warm500
      ] as const,
      rose: [
        "oklch(0.391 0.152 14.548)", // primary200 dark
        "oklch(0.707 0.185 14.548)", // primary600
      ] as const,
      auction: [
        "oklch(0.473 0.191 14.548)", // primary300 dark
        "oklch(0.28 0.058 14.548)", // primary100 dark
      ] as const,
    },

    // 💬 Chat Bubbles - Dark
    chatBubbleSent: "oklch(0.707 0.185 14.548)",
    chatBubbleReceived: "oklch(0.391 0.046 257.417)",
    chatBubbleTextSent: "oklch(0.21 0.034 264.665)",
    chatBubbleTextReceived: "oklch(0.968 0.007 247.839)",

    // 🎭 Overlays - Dark
    overlay: "oklch(0 0 0 / 0.7)",
    overlayLight: "oklch(0 0 0 / 0.3)",

    // 🃏 Cards & Inputs - Dark
    cardBackground: "oklch(0.279 0.041 260.031)",
    cardBorder: "oklch(0.391 0.046 257.417)",
    cardShadow: "oklch(0 0 0 / 0.4)",
    inputBackground: "oklch(0.314 0.041 260.031)",
    inputBorder: "oklch(0.391 0.046 257.417)",
    inputFocusBorder: "oklch(0.707 0.185 14.548)",
    inputText: "oklch(0.968 0.007 247.839)",
    inputPlaceholder: "oklch(0.554 0.046 257.417)",
    headerBackground: "oklch(0.21 0.034 264.665)",
    headerBorder: "oklch(0.279 0.041 260.031)",

    // 🔘 Switch/Toggle - Dark
    switchActive: "oklch(0.707 0.185 14.548)",
    switchInactive: "oklch(0.391 0.046 257.417)",
    switchThumb: "oklch(0.968 0.007 247.839)",
    switchTrack: "oklch(0.314 0.041 260.031)",

    // ✅ shadcn/ui Variables - Dark Mode (OKLCH)
    shadcn: {
      background: "oklch(0.21 0.034 264.665)",
      foreground: "oklch(0.968 0.007 247.839)",
      card: "oklch(0.279 0.041 260.031)",
      cardForeground: "oklch(0.968 0.007 247.839)",
      popover: "oklch(0.279 0.041 260.031)",
      popoverForeground: "oklch(0.968 0.007 247.839)",
      primary: "oklch(0.707 0.185 14.548)",
      primaryForeground: "oklch(0.21 0.034 264.665)",
      secondary: "oklch(0.391 0.046 257.417)",
      secondaryForeground: "oklch(0.968 0.007 247.839)",
      muted: "oklch(0.391 0.046 257.417)",
      mutedForeground: "oklch(0.704 0.04 256.788)",
      accent: "oklch(0.391 0.152 14.548)",
      accentForeground: "oklch(0.968 0.007 247.839)",
      destructive: "oklch(0.739 0.214 25.331)",
      destructiveForeground: "oklch(0.21 0.034 264.665)",
      border: "oklch(0.391 0.046 257.417)",
      input: "oklch(0.314 0.041 260.031)",
      ring: "oklch(0.707 0.185 14.548)",
      radius: "0.625rem",
      chart1: "oklch(0.707 0.185 14.548)",
      chart2: "oklch(0.742 0.183 73.684)",
      chart3: "oklch(0.707 0.185 259.815)",
      chart4: "oklch(0.793 0.124 149.45)",
      chart5: "oklch(0.554 0.046 257.417)",
      sidebar: "oklch(0.279 0.041 260.031)",
      sidebarForeground: "oklch(0.968 0.007 247.839)",
      sidebarPrimary: "oklch(0.707 0.185 14.548)",
      sidebarPrimaryForeground: "oklch(0.21 0.034 264.665)",
      sidebarAccent: "oklch(0.391 0.152 14.548)",
      sidebarAccentForeground: "oklch(0.968 0.007 247.839)",
      sidebarBorder: "oklch(0.391 0.046 257.417)",
      sidebarRing: "oklch(0.707 0.185 14.548)",
    },
  },
} as const;

// ==========================================
// 2. الثيم الملكي (Royal Gold)
// ==========================================
const themeRoyalGold = {
  light: {
    primary: '#B45309',
    primaryLight: '#FEF3C7',
    primaryDark: '#78350F',
    primary50: '#FFFBEB',
    primary100: '#FEF3C7',
    primary200: '#FDE68A',
    primary300: '#FCD34D',
    primary400: '#FBBF24',
    primary500: '#B45309',
    primary600: '#78350F',
    primary700: '#451A03',
    primary800: '#451A03',
    primary900: '#451A03',
    warm50: '#FFFBF0',
    warm100: '#FFF5EB',
    warm200: '#FFE8D1',
    warm300: '#FFD6A5',
    warm400: '#FFC078',
    warm500: '#F59E0B',
    background: '#FFFBF0',
    surface: '#FEF3C7',
    surfaceMuted: '#FDE68A',      // يبقى مناسباً
    surfaceElevated: '#FFFFFF',
    border: '#D97706',            // ✅ تعديل: أغمق بكثير
    borderLight: '#FEF3C7',
    text: '#451A03',
    textSecondary: '#78350F',
    textTertiary: '#92400E',
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',      // ✅ تعديل: أقل بهرجة
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    tabBar: '#FFFBF0',
    tabBarBorder: '#FCD34D',
    tabActive: '#B45309',
    tabInactive: '#92400E',
    gradients: {
      primary: ['#FBBF24', '#D97706', '#B45309'] as const,
      warm: ['#FDE68A', '#F59E0B'] as const,
      rose: ['#FCD34D', '#B45309'] as const,
      auction: ['#D97706', '#78350F'] as const,
    },
    shadcn: {
      background: "#FFFBF0",
      foreground: "#451A03",
      card: "#FFFFFF",
      cardForeground: "#451A03",
      popover: "#FFFFFF",
      popoverForeground: "#451A03",
      primary: "#B45309",
      primaryForeground: "#FFFFFF",
      secondary: "#FDE68A",            // ✅ أغمق قليلاً
      secondaryForeground: "#451A03",  // ✅ نص داكن
      muted: "#FDE68A",
      mutedForeground: "#78350F",
      accent: "#FEF3C7",
      accentForeground: "#451A03",     // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#D97706",               // ✅ أغمق
      input: "#D97706",                // ✅ أغمق
      ring: "#B45309",
      radius: "0.625rem",
    },
    chatBubbleSent: '#D97706',
    chatBubbleReceived: '#FEF3C7',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#451A03',
    overlay: 'rgba(69, 26, 3, 0.5)',
    overlayLight: 'rgba(251, 191, 36, 0.1)',
    cardBackground: '#FFFFFF',
    cardBorder: '#FDE68A',
    cardShadow: 'rgba(180, 83, 9, 0.1)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع
    inputBorder: '#D97706',           // ✅ أغمق
    inputFocusBorder: '#B45309',
    inputText: '#451A03',
    inputPlaceholder: '#92400E',
    headerBackground: '#FFFBF0',
    headerBorder: '#FCD34D',
    switchActive: '#B45309',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#FCD34D',
  } as ThemePalette,
  dark: {

    primary: '#FBBF24',
    primaryLight: '#451A03',
    primaryDark: '#F59E0B',
    primary50: '#451A03',
    primary100: '#78350F',
    primary200: '#92400E',
    primary300: '#B45309',
    primary400: '#D97706',
    primary500: '#FBBF24',
    primary600: '#F59E0B',
    primary700: '#D97706',
    primary800: '#B45309',
    primary900: '#78350F',
    warm50: '#422006',
    warm100: '#451A03',
    warm200: '#78350F',
    warm300: '#92400E',
    warm400: '#B45309',
    warm500: '#FBBF24',
    background: '#171717',
    surface: '#262626',
    surfaceMuted: '#404040',
    surfaceElevated: '#262626',
    border: '#525252',
    borderLight: '#262626',
    text: '#FEF9C3',
    textSecondary: '#D4D4D4',
    textTertiary: '#A3A3A3',
    textInverse: '#171717',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    errorLight: '#450A0A',
    info: '#60A5FA',
    infoLight: '#172554',
    tabBar: '#262626',
    tabBarBorder: '#404040',
    tabActive: '#FBBF24',
    tabInactive: '#A3A3A3',
    gradients: {
      primary: ['#FBBF24', '#D97706', '#B45309'] as const,
      warm: ['#FDE68A', '#F59E0B'] as const,
      rose: ['#FCD34D', '#B45309'] as const,
      auction: ['#D97706', '#78350F'] as const,
    },
    shadcn: {
  background: "#171717",
  foreground: "#FEF9C3",
  card: "#262626",
  cardForeground: "#FEF9C3",
  popover: "#262626",
  popoverForeground: "#FEF9C3",
  primary: "#FBBF24",
  primaryForeground: "#171717",
  secondary: "#451A03",
  secondaryForeground: "#171717",
  muted: "#404040",
  mutedForeground: "#D4D4D4",
  accent: "#451A03",
  accentForeground: "#171717",
  destructive: "#F87171",
  destructiveForeground: "#171717",
  border: "#525252",
  input: "#404040",
  ring: "#FBBF24",
  radius: "0.625rem"
},
    chatBubbleSent: '#D97706',
    chatBubbleReceived: '#404040',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#FEF9C3',
    overlay: 'rgba(0, 0, 0, 0.8)',
    overlayLight: 'rgba(251, 191, 36, 0.2)',
    cardBackground: '#262626',
    cardBorder: '#404040',
    cardShadow: 'rgba(0, 0, 0, 0.4)',
    inputBackground: '#262626',
    inputBorder: '#404040',
    inputFocusBorder: '#FBBF24',
    inputText: '#FEF9C3',
    inputPlaceholder: '#737373',
    headerBackground: '#171717',
    headerBorder: '#262626',
    switchActive: '#FBBF24',
    switchInactive: '#525252',
    switchThumb: '#FEF9C3',
    switchTrack: '#404040',
  
} as ThemePalette
};

// ==========================================
// 5. الثيم السماوي (Ocean)
// ==========================================
const themeOcean = {
  light: {
    primary: '#0284C7',
    primaryLight: '#E0F2FE',
    primaryDark: '#0369A1',
    primary50: '#F0F9FF',
    primary100: '#E0F2FE',
    primary200: '#BAE6FD',
    primary300: '#7DD3FC',
    primary400: '#38BDF8',
    primary500: '#0284C7',
    primary600: '#0369A1',
    primary700: '#075985',
    primary800: '#0C4A6E',
    primary900: '#0C4A6E',
    warm50: '#F0FDF4',
    warm100: '#CCFBF1',
    warm200: '#99F6E4',
    warm300: '#5EEAD4',
    warm400: '#2DD4BF',
    warm500: '#38BDF8',
    background: '#F0F9FF',
    surface: '#E0F2FE',
    surfaceMuted: '#BAE6FD',
    surfaceElevated: '#FFFFFF',
    border: '#0369A1',            // ✅ أزرق غامق بدلاً من #7DD3FC
    borderLight: '#E0F2FE',
    text: '#0C4A6E',
    textSecondary: '#075985',
    textTertiary: '#0284C7',
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',      // ✅ أقل بهرجة
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    tabBar: '#F0F9FF',
    tabBarBorder: '#7DD3FC',
    tabActive: '#0284C7',
    tabInactive: '#075985',
    gradients: {
      primary: ['#38BDF8', '#0284C7', '#0C4A6E'] as const,
      warm: ['#7DD3FC', '#0EA5E9'] as const,
      rose: ['#BAE6FD', '#0284C7'] as const,
      auction: ['#0284C7', '#075985'] as const,
    },
    shadcn: {
      background: "#F0F9FF",
      foreground: "#0C4A6E",
      card: "#FFFFFF",
      cardForeground: "#0C4A6E",
      popover: "#FFFFFF",
      popoverForeground: "#0C4A6E",
      primary: "#0284C7",
      primaryForeground: "#FFFFFF",
      secondary: "#BAE6FD",              // ✅ أغمق قليلاً
      secondaryForeground: "#0C4A6E",    // ✅ نص داكن
      muted: "#BAE6FD",
      mutedForeground: "#075985",
      accent: "#E0F2FE",
      accentForeground: "#0C4A6E",       // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#0369A1",                 // ✅ أغمق
      input: "#0369A1",                  // ✅ أغمق
      ring: "#0284C7",
      radius: "0.625rem",
    },
    chatBubbleSent: '#0284C7',
    chatBubbleReceived: '#E0F2FE',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#0C4A6E',
    overlay: 'rgba(12, 74, 110, 0.4)',
    overlayLight: 'rgba(12, 74, 110, 0.1)',
    cardBackground: '#FFFFFF',
    cardBorder: '#BAE6FD',
    cardShadow: 'rgba(2, 132, 199, 0.08)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع
    inputBorder: '#0369A1',           // ✅ أغمق
    inputFocusBorder: '#0284C7',
    inputText: '#0C4A6E',
    inputPlaceholder: '#0284C7',      // ✅ أغمق قليلاً
    headerBackground: '#F0F9FF',
    headerBorder: '#E0F2FE',
    switchActive: '#0284C7',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#7DD3FC',
  } as ThemePalette,
  dark: {

    primary: '#38BDF8',
    primaryLight: '#082F49',
    primaryDark: '#0EA5E9',
    primary50: '#082F49',
    primary100: '#0C4A6E',
    primary200: '#075985',
    primary300: '#0369A1',
    primary400: '#0284C7',
    primary500: '#38BDF8',
    primary600: '#7DD3FC',
    primary700: '#BAE6FD',
    primary800: '#E0F2FE',
    primary900: '#F0F9FF',
    warm50: '#082F49',
    warm100: '#0C4A6E',
    warm200: '#075985',
    warm300: '#0369A1',
    warm400: '#0284C7',
    warm500: '#38BDF8',
    background: '#082F49',
    surface: '#0C4A6E',
    surfaceMuted: '#075985',
    surfaceElevated: '#0C4A6E',
    border: '#0284C7',
    borderLight: '#0C4A6E',
    text: '#F0F9FF',
    textSecondary: '#BAE6FD',
    textTertiary: '#7DD3FC',
    textInverse: '#082F49',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    errorLight: '#450A0A',
    info: '#60A5FA',
    infoLight: '#172554',
    tabBar: '#0C4A6E',
    tabBarBorder: '#075985',
    tabActive: '#38BDF8',
    tabInactive: '#7DD3FC',
    gradients: {
      primary: ['#38BDF8', '#0284C7', '#0C4A6E'] as const,
      warm: ['#7DD3FC', '#0EA5E9'] as const,
      rose: ['#BAE6FD', '#0284C7'] as const,
      auction: ['#0284C7', '#075985'] as const,
    },
    shadcn: {
  background: "#082F49",
  foreground: "#F0F9FF",
  card: "#0C4A6E",
  cardForeground: "#F0F9FF",
  popover: "#0C4A6E",
  popoverForeground: "#F0F9FF",
  primary: "#38BDF8",
  primaryForeground: "#082F49",
  secondary: "#082F49",
  secondaryForeground: "#082F49",
  muted: "#075985",
  mutedForeground: "#BAE6FD",
  accent: "#082F49",
  accentForeground: "#082F49",
  destructive: "#F87171",
  destructiveForeground: "#082F49",
  border: "#0284C7",
  input: "#075985",
  ring: "#38BDF8",
  radius: "0.625rem"
},
    chatBubbleSent: '#0284C7',
    chatBubbleReceived: '#0C4A6E',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#F0F9FF',
    overlay: 'rgba(8, 47, 73, 0.8)',
    overlayLight: 'rgba(56, 189, 248, 0.1)',
    cardBackground: '#0C4A6E',
    cardBorder: '#075985',
    cardShadow: 'rgba(0, 0, 0, 0.3)',
    inputBackground: '#0C4A6E',
    inputBorder: '#075985',
    inputFocusBorder: '#38BDF8',
    inputText: '#F0F9FF',
    inputPlaceholder: '#7DD3FC',
    headerBackground: '#082F49',
    headerBorder: '#0C4A6E',
    switchActive: '#38BDF8',
    switchInactive: '#0284C7',
    switchThumb: '#FFFFFF',
    switchTrack: '#075985',
  
} as ThemePalette
};


































// ==========================================
// 10. الثيم الأسود المودرن (Onyx)
// ==========================================
const themeOnyx = {
  light: {
    primary: '#262626',
    primaryLight: '#E5E5E5',
    primaryDark: '#171717',
    primary50: '#FAFAFA',
    primary100: '#F5F5F5',
    primary200: '#E5E5E5',
    primary300: '#D4D4D4',
    primary400: '#A3A3A3',
    primary500: '#262626',
    primary600: '#171717',
    primary700: '#171717',
    primary800: '#171717',
    primary900: '#171717',
    warm50: '#FCFCFC',
    warm100: '#FAFAFA',
    warm200: '#F5F5F5',
    warm300: '#E5E5E5',
    warm400: '#D4D4D4',
    warm500: '#525252',
    background: '#FFFFFF',
    surface: '#FAFAFA',
    surfaceMuted: '#D4D4D4',        // ✅ أغمق من E5E5E5
    surfaceElevated: '#FFFFFF',
    border: '#A3A3A3',              // ✅ أغمق (رمادي أوضح)
    borderLight: '#E5E5E5',
    text: '#171717',
    textSecondary: '#404040',       // ✅ أغمق من #525252
    textTertiary: '#525252',        // ✅ أغمق من #737373
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',        // ✅ أقل بهرجة
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E5E5E5',
    tabActive: '#171717',
    tabInactive: '#525252',
    gradients: {
      primary: ['#737373', '#404040', '#171717'] as const,
      warm: ['#A3A3A3', '#525252'] as const,
      rose: ['#D4D4D4', '#171717'] as const,
      auction: ['#404040', '#171717'] as const,
    },
    shadcn: {
      background: "#FFFFFF",
      foreground: "#171717",
      card: "#FFFFFF",
      cardForeground: "#171717",
      popover: "#FFFFFF",
      popoverForeground: "#171717",
      primary: "#262626",
      primaryForeground: "#FFFFFF",
      secondary: "#D4D4D4",           // ✅ أغمق من E5E5E5
      secondaryForeground: "#171717", // ✅ نص داكن بدلاً من أبيض
      muted: "#E5E5E5",
      mutedForeground: "#404040",     // ✅ أغمق من 525252
      accent: "#D4D4D4",              // ✅ أغمق
      accentForeground: "#171717",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#A3A3A3",              // ✅ أغمق
      input: "#A3A3A3",               // ✅ أغمق
      ring: "#262626",
      radius: "0.625rem",
    },
    chatBubbleSent: '#262626',
    chatBubbleReceived: '#E5E5E5',    // ✅ أغمق قليلاً من F5F5F5
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#171717',
    overlay: 'rgba(23, 23, 23, 0.5)',
    overlayLight: 'rgba(23, 23, 23, 0.1)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E5E5',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان FAFAFA)
    inputBorder: '#A3A3A3',           // ✅ أغمق (كان E5E5E5)
    inputFocusBorder: '#262626',
    inputText: '#171717',
    inputPlaceholder: '#737373',      // ✅ أغمق قليلاً
    headerBackground: '#FFFFFF',
    headerBorder: '#F5F5F5',
    switchActive: '#262626',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#E5E5E5',
  } as ThemePalette,


  dark: {

    primary: '#E5E5E5',
    primaryLight: '#525252',
    primaryDark: '#A3A3A3',
    primary50: '#171717',
    primary100: '#262626',
    primary200: '#404040',
    primary300: '#525252',
    primary400: '#737373',
    primary500: '#E5E5E5',
    primary600: '#F5F5F5',
    primary700: '#FAFAFA',
    primary800: '#FCFCFC',
    primary900: '#FFFFFF',
    warm50: '#000000',
    warm100: '#171717',
    warm200: '#262626',
    warm300: '#404040',
    warm400: '#525252',
    warm500: '#737373',
    background: '#000000',
    surface: '#171717',
    surfaceMuted: '#262626',
    surfaceElevated: '#171717',
    border: '#404040',
    borderLight: '#171717',
    text: '#FAFAFA',
    textSecondary: '#A3A3A3',
    textTertiary: '#737373',
    textInverse: '#000000',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    errorLight: '#450A0A',
    info: '#60A5FA',
    infoLight: '#172554',
    tabBar: '#171717',
    tabBarBorder: '#262626',
    tabActive: '#E5E5E5',
    tabInactive: '#737373',
    gradients: {
      primary: ['#A3A3A3', '#525252', '#262626'] as const,
      warm: ['#737373', '#404040'] as const,
      rose: ['#525252', '#262626'] as const,
      auction: ['#404040', '#262626'] as const,
    },
    shadcn: {
  background: "#000000",
  foreground: "#FAFAFA",
  card: "#171717",
  cardForeground: "#FAFAFA",
  popover: "#171717",
  popoverForeground: "#FAFAFA",
  primary: "#E5E5E5",
  primaryForeground: "#000000",
  secondary: "#525252",
  secondaryForeground: "#000000",
  muted: "#262626",
  mutedForeground: "#A3A3A3",
  accent: "#525252",
  accentForeground: "#000000",
  destructive: "#F87171",
  destructiveForeground: "#000000",
  border: "#404040",
  input: "#262626",
  ring: "#E5E5E5",
  radius: "0.625rem"
},
    chatBubbleSent: '#525252',
    chatBubbleReceived: '#262626',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#FAFAFA',
    overlay: 'rgba(0, 0, 0, 0.8)',
    overlayLight: 'rgba(255, 255, 255, 0.1)',
    cardBackground: '#171717',
    cardBorder: '#262626',
    cardShadow: 'rgba(0, 0, 0, 0.5)',
    inputBackground: '#171717',
    inputBorder: '#262626',
    inputFocusBorder: '#E5E5E5',
    inputText: '#FAFAFA',
    inputPlaceholder: '#737373',
    headerBackground: '#000000',
    headerBorder: '#171717',
    switchActive: '#E5E5E5',
    switchInactive: '#404040',
    switchThumb: '#FAFAFA',
    switchTrack: '#262626',
  
} as ThemePalette
};
















// ==========================================
// 11. ياقوت منتصف الليل والفضة (Sapphire)
// ==========================================
const themeSapphire = {
  light: {
    primary: '#0F172A',
    primaryLight: '#E5E4E2',
    primaryDark: '#B0C4DE',
    primary50: '#F8FAFC',
    primary100: '#F1F5F9',
    primary200: '#E2E8F0',
    primary300: '#CBD5E1',
    primary400: '#94A3B8',
    primary500: '#E5E4E2',
    primary600: '#64748B',
    primary700: '#475569',
    primary800: '#334155',
    primary900: '#1E293B',
    warm50: '#F8FAFC',
    warm100: '#F1F5F9',
    warm200: '#E2E8F0',
    warm300: '#CBD5E1',
    warm400: '#94A3B8',
    warm500: '#64748B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceMuted: '#E2E8F0',          // ✅ أغمق من F1F5F9
    surfaceElevated: '#FFFFFF',
    border: '#94A3B8',                // ✅ أغمق من E2E8F0
    borderLight: '#F1F5F9',
    text: '#0F172A',
    textSecondary: '#1E293B',         // ✅ أغمق من 475569
    textTertiary: '#475569',          // ✅ أغمق من 94A3B8
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E2E8F0',
    tabActive: '#0F172A',
    tabInactive: '#64748B',
    gradients: {
      primary: ['#FFFFFF', '#E5E4E2', '#B0C4DE'] as const,
      warm: ['#F1F5F9', '#E5E4E2'] as const,
      rose: ['#F8FAFC', '#E5E4E2'] as const,
      auction: ['#E5E4E2', '#B0C4DE'] as const,
    },
    shadcn: {
      background: "#F8FAFC",
      foreground: "#0F172A",
      card: "#FFFFFF",
      cardForeground: "#0F172A",
      popover: "#FFFFFF",
      popoverForeground: "#0F172A",
      primary: "#0F172A",
      primaryForeground: "#FFFFFF",
      secondary: "#E2E8F0",           // ✅ أغمق من E5E4E2
      secondaryForeground: "#0F172A", // ✅ نص داكن
      muted: "#F1F5F9",
      mutedForeground: "#1E293B",     // ✅ أغمق من 475569
      accent: "#E2E8F0",              // ✅ أغمق
      accentForeground: "#0F172A",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#94A3B8",              // ✅ أغمق من E2E8F0
      input: "#94A3B8",               // ✅ أغمق
      ring: "#0F172A",
      radius: "0.625rem",
    },
    chatBubbleSent: '#0F172A',
    chatBubbleReceived: '#E2E8F0',    // ✅ أغمق من F1F5F9
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#0F172A',
    overlay: 'rgba(15, 23, 42, 0.4)',
    overlayLight: 'rgba(15, 23, 42, 0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E2E8F0',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان F8FAFC)
    inputBorder: '#94A3B8',           // ✅ أغمق (كان E2E8F0)
    inputFocusBorder: '#0F172A',
    inputText: '#0F172A',
    inputPlaceholder: '#64748B',      // ✅ أغمق
    headerBackground: '#FFFFFF',
    headerBorder: '#F1F5F9',
    switchActive: '#0F172A',
    switchInactive: '#CBD5E1',
    switchThumb: '#FFFFFF',
    switchTrack: '#E2E8F0',
  } as ThemePalette,
  dark: {

    primary: '#E5E4E2',
    primaryLight: '#FFFFFF',
    primaryDark: '#B0C4DE',
    primary50: '#0F172A',
    primary100: '#1E293B',
    primary200: '#334155',
    primary300: '#475569',
    primary400: '#64748B',
    primary500: '#E5E4E2',
    primary600: '#ADB5BD',
    primary700: '#6C757D',
    primary800: '#495057',
    primary900: '#343A40',
    warm50: '#0F172A',
    warm100: '#1E293B',
    warm200: '#334155',
    warm300: '#475569',
    warm400: '#64748B',
    warm500: '#94A3B8',
    background: '#0B1120',
    surface: '#0F172A',
    surfaceMuted: '#1E293B',
    surfaceElevated: '#1E293B',
    border: '#334155',
    borderLight: '#1E293B',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textTertiary: '#64748B',
    textInverse: '#0F172A',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    errorLight: '#450A0A',
    info: '#60A5FA',
    infoLight: '#172554',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#0F172A',
    tabBarBorder: '#1E293B',
    tabActive: '#E5E4E2',
    tabInactive: '#64748B',
    gradients: {
      primary: ['#FFFFFF', '#E5E4E2', '#B0C4DE'] as const,
      warm: ['#F1F3F5', '#E5E4E2'] as const,
      rose: ['#F8F9FA', '#E5E4E2'] as const,
      auction: ['#E5E4E2', '#B0C4DE'] as const,
    },
    shadcn: {
  background: "#0B1120",
  foreground: "#F8FAFC",
  card: "#0F172A",
  cardForeground: "#F8FAFC",
  popover: "#0F172A",
  popoverForeground: "#F8FAFC",
  primary: "#E5E4E2",
  primaryForeground: "#0F172A",
  secondary: "#FFFFFF",
  secondaryForeground: "#0F172A",
  muted: "#1E293B",
  mutedForeground: "#CBD5E1",
  accent: "#FFFFFF",
  accentForeground: "#0F172A",
  destructive: "#F87171",
  destructiveForeground: "#0F172A",
  border: "#334155",
  input: "#1E293B",
  ring: "#E5E4E2",
  radius: "0.625rem"
},
    chatBubbleSent: '#E5E4E2',
    chatBubbleReceived: '#1E293B',
    chatBubbleTextSent: '#0F172A',
    chatBubbleTextReceived: '#F8FAFC',
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(255, 255, 255, 0.05)',
    cardBackground: '#0F172A',
    cardBorder: '#1E293B',
    cardShadow: 'rgba(0, 0, 0, 0.4)',
    inputBackground: '#0F172A',
    inputBorder: '#1E293B',
    inputFocusBorder: '#E5E4E2',
    inputText: '#F8FAFC',
    inputPlaceholder: '#64748B',
    headerBackground: '#0B1120',
    headerBorder: '#0F172A',
    switchActive: '#E5E4E2',
    switchInactive: '#334155',
    switchThumb: '#F8FAFC',
    switchTrack: '#1E293B',
  
} as ThemePalette
};

// ==========================================
// 12. المخمل الياقوتي (Ruby Velvet)
// ==========================================
const themeRubyVelvet = {
  light: {
    primary: '#9B111E',
    primaryLight: '#D2042D',
    primaryDark: '#6A0B14',
    primary50: '#FDF2F3',
    primary100: '#F9DFE1',
    primary200: '#F0B6BC',
    primary300: '#E68D96',
    primary400: '#DA6371',
    primary500: '#9B111E',
    primary600: '#8A0F1A',
    primary700: '#790D17',
    primary800: '#6A0B14',
    primary900: '#4D080F',
    warm50: '#FAFAFA',
    warm100: '#F5F5F5',
    warm200: '#EEEEEE',
    warm300: '#E0E0E0',
    warm400: '#BDBDBD',
    warm500: '#9E9E9E',
    background: '#F8F6F6',
    surface: '#FFFFFF',
    surfaceMuted: '#E0E0E0',          // ✅ أغمق من FAFAFA
    surfaceElevated: '#FFFFFF',
    border: '#BDBDBD',                // ✅ أغمق من EAEAEA
    borderLight: '#F5F5F5',
    text: '#212121',
    textSecondary: '#424242',         // ✅ أغمق من 757575
    textTertiary: '#757575',          // ✅ أغمق من BDBDBD
    textInverse: '#FFFFFF',
    success: '#4CAF50',
    successLight: '#C8E6C9',          // ✅ أقل بهرجة من E8F5E9
    warning: '#FF9800',
    warningLight: '#FFF3E0',
    error: '#F44336',
    errorLight: '#FFEBEE',
    info: '#2196F3',
    infoLight: '#E3F2FD',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: 'transparent',
    tabBarBorder: 'transparent',
    tabActive: '#9B111E',
    tabInactive: '#757575',
    gradients: {
      primary: ['#FF3B5C', '#D2042D', '#7A0018'] as const,
      warm: ['#E68D96', '#9B111E'] as const,
      rose: ['#F0B6BC', '#9B111E'] as const,
      auction: ['#9B111E', '#6A0B14'] as const,
    },
    shadcn: {
      background: "#F8F6F6",
      foreground: "#212121",
      card: "#FFFFFF",
      cardForeground: "#212121",
      popover: "#FFFFFF",
      popoverForeground: "#212121",
      primary: "#9B111E",
      primaryForeground: "#FFFFFF",
      secondary: "#E0E0E0",           // ✅ أغمق من D2042D (لون خلفية ثانوية محايدة)
      secondaryForeground: "#212121", // ✅ نص داكن
      muted: "#FAFAFA",
      mutedForeground: "#424242",     // ✅ أغمق من 757575
      accent: "#F0B6BC",              // ✅ لوردي فاتح بدلاً من الأحمر الصارخ
      accentForeground: "#212121",    // ✅ نص داكن
      destructive: "#F44336",
      destructiveForeground: "#FFFFFF",
      border: "#BDBDBD",              // ✅ أغمق من EAEAEA
      input: "#BDBDBD",               // ✅ أغمق
      ring: "#9B111E",
      radius: "0.625rem",
    },
    chatBubbleSent: '#9B111E',
    chatBubbleReceived: '#E0E0E0',    // ✅ أغمق من F5F5F5
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#212121',
    overlay: 'rgba(0,0,0,0.5)',
    overlayLight: 'rgba(155,17,30,0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#EAEAEA',
    cardShadow: 'rgba(0,0,0,0.08)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان FAFAFA)
    inputBorder: '#BDBDBD',           // ✅ أغمق (كان EAEAEA)
    inputFocusBorder: '#9B111E',
    inputText: '#212121',
    inputPlaceholder: '#9E9E9E',      // ✅ أغمق قليلاً
    headerBackground: '#FFFFFF',
    headerBorder: '#F5F5F5',
    switchActive: '#9B111E',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#EAEAEA',
  } as ThemePalette,
  dark: {

    primary: '#D2042D',
    primaryLight: '#FF4D6D',
    primaryDark: '#8B0018',
    primary50: '#2A0B10',
    primary100: '#3A1018',
    primary200: '#52131F',
    primary300: '#6B1728',
    primary400: '#8B1D33',
    primary500: '#D2042D',
    primary600: '#E72A4F',
    primary700: '#FF4D6D',
    primary800: '#FF6B86',
    primary900: '#FFA3B5',
    warm50: '#0D0D0D',
    warm100: '#141414',
    warm200: '#1C1C1C',
    warm300: '#2A2A2A',
    warm400: '#666666',
    warm500: '#999999',
    background: '#080808',
    surface: '#121212',
    surfaceMuted: '#1A1A1A',
    surfaceElevated: '#202020',
    border: '#2C2C2C',
    borderLight: '#3A3A3A',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#777777',
    textInverse: '#000000',
    success: '#4CAF50',
    successLight: '#17361B',
    warning: '#FF9800',
    warningLight: '#3A2500',
    error: '#FF4D4D',
    errorLight: '#3A1111',
    info: '#42A5F5',
    infoLight: '#0D2740',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: 'transparent',
    tabBarBorder: 'transparent',
    tabActive: '#FF4D6D',
    tabInactive: '#666666',
    gradients: {
      primary: ['#FF4D6D', '#D2042D', '#55000F'] as const,
      warm: ['#2A2A2A', '#111111'] as const,
      rose: ['#8B1D33', '#D2042D'] as const,
      auction: ['#D2042D', '#55000F'] as const,
    },
    shadcn: {
  background: "#080808",
  foreground: "#FFFFFF",
  card: "#121212",
  cardForeground: "#FFFFFF",
  popover: "#121212",
  popoverForeground: "#FFFFFF",
  primary: "#D2042D",
  primaryForeground: "#000000",
  secondary: "#FF4D6D",
  secondaryForeground: "#000000",
  muted: "#1A1A1A",
  mutedForeground: "#B0B0B0",
  accent: "#FF4D6D",
  accentForeground: "#000000",
  destructive: "#FF4D4D",
  destructiveForeground: "#000000",
  border: "#2C2C2C",
  input: "#2C2C2C",
  ring: "#D2042D",
  radius: "0.625rem"
},
    chatBubbleSent: '#D2042D',
    chatBubbleReceived: '#1F1F1F',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.7)',
    overlayLight: 'rgba(255,255,255,0.05)',
    cardBackground: '#121212',
    cardBorder: '#2C2C2C',
    cardShadow: 'rgba(0,0,0,0.5)',
    inputBackground: '#1A1A1A',
    inputBorder: '#2C2C2C',
    inputFocusBorder: '#D2042D',
    inputText: '#FFFFFF',
    inputPlaceholder: '#777777',
    headerBackground: '#080808',
    headerBorder: '#1A1A1A',
    switchActive: '#FF4D6D',
    switchInactive: '#2C2C2C',
    switchThumb: '#FFFFFF',
    switchTrack: '#3A3A3A',
  
} as ThemePalette
};






















// ==========================================
// 13. الزمرد والعاج (Emerald Ivory)
// ==========================================
const themeEmeraldIvory = {
  light: {
    primary: '#097969',
    primaryLight: '#50C878',
    primaryDark: '#013220',
    primary50: '#F0F9F6',
    primary100: '#DCF1E9',
    primary200: '#AEE0CC',
    primary300: '#7FCEAE',
    primary400: '#50BC91',
    primary500: '#097969',
    primary600: '#08685A',
    primary700: '#06574B',
    primary800: '#05463D',
    primary900: '#03352E',
    warm50: '#FFFFF0',
    warm100: '#FFFDD0',
    warm200: '#F5F5DC',
    warm300: '#E8E4C9',
    warm400: '#DBD3B6',
    warm500: '#CEC2A3',
    background: '#FFFFF0',
    surface: '#FFFFFF',
    surfaceMuted: '#E8E4C9',          // ✅ أغمق من #FFFDD0
    surfaceElevated: '#FFFFFF',
    border: '#CEC2A3',                // ✅ أغمق من #E8E4C9
    borderLight: '#F5F5DC',
    text: '#1C2826',
    textSecondary: '#2C3E3A',         // ✅ أغمق من #4A5D5A
    textTertiary: '#5B6E6A',          // ✅ أغمق من #8D9F9C
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E8E4C9',
    tabActive: '#097969',
    tabInactive: '#5B6E6A',
    gradients: {
      primary: ['#50C878', '#097969', '#013220'] as const,
      warm: ['#7FCEAE', '#097969'] as const,
      rose: ['#AEE0CC', '#097969'] as const,
      auction: ['#097969', '#013220'] as const,
    },
    shadcn: {
      background: "#FFFFF0",
      foreground: "#1C2826",
      card: "#FFFFFF",
      cardForeground: "#1C2826",
      popover: "#FFFFFF",
      popoverForeground: "#1C2826",
      primary: "#097969",
      primaryForeground: "#FFFFFF",
      secondary: "#E8E4C9",           // ✅ أغمق من #50C878 (لون محايد)
      secondaryForeground: "#1C2826", // ✅ نص داكن
      muted: "#FFFDD0",
      mutedForeground: "#2C3E3A",     // ✅ أغمق من #4A5D5A
      accent: "#AEE0CC",              // ✅ أخضر فاتح بدلاً من #50C878
      accentForeground: "#1C2826",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#CEC2A3",              // ✅ أغمق
      input: "#CEC2A3",               // ✅ أغمق
      ring: "#097969",
      radius: "0.625rem",
    },
    chatBubbleSent: '#097969',
    chatBubbleReceived: '#E8E4C9',    // ✅ أغمق من #FFFDD0
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#1C2826',
    overlay: 'rgba(9, 121, 105, 0.4)',
    overlayLight: 'rgba(9, 121, 105, 0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E8E4C9',
    cardShadow: 'rgba(0,0,0,0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FFFFF0)
    inputBorder: '#CEC2A3',           // ✅ أغمق (كان #E8E4C9)
    inputFocusBorder: '#097969',
    inputText: '#1C2826',
    inputPlaceholder: '#5B6E6A',      // ✅ أغمق
    headerBackground: '#FFFFF0',
    headerBorder: '#F5F5DC',
    switchActive: '#097969',
    switchInactive: '#CEC2A3',
    switchThumb: '#FFFFFF',
    switchTrack: '#E8E4C9',
  } as ThemePalette,
  dark: {

    primary: '#50C878',
    primaryLight: '#097969',
    primaryDark: '#013220',
    primary50: '#0A1A16',
    primary100: '#0D2A22',
    primary200: '#134438',
    primary300: '#1A5E4E',
    primary400: '#207864',
    primary500: '#50C878',
    primary600: '#097969',
    primary700: '#06574B',
    primary800: '#05463D',
    primary900: '#03352E',
    warm50: '#1A1A14',
    warm100: '#2A2A1F',
    warm200: '#3D3D2E',
    warm300: '#52523D',
    warm400: '#6B6B52',
    warm500: '#CEC2A3',
    background: '#0A1A16',
    surface: '#0D2A22',
    surfaceMuted: '#134438',
    surfaceElevated: '#0D2A22',
    border: '#1A5E4E',
    borderLight: '#0D2A22',
    text: '#F0F9F6',
    textSecondary: '#AEE0CC',
    textTertiary: '#7FCEAE',
    textInverse: '#0A1A16',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    errorLight: '#450A0A',
    info: '#60A5FA',
    infoLight: '#172554',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#0D2A22',
    tabBarBorder: '#134438',
    tabActive: '#50C878',
    tabInactive: '#7FCEAE',
    gradients: {
      primary: ['#50C878', '#097969', '#013220'] as const,
      warm: ['#7FCEAE', '#50C878'] as const,
      rose: ['#AEE0CC', '#50C878'] as const,
      auction: ['#097969', '#013220'] as const,
    },
    shadcn: {
  background: "#0A1A16",
  foreground: "#F0F9F6",
  card: "#0D2A22",
  cardForeground: "#F0F9F6",
  popover: "#0D2A22",
  popoverForeground: "#F0F9F6",
  primary: "#50C878",
  primaryForeground: "#0A1A16",
  secondary: "#097969",
  secondaryForeground: "#0A1A16",
  muted: "#134438",
  mutedForeground: "#AEE0CC",
  accent: "#097969",
  accentForeground: "#0A1A16",
  destructive: "#F87171",
  destructiveForeground: "#0A1A16",
  border: "#1A5E4E",
  input: "#134438",
  ring: "#50C878",
  radius: "0.625rem"
},
    chatBubbleSent: '#097969',
    chatBubbleReceived: '#134438',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#F0F9F6',
    overlay: 'rgba(0,0,0,0.7)',
    overlayLight: 'rgba(9, 121, 105, 0.15)',
    cardBackground: '#0D2A22',
    cardBorder: '#134438',
    cardShadow: 'rgba(0,0,0,0.4)',
    inputBackground: '#0D2A22',
    inputBorder: '#134438',
    inputFocusBorder: '#50C878',
    inputText: '#F0F9F6',
    inputPlaceholder: '#7FCEAE',
    headerBackground: '#0A1A16',
    headerBorder: '#0D2A22',
    switchActive: '#50C878',
    switchInactive: '#1A5E4E',
    switchThumb: '#FFFFFF',
    switchTrack: '#134438',
  
} as ThemePalette
};

// ==========================================
// 14. شمواه العروس (Champagne Bridal)
// ==========================================
const themeChampagneBridal = {
  light: {
    primary: '#D4B886',
    primaryLight: '#E8D4A2',
    primaryDark: '#B39459',
    primary50: '#FCF9F3',
    primary100: '#F8F1E1',
    primary200: '#EFE0C0',
    primary300: '#E5D09E',
    primary400: '#DCC07D',
    primary500: '#D4B886',
    primary600: '#C2A36F',
    primary700: '#AF8E59',
    primary800: '#9C7A42',
    primary900: '#8A652C',
    warm50: '#FFFDFB',
    warm100: '#FFF9F2',
    warm200: '#FFEDD9',
    warm300: '#FFE1C0',
    warm400: '#FFD5A6',
    warm500: '#FFC88D',
    background: '#FAF8F5',
    surface: '#FFFFFF',
    surfaceMuted: '#E8E1D5',          // ✅ أغمق من #FDFBF8
    surfaceElevated: '#FFFFFF',
    border: '#D4C9B8',                // ✅ أغمق من #E8E1D5
    borderLight: '#F4EFE6',
    text: '#3D352A',
    textSecondary: '#5C4F3F',         // ✅ أغمق من #7A7061
    textTertiary: '#8A7B6A',          // ✅ أغمق من #AFA699
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E8E1D5',
    tabActive: '#D4B886',
    tabInactive: '#8A7B6A',
    gradients: {
      primary: ['#E8D4A2', '#D4B886', '#B39459'] as const,
      warm: ['#FFE1C0', '#D4B886'] as const,
      rose: ['#EFE0C0', '#D4B886'] as const,
      auction: ['#D4B886', '#B39459'] as const,
    },
    shadcn: {
      background: "#FAF8F5",
      foreground: "#3D352A",
      card: "#FFFFFF",
      cardForeground: "#3D352A",
      popover: "#FFFFFF",
      popoverForeground: "#3D352A",
      primary: "#D4B886",
      primaryForeground: "#FFFFFF",
      secondary: "#E8E1D5",           // ✅ لون محايد أغمق
      secondaryForeground: "#3D352A", // ✅ نص داكن
      muted: "#FDFBF8",
      mutedForeground: "#5C4F3F",     // ✅ أغمق
      accent: "#EFE0C0",              // ✅ بدلاً من #E8D4A2
      accentForeground: "#3D352A",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#D4C9B8",              // ✅ أغمق
      input: "#D4C9B8",               // ✅ أغمق
      ring: "#D4B886",
      radius: "0.625rem",
    },
    chatBubbleSent: '#D4B886',
    chatBubbleReceived: '#E8E1D5',    // ✅ أغمق من #FDFBF8
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#3D352A',
    overlay: 'rgba(61, 53, 42, 0.3)',
    overlayLight: 'rgba(212, 184, 134, 0.08)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E8E1D5',
    cardShadow: 'rgba(0,0,0,0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع
    inputBorder: '#D4C9B8',           // ✅ أغمق
    inputFocusBorder: '#D4B886',
    inputText: '#3D352A',
    inputPlaceholder: '#8A7B6A',      // ✅ أغمق
    headerBackground: '#FAF8F5',
    headerBorder: '#F4EFE6',
    switchActive: '#D4B886',
    switchInactive: '#E8E1D5',
    switchThumb: '#FFFFFF',
    switchTrack: '#F4EFE6',
  } as ThemePalette,
  dark: {

    primary: '#E8D4A2',
    primaryLight: '#D4B886',
    primaryDark: '#B39459',
    primary50: '#2A2319',
    primary100: '#3D352A',
    primary200: '#5C5243',
    primary300: '#7A7061',
    primary400: '#9C8B76',
    primary500: '#E8D4A2',
    primary600: '#D4B886',
    primary700: '#B39459',
    primary800: '#8A652C',
    primary900: '#6B4E1E',
    warm50: '#2A2319',
    warm100: '#3D352A',
    warm200: '#5C5243',
    warm300: '#7A7061',
    warm400: '#9C8B76',
    warm500: '#FFC88D',
    background: '#1C1610',
    surface: '#2A2319',
    surfaceMuted: '#3D352A',
    surfaceElevated: '#2A2319',
    border: '#5C5243',
    borderLight: '#2A2319',
    text: '#FCF9F3',
    textSecondary: '#EFE0C0',
    textTertiary: '#C2A36F',
    textInverse: '#1C1610',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    errorLight: '#450A0A',
    info: '#60A5FA',
    infoLight: '#172554',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#2A2319',
    tabBarBorder: '#3D352A',
    tabActive: '#E8D4A2',
    tabInactive: '#C2A36F',
    gradients: {
      primary: ['#E8D4A2', '#D4B886', '#B39459'] as const,
      warm: ['#FFE1C0', '#E8D4A2'] as const,
      rose: ['#EFE0C0', '#E8D4A2'] as const,
      auction: ['#D4B886', '#B39459'] as const,
    },
    shadcn: {
  background: "#1C1610",
  foreground: "#FCF9F3",
  card: "#2A2319",
  cardForeground: "#FCF9F3",
  popover: "#2A2319",
  popoverForeground: "#FCF9F3",
  primary: "#E8D4A2",
  primaryForeground: "#1C1610",
  secondary: "#D4B886",
  secondaryForeground: "#1C1610",
  muted: "#3D352A",
  mutedForeground: "#EFE0C0",
  accent: "#D4B886",
  accentForeground: "#1C1610",
  destructive: "#F87171",
  destructiveForeground: "#1C1610",
  border: "#5C5243",
  input: "#3D352A",
  ring: "#E8D4A2",
  radius: "0.625rem"
},
    chatBubbleSent: '#D4B886',
    chatBubbleReceived: '#3D352A',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#FCF9F3',
    overlay: 'rgba(0,0,0,0.7)',
    overlayLight: 'rgba(212, 184, 134, 0.15)',
    cardBackground: '#2A2319',
    cardBorder: '#3D352A',
    cardShadow: 'rgba(0,0,0,0.4)',
    inputBackground: '#2A2319',
    inputBorder: '#3D352A',
    inputFocusBorder: '#E8D4A2',
    inputText: '#FCF9F3',
    inputPlaceholder: '#C2A36F',
    headerBackground: '#1C1610',
    headerBorder: '#2A2319',
    switchActive: '#E8D4A2',
    switchInactive: '#5C5243',
    switchThumb: '#FFFFFF',
    switchTrack: '#3D352A',
  
} as ThemePalette
};

// ==========================================
// 15. الأوركيد البنفسجي (Amethyst Orchid)
// ==========================================
const themeAmethyst = {
  light: {
    primary: '#9932CC',
    primaryLight: '#DDA0DD',
    primaryDark: '#4B0082',
    primary50: '#F9F2FD',
    primary100: '#F1E0FA',
    primary200: '#DFBFF3',
    primary300: '#CD9EEB',
    primary400: '#BB7DE4',
    primary500: '#9932CC',
    primary600: '#8A2DB8',
    primary700: '#7A28A3',
    primary800: '#6B238F',
    primary900: '#4B0082',
    warm50: '#FDFCFD',
    warm100: '#FAF7FA',
    warm200: '#F4EDF4',
    warm300: '#EEE4EE',
    warm400: '#E8DAE8',
    warm500: '#E2D1E2',
    background: '#F5F5F7',
    surface: '#FFFFFF',
    surfaceMuted: '#E5E5EA',          // ✅ أغمق من #FAF7FA
    surfaceElevated: '#FFFFFF',
    border: '#C4C4CE',                // ✅ أغمق من #E5E5EA
    borderLight: '#F2F2F7',
    text: '#2C1C36',
    textSecondary: '#4A3A55',         // ✅ أغمق من #6B5B75
    textTertiary: '#7A6A85',          // ✅ أغمق من #A698AE
    textInverse: '#FFFFFF',
    success: '#34C759',
    successLight: '#C8F0D1',          // ✅ أقل بهرجة من #E5F9E6
    warning: '#FF9500',
    warningLight: '#FFF4E5',
    error: '#FF3B30',
    errorLight: '#FFEBEA',
    info: '#007AFF',
    infoLight: '#E5F1FF',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E5E5EA',
    tabActive: '#9932CC',
    tabInactive: '#7A6A85',
    gradients: {
      primary: ['#DDA0DD', '#9932CC', '#4B0082'] as const,
      warm: ['#CD9EEB', '#9932CC'] as const,
      rose: ['#DFBFF3', '#9932CC'] as const,
      auction: ['#9932CC', '#4B0082'] as const,
    },
    shadcn: {
      background: "#F5F5F7",
      foreground: "#2C1C36",
      card: "#FFFFFF",
      cardForeground: "#2C1C36",
      popover: "#FFFFFF",
      popoverForeground: "#2C1C36",
      primary: "#9932CC",
      primaryForeground: "#FFFFFF",
      secondary: "#E5E5EA",           // ✅ لون محايد أغمق
      secondaryForeground: "#2C1C36", // ✅ نص داكن
      muted: "#FAF7FA",
      mutedForeground: "#4A3A55",     // ✅ أغمق
      accent: "#DFBFF3",              // ✅ بدلاً من #DDA0DD
      accentForeground: "#2C1C36",    // ✅ نص داكن
      destructive: "#FF3B30",
      destructiveForeground: "#FFFFFF",
      border: "#C4C4CE",              // ✅ أغمق
      input: "#C4C4CE",               // ✅ أغمق
      ring: "#9932CC",
      radius: "0.625rem",
    },
    chatBubbleSent: '#9932CC',
    chatBubbleReceived: '#E5E5EA',    // ✅ أغمق من #FAF7FA
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#2C1C36',
    overlay: 'rgba(44, 28, 54, 0.4)',
    overlayLight: 'rgba(153, 50, 204, 0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E5EA',
    cardShadow: 'rgba(0,0,0,0.05)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع
    inputBorder: '#C4C4CE',           // ✅ أغمق
    inputFocusBorder: '#9932CC',
    inputText: '#2C1C36',
    inputPlaceholder: '#7A6A85',      // ✅ أغمق
    headerBackground: '#FFFFFF',
    headerBorder: '#F2F2F7',
    switchActive: '#9932CC',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#E5E5EA',
  } as ThemePalette,
  dark: {

    primary: '#DDA0DD',
    primaryLight: '#9932CC',
    primaryDark: '#4B0082',
    primary50: '#1A0F26',
    primary100: '#2C1C36',
    primary200: '#3D284D',
    primary300: '#5C3D6E',
    primary400: '#7A52A0',
    primary500: '#DDA0DD',
    primary600: '#9932CC',
    primary700: '#8A2DB8',
    primary800: '#6B238F',
    primary900: '#4B0082',
    warm50: '#1A0F26',
    warm100: '#2C1C36',
    warm200: '#3D284D',
    warm300: '#5C3D6E',
    warm400: '#7A52A0',
    warm500: '#E2D1E2',
    background: '#10081A',
    surface: '#1A0F26',
    surfaceMuted: '#2C1C36',
    surfaceElevated: '#1A0F26',
    border: '#3D284D',
    borderLight: '#1A0F26',
    text: '#F9F2FD',
    textSecondary: '#DFBFF3',
    textTertiary: '#CD9EEB',
    textInverse: '#10081A',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    errorLight: '#450A0A',
    info: '#60A5FA',
    infoLight: '#172554',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#1A0F26',
    tabBarBorder: '#2C1C36',
    tabActive: '#DDA0DD',
    tabInactive: '#CD9EEB',
    gradients: {
      primary: ['#DDA0DD', '#9932CC', '#4B0082'] as const,
      warm: ['#CD9EEB', '#DDA0DD'] as const,
      rose: ['#DFBFF3', '#DDA0DD'] as const,
      auction: ['#9932CC', '#4B0082'] as const,
    },
    shadcn: {
  background: "#10081A",
  foreground: "#F9F2FD",
  card: "#1A0F26",
  cardForeground: "#F9F2FD",
  popover: "#1A0F26",
  popoverForeground: "#F9F2FD",
  primary: "#DDA0DD",
  primaryForeground: "#10081A",
  secondary: "#9932CC",
  secondaryForeground: "#10081A",
  muted: "#2C1C36",
  mutedForeground: "#DFBFF3",
  accent: "#9932CC",
  accentForeground: "#10081A",
  destructive: "#F87171",
  destructiveForeground: "#10081A",
  border: "#3D284D",
  input: "#2C1C36",
  ring: "#DDA0DD",
  radius: "0.625rem"
},
    chatBubbleSent: '#9932CC',
    chatBubbleReceived: '#2C1C36',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#F9F2FD',
    overlay: 'rgba(0,0,0,0.7)',
    overlayLight: 'rgba(221, 160, 221, 0.1)',
    cardBackground: '#1A0F26',
    cardBorder: '#2C1C36',
    cardShadow: 'rgba(0,0,0,0.4)',
    inputBackground: '#1A0F26',
    inputBorder: '#2C1C36',
    inputFocusBorder: '#DDA0DD',
    inputText: '#F9F2FD',
    inputPlaceholder: '#CD9EEB',
    headerBackground: '#10081A',
    headerBorder: '#1A0F26',
    switchActive: '#DDA0DD',
    switchInactive: '#3D284D',
    switchThumb: '#FFFFFF',
    switchTrack: '#2C1C36',
  
} as ThemePalette
};

// ==========================================
// 16. البرونز والموكا (Mocha Bronze)
// ==========================================
const themeMochaBronze = {
  light: {
    primary: '#CD7F32',
    primaryLight: '#E2AC76',
    primaryDark: '#8C521F',
    primary50: '#FAF4EF',
    primary100: '#F3E5D6',
    primary200: '#E7CAAD',
    primary300: '#DBAF84',
    primary400: '#CF945B',
    primary500: '#CD7F32',
    primary600: '#B9722D',
    primary700: '#A46528',
    primary800: '#905923',
    primary900: '#7B4C1E',
    warm50: '#FDFBF9',
    warm100: '#F9F5EF',
    warm200: '#F0E5D7',
    warm300: '#E7D6C0',
    warm400: '#DDC6A8',
    warm500: '#D4B791',
    background: '#F5EBE1',
    surface: '#FFFFFF',
    surfaceMuted: '#E4D5C7',          // ✅ أغمق من #FDFBF9
    surfaceElevated: '#FFFFFF',
    border: '#CDBBA8',                // ✅ أغمق من #E4D5C7
    borderLight: '#EFE7DF',
    text: '#2A2018',
    textSecondary: '#4E3C2E',         // ✅ أغمق من #6B5746
    textTertiary: '#7E6654',          // ✅ أغمق من #A69280
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E4D5C7',
    tabActive: '#CD7F32',
    tabInactive: '#7E6654',
    gradients: {
      primary: ['#E2AC76', '#CD7F32', '#8C521F'] as const,
      warm: ['#DBAF84', '#CD7F32'] as const,
      rose: ['#E7CAAD', '#CD7F32'] as const,
      auction: ['#CD7F32', '#8C521F'] as const,
    },
    shadcn: {
      background: "#F5EBE1",
      foreground: "#2A2018",
      card: "#FFFFFF",
      cardForeground: "#2A2018",
      popover: "#FFFFFF",
      popoverForeground: "#2A2018",
      primary: "#CD7F32",
      primaryForeground: "#FFFFFF",
      secondary: "#E4D5C7",           // ✅ لون محايد أغمق
      secondaryForeground: "#2A2018", // ✅ نص داكن
      muted: "#FDFBF9",
      mutedForeground: "#4E3C2E",     // ✅ أغمق
      accent: "#E7CAAD",              // ✅ بدلاً من #E2AC76
      accentForeground: "#2A2018",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#CDBBA8",              // ✅ أغمق
      input: "#CDBBA8",               // ✅ أغمق
      ring: "#CD7F32",
      radius: "0.625rem",
    },
    chatBubbleSent: '#CD7F32',
    chatBubbleReceived: '#E4D5C7',    // ✅ أغمق من #F9F5EF
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#2A2018',
    overlay: 'rgba(42, 32, 24, 0.4)',
    overlayLight: 'rgba(205, 127, 50, 0.08)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E4D5C7',
    cardShadow: 'rgba(0,0,0,0.05)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع
    inputBorder: '#CDBBA8',           // ✅ أغمق
    inputFocusBorder: '#CD7F32',
    inputText: '#2A2018',
    inputPlaceholder: '#7E6654',      // ✅ أغمق
    headerBackground: '#F5EBE1',
    headerBorder: '#EFE7DF',
    switchActive: '#CD7F32',
    switchInactive: '#D4B791',
    switchThumb: '#FFFFFF',
    switchTrack: '#E4D5C7',
  } as ThemePalette,
  dark: {

    primary: '#E2AC76',
    primaryLight: '#CD7F32',
    primaryDark: '#8C521F',
    primary50: '#1F150B',
    primary100: '#2A2018',
    primary200: '#3F3022',
    primary300: '#6B5746',
    primary400: '#8C6E4D',
    primary500: '#E2AC76',
    primary600: '#CD7F32',
    primary700: '#A46528',
    primary800: '#905923',
    primary900: '#7B4C1E',
    warm50: '#1F150B',
    warm100: '#2A2018',
    warm200: '#3F3022',
    warm300: '#6B5746',
    warm400: '#8C6E4D',
    warm500: '#D4B791',
    background: '#140D06',
    surface: '#1F150B',
    surfaceMuted: '#2A2018',
    surfaceElevated: '#1F150B',
    border: '#3F3022',
    borderLight: '#1F150B',
    text: '#FAF4EF',
    textSecondary: '#E7CAAD',
    textTertiary: '#DBAF84',
    textInverse: '#140D06',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    errorLight: '#450A0A',
    info: '#60A5FA',
    infoLight: '#172554',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#1F150B',
    tabBarBorder: '#2A2018',
    tabActive: '#E2AC76',
    tabInactive: '#DBAF84',
    gradients: {
      primary: ['#E2AC76', '#CD7F32', '#8C521F'] as const,
      warm: ['#DBAF84', '#E2AC76'] as const,
      rose: ['#E7CAAD', '#E2AC76'] as const,
      auction: ['#CD7F32', '#8C521F'] as const,
    },
    shadcn: {
  background: "#140D06",
  foreground: "#FAF4EF",
  card: "#1F150B",
  cardForeground: "#FAF4EF",
  popover: "#1F150B",
  popoverForeground: "#FAF4EF",
  primary: "#E2AC76",
  primaryForeground: "#140D06",
  secondary: "#CD7F32",
  secondaryForeground: "#140D06",
  muted: "#2A2018",
  mutedForeground: "#E7CAAD",
  accent: "#CD7F32",
  accentForeground: "#140D06",
  destructive: "#F87171",
  destructiveForeground: "#140D06",
  border: "#3F3022",
  input: "#2A2018",
  ring: "#E2AC76",
  radius: "0.625rem"
},
    chatBubbleSent: '#CD7F32',
    chatBubbleReceived: '#2A2018',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#FAF4EF',
    overlay: 'rgba(0,0,0,0.7)',
    overlayLight: 'rgba(226, 172, 118, 0.1)',
    cardBackground: '#1F150B',
    cardBorder: '#2A2018',
    cardShadow: 'rgba(0,0,0,0.4)',
    inputBackground: '#1F150B',
    inputBorder: '#2A2018',
    inputFocusBorder: '#E2AC76',
    inputText: '#FAF4EF',
    inputPlaceholder: '#DBAF84',
    headerBackground: '#140D06',
    headerBorder: '#1F150B',
    switchActive: '#E2AC76',
    switchInactive: '#3F3022',
    switchThumb: '#FFFFFF',
    switchTrack: '#2A2018',
  
} as ThemePalette
};



// ==========================================
// 18. الذهب الوردي الفاخر (Signature Rose Gold)
// ==========================================
const themeRoseGold = {
  light: {
    primary: '#B76E79',
    primaryLight: '#D4A0A7',
    primaryDark: '#8F5861',
    primary50: '#FDF6F7',
    primary100: '#FCEBED',
    primary200: '#F8D8DC',
    primary300: '#F4C5CB',
    primary400: '#F0B2BA',
    primary500: '#B76E79',
    primary600: '#9A5A64',
    primary700: '#7D464F',
    primary800: '#60323A',
    primary900: '#431E25',
    warm50: '#FEFAF8',
    warm100: '#FDF2EF',
    warm200: '#FAE3DE',
    warm300: '#F7D4CD',
    warm400: '#F4C5BC',
    warm500: '#F1B6AB',
    background: '#FAF8F6',
    surface: '#FEFDFB',
    surfaceMuted: '#EADED8',          // ✅ أغمق من #FCF9F7
    surfaceElevated: '#FFFFFF',
    border: '#D4C4BC',                // ✅ أغمق من #EADED8
    borderLight: '#F2EAE6',
    text: '#2C2C2E',
    textSecondary: '#5A5551',         // ✅ أغمق من #6E6A66
    textTertiary: '#8C8783',          // ✅ أغمق من #A09C98
    textInverse: '#FEFDFB',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FEFDFB',
    tabBarBorder: '#EADED8',
    tabActive: '#B76E79',
    tabInactive: '#8C8783',
    gradients: {
      primary: ['#E8C4C8', '#B76E79', '#8F5861'] as const,
      warm: ['#F1B6AB', '#B76E79'] as const,
      rose: ['#D4A0A7', '#B76E79'] as const,
      auction: ['#B76E79', '#8F5861'] as const,
    },
    shadcn: {
      background: "#FAF8F6",
      foreground: "#2C2C2E",
      card: "#FFFFFF",
      cardForeground: "#2C2C2E",
      popover: "#FFFFFF",
      popoverForeground: "#2C2C2E",
      primary: "#B76E79",
      primaryForeground: "#FEFDFB",
      secondary: "#EADED8",           // ✅ لون محايد أغمق
      secondaryForeground: "#2C2C2E", // ✅ نص داكن
      muted: "#FCF9F7",
      mutedForeground: "#5A5551",     // ✅ أغمق
      accent: "#F4C5CB",              // ✅ بدلاً من #D4A0A7
      accentForeground: "#2C2C2E",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FEFDFB",
      border: "#D4C4BC",              // ✅ أغمق
      input: "#D4C4BC",               // ✅ أغمق
      ring: "#B76E79",
      radius: "0.625rem",
    },
    chatBubbleSent: '#B76E79',
    chatBubbleReceived: '#EADED8',    // ✅ أغمق من #FCF9F7
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#2C2C2E',
    overlay: 'rgba(0, 0, 0, 0.4)',
    overlayLight: 'rgba(0, 0, 0, 0.08)',
    cardBackground: '#FFFFFF',
    cardBorder: '#EADED8',
    cardShadow: 'rgba(0, 0, 0, 0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع
    inputBorder: '#D4C4BC',           // ✅ أغمق
    inputFocusBorder: '#B76E79',
    inputText: '#2C2C2E',
    inputPlaceholder: '#8C8783',      // ✅ أغمق
    headerBackground: '#FEFDFB',
    headerBorder: '#F2EAE6',
    switchActive: '#B76E79',
    switchInactive: '#EADED8',
    switchThumb: '#FFFFFF',
    switchTrack: '#F2EAE6',
  } as ThemePalette,
  dark: {

    primary: '#D4A0A7',
    primaryLight: '#F0B2BA',
    primaryDark: '#8F5861',
    primary50: '#2A1A1E',
    primary100: '#3D252A',
    primary200: '#5A333C',
    primary300: '#7D464F',
    primary400: '#9A5A64',
    primary500: '#D4A0A7',
    primary600: '#B76E79',
    primary700: '#9A5A64',
    primary800: '#7D464F',
    primary900: '#60323A',
    warm50: '#2A2020',
    warm100: '#3D2D2C',
    warm200: '#5A403E',
    warm300: '#7D5754',
    warm400: '#9A6F6B',
    warm500: '#F1B6AB',
    background: '#1A1314',
    surface: '#2A1A1E',
    surfaceMuted: '#3D252A',
    surfaceElevated: '#2A1A1E',
    border: '#5A333C',
    borderLight: '#2A1A1E',
    text: '#FDF6F7',
    textSecondary: '#F8D8DC',
    textTertiary: '#F4C5CB',
    textInverse: '#1A1314',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    errorLight: '#450A0A',
    info: '#60A5FA',
    infoLight: '#172554',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#2A1A1E',
    tabBarBorder: '#3D252A',
    tabActive: '#D4A0A7',
    tabInactive: '#9A5A64',
    gradients: {
      primary: ['#E8C4C8', '#B76E79', '#8F5861'] as const,
      warm: ['#F1B6AB', '#B76E79'] as const,
      rose: ['#D4A0A7', '#B76E79'] as const,
      auction: ['#B76E79', '#8F5861'] as const,
    },
    shadcn: {
  background: "#1A1314",
  foreground: "#FDF6F7",
  card: "#2A1A1E",
  cardForeground: "#FDF6F7",
  popover: "#2A1A1E",
  popoverForeground: "#FDF6F7",
  primary: "#D4A0A7",
  primaryForeground: "#1A1314",
  secondary: "#F0B2BA",
  secondaryForeground: "#1A1314",
  muted: "#3D252A",
  mutedForeground: "#F8D8DC",
  accent: "#F0B2BA",
  accentForeground: "#1A1314",
  destructive: "#F87171",
  destructiveForeground: "#1A1314",
  border: "#5A333C",
  input: "#3D252A",
  ring: "#D4A0A7",
  radius: "0.625rem"
},
    chatBubbleSent: '#B76E79',
    chatBubbleReceived: '#3D252A',
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#FDF6F7',
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(183, 110, 121, 0.12)',
    cardBackground: '#2A1A1E',
    cardBorder: '#3D252A',
    cardShadow: 'rgba(0, 0, 0, 0.4)',
    inputBackground: '#2A1A1E',
    inputBorder: '#3D252A',
    inputFocusBorder: '#D4A0A7',
    inputText: '#FDF6F7',
    inputPlaceholder: '#9A5A64',
    headerBackground: '#1A1314',
    headerBorder: '#2A1A1E',
    switchActive: '#D4A0A7',
    switchInactive: '#5A333C',
    switchThumb: '#FFFFFF',
    switchTrack: '#3D252A',
  
} as ThemePalette
};






























const themeImperialLapis = {
  light: {
    primary: '#1E3A8A',
    primaryLight: '#3B82F6',
    primaryDark: '#172554',
    primary50: '#EFF6FF',
    primary100: '#DBEAFE',
    primary200: '#BFDBFE',
    primary300: '#93C5FD',
    primary400: '#60A5FA',
    primary500: '#1E3A8A',
    primary600: '#1D4ED8',
    primary700: '#1E40AF',
    primary800: '#1E3A8A',
    primary900: '#172554',
    warm50: '#F8FAFC',
    warm100: '#F1F5F9',
    warm200: '#E2E8F0',
    warm300: '#CBD5E1',
    warm400: '#94A3B8',
    warm500: '#64748B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceMuted: '#E2E8F0',        // تعديل: أغمق من #F1F5F9 لتحسين التباين
    surfaceElevated: '#FFFFFF',
    border: '#CBD5E1',              // تعديل: أغمق من #E2E8F0
    borderLight: '#E2E8F0',
    text: '#0F172A',
    textSecondary: '#1E293B',       // تعديل: أغمق من #334155
    textTertiary: '#475569',
    textInverse: '#FFFFFF',
    success: '#059669',
    successLight: '#A7F3D0',        // تعديل: أقل بهرجة وأوضح
    warning: '#D97706',
    warningLight: '#FEF3C7',
    error: '#DC2626',
    errorLight: '#FEE2E2',
    info: '#2563EB',
    infoLight: '#DBEAFE',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E2E8F0',
    tabActive: '#1E3A8A',
    tabInactive: '#94A3B8',
    gradients: {
      primary: ['#60A5FA', '#2563EB', '#172554'] as const,
      warm: ['#93C5FD', '#3B82F6'] as const,
      rose: ['#DBEAFE', '#1E3A8A'] as const,
      auction: ['#1D4ED8', '#172554'] as const,
    },
    shadcn: {
      background: '#F8FAFC',
      foreground: '#0F172A',
      card: '#FFFFFF',
      cardForeground: '#0F172A',
      popover: '#FFFFFF',
      popoverForeground: '#0F172A',
      primary: '#1E3A8A',
      primaryForeground: '#FFFFFF',
      secondary: '#DBEAFE',           // تعديل: أزرق فاتح جداً
      secondaryForeground: '#1E3A8A', // نص داكن على خلفية فاتحة
      muted: '#F1F5F9',
      mutedForeground: '#1E293B',     // تعديل: أغمق من #334155
      accent: '#EFF6FF',              // تعديل: أزرق فاتح جداً لخلفية التمييز
      accentForeground: '#1E3A8A',
      destructive: '#DC2626',
      destructiveForeground: '#FFFFFF',
      border: '#CBD5E1',              // تعديل: أغمق
      input: '#94A3B8',               // تعديل: أغمق من #CBD5E1
      ring: '#1E3A8A',
      radius: '0.625rem',
    },
    chatBubbleSent: '#1E3A8A',
    chatBubbleReceived: '#E2E8F0',    // تعديل: أغمق من #F1F5F9 لتباين أفضل
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#0F172A',
    overlay: 'rgba(15, 23, 42, 0.4)',
    overlayLight: 'rgba(30, 58, 138, 0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E2E8F0',
    cardShadow: 'rgba(30, 58, 138, 0.08)',
    inputBackground: '#FFFFFF',       // تعديل: أبيض بدلاً من F8FAFC
    inputBorder: '#94A3B8',           // تعديل: أغمق من CBD5E1
    inputFocusBorder: '#1E3A8A',
    inputText: '#0F172A',
    inputPlaceholder: '#64748B',
    headerBackground: '#FFFFFF',
    headerBorder: '#E2E8F0',
    switchActive: '#1E3A8A',
    switchInactive: '#CBD5E1',
    switchThumb: '#FFFFFF',
    switchTrack: '#E2E8F0',
  } as ThemePalette,
  dark: {

    primary: '#60A5FA', primaryLight: '#DBEAFE', primaryDark: '#2563EB',
    primary50: '#0F172A', primary100: '#172554', primary200: '#1E3A8A', primary300: '#1D4ED8', primary400: '#2563EB', primary500: '#60A5FA', primary600: '#93C5FD', primary700: '#BFDBFE', primary800: '#DBEAFE', primary900: '#EFF6FF',
    warm50: '#020617', warm100: '#0F172A', warm200: '#1E293B', warm300: '#334155', warm400: '#475569', warm500: '#64748B',
    background: '#020617', surface: '#0F172A', surfaceMuted: '#1E293B', surfaceElevated: '#1E293B',
    border: '#1E293B', borderLight: '#0F172A',
    text: '#F8FAFC', textSecondary: '#94A3B8', textTertiary: '#475569', textInverse: '#020617',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF8F00',
    errorDark: '#B91C1C',
    successDark: '#059669',
    infoDark: '#1D4ED8',
    tabBar: '#0F172A', tabBarBorder: '#1E293B', tabActive: '#60A5FA', tabInactive: '#475569',
    gradients: {
      primary: ['#93C5FD', '#60A5FA', '#1E3A8A'] as const,
      warm: ['#60A5FA', '#2563EB'] as const,
      rose: ['#DBEAFE', '#1E3A8A'] as const,
      auction: ['#2563EB', '#172554'] as const,
    },
    shadcn: {
  background: "#020617",
  foreground: "#F8FAFC",
  card: "#0F172A",
  cardForeground: "#F8FAFC",
  popover: "#0F172A",
  popoverForeground: "#F8FAFC",
  primary: "#60A5FA",
  primaryForeground: "#020617",
  secondary: "#DBEAFE",
  secondaryForeground: "#020617",
  muted: "#1E293B",
  mutedForeground: "#94A3B8",
  accent: "#DBEAFE",
  accentForeground: "#020617",
  destructive: "#F87171",
  destructiveForeground: "#020617",
  border: "#1E293B",
  input: "#334155",
  ring: "#60A5FA",
  radius: "0.625rem"
},
    chatBubbleSent: '#1D4ED8', chatBubbleReceived: '#1E293B', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#F8FAFC',
    overlay: 'rgba(2, 6, 23, 0.8)', overlayLight: 'rgba(96, 165, 250, 0.1)',
    cardBackground: '#0F172A', cardBorder: '#1E293B', cardShadow: 'rgba(0, 0, 0, 0.5)',
    inputBackground: '#0F172A', inputBorder: '#334155', inputFocusBorder: '#60A5FA', inputText: '#F8FAFC', inputPlaceholder: '#475569',
    headerBackground: '#020617', headerBorder: '#0F172A',
    switchActive: '#60A5FA', switchInactive: '#334155', switchThumb: '#F8FAFC', switchTrack: '#334155',
  
} as ThemePalette
};


























// ==========================================
// 13. ثيم الطاووس (Peacock Teal)
// ==========================================
const themePeacockTeal = {
  light: {
    primary: '#0F766E',
    primaryLight: '#14B8A6',
    primaryDark: '#115E59',
    primary50: '#F0FDFA',
    primary100: '#CCFBF1',
    primary200: '#99F6E4',
    primary300: '#5EEAD4',
    primary400: '#2DD4BF',
    primary500: '#0F766E',
    primary600: '#0D9488',
    primary700: '#0F766E',
    primary800: '#115E59',
    primary900: '#134E4A',
    warm50: '#F0FDFA',
    warm100: '#CCFBF1',
    warm200: '#99F6E4',
    warm300: '#5EEAD4',
    warm400: '#2DD4BF',
    warm500: '#14B8A6',
    background: '#F0FDFA',
    surface: '#FFFFFF',
    surfaceMuted: '#99F6E4',          // ✅ أغمق من #CCFBF1
    surfaceElevated: '#FFFFFF',
    border: '#2DD4BF',                // ✅ أغمق (كان #99F6E4)
    borderLight: '#CCFBF1',
    text: '#134E4A',
    textSecondary: '#115E59',         // يبقى (جيد)
    textTertiary: '#0D9488',          // ✅ أغمق قليلاً (كان #0D9488)
    textInverse: '#FFFFFF',
    success: '#059669',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#D97706',
    warningLight: '#FEF3C7',
    error: '#DC2626',
    errorLight: '#FEE2E2',
    info: '#2563EB',
    infoLight: '#DBEAFE',
    tabBar: '#FFFFFF',
    tabBarBorder: '#99F6E4',
    tabActive: '#0F766E',
    tabInactive: '#5EEAD4',
    gradients: {
      primary: ['#2DD4BF', '#0D9488', '#134E4A'] as const,
      warm: ['#5EEAD4', '#14B8A6'] as const,
      rose: ['#99F6E4', '#0F766E'] as const,
      auction: ['#0F766E', '#134E4A'] as const,
    },
    shadcn: {
      background: "#F0FDFA",
      foreground: "#134E4A",
      card: "#FFFFFF",
      cardForeground: "#134E4A",
      popover: "#FFFFFF",
      popoverForeground: "#134E4A",
      primary: "#0F766E",
      primaryForeground: "#FFFFFF",
      secondary: "#99F6E4",           // ✅ بدلاً من #14B8A6 (لون محايد)
      secondaryForeground: "#134E4A", // ✅ نص داكن
      muted: "#CCFBF1",
      mutedForeground: "#115E59",
      accent: "#5EEAD4",              // ✅ بدلاً من #14B8A6
      accentForeground: "#134E4A",    // ✅ نص داكن
      destructive: "#DC2626",
      destructiveForeground: "#FFFFFF",
      border: "#2DD4BF",              // ✅ أغمق
      input: "#2DD4BF",               // ✅ أغمق
      ring: "#0F766E",
      radius: "0.625rem",
    },
    chatBubbleSent: '#0F766E',
    chatBubbleReceived: '#CCFBF1',    // ✅ أغمق قليلاً
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#134E4A',
    overlay: 'rgba(19, 78, 74, 0.4)',
    overlayLight: 'rgba(15, 118, 110, 0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#99F6E4',
    cardShadow: 'rgba(13, 148, 136, 0.08)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #F0FDFA)
    inputBorder: '#2DD4BF',           // ✅ أغمق
    inputFocusBorder: '#0F766E',
    inputText: '#134E4A',
    inputPlaceholder: '#5EEAD4',      // يبقى
    headerBackground: '#FFFFFF',
    headerBorder: '#99F6E4',
    switchActive: '#0F766E',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#99F6E4',
  } as ThemePalette,
  dark: {

    primary: '#2DD4BF', primaryLight: '#5EEAD4', primaryDark: '#0D9488',
    primary50: '#042F2E', primary100: '#115E59', primary200: '#0F766E', primary300: '#0D9488', primary400: '#0F766E', primary500: '#2DD4BF', primary600: '#5EEAD4', primary700: '#99F6E4', primary800: '#CCFBF1', primary900: '#F0FDFA',
    warm50: '#042F2E', warm100: '#115E59', warm200: '#0F766E', warm300: '#0D9488', warm400: '#2DD4BF', warm500: '#5EEAD4',
    background: '#042F2E', surface: '#115E59', surfaceMuted: '#0F766E', surfaceElevated: '#0D9488',
    border: '#0F766E', borderLight: '#115E59',
    text: '#F0FDFA', textSecondary: '#99F6E4', textTertiary: '#5EEAD4', textInverse: '#042F2E',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00',
    errorDark: '#B91C1C',
    successDark: '#059669',
    infoDark: '#1D4ED8',
    tabBar: '#115E59', tabBarBorder: '#0F766E', tabActive: '#2DD4BF', tabInactive: '#0D9488',
    gradients: {
      primary: ['#5EEAD4', '#2DD4BF', '#0D9488'] as const,
      warm: ['#99F6E4', '#0D9488'] as const,
      rose: ['#99F6E4', '#0D9488'] as const,
      auction: ['#0F766E', '#115E59'] as const,
    },
    shadcn: {
  background: "#042F2E",
  foreground: "#F0FDFA",
  card: "#115E59",
  cardForeground: "#F0FDFA",
  popover: "#115E59",
  popoverForeground: "#F0FDFA",
  primary: "#2DD4BF",
  primaryForeground: "#042F2E",
  secondary: "#5EEAD4",
  secondaryForeground: "#042F2E",
  muted: "#0F766E",
  mutedForeground: "#99F6E4",
  accent: "#5EEAD4",
  accentForeground: "#042F2E",
  destructive: "#F87171",
  destructiveForeground: "#042F2E",
  border: "#0F766E",
  input: "#0F766E",
  ring: "#2DD4BF",
  radius: "0.625rem"
},
    chatBubbleSent: '#2DD4BF', chatBubbleReceived: '#0F766E', chatBubbleTextSent: '#042F2E', chatBubbleTextReceived: '#F0FDFA',
    overlay: 'rgba(4, 47, 46, 0.8)', overlayLight: 'rgba(45, 212, 191, 0.1)',
    cardBackground: '#115E59', cardBorder: '#0F766E', cardShadow: 'rgba(0, 0, 0, 0.5)',
    inputBackground: '#115E59', inputBorder: '#0F766E', inputFocusBorder: '#2DD4BF', inputText: '#F0FDFA', inputPlaceholder: '#0D9488',
    headerBackground: '#042F2E', headerBorder: '#115E59',
    switchActive: '#2DD4BF', switchInactive: '#0F766E', switchThumb: '#F0FDFA', switchTrack: '#0F766E',
  
} as ThemePalette
};





// ==========================================
// 14. ثيم البلاتين الجليدي (Platinum Frost)
// ==========================================
const themePlatinumFrost = {
  light: {
    primary: '#475569',
    primaryLight: '#94A3B8',
    primaryDark: '#334155',
    primary50: '#F8FAFC',
    primary100: '#F1F5F9',
    primary200: '#E2E8F0',
    primary300: '#CBD5E1',
    primary400: '#94A3B8',
    primary500: '#475569',
    primary600: '#334155',
    primary700: '#1E293B',
    primary800: '#0F172A',
    primary900: '#020617',
    warm50: '#FFFFFF',
    warm100: '#F8FAFC',
    warm200: '#F1F5F9',
    warm300: '#E2E8F0',
    warm400: '#CBD5E1',
    warm500: '#94A3B8',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    surfaceMuted: '#E2E8F0',          // ✅ أغمق من #F1F5F9
    surfaceElevated: '#FFFFFF',
    border: '#CBD5E1',                // ✅ أغمق (كان #E2E8F0)
    borderLight: '#F1F5F9',
    text: '#0F172A',
    textSecondary: '#1E293B',         // ✅ أغمق من #334155
    textTertiary: '#475569',          // ✅ أغمق من #64748B
    textInverse: '#FFFFFF',
    success: '#059669',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#D97706',
    warningLight: '#FEF3C7',
    error: '#DC2626',
    errorLight: '#FEE2E2',
    info: '#2563EB',
    infoLight: '#DBEAFE',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E2E8F0',
    tabActive: '#475569',
    tabInactive: '#64748B',
    gradients: {
      primary: ['#94A3B8', '#475569', '#0F172A'] as const,
      warm: ['#CBD5E1', '#64748B'] as const,
      rose: ['#E2E8F0', '#475569'] as const,
      auction: ['#334155', '#0F172A'] as const,
    },
    shadcn: {
      background: "#FFFFFF",
      foreground: "#0F172A",
      card: "#FFFFFF",
      cardForeground: "#0F172A",
      popover: "#FFFFFF",
      popoverForeground: "#0F172A",
      primary: "#475569",
      primaryForeground: "#FFFFFF",
      secondary: "#E2E8F0",           // ✅ بدلاً من #94A3B8 (لون محايد أغمق)
      secondaryForeground: "#0F172A", // ✅ نص داكن
      muted: "#F1F5F9",
      mutedForeground: "#1E293B",     // ✅ أغمق
      accent: "#CBD5E1",              // ✅ بدلاً من #94A3B8
      accentForeground: "#0F172A",    // ✅ نص داكن
      destructive: "#DC2626",
      destructiveForeground: "#FFFFFF",
      border: "#CBD5E1",              // ✅ أغمق
      input: "#CBD5E1",
      ring: "#475569",
      radius: "0.625rem",
    },
    chatBubbleSent: '#334155',
    chatBubbleReceived: '#E2E8F0',    // ✅ أغمق من #F1F5F9
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#0F172A',
    overlay: 'rgba(15, 23, 42, 0.4)',
    overlayLight: 'rgba(71, 85, 105, 0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E2E8F0',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #F8FAFC)
    inputBorder: '#CBD5E1',
    inputFocusBorder: '#334155',
    inputText: '#0F172A',
    inputPlaceholder: '#94A3B8',
    headerBackground: '#FFFFFF',
    headerBorder: '#E2E8F0',
    switchActive: '#334155',
    switchInactive: '#CBD5E1',
    switchThumb: '#FFFFFF',
    switchTrack: '#E2E8F0',
  } as ThemePalette,
  dark: {

    primary: '#94A3B8', primaryLight: '#F1F5F9', primaryDark: '#64748B',
    primary50: '#020617', primary100: '#0F172A', primary200: '#1E293B', primary300: '#334155', primary400: '#475569', primary500: '#94A3B8', primary600: '#CBD5E1', primary700: '#E2E8F0', primary800: '#F1F5F9', primary900: '#F8FAFC',
    warm50: '#000000', warm100: '#020617', warm200: '#0F172A', warm300: '#1E293B', warm400: '#334155', warm500: '#64748B',
    background: '#000000', surface: '#020617', surfaceMuted: '#0F172A', surfaceElevated: '#020617',
    border: '#1E293B', borderLight: '#020617',
    text: '#F8FAFC', textSecondary: '#94A3B8', textTertiary: '#64748B', textInverse: '#000000',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00',
    errorDark: '#B91C1C',
    successDark: '#059669',
    infoDark: '#1D4ED8',
    tabBar: '#020617', tabBarBorder: '#0F172A', tabActive: '#F1F5F9', tabInactive: '#64748B',
    gradients: {
      primary: ['#E2E8F0', '#94A3B8', '#475569'] as const,
      warm: ['#CBD5E1', '#64748B'] as const,
      rose: ['#E2E8F0', '#94A3B8'] as const,
      auction: ['#64748B', '#334155'] as const,
    },
    shadcn: {
  background: "#000000",
  foreground: "#F8FAFC",
  card: "#020617",
  cardForeground: "#F8FAFC",
  popover: "#020617",
  popoverForeground: "#F8FAFC",
  primary: "#94A3B8",
  primaryForeground: "#000000",
  secondary: "#F1F5F9",
  secondaryForeground: "#000000",
  muted: "#0F172A",
  mutedForeground: "#94A3B8",
  accent: "#F1F5F9",
  accentForeground: "#000000",
  destructive: "#F87171",
  destructiveForeground: "#000000",
  border: "#1E293B",
  input: "#1E293B",
  ring: "#94A3B8",
  radius: "0.625rem"
},
    chatBubbleSent: '#1E293B', chatBubbleReceived: '#0F172A', chatBubbleTextSent: '#F8FAFC', chatBubbleTextReceived: '#F8FAFC',
    overlay: 'rgba(0, 0, 0, 0.8)', overlayLight: 'rgba(255, 255, 255, 0.05)',
    cardBackground: '#020617', cardBorder: '#1E293B', cardShadow: 'rgba(0, 0, 0, 0.5)',
    inputBackground: '#020617', inputBorder: '#1E293B', inputFocusBorder: '#94A3B8', inputText: '#F8FAFC', inputPlaceholder: '#64748B',
    headerBackground: '#000000', headerBorder: '#020617',
    switchActive: '#94A3B8', switchInactive: '#334155', switchThumb: '#F8FAFC', switchTrack: '#1E293B',
  
} as ThemePalette
};











// ==========================================
// 15. ثيم المخمل العنابي (Velvet Merlot)
// ثيم السحر والرومانسية الفائقة
// ==========================================

const themeVelvetMerlot = {
  light: {
    primary: '#801336',
    primaryLight: '#C9184A',
    primaryDark: '#580022',
    primary50: '#FFF0F3',
    primary100: '#FFCCD5',
    primary200: '#FFB3C1',
    primary300: '#FF8FA3',
    primary400: '#FF758F',
    primary500: '#801336',
    primary600: '#A4133C',
    primary700: '#800F2F',
    primary800: '#590D22',
    primary900: '#38040E',
    warm50: '#FFF5F5',
    warm100: '#FED7D7',
    warm200: '#FECACA',
    warm300: '#FCA5A5',
    warm400: '#F87171',
    warm500: '#FFB3C1',
    background: '#FFF0F3',
    surface: '#FFFFFF',
    surfaceMuted: '#FFB3C1',          // ✅ أغمق من #FFF5F7
    surfaceElevated: '#FFFFFF',
    border: '#FF758F',                // ✅ أغمق (كان #FFB3C1)
    borderLight: '#FFCCD5',
    text: '#2D132C',
    textSecondary: '#590D22',         // ✅ أغمق من #591029
    textTertiary: '#800F2F',          // ✅ أغمق
    textInverse: '#FFFFFF',
    success: '#D9381E',
    successLight: '#FFCCCC',          // ✅ أقل بهرجة من #FFE5E5
    warning: '#E65100',
    warningLight: '#FFF3E0',
    error: '#81007F',
    errorLight: '#F3E5F5',
    info: '#0029FF',
    infoLight: '#E8EAF6',
    tabBar: '#FFFFFF',
    tabBarBorder: '#FFB3C1',
    tabActive: '#801336',
    tabInactive: '#FF8FA3',
    gradients: {
      primary: ['#FF758F', '#A4133C', '#580022'] as const,
      warm: ['#FFCCD5', '#F87171'] as const,
      rose: ['#FFE5E5', '#C9184A'] as const,
      auction: ['#A4133C', '#580022'] as const,
    },
    shadcn: {
      background: "#FFF0F3",
      foreground: "#2D132C",
      card: "#FFFFFF",
      cardForeground: "#2D132C",
      popover: "#FFFFFF",
      popoverForeground: "#2D132C",
      primary: "#801336",
      primaryForeground: "#FFFFFF",
      secondary: "#FFB3C1",           // ✅ بدلاً من #C9184A (لون محايد أفتح)
      secondaryForeground: "#2D132C", // ✅ نص داكن
      muted: "#FFF5F7",
      mutedForeground: "#590D22",     // ✅ أغمق
      accent: "#FFCCD5",              // ✅ بدلاً من #C9184A
      accentForeground: "#2D132C",    // ✅ نص داكن
      destructive: "#81007F",
      destructiveForeground: "#FFFFFF",
      border: "#FF758F",              // ✅ أغمق
      input: "#FFCCD5",
      ring: "#801336",
      radius: "0.625rem",
    },
    chatBubbleSent: '#801336',
    chatBubbleReceived: '#FFB3C1',    // ✅ أغمق من #FFF5F7
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#2D132C',
    overlay: 'rgba(45, 19, 44, 0.5)',
    overlayLight: 'rgba(128, 19, 54, 0.08)',
    cardBackground: '#FFFFFF',
    cardBorder: '#FFB3C1',
    cardShadow: 'rgba(128, 19, 54, 0.15)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FFF0F3)
    inputBorder: '#FF758F',           // ✅ أغمق
    inputFocusBorder: '#801336',
    inputText: '#2D132C',
    inputPlaceholder: '#FF8FA3',
    headerBackground: '#FFFFFF',
    headerBorder: '#FFB3C1',
    switchActive: '#801336',
    switchInactive: '#FECACA',
    switchThumb: '#FFFFFF',
    switchTrack: '#FFB3C1',
  } as ThemePalette,
  dark: {

    primary: '#FF758F', primaryLight: '#FFB3C1', primaryDark: '#C9184A',
    primary50: '#38040E', primary100: '#590D22', primary200: '#800F2F', primary300: '#9F1239', primary400: '#C9184A', primary500: '#FF758F', primary600: '#FF4D6D', primary700: '#FFB3C1', primary800: '#FFCCD5', primary900: '#FFF0F3',
    warm50: '#1A0508', warm100: '#290912', warm200: '#40101D', warm300: '#581828', warm400: '#701F32', warm500: '#FF8FA3',
    background: '#050203', surface: '#1A0508', surfaceMuted: '#290912', surfaceElevated: '#40101D',
    border: '#800F2F', borderLight: '#40101D',
    text: '#FFF0F3', textSecondary: '#FFB3C1', textTertiary: '#C9184A', textInverse: '#050203',
    success: '#FF8787', successLight: '#2C0B0E', warning: '#FFB74D', warningLight: '#3E2723', error: '#FFA3A3', errorLight: '#2C0B0E', info: '#8C9EFF', infoLight: '#1A237E',
    warningDark: '#FFAB00', errorDark: '#FF1744', successDark: '#00E676', infoDark: '#2979FF',
    tabBar: '#1A0508', tabBarBorder: '#800F2F', tabActive: '#FF758F', tabInactive: '#9F1239',
    gradients: {
      primary: ['#FFB3C1', '#FF758F', '#800F2F'] as const, // 3 ألوان
      warm: ['#FF8FA3', '#581828'] as const, // لونان (استبدلنا #701F32 بـ #581828 لتناسب)
      rose: ['#FFB3C1', '#C9184A'] as const, // لونان
      auction: ['#FF4D6D', '#590D22'] as const, // لونان
    },
    shadcn: {
  background: "#050203",
  foreground: "#FFF0F3",
  card: "#1A0508",
  cardForeground: "#FFF0F3",
  popover: "#1A0508",
  popoverForeground: "#FFF0F3",
  primary: "#FF758F",
  primaryForeground: "#050203",
  secondary: "#FFB3C1",
  secondaryForeground: "#050203",
  muted: "#290912",
  mutedForeground: "#FFB3C1",
  accent: "#FFB3C1",
  accentForeground: "#050203",
  destructive: "#FFA3A3",
  destructiveForeground: "#050203",
  border: "#800F2F",
  input: "#40101D",
  ring: "#FF758F",
  radius: "0.625rem"
},
    chatBubbleSent: '#C9184A', chatBubbleReceived: '#290912', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#FFF0F3',
    overlay: 'rgba(5, 2, 3, 0.95)', overlayLight: 'rgba(255, 117, 143, 0.2)',
    cardBackground: '#1A0508', cardBorder: '#800F2F', cardShadow: 'rgba(255, 117, 143, 0.4)',
    inputBackground: '#1A0508', inputBorder: '#40101D', inputFocusBorder: '#FF758F', inputText: '#FFF0F3', inputPlaceholder: '#9F1239',
    headerBackground: '#050203', headerBorder: '#800F2F',
    switchActive: '#FF758F', switchInactive: '#40101D', switchThumb: '#FFF0F3', switchTrack: '#9F1239',
  
} as ThemePalette
};

// ==========================================
// 16. ثيم الماس الأسود (Noir Diamond)
// ثيم القوة والغموض والكارت الأسود
// ==========================================
const themeNoirDiamond = {
  light: {
    primary: '#000000',
    primaryLight: '#4B5563',
    primaryDark: '#000000',
    primary50: '#F9FAFB',
    primary100: '#F3F4F6',
    primary200: '#E5E7EB',
    primary300: '#D1D5DB',
    primary400: '#9CA3AF',
    primary500: '#000000',
    primary600: '#111827',
    primary700: '#000000',
    primary800: '#000000',
    primary900: '#000000',
    warm50: '#FFFFFF',
    warm100: '#F3F4F6',
    warm200: '#E5E7EB',
    warm300: '#D1D5DB',
    warm400: '#9CA3AF',
    warm500: '#6B7280',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    surfaceMuted: '#E5E7EB',          // ✅ أغمق من #F3F4F6
    surfaceElevated: '#FFFFFF',
    border: '#D1D5DB',                // ✅ أغمق (كان #E5E7EB)
    borderLight: '#F3F4F6',
    text: '#000000',
    textSecondary: '#1F2937',         // ✅ أغمق من #374151
    textTertiary: '#4B5563',          // ✅ أغمق من #6B7280
    textInverse: '#FFFFFF',
    success: '#059669',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#D97706',
    warningLight: '#FEF3C7',
    error: '#DC2626',
    errorLight: '#FEE2E2',
    info: '#2563EB',
    infoLight: '#DBEAFE',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E5E7EB',
    tabActive: '#000000',
    tabInactive: '#6B7280',
    gradients: {
      primary: ['#4B5563', '#1F2937', '#000000'] as const,
      warm: ['#D1D5DB', '#4B5563'] as const,
      rose: ['#E5E7EB', '#000000'] as const,
      auction: ['#111827', '#000000'] as const,
    },
    shadcn: {
      background: "#FFFFFF",
      foreground: "#000000",
      card: "#FFFFFF",
      cardForeground: "#000000",
      popover: "#FFFFFF",
      popoverForeground: "#000000",
      primary: "#000000",
      primaryForeground: "#FFFFFF",
      secondary: "#E5E7EB",           // ✅ بدلاً من #4B5563 (لون محايد أفتح)
      secondaryForeground: "#000000", // ✅ نص داكن
      muted: "#F3F4F6",
      mutedForeground: "#1F2937",     // ✅ أغمق
      accent: "#D1D5DB",              // ✅ بدلاً من #4B5563
      accentForeground: "#000000",    // ✅ نص داكن
      destructive: "#DC2626",
      destructiveForeground: "#FFFFFF",
      border: "#D1D5DB",              // ✅ أغمق
      input: "#D1D5DB",
      ring: "#000000",
      radius: "0.625rem",
    },
    chatBubbleSent: '#000000',
    chatBubbleReceived: '#E5E7EB',    // ✅ أغمق من #F3F4F6
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.03)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E7EB',
    cardShadow: 'rgba(0, 0, 0, 0.08)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #F9FAFB)
    inputBorder: '#D1D5DB',
    inputFocusBorder: '#000000',
    inputText: '#000000',
    inputPlaceholder: '#6B7280',
    headerBackground: '#FFFFFF',
    headerBorder: '#F3F4F6',
    switchActive: '#000000',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#E5E7EB',
  } as ThemePalette,
  dark: {

    primary: '#E5E4E2', primaryLight: '#FFFFFF', primaryDark: '#9CA3AF',
    primary50: '#000000', primary100: '#050505', primary200: '#0A0A0A', primary300: '#171717', primary400: '#262626', primary500: '#E5E4E2', primary600: '#F3F4F6', primary700: '#FFFFFF', primary800: '#FFFFFF', primary900: '#FFFFFF',
    warm50: '#000000', warm100: '#050505', warm200: '#0A0A0A', warm300: '#171717', warm400: '#262626', warm500: '#525252',
    background: '#000000', surface: '#050505', surfaceMuted: '#0A0A0A', surfaceElevated: '#050505',
    border: '#171717', borderLight: '#050505',
    text: '#F9FAFB', textSecondary: '#A3A3A3', textTertiary: '#525252', textInverse: '#000000',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00',
    errorDark: '#B91C1C',
    successDark: '#059669',
    infoDark: '#1D4ED8',
    tabBar: '#050505', tabBarBorder: '#0A0A0A', tabActive: '#E5E4E2', tabInactive: '#525252',
    gradients: {
      primary: ['#FFFFFF', '#E5E4E2', '#737373'] as const,
      warm: ['#525252', '#262626'] as const,
      rose: ['#404040', '#262626'] as const,
      auction: ['#262626', '#050505'] as const,
    },
    shadcn: {
  background: "#000000",
  foreground: "#F9FAFB",
  card: "#050505",
  cardForeground: "#F9FAFB",
  popover: "#050505",
  popoverForeground: "#F9FAFB",
  primary: "#E5E4E2",
  primaryForeground: "#000000",
  secondary: "#FFFFFF",
  secondaryForeground: "#000000",
  muted: "#0A0A0A",
  mutedForeground: "#A3A3A3",
  accent: "#FFFFFF",
  accentForeground: "#000000",
  destructive: "#F87171",
  destructiveForeground: "#000000",
  border: "#171717",
  input: "#171717",
  ring: "#E5E4E2",
  radius: "0.625rem"
},
    chatBubbleSent: '#262626', chatBubbleReceived: '#0A0A0A', chatBubbleTextSent: '#F9FAFB', chatBubbleTextReceived: '#F9FAFB',
    overlay: 'rgba(0, 0, 0, 0.9)', overlayLight: 'rgba(255, 255, 255, 0.05)',
    cardBackground: '#050505', cardBorder: '#171717', cardShadow: 'rgba(255, 255, 255, 0.05)',
    inputBackground: '#050505', inputBorder: '#171717', inputFocusBorder: '#E5E4E2', inputText: '#F9FAFB', inputPlaceholder: '#525252',
    headerBackground: '#000000', headerBorder: '#050505',
    switchActive: '#E5E4E2', switchInactive: '#262626', switchThumb: '#F9FAFB', switchTrack: '#171717',
  
} as ThemePalette
};


// ==========================================
// 19. ثيم التيتانيوم الوردي (Titanium Rose)
// ثيم المستقبل والجاذبية العصرية والنيون
// ==========================================
const themeTitaniumRose = {
  light: {
    primary: '#DB2777',
    primaryLight: '#F472B6',
    primaryDark: '#9D174D',
    primary50: '#FDF2F8',
    primary100: '#FCE7F3',
    primary200: '#FBCFE8',
    primary300: '#F9A8D4',
    primary400: '#F472B6',
    primary500: '#DB2777',
    primary600: '#BE185D',
    primary700: '#9D174D',
    primary800: '#831843',
    primary900: '#500724',
    warm50: '#F3F4F6',
    warm100: '#E5E7EB',
    warm200: '#D1D5DB',
    warm300: '#9CA3AF',
    warm400: '#6B7280',
    warm500: '#4B5563',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    surfaceMuted: '#E5E7EB',          // ✅ أغمق من #F3F4F6
    surfaceElevated: '#FFFFFF',
    border: '#D1D5DB',                // ✅ أغمق (كان #E5E7EB)
    borderLight: '#F3F4F6',
    text: '#111827',
    textSecondary: '#374151',         // يبقى (جيد)
    textTertiary: '#6B7280',          // ✅ أغمق (كان #6B7280 ثابت)
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E5E7EB',
    tabActive: '#DB2777',
    tabInactive: '#9CA3AF',
    gradients: {
      primary: ['#F472B6', '#DB2777', '#831843'] as const,
      warm: ['#F9A8D4', '#DB2777'] as const,
      rose: ['#FCE7F3', '#DB2777'] as const,
      auction: ['#BE185D', '#831843'] as const,
    },
    shadcn: {
      background: "#F9FAFB",
      foreground: "#111827",
      card: "#FFFFFF",
      cardForeground: "#111827",
      popover: "#FFFFFF",
      popoverForeground: "#111827",
      primary: "#DB2777",
      primaryForeground: "#FFFFFF",
      secondary: "#E5E7EB",           // ✅ بدلاً من #F472B6 (لون محايد)
      secondaryForeground: "#111827", // ✅ نص داكن
      muted: "#F3F4F6",
      mutedForeground: "#374151",
      accent: "#FBCFE8",              // ✅ وردي فاتح بدلاً من #F472B6
      accentForeground: "#111827",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#D1D5DB",              // ✅ أغمق
      input: "#D1D5DB",
      ring: "#DB2777",
      radius: "0.625rem",
    },
    chatBubbleSent: '#DB2777',
    chatBubbleReceived: '#E5E7EB',    // ✅ أغمق من #F3F4F6
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#111827',
    overlay: 'rgba(17, 24, 39, 0.4)',
    overlayLight: 'rgba(219, 39, 119, 0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E7EB',
    cardShadow: 'rgba(219, 39, 119, 0.1)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #F9FAFB)
    inputBorder: '#D1D5DB',
    inputFocusBorder: '#DB2777',
    inputText: '#111827',
    inputPlaceholder: '#9CA3AF',
    headerBackground: '#FFFFFF',
    headerBorder: '#E5E7EB',
    switchActive: '#DB2777',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#E5E7EB',
  } as ThemePalette,  dark: {

    primary: '#F472B6', primaryLight: '#FBCFE8', primaryDark: '#DB2777',
    primary50: '#4A044E', primary100: '#701A75', primary200: '#831843', primary300: '#9D174D', primary400: '#BE185D', primary500: '#F472B6', primary600: '#F472B6', primary700: '#FBCFE8', primary800: '#FBCFE8', primary900: '#FDF2F8',
    warm50: '#111827', warm100: '#1F2937', warm200: '#374151', warm300: '#4B5563', warm400: '#6B7280', warm500: '#9CA3AF',
    background: '#0F172A', surface: '#1E293B', surfaceMuted: '#334155', surfaceElevated: '#1E293B',
    border: '#334155', borderLight: '#1E293B',
    text: '#F9FAFB', textSecondary: '#D1D5DB', textTertiary: '#9CA3AF', textInverse: '#0F172A',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FFAB00',
    errorDark: '#FF1744',
    successDark: '#00E676',
    infoDark: '#2979FF',
    tabBar: '#1E293B', tabBarBorder: '#334155', tabActive: '#F472B6', tabInactive: '#6B7280',
    gradients: {
      primary: ['#FBCFE8', '#F472B6', '#831843'] as const,
      warm: ['#F9A8D4', '#DB2777'] as const,
      rose: ['#FCE7F3', '#DB2777'] as const,
      auction: ['#DB2777', '#701A75'] as const,
    },
    shadcn: {
  background: "#0F172A",
  foreground: "#F9FAFB",
  card: "#1E293B",
  cardForeground: "#F9FAFB",
  popover: "#1E293B",
  popoverForeground: "#F9FAFB",
  primary: "#F472B6",
  primaryForeground: "#0F172A",
  secondary: "#FBCFE8",
  secondaryForeground: "#0F172A",
  muted: "#334155",
  mutedForeground: "#D1D5DB",
  accent: "#FBCFE8",
  accentForeground: "#0F172A",
  destructive: "#F87171",
  destructiveForeground: "#0F172A",
  border: "#334155",
  input: "#475569",
  ring: "#F472B6",
  radius: "0.625rem"
},
    chatBubbleSent: '#DB2777', chatBubbleReceived: '#334155', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#F9FAFB',
    overlay: 'rgba(15, 23, 42, 0.8)', overlayLight: 'rgba(244, 114, 182, 0.1)',
    cardBackground: '#1E293B', cardBorder: '#334155', cardShadow: 'rgba(0, 0, 0, 0.4)',
    inputBackground: '#1E293B', inputBorder: '#475569', inputFocusBorder: '#F472B6', inputText: '#F9FAFB', inputPlaceholder: '#6B7280',
    headerBackground: '#0F172A', headerBorder: '#1E293B',
    switchActive: '#F472B6', switchInactive: '#475569', switchThumb: '#F9FAFB', switchTrack: '#334155',
  
} as ThemePalette
};

















































































// ==========================================
// 18. ثيم اللؤلؤ المتدرج (Iridescent Pearl)
// ثيم المجوهرات والأنوثة الناعمة والنقاء
// ==========================================
const themeIridescentPearl = {
  light: {
    primary: '#B7AA99',
    primaryLight: '#D6CFC6',
    primaryDark: '#8B8070',
    primary50: '#FAF9F7',
    primary100: '#F3F0ED',
    primary200: '#E6E0D9',
    primary300: '#D6CFC6',
    primary400: '#C4BCB1',
    primary500: '#B7AA99',
    primary600: '#9C8F7F',
    primary700: '#807566',
    primary800: '#655C4F',
    primary900: '#4A4338',
    warm50: '#FFFBF0',
    warm100: '#FFF5D6',
    warm200: '#FFECAD',
    warm300: '#FFE283',
    warm400: '#FFD759',
    warm500: '#FFCD2F',
    background: '#FAF9F7',
    surface: '#FFFFFF',
    surfaceMuted: '#D6CFC6',          // ✅ أغمق من #F3F0ED
    surfaceElevated: '#FFFFFF',
    border: '#C4BCB1',                // ✅ أغمق (كان #E6E0D9)
    borderLight: '#F3F0ED',
    text: '#2C2A27',
    textSecondary: '#4A4338',         // ✅ أغمق من #5C554D
    textTertiary: '#655C4F',          // ✅ أغمق من #8B8070
    textInverse: '#FFFFFF',
    success: '#0891B2',
    successLight: '#CFFAFE',
    warning: '#B45309',
    warningLight: '#FEF3C7',
    error: '#BE123C',
    errorLight: '#FCE7F3',
    info: '#4F46E5',
    infoLight: '#EEF2FF',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E6E0D9',
    tabActive: '#B7AA99',
    tabInactive: '#C4BCB1',
    gradients: {
      primary: ['#D6CFC6', '#B7AA99', '#8B8070'] as const,
      warm: ['#E6E0D9', '#B7AA99'] as const,
      rose: ['#F3F0ED', '#B7AA99'] as const,
      auction: ['#B7AA99', '#8B8070'] as const,
    },
    shadcn: {
      background: "#FAF9F7",
      foreground: "#2C2A27",
      card: "#FFFFFF",
      cardForeground: "#2C2A27",
      popover: "#FFFFFF",
      popoverForeground: "#2C2A27",
      primary: "#B7AA99",
      primaryForeground: "#FFFFFF",
      secondary: "#D6CFC6",           // ✅ بدلاً من D6CFC6 (يبقى لكن مع نص داكن)
      secondaryForeground: "#2C2A27", // ✅ نص داكن
      muted: "#F3F0ED",
      mutedForeground: "#4A4338",     // ✅ أغمق
      accent: "#E6E0D9",              // ✅ بدلاً من D6CFC6 (أفتح قليلاً)
      accentForeground: "#2C2A27",    // ✅ نص داكن
      destructive: "#BE123C",
      destructiveForeground: "#FFFFFF",
      border: "#C4BCB1",              // ✅ أغمق
      input: "#C4BCB1",               // ✅ أغمق
      ring: "#B7AA99",
      radius: "0.625rem",
    },
    chatBubbleSent: '#B7AA99',
    chatBubbleReceived: '#E6E0D9',    // ✅ أغمق من #F3F0ED
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#2C2A27',
    overlay: 'rgba(44, 42, 39, 0.4)',
    overlayLight: 'rgba(183, 170, 153, 0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E6E0D9',
    cardShadow: 'rgba(183, 170, 153, 0.08)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FAF9F7)
    inputBorder: '#C4BCB1',           // ✅ أغمق
    inputFocusBorder: '#B7AA99',
    inputText: '#2C2A27',
    inputPlaceholder: '#807566',
    headerBackground: '#FFFFFF',
    headerBorder: '#E6E0D9',
    switchActive: '#B7AA99',
    switchInactive: '#D6CFC6',
    switchThumb: '#FFFFFF',
    switchTrack: '#E6E0D9',
  } as ThemePalette,
  dark: {

    primary: '#D6CFC6', primaryLight: '#F3F0ED', primaryDark: '#9C8F7F',
    primary50: '#2C2A27', primary100: '#4A4338', primary200: '#655C4F', primary300: '#807566', primary400: '#9C8F7F', primary500: '#B7AA99', primary600: '#C4BCB1', primary700: '#D6CFC6', primary800: '#EBE8E4', primary900: '#FFFFFF',
    warm50: '#1C1A16', warm100: '#2C2A27', warm200: '#4A4338', warm300: '#655C4F', warm400: '#807566', warm500: '#9C8F7F',
    background: '#141210', surface: '#2C2A27', surfaceMuted: '#4A4338', surfaceElevated: '#2C2A27',
    border: '#4A4338', borderLight: '#2C2A27',
    text: '#FDFBF9', textSecondary: '#D6CFC6', textTertiary: '#9C8F7F', textInverse: '#141210',
    success: '#22D3EE', successLight: '#164E63', warning: '#FBBF24', warningLight: '#451A03', error: '#FB7185', errorLight: '#881337', info: '#818CF8', infoLight: '#312E81',
    warningDark: '#F59E0B',
    errorDark: '#E11D48',
    successDark: '#0D9488',
    infoDark: '#4338CA',
    tabBar: '#2C2A27', tabBarBorder: '#4A4338', tabActive: '#D6CFC6', tabInactive: '#807566',
    gradients: {
      primary: ['#F3F0ED', '#D6CFC6', '#9C8F7F'] as const,
      warm: ['#EBE8E4', '#B7AA99'] as const,
      rose: ['#E6E0D9', '#B7AA99'] as const,
      auction: ['#9C8F7F', '#655C4F'] as const,
    },
    shadcn: {
  background: "#141210",
  foreground: "#FDFBF9",
  card: "#2C2A27",
  cardForeground: "#FDFBF9",
  popover: "#2C2A27",
  popoverForeground: "#FDFBF9",
  primary: "#D6CFC6",
  primaryForeground: "#141210",
  secondary: "#F3F0ED",
  secondaryForeground: "#141210",
  muted: "#4A4338",
  mutedForeground: "#D6CFC6",
  accent: "#F3F0ED",
  accentForeground: "#141210",
  destructive: "#FB7185",
  destructiveForeground: "#141210",
  border: "#4A4338",
  input: "#4A4338",
  ring: "#D6CFC6",
  radius: "0.625rem"
},
    chatBubbleSent: '#B7AA99', chatBubbleReceived: '#4A4338', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#FDFBF9',
    overlay: 'rgba(20, 18, 16, 0.8)', overlayLight: 'rgba(214, 207, 198, 0.08)',
    cardBackground: '#2C2A27', cardBorder: '#4A4338', cardShadow: 'rgba(0, 0, 0, 0.4)',
    inputBackground: '#2C2A27', inputBorder: '#4A4338', inputFocusBorder: '#D6CFC6', inputText: '#FDFBF9', inputPlaceholder: '#807566',
    headerBackground: '#141210', headerBorder: '#2C2A27',
    switchActive: '#D6CFC6', switchInactive: '#4A4338', switchThumb: '#FDFBF9', switchTrack: '#4A4338',
  
} as ThemePalette
};



// ==========================================
// 17. ثيم الزمرد التمساحي (Imperial Crocodile)
// ثيم الهرمس والطبيعة الغنية والجلود الفاخرة
// ==========================================
const themeImperialCrocodile = {
  light: {
    primary: '#064E3B',
    primaryLight: '#34D399',
    primaryDark: '#022C22',
    primary50: '#ECFDF5',
    primary100: '#D1FAE5',
    primary200: '#A7F3D0',
    primary300: '#6EE7B7',
    primary400: '#34D399',
    primary500: '#064E3B',
    primary600: '#047857',
    primary700: '#065F46',
    primary800: '#064E3B',
    primary900: '#022C22',
    warm50: '#FFFDF8',
    warm100: '#FFFBEB',
    warm200: '#FEF3C7',
    warm300: '#FDE68A',
    warm400: '#FCD34D',
    warm500: '#FBBF24',
    background: '#F0FDF4',
    surface: '#FFFFFF',
    surfaceMuted: '#A7F3D0',          // ✅ أغمق من #ECFDF5
    surfaceElevated: '#FFFFFF',
    border: '#6EE7B7',                // ✅ أغمق (كان #A7F3D0)
    borderLight: '#ECFDF5',
    text: '#022C22',
    textSecondary: '#064E3B',         // يبقى (جيد)
    textTertiary: '#047857',          // يبقى
    textInverse: '#FFFFFF',
    success: '#047857',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#B45309',
    warningLight: '#FEF3C7',
    error: '#B91C1C',
    errorLight: '#FEE2E2',
    info: '#1D4ED8',
    infoLight: '#DBEAFE',
    tabBar: '#FFFFFF',
    tabBarBorder: '#A7F3D0',
    tabActive: '#064E3B',
    tabInactive: '#6EE7B7',
    gradients: {
      primary: ['#34D399', '#059669', '#022C22'] as const,
      warm: ['#6EE7B7', '#059669'] as const,
      rose: ['#D1FAE5', '#064E3B'] as const,
      auction: ['#047857', '#022C22'] as const,
    },
    shadcn: {
      background: "#F0FDF4",
      foreground: "#022C22",
      card: "#FFFFFF",
      cardForeground: "#022C22",
      popover: "#FFFFFF",
      popoverForeground: "#022C22",
      primary: "#064E3B",
      primaryForeground: "#FFFFFF",
      secondary: "#A7F3D0",           // ✅ بدلاً من #34D399 (لون محايد)
      secondaryForeground: "#022C22", // ✅ نص داكن
      muted: "#ECFDF5",
      mutedForeground: "#064E3B",
      accent: "#D1FAE5",              // ✅ بدلاً من #34D399
      accentForeground: "#022C22",    // ✅ نص داكن
      destructive: "#B91C1C",
      destructiveForeground: "#FFFFFF",
      border: "#6EE7B7",              // ✅ أغمق
      input: "#6EE7B7",               // ✅ أغمق
      ring: "#064E3B",
      radius: "0.625rem",
    },
    chatBubbleSent: '#064E3B',
    chatBubbleReceived: '#D1FAE5',    // ✅ أغمق قليلاً
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#022C22',
    overlay: 'rgba(2, 44, 34, 0.4)',
    overlayLight: 'rgba(6, 78, 59, 0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#A7F3D0',
    cardShadow: 'rgba(6, 78, 59, 0.1)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #F0FDF4)
    inputBorder: '#6EE7B7',           // ✅ أغمق
    inputFocusBorder: '#064E3B',
    inputText: '#022C22',
    inputPlaceholder: '#34D399',
    headerBackground: '#FFFFFF',
    headerBorder: '#A7F3D0',
    switchActive: '#064E3B',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#A7F3D0',
  } as ThemePalette,
  dark: {

    primary: '#34D399', primaryLight: '#6EE7B7', primaryDark: '#059669',
    primary50: '#022C22', primary100: '#064E3B', primary200: '#065F46', primary300: '#047857', primary400: '#059669', primary500: '#34D399', primary600: '#6EE7B7', primary700: '#A7F3D0', primary800: '#D1FAE5', primary900: '#ECFDF5',
    warm50: '#022C22', warm100: '#064E3B', warm200: '#065F46', warm300: '#047857', warm400: '#059669', warm500: '#34D399',
    background: '#011512', surface: '#022C22', surfaceMuted: '#064E3B', surfaceElevated: '#065F46',
    border: '#064E3B', borderLight: '#022C22',
    text: '#ECFDF5', textSecondary: '#6EE7B7', textTertiary: '#059669', textInverse: '#011512',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FFAB00',
    errorDark: '#DC2626',
    successDark: '#10B981',
    infoDark: '#2563EB',
    tabBar: '#022C22', tabBarBorder: '#064E3B', tabActive: '#34D399', tabInactive: '#047857',
    gradients: {
      primary: ['#6EE7B7', '#34D399', '#022C22'] as const,
      warm: ['#34D399', '#059669'] as const,
      rose: ['#A7F3D0', '#059669'] as const,
      auction: ['#059669', '#022C22'] as const,
    },
    shadcn: {
  background: "#011512",
  foreground: "#ECFDF5",
  card: "#022C22",
  cardForeground: "#ECFDF5",
  popover: "#022C22",
  popoverForeground: "#ECFDF5",
  primary: "#34D399",
  primaryForeground: "#011512",
  secondary: "#6EE7B7",
  secondaryForeground: "#011512",
  muted: "#064E3B",
  mutedForeground: "#6EE7B7",
  accent: "#6EE7B7",
  accentForeground: "#011512",
  destructive: "#F87171",
  destructiveForeground: "#011512",
  border: "#064E3B",
  input: "#064E3B",
  ring: "#34D399",
  radius: "0.625rem"
},
    chatBubbleSent: '#059669', chatBubbleReceived: '#064E3B', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#ECFDF5',
    overlay: 'rgba(1, 21, 18, 0.9)', overlayLight: 'rgba(52, 211, 153, 0.1)',
    cardBackground: '#022C22', cardBorder: '#064E3B', cardShadow: 'rgba(52, 211, 153, 0.15)',
    inputBackground: '#022C22', inputBorder: '#064E3B', inputFocusBorder: '#34D399', inputText: '#ECFDF5', inputPlaceholder: '#047857',
    headerBackground: '#011512', headerBorder: '#022C22',
    switchActive: '#34D399', switchInactive: '#064E3B', switchThumb: '#ECFDF5', switchTrack: '#064E3B',
  
} as ThemePalette
};





// ==========================================
// 💎 19. سوليتير الألماس (Diamond Solitaire)
// ==========================================
const themeDiamondSolitaire = {
  light: {
    primary: '#0A0A0A',
    primaryLight: '#E5E4E2',
    primaryDark: '#B0B0B0',
    primary50: '#FFFFFF',
    primary100: '#F8F9FA',
    primary200: '#E9ECEF',
    primary300: '#DEE2E6',
    primary400: '#CED4DA',
    primary500: '#E5E4E2',
    primary600: '#A0A0A0',
    primary700: '#707070',
    primary800: '#404040',
    primary900: '#0A0A0A',
    warm50: '#FFFFFF',
    warm100: '#F8F9FA',
    warm200: '#E9ECEF',
    warm300: '#DEE2E6',
    warm400: '#CED4DA',
    warm500: '#E5E4E2',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceMuted: '#DEE2E6',          // ✅ أغمق من #F1F3F5
    surfaceElevated: '#FFFFFF',
    border: '#CED4DA',                // ✅ أغمق (كان #E9ECEF)
    borderLight: '#F8F9FA',
    text: '#0A0A0A',
    textSecondary: '#404040',         // ✅ أغمق (كان #404040 ثابت)
    textTertiary: '#707070',          // ✅ أغمق من #A0A0A0
    textInverse: '#FFFFFF',
    success: '#0A0A0A',
    successLight: '#E9ECEF',          // ✅ أقل بهرجة
    warning: '#0A0A0A',
    warningLight: '#E9ECEF',
    error: '#0A0A0A',
    errorLight: '#E9ECEF',
    info: '#0A0A0A',
    infoLight: '#E9ECEF',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E9ECEF',
    tabActive: '#0A0A0A',
    tabInactive: '#707070',
    gradients: {
      primary: ['#FFFFFF', '#E5E4E2', '#0A0A0A'] as const,
      warm: ['#DEE2E6', '#0A0A0A'] as const,
      rose: ['#F8F9FA', '#404040'] as const,
      auction: ['#0A0A0A', '#404040'] as const,
    },
    shadcn: {
      background: "#FFFFFF",
      foreground: "#0A0A0A",
      card: "#FFFFFF",
      cardForeground: "#0A0A0A",
      popover: "#FFFFFF",
      popoverForeground: "#0A0A0A",
      primary: "#0A0A0A",
      primaryForeground: "#FFFFFF",
      secondary: "#DEE2E6",           // ✅ بدلاً من #E5E4E2 (أغمق قليلاً)
      secondaryForeground: "#0A0A0A", // ✅ نص داكن
      muted: "#F1F3F5",
      mutedForeground: "#404040",
      accent: "#E9ECEF",              // ✅ بدلاً من #E5E4E2
      accentForeground: "#0A0A0A",    // ✅ نص داكن
      destructive: "#0A0A0A",
      destructiveForeground: "#FFFFFF",
      border: "#CED4DA",              // ✅ أغمق
      input: "#CED4DA",
      ring: "#0A0A0A",
      radius: "0.625rem",
    },
    chatBubbleSent: '#0A0A0A',
    chatBubbleReceived: '#DEE2E6',    // ✅ أغمق من #F1F3F5
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#0A0A0A',
    overlay: 'rgba(0,0,0,0.6)',
    overlayLight: 'rgba(0,0,0,0.03)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E9ECEF',
    cardShadow: 'rgba(0,0,0,0.05)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #F8F9FA)
    inputBorder: '#CED4DA',
    inputFocusBorder: '#0A0A0A',
    inputText: '#0A0A0A',
    inputPlaceholder: '#707070',
    headerBackground: '#FFFFFF',
    headerBorder: '#F8F9FA',
    switchActive: '#0A0A0A',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#E9ECEF',
  } as ThemePalette,
  dark: {

    primary: '#E5E4E2', primaryLight: '#FFFFFF', primaryDark: '#B0B0B0',
    primary50: '#0A0A0A', primary100: '#1F1F1F', primary200: '#333333', primary300: '#404040', primary400: '#707070', primary500: '#E5E4E2', primary600: '#B0B0B0', primary700: '#E5E4E2', primary800: '#333333', primary900: '#1F1F1F',
    warm50: '#0A0A0A', warm100: '#1F1F1F', warm200: '#333333', warm300: '#404040', warm400: '#707070', warm500: '#E5E4E2',
    background: '#000000', surface: '#0A0A0A', surfaceMuted: '#1F1F1F', surfaceElevated: '#0A0A0A',
    border: '#333333', borderLight: '#0A0A0A',
    text: '#FFFFFF', textSecondary: '#B0B0B0', textTertiary: '#707070', textInverse: '#000000',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#0A0A0A', tabBarBorder: '#1F1F1F', tabActive: '#E5E4E2', tabInactive: '#707070',
    gradients: {
      primary: ['#FFFFFF', '#E5E4E2', '#B0B0B0'] as const, warm: ['#E5E4E2', '#0A0A0A'] as const,
      rose: ['#F8F9FA', '#333333'] as const, auction: ['#0A0A0A', '#404040'] as const,
    },
    shadcn: {
  background: "#000000",
  foreground: "#FFFFFF",
  card: "#0A0A0A",
  cardForeground: "#FFFFFF",
  popover: "#0A0A0A",
  popoverForeground: "#FFFFFF",
  primary: "#E5E4E2",
  primaryForeground: "#000000",
  secondary: "#FFFFFF",
  secondaryForeground: "#000000",
  muted: "#1F1F1F",
  mutedForeground: "#B0B0B0",
  accent: "#FFFFFF",
  accentForeground: "#000000",
  destructive: "#F87171",
  destructiveForeground: "#000000",
  border: "#333333",
  input: "#1F1F1F",
  ring: "#E5E4E2",
  radius: "0.625rem"
},
    chatBubbleSent: '#E5E4E2', chatBubbleReceived: '#1F1F1F', chatBubbleTextSent: '#000000', chatBubbleTextReceived: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.85)', overlayLight: 'rgba(255,255,255,0.05)',
    cardBackground: '#0A0A0A', cardBorder: '#1F1F1F', cardShadow: 'rgba(0,0,0,0.6)',
    inputBackground: '#0A0A0A', inputBorder: '#1F1F1F', inputFocusBorder: '#E5E4E2', inputText: '#FFFFFF', inputPlaceholder: '#707070',
    headerBackground: '#000000', headerBorder: '#0A0A0A', switchActive: '#E5E4E2', switchInactive: '#333333', switchThumb: '#FFFFFF', switchTrack: '#1F1F1F',
  
} as ThemePalette
};

// ==========================================
// 🔱 20. البلاتين الملكي (Royal Platinum)
// ==========================================
const themeRoyalPlatinum = {
  light: {
    primary: '#5F6A72',
    primaryLight: '#C0C8CE',
    primaryDark: '#2C3136',
    primary50: '#F8F9FA',
    primary100: '#F1F3F5',
    primary200: '#E2E6EA',
    primary300: '#C0C8CE',
    primary400: '#8E99A1',
    primary500: '#5F6A72',
    primary600: '#4B555C',
    primary700: '#3A4348',
    primary800: '#2C3136',
    primary900: '#1A1E21',
    warm50: '#FFFFFF',
    warm100: '#F8F9FA',
    warm200: '#F1F3F5',
    warm300: '#E2E6EA',
    warm400: '#C0C8CE',
    warm500: '#8E99A1',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    surfaceMuted: '#E2E6EA',          // ✅ أغمق من #F1F3F5
    surfaceElevated: '#FFFFFF',
    border: '#C0C8CE',                // ✅ أغمق (كان #E2E6EA)
    borderLight: '#F8F9FA',
    text: '#1A1E21',
    textSecondary: '#3A4348',         // ✅ أغمق من #4B555C
    textTertiary: '#5F6A72',          // ✅ أغمق من #8E99A1
    textInverse: '#FFFFFF',
    success: '#2C3136',
    successLight: '#C0C8CE',          // ✅ أقل بهرجة
    warning: '#2C3136',
    warningLight: '#C0C8CE',
    error: '#2C3136',
    errorLight: '#C0C8CE',
    info: '#2C3136',
    infoLight: '#C0C8CE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E2E6EA',
    tabActive: '#2C3136',
    tabInactive: '#8E99A1',
    gradients: {
      primary: ['#C0C8CE', '#5F6A72', '#1A1E21'] as const,
      warm: ['#8E99A1', '#2C3136'] as const,
      rose: ['#F1F3F5', '#4B555C'] as const,
      auction: ['#2C3136', '#1A1E21'] as const,
    },
    shadcn: {
      background: "#F8F9FA",
      foreground: "#1A1E21",
      card: "#FFFFFF",
      cardForeground: "#1A1E21",
      popover: "#FFFFFF",
      popoverForeground: "#1A1E21",
      primary: "#5F6A72",
      primaryForeground: "#FFFFFF",
      secondary: "#E2E6EA",           // ✅ بدلاً من #C0C8CE (لون محايد)
      secondaryForeground: "#1A1E21", // ✅ نص داكن
      muted: "#F1F3F5",
      mutedForeground: "#3A4348",     // ✅ أغمق
      accent: "#C0C8CE",              // ✅ بدلاً من #C0C8CE (يبقى)
      accentForeground: "#1A1E21",    // ✅ نص داكن
      destructive: "#2C3136",
      destructiveForeground: "#FFFFFF",
      border: "#C0C8CE",              // ✅ أغمق
      input: "#C0C8CE",
      ring: "#5F6A72",
      radius: "0.625rem",
    },
    chatBubbleSent: '#2C3136',
    chatBubbleReceived: '#E2E6EA',    // ✅ أغمق من #F1F3F5
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#1A1E21',
    overlay: 'rgba(26,30,33,0.5)',
    overlayLight: 'rgba(44,49,54,0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E2E6EA',
    cardShadow: 'rgba(0,0,0,0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #F8F9FA)
    inputBorder: '#C0C8CE',
    inputFocusBorder: '#2C3136',
    inputText: '#1A1E21',
    inputPlaceholder: '#8E99A1',
    headerBackground: '#FFFFFF',
    headerBorder: '#F1F3F5',
    switchActive: '#2C3136',
    switchInactive: '#D1D5DB',
    switchThumb: '#FFFFFF',
    switchTrack: '#E2E6EA',
  } as ThemePalette,
  dark: {

    primary: '#C0C8CE', primaryLight: '#F1F3F5', primaryDark: '#5F6A72',
    primary50: '#1A1E21', primary100: '#2C3136', primary200: '#3A4348', primary300: '#4B555C', primary400: '#5F6A72', primary500: '#C0C8CE', primary600: '#8E99A1', primary700: '#C0C8CE', primary800: '#F1F3F5', primary900: '#FFFFFF',
    warm50: '#1A1E21', warm100: '#2C3136', warm200: '#3A4348', warm300: '#4B555C', warm400: '#5F6A72', warm500: '#C0C8CE',
    background: '#0D0F10', surface: '#1A1E21', surfaceMuted: '#2C3136', surfaceElevated: '#1A1E21',
    border: '#3A4348', borderLight: '#1A1E21',
    text: '#FFFFFF', textSecondary: '#C0C8CE', textTertiary: '#8E99A1', textInverse: '#0D0F10',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#1A1E21', tabBarBorder: '#2C3136', tabActive: '#C0C8CE', tabInactive: '#5F6A72',
    gradients: {
      primary: ['#F1F3F5', '#C0C8CE', '#5F6A72'] as const, warm: ['#C0C8CE', '#2C3136'] as const,
      rose: ['#F1F3F5', '#3A4348'] as const, auction: ['#2C3136', '#1A1E21'] as const,
    },
    shadcn: {
  background: "#0D0F10",
  foreground: "#FFFFFF",
  card: "#1A1E21",
  cardForeground: "#FFFFFF",
  popover: "#1A1E21",
  popoverForeground: "#FFFFFF",
  primary: "#C0C8CE",
  primaryForeground: "#0D0F10",
  secondary: "#F1F3F5",
  secondaryForeground: "#0D0F10",
  muted: "#2C3136",
  mutedForeground: "#C0C8CE",
  accent: "#F1F3F5",
  accentForeground: "#0D0F10",
  destructive: "#F87171",
  destructiveForeground: "#0D0F10",
  border: "#3A4348",
  input: "#2C3136",
  ring: "#C0C8CE",
  radius: "0.625rem"
},
    chatBubbleSent: '#5F6A72', chatBubbleReceived: '#2C3136', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.8)', overlayLight: 'rgba(192,200,206,0.08)',
    cardBackground: '#1A1E21', cardBorder: '#2C3136', cardShadow: 'rgba(0,0,0,0.5)',
    inputBackground: '#1A1E21', inputBorder: '#2C3136', inputFocusBorder: '#C0C8CE', inputText: '#FFFFFF', inputPlaceholder: '#5F6A72',
    headerBackground: '#0D0F10', headerBorder: '#1A1E21', switchActive: '#C0C8CE', switchInactive: '#3A4348', switchThumb: '#FFFFFF', switchTrack: '#2C3136',
  
} as ThemePalette
};

// ==========================================
// ❤️‍🔥 21. العرش القرمزي (Crimson Throne)
// ==========================================
const themeCrimsonThrone = {
  light: {
    primary: '#A41623',
    primaryLight: '#FFADB9',
    primaryDark: '#3E000B',
    primary50: '#FFF0F2',
    primary100: '#FFE0E5',
    primary200: '#FFADB9',
    primary300: '#FF7A8E',
    primary400: '#E8455B',
    primary500: '#A41623',
    primary600: '#8A0F1A',
    primary700: '#6A0B14',
    primary800: '#4D080F',
    primary900: '#3E000B',
    warm50: '#FFFBF5',
    warm100: '#FFF5EB',
    warm200: '#FFE8D1',
    warm300: '#FFD6A5',
    warm400: '#FFC078',
    warm500: '#FFA64D',
    background: '#FFF5F5',
    surface: '#FFFFFF',
    surfaceMuted: '#FFADB9',          // ✅ أغمق من #FFE0E5
    surfaceElevated: '#FFFFFF',
    border: '#FF7A8E',                // ✅ أغمق (كان #FFADB9)
    borderLight: '#FFF0F2',
    text: '#1A0003',
    textSecondary: '#4D080F',         // ✅ أغمق من #4D080F (ثابت)
    textTertiary: '#6A0B14',          // ✅ أغمق من #8A0F1A
    textInverse: '#FFE0E5',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#FFADB9',
    tabActive: '#A41623',
    tabInactive: '#8A0F1A',
    gradients: {
      primary: ['#FFADB9', '#A41623', '#3E000B'] as const,
      warm: ['#FFA64D', '#A41623'] as const,
      rose: ['#FFE0E5', '#A41623'] as const,
      auction: ['#A41623', '#6A0B14'] as const,
    },
    shadcn: {
      background: "#FFF5F5",
      foreground: "#1A0003",
      card: "#FFFFFF",
      cardForeground: "#1A0003",
      popover: "#FFFFFF",
      popoverForeground: "#1A0003",
      primary: "#A41623",
      primaryForeground: "#FFE0E5",
      secondary: "#FFADB9",           // ✅ بدلاً من FFADB9 (يبقى)
      secondaryForeground: "#1A0003", // ✅ نص داكن (بدلاً من #FFE0E5)
      muted: "#FFE0E5",
      mutedForeground: "#4D080F",
      accent: "#FFE0E5",              // ✅ بدلاً من FFADB9
      accentForeground: "#1A0003",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#FF7A8E",              // ✅ أغمق
      input: "#FF7A8E",               // ✅ أغمق
      ring: "#A41623",
      radius: "0.625rem",
    },
    chatBubbleSent: '#A41623',
    chatBubbleReceived: '#FFADB9',    // ✅ أغمق من #FFE0E5
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#1A0003',
    overlay: 'rgba(30,0,3,0.5)',
    overlayLight: 'rgba(164,22,35,0.06)',
    cardBackground: '#FFFFFF',
    cardBorder: '#FFADB9',
    cardShadow: 'rgba(164,22,35,0.06)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FFF5F5)
    inputBorder: '#FF7A8E',           // ✅ أغمق
    inputFocusBorder: '#A41623',
    inputText: '#1A0003',
    inputPlaceholder: '#E8455B',
    headerBackground: '#FFFFFF',
    headerBorder: '#FFF0F2',
    switchActive: '#A41623',
    switchInactive: '#FFADB9',
    switchThumb: '#FFFFFF',
    switchTrack: '#FFE0E5',
  } as ThemePalette,
  dark: {

    primary: '#FF7A8E', primaryLight: '#FFADB9', primaryDark: '#A41623',
    primary50: '#1A0003', primary100: '#3E000B', primary200: '#6A0B14', primary300: '#8A0F1A', primary400: '#A41623', primary500: '#FF7A8E', primary600: '#FFADB9', primary700: '#FFE0E5', primary800: '#FFF0F2', primary900: '#FFFFFF',
    warm50: '#2A1004', warm100: '#3E1806', warm200: '#6B2E0C', warm300: '#8A3B10', warm400: '#B85C1A', warm500: '#FFA64D',
    background: '#0A0000', surface: '#1A0003', surfaceMuted: '#3E000B', surfaceElevated: '#1A0003',
    border: '#6A0B14', borderLight: '#1A0003',
    text: '#FFF0F2', textSecondary: '#FFADB9', textTertiary: '#FF7A8E', textInverse: '#0A0000',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#1A0003', tabBarBorder: '#3E000B', tabActive: '#FF7A8E', tabInactive: '#8A0F1A',
    gradients: {
      primary: ['#FFADB9', '#FF7A8E', '#A41623'] as const, warm: ['#FFA64D', '#A41623'] as const,
      rose: ['#FFE0E5', '#A41623'] as const, auction: ['#A41623', '#6A0B14'] as const,
    },
    shadcn: {
  background: "#0A0000",
  foreground: "#FFF0F2",
  card: "#1A0003",
  cardForeground: "#FFF0F2",
  popover: "#1A0003",
  popoverForeground: "#FFF0F2",
  primary: "#FF7A8E",
  primaryForeground: "#0A0000",
  secondary: "#FFADB9",
  secondaryForeground: "#0A0000",
  muted: "#3E000B",
  mutedForeground: "#FFADB9",
  accent: "#FFADB9",
  accentForeground: "#0A0000",
  destructive: "#F87171",
  destructiveForeground: "#0A0000",
  border: "#6A0B14",
  input: "#3E000B",
  ring: "#FF7A8E",
  radius: "0.625rem"
},
    chatBubbleSent: '#A41623', chatBubbleReceived: '#3E000B', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#FFF0F2',
    overlay: 'rgba(0,0,0,0.85)', overlayLight: 'rgba(255,122,142,0.1)',
    cardBackground: '#1A0003', cardBorder: '#3E000B', cardShadow: 'rgba(0,0,0,0.6)',
    inputBackground: '#1A0003', inputBorder: '#3E000B', inputFocusBorder: '#FF7A8E', inputText: '#FFF0F2', inputPlaceholder: '#8A0F1A',
    headerBackground: '#0A0000', headerBorder: '#1A0003', switchActive: '#FF7A8E', switchInactive: '#6A0B14', switchThumb: '#FFFFFF', switchTrack: '#3E000B',
  
} as ThemePalette
};

// ==========================================
// 👑 22. المخمل الذهبي (Golden Velvet)
// ==========================================
const themeGoldenVelvet = {
  light: {
    primary: '#B68B40',
    primaryLight: '#F3DEB7',
    primaryDark: '#6F4F1A',
    primary50: '#FFF8F0',
    primary100: '#FFEFDC',
    primary200: '#F3DEB7',
    primary300: '#DEC084',
    primary400: '#C9A54E',
    primary500: '#B68B40',
    primary600: '#9E7734',
    primary700: '#7F5F28',
    primary800: '#6F4F1A',
    primary900: '#4B340E',
    warm50: '#FFFDF8',
    warm100: '#FFF9EC',
    warm200: '#FFF0D0',
    warm300: '#FFE6B3',
    warm400: '#FFD699',
    warm500: '#FFC266',
    background: '#FFFDF8',
    surface: '#FFFFFF',
    surfaceMuted: '#F3DEB7',          // ✅ أغمق من #FFF9EC
    surfaceElevated: '#FFFFFF',
    border: '#DEC084',                // ✅ أغمق (كان #F3DEB7)
    borderLight: '#FFF8F0',
    text: '#3A2C14',
    textSecondary: '#6F4F1A',         // يبقى (جيد)
    textTertiary: '#9E7734',          // ✅ أغمق من #B68B40
    textInverse: '#FFFDF8',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#F3DEB7',
    tabActive: '#B68B40',
    tabInactive: '#B68B40',
    gradients: {
      primary: ['#F3DEB7', '#C9A54E', '#6F4F1A'] as const,
      warm: ['#FFE6B3', '#B68B40'] as const,
      rose: ['#FFEFDC', '#9E7734'] as const,
      auction: ['#B68B40', '#6F4F1A'] as const,
    },
    shadcn: {
      background: "#FFFDF8",
      foreground: "#3A2C14",
      card: "#FFFFFF",
      cardForeground: "#3A2C14",
      popover: "#FFFFFF",
      popoverForeground: "#3A2C14",
      primary: "#B68B40",
      primaryForeground: "#FFFDF8",
      secondary: "#F3DEB7",           // ✅ بدلاً من F3DEB7 (يبقى)
      secondaryForeground: "#3A2C14", // ✅ نص داكن
      muted: "#FFF9EC",
      mutedForeground: "#6F4F1A",
      accent: "#FFEFDC",              // ✅ بدلاً من F3DEB7
      accentForeground: "#3A2C14",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFDF8",
      border: "#DEC084",              // ✅ أغمق
      input: "#DEC084",               // ✅ أغمق
      ring: "#B68B40",
      radius: "0.625rem",
    },
    chatBubbleSent: '#B68B40',
    chatBubbleReceived: '#F3DEB7',    // ✅ أغمق قليلاً
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#3A2C14',
    overlay: 'rgba(58,44,20,0.4)',
    overlayLight: 'rgba(182,139,64,0.06)',
    cardBackground: '#FFFFFF',
    cardBorder: '#F3DEB7',
    cardShadow: 'rgba(0,0,0,0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FFFDF8)
    inputBorder: '#DEC084',           // ✅ أغمق
    inputFocusBorder: '#B68B40',
    inputText: '#3A2C14',
    inputPlaceholder: '#C9A54E',
    headerBackground: '#FFFFFF',
    headerBorder: '#FFF8F0',
    switchActive: '#B68B40',
    switchInactive: '#DEC084',
    switchThumb: '#FFFFFF',
    switchTrack: '#F3DEB7',
  } as ThemePalette,
  dark: {

    primary: '#F3DEB7', primaryLight: '#FFF8F0', primaryDark: '#B68B40',
    primary50: '#1A1106', primary100: '#3A2C14', primary200: '#4B340E', primary300: '#6F4F1A', primary400: '#9E7734', primary500: '#F3DEB7', primary600: '#DEC084', primary700: '#C9A54E', primary800: '#B68B40', primary900: '#9E7734',
    warm50: '#1A1106', warm100: '#3A2C14', warm200: '#4B340E', warm300: '#6F4F1A', warm400: '#9E7734', warm500: '#FFC266',
    background: '#0D0903', surface: '#1A1106', surfaceMuted: '#3A2C14', surfaceElevated: '#1A1106',
    border: '#4B340E', borderLight: '#1A1106',
    text: '#FFFDF8', textSecondary: '#F3DEB7', textTertiary: '#C9A54E', textInverse: '#0D0903',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#1A1106', tabBarBorder: '#3A2C14', tabActive: '#F3DEB7', tabInactive: '#B68B40',
    gradients: {
      primary: ['#FFF8F0', '#F3DEB7', '#B68B40'] as const, warm: ['#FFE6B3', '#B68B40'] as const,
      rose: ['#FFEFDC', '#9E7734'] as const, auction: ['#B68B40', '#6F4F1A'] as const,
    },
    shadcn: {
  background: "#0D0903",
  foreground: "#FFFDF8",
  card: "#1A1106",
  cardForeground: "#FFFDF8",
  popover: "#1A1106",
  popoverForeground: "#FFFDF8",
  primary: "#F3DEB7",
  primaryForeground: "#0D0903",
  secondary: "#FFF8F0",
  secondaryForeground: "#0D0903",
  muted: "#3A2C14",
  mutedForeground: "#F3DEB7",
  accent: "#FFF8F0",
  accentForeground: "#0D0903",
  destructive: "#F87171",
  destructiveForeground: "#0D0903",
  border: "#4B340E",
  input: "#3A2C14",
  ring: "#F3DEB7",
  radius: "0.625rem"
},
    chatBubbleSent: '#B68B40', chatBubbleReceived: '#3A2C14', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#FFFDF8',
    overlay: 'rgba(0,0,0,0.8)', overlayLight: 'rgba(243,222,183,0.08)',
    cardBackground: '#1A1106', cardBorder: '#3A2C14', cardShadow: 'rgba(0,0,0,0.5)',
    inputBackground: '#1A1106', inputBorder: '#3A2C14', inputFocusBorder: '#F3DEB7', inputText: '#FFFDF8', inputPlaceholder: '#B68B40',
    headerBackground: '#0D0903', headerBorder: '#1A1106', switchActive: '#F3DEB7', switchInactive: '#4B340E', switchThumb: '#FFFFFF', switchTrack: '#3A2C14',
  
} as ThemePalette
};

// ==========================================
// 🪷 23. لؤلؤة الكوتور (Pearl Couture)
// ==========================================
const themePearlCouture = {
  light: {
    primary: '#DFD9D1',
    primaryLight: '#FFFFFF',
    primaryDark: '#A89F97',
    primary50: '#FFFFFF',
    primary100: '#FDFCFB',
    primary200: '#F8F5F2',
    primary300: '#F0ECE7',
    primary400: '#E6E0D9',
    primary500: '#DFD9D1',
    primary600: '#C7BFB6',
    primary700: '#A89F97',
    primary800: '#8C837B',
    primary900: '#6A625C',
    warm50: '#FFFFFF',
    warm100: '#FDFCFB',
    warm200: '#F8F5F2',
    warm300: '#F0ECE7',
    warm400: '#E6E0D9',
    warm500: '#DFD9D1',
    background: '#FDFCFB',
    surface: '#FFFFFF',
    surfaceMuted: '#E6E0D9',          // ✅ أغمق من #F8F5F2
    surfaceElevated: '#FFFFFF',
    border: '#D1C9C1',                // ✅ أغمق (كان #F0ECE7)
    borderLight: '#FDFCFB',
    text: '#3A3430',
    textSecondary: '#6A625C',         // ✅ أغمق من #6A625C (ثابت)
    textTertiary: '#8C837B',          // ✅ أغمق من #A89F97
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#F0ECE7',
    tabActive: '#8C837B',
    tabInactive: '#C7BFB6',
    gradients: {
      primary: ['#FFFFFF', '#DFD9D1', '#8C837B'] as const,
      warm: ['#E6E0D9', '#8C837B'] as const,
      rose: ['#F8F5F2', '#6A625C'] as const,
      auction: ['#DFD9D1', '#6A625C'] as const,
    },
    shadcn: {
      background: "#FDFCFB",
      foreground: "#3A3430",
      card: "#FFFFFF",
      cardForeground: "#3A3430",
      popover: "#FFFFFF",
      popoverForeground: "#3A3430",
      primary: "#DFD9D1",
      primaryForeground: "#FFFFFF",
      secondary: "#E6E0D9",           // ✅ بدلاً من #FFFFFF
      secondaryForeground: "#3A3430", // ✅ نص داكن
      muted: "#F8F5F2",
      mutedForeground: "#6A625C",
      accent: "#F0ECE7",              // ✅ بدلاً من #FFFFFF
      accentForeground: "#3A3430",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#D1C9C1",              // ✅ أغمق
      input: "#D1C9C1",
      ring: "#DFD9D1",
      radius: "0.625rem",
    },
    chatBubbleSent: '#8C837B',
    chatBubbleReceived: '#E6E0D9',    // ✅ أغمق من #F8F5F2
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#3A3430',
    overlay: 'rgba(58,52,48,0.3)',
    overlayLight: 'rgba(0,0,0,0.02)',
    cardBackground: '#FFFFFF',
    cardBorder: '#F0ECE7',
    cardShadow: 'rgba(0,0,0,0.02)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FDFCFB)
    inputBorder: '#D1C9C1',           // ✅ أغمق
    inputFocusBorder: '#8C837B',
    inputText: '#3A3430',
    inputPlaceholder: '#A89F97',
    headerBackground: '#FFFFFF',
    headerBorder: '#F8F5F2',
    switchActive: '#8C837B',
    switchInactive: '#E6E0D9',
    switchThumb: '#FFFFFF',
    switchTrack: '#F0ECE7',
  } as ThemePalette,
  dark: {

    primary: '#DFD9D1', primaryLight: '#FFFFFF', primaryDark: '#8C837B',
    primary50: '#2A2724', primary100: '#3A3430', primary200: '#4F4842', primary300: '#6A625C', primary400: '#8C837B', primary500: '#DFD9D1', primary600: '#C7BFB6', primary700: '#A89F97', primary800: '#DFD9D1', primary900: '#FFFFFF',
    warm50: '#2A2724', warm100: '#3A3430', warm200: '#4F4842', warm300: '#6A625C', warm400: '#8C837B', warm500: '#DFD9D1',
    background: '#1C1A18', surface: '#2A2724', surfaceMuted: '#3A3430', surfaceElevated: '#2A2724',
    border: '#4F4842', borderLight: '#2A2724',
    text: '#FFFFFF', textSecondary: '#DFD9D1', textTertiary: '#A89F97', textInverse: '#1C1A18',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#2A2724', tabBarBorder: '#3A3430', tabActive: '#DFD9D1', tabInactive: '#8C837B',
    gradients: {
      primary: ['#FFFFFF', '#DFD9D1', '#8C837B'] as const, warm: ['#E6E0D9', '#8C837B'] as const,
      rose: ['#F8F5F2', '#6A625C'] as const, auction: ['#DFD9D1', '#6A625C'] as const,
    },
    shadcn: {
  background: "#1C1A18",
  foreground: "#FFFFFF",
  card: "#2A2724",
  cardForeground: "#FFFFFF",
  popover: "#2A2724",
  popoverForeground: "#FFFFFF",
  primary: "#DFD9D1",
  primaryForeground: "#1C1A18",
  secondary: "#FFFFFF",
  secondaryForeground: "#1C1A18",
  muted: "#3A3430",
  mutedForeground: "#DFD9D1",
  accent: "#FFFFFF",
  accentForeground: "#1C1A18",
  destructive: "#F87171",
  destructiveForeground: "#1C1A18",
  border: "#4F4842",
  input: "#3A3430",
  ring: "#DFD9D1",
  radius: "0.625rem"
},
    chatBubbleSent: '#8C837B', chatBubbleReceived: '#3A3430', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.75)', overlayLight: 'rgba(255,255,255,0.05)',
    cardBackground: '#2A2724', cardBorder: '#3A3430', cardShadow: 'rgba(0,0,0,0.5)',
    inputBackground: '#2A2724', inputBorder: '#3A3430', inputFocusBorder: '#DFD9D1', inputText: '#FFFFFF', inputPlaceholder: '#8C837B',
    headerBackground: '#1C1A18', headerBorder: '#2A2724', switchActive: '#DFD9D1', switchInactive: '#4F4842', switchThumb: '#FFFFFF', switchTrack: '#3A3430',
  
} as ThemePalette
};























































// ==========================================
// 🌑 24. العقيق الإمبراطوري (Imperial Onyx)
// ==========================================
const themeImperialOnyx = {
  light: {
    primary: '#1A1A1A',
    primaryLight: '#F5F5F5',
    primaryDark: '#0A0A0A',
    primary50: '#FFFFFF',
    primary100: '#F5F5F5',
    primary200: '#E5E5E5',
    primary300: '#CCCCCC',
    primary400: '#999999',
    primary500: '#1A1A1A',
    primary600: '#0A0A0A',
    primary700: '#0A0A0A',
    primary800: '#0A0A0A',
    primary900: '#0A0A0A',
    warm50: '#FFFFFF',
    warm100: '#F5F5F5',
    warm200: '#E5E5E5',
    warm300: '#CCCCCC',
    warm400: '#999999',
    warm500: '#1A1A1A',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceMuted: '#CCCCCC',          // ✅ أغمق من #E5E5E5
    surfaceElevated: '#FFFFFF',
    border: '#999999',                // ✅ أغمق (كان #E5E5E5)
    borderLight: '#F5F5F5',
    text: '#0A0A0A',
    textSecondary: '#333333',         // ✅ أغمق من #999999
    textTertiary: '#666666',          // ✅ أغمق من #CCCCCC
    textInverse: '#FFFFFF',
    success: '#0A0A0A',
    successLight: '#CCCCCC',          // ✅ أقل بهرجة
    warning: '#0A0A0A',
    warningLight: '#CCCCCC',
    error: '#0A0A0A',
    errorLight: '#CCCCCC',
    info: '#0A0A0A',
    infoLight: '#CCCCCC',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E5E5E5',
    tabActive: '#0A0A0A',
    tabInactive: '#666666',
    gradients: {
      primary: ['#999999', '#1A1A1A', '#0A0A0A'] as const,
      warm: ['#CCCCCC', '#0A0A0A'] as const,
      rose: ['#E5E5E5', '#1A1A1A'] as const,
      auction: ['#1A1A1A', '#0A0A0A'] as const,
    },
    shadcn: {
      background: "#FFFFFF",
      foreground: "#0A0A0A",
      card: "#FFFFFF",
      cardForeground: "#0A0A0A",
      popover: "#FFFFFF",
      popoverForeground: "#0A0A0A",
      primary: "#1A1A1A",
      primaryForeground: "#FFFFFF",
      secondary: "#CCCCCC",           // ✅ بدلاً من #F5F5F5 (أغمق)
      secondaryForeground: "#0A0A0A", // ✅ نص داكن
      muted: "#E5E5E5",
      mutedForeground: "#333333",     // ✅ أغمق
      accent: "#E5E5E5",              // ✅ بدلاً من #F5F5F5
      accentForeground: "#0A0A0A",    // ✅ نص داكن
      destructive: "#0A0A0A",
      destructiveForeground: "#FFFFFF",
      border: "#999999",              // ✅ أغمق
      input: "#999999",               // ✅ أغمق
      ring: "#1A1A1A",
      radius: "0.625rem",
    },
    chatBubbleSent: '#0A0A0A',
    chatBubbleReceived: '#CCCCCC',    // ✅ أغمق من #E5E5E5
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#0A0A0A',
    overlay: 'rgba(0,0,0,0.6)',
    overlayLight: 'rgba(0,0,0,0.03)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E5E5',
    cardShadow: 'rgba(0,0,0,0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #F5F5F5)
    inputBorder: '#999999',           // ✅ أغمق
    inputFocusBorder: '#0A0A0A',
    inputText: '#0A0A0A',
    inputPlaceholder: '#666666',
    headerBackground: '#FFFFFF',
    headerBorder: '#F5F5F5',
    switchActive: '#0A0A0A',
    switchInactive: '#CCCCCC',
    switchThumb: '#FFFFFF',
    switchTrack: '#E5E5E5',
  } as ThemePalette,
  dark: {

    primary: '#F5F5F5', primaryLight: '#FFFFFF', primaryDark: '#1A1A1A',
    primary50: '#0A0A0A', primary100: '#1A1A1A', primary200: '#333333', primary300: '#4D4D4D', primary400: '#666666', primary500: '#F5F5F5', primary600: '#CCCCCC', primary700: '#E5E5E5', primary800: '#F5F5F5', primary900: '#FFFFFF',
    warm50: '#000000', warm100: '#0A0A0A', warm200: '#1A1A1A', warm300: '#333333', warm400: '#4D4D4D', warm500: '#666666',
    background: '#000000', surface: '#0A0A0A', surfaceMuted: '#1A1A1A', surfaceElevated: '#0A0A0A',
    border: '#333333', borderLight: '#0A0A0A',
    text: '#FFFFFF', textSecondary: '#F5F5F5', textTertiary: '#999999', textInverse: '#000000',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#0A0A0A', tabBarBorder: '#1A1A1A', tabActive: '#F5F5F5', tabInactive: '#666666',
    gradients: {
      primary: ['#FFFFFF', '#F5F5F5', '#1A1A1A'] as const, warm: ['#E5E5E5', '#1A1A1A'] as const,
      rose: ['#F5F5F5', '#333333'] as const, auction: ['#1A1A1A', '#000000'] as const,
    },
    shadcn: {
  background: "#000000",
  foreground: "#FFFFFF",
  card: "#0A0A0A",
  cardForeground: "#FFFFFF",
  popover: "#0A0A0A",
  popoverForeground: "#FFFFFF",
  primary: "#F5F5F5",
  primaryForeground: "#000000",
  secondary: "#FFFFFF",
  secondaryForeground: "#000000",
  muted: "#1A1A1A",
  mutedForeground: "#F5F5F5",
  accent: "#FFFFFF",
  accentForeground: "#000000",
  destructive: "#F87171",
  destructiveForeground: "#000000",
  border: "#333333",
  input: "#1A1A1A",
  ring: "#F5F5F5",
  radius: "0.625rem"
},
    chatBubbleSent: '#F5F5F5', chatBubbleReceived: '#1A1A1A', chatBubbleTextSent: '#000000', chatBubbleTextReceived: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.9)', overlayLight: 'rgba(255,255,255,0.03)',
    cardBackground: '#0A0A0A', cardBorder: '#1A1A1A', cardShadow: 'rgba(0,0,0,0.7)',
    inputBackground: '#0A0A0A', inputBorder: '#1A1A1A', inputFocusBorder: '#F5F5F5', inputText: '#FFFFFF', inputPlaceholder: '#666666',
    headerBackground: '#000000', headerBorder: '#0A0A0A', switchActive: '#F5F5F5', switchInactive: '#333333', switchThumb: '#FFFFFF', switchTrack: '#1A1A1A',
  
} as ThemePalette
};

// ==========================================
// 🌌 25. أسطورة الياقوت (Sapphire Legend)
// ==========================================
const themeSapphireLegend = {
  light: {
    primary: '#0F3C5C',
    primaryLight: '#A8D8EA',
    primaryDark: '#031D2E',
    primary50: '#F0F7FA',
    primary100: '#E1F0F5',
    primary200: '#A8D8EA',
    primary300: '#6EB9D6',
    primary400: '#3A8FB7',
    primary500: '#0F3C5C',
    primary600: '#0A2F4A',
    primary700: '#062338',
    primary800: '#041B2B',
    primary900: '#031D2E',
    warm50: '#FDFBF7',
    warm100: '#F9F2E7',
    warm200: '#F0DCC3',
    warm300: '#E5C49D',
    warm400: '#D9AB76',
    warm500: '#C99650',
    background: '#F4F8FA',
    surface: '#FFFFFF',
    surfaceMuted: '#A8D8EA',          // ✅ أغمق من #E1F0F5
    surfaceElevated: '#FFFFFF',
    border: '#6EB9D6',                // ✅ أغمق (كان #A8D8EA)
    borderLight: '#F0F7FA',
    text: '#031D2E',
    textSecondary: '#0A2F4A',         // يبقى
    textTertiary: '#3A8FB7',          // يبقى
    textInverse: '#E1F0F5',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#A8D8EA',
    tabActive: '#0F3C5C',
    tabInactive: '#6EB9D6',
    gradients: {
      primary: ['#A8D8EA', '#0F3C5C', '#031D2E'] as const,
      warm: ['#D9AB76', '#0F3C5C'] as const,
      rose: ['#E1F0F5', '#0A2F4A'] as const,
      auction: ['#0F3C5C', '#062338'] as const,
    },
    shadcn: {
      background: "#F4F8FA",
      foreground: "#031D2E",
      card: "#FFFFFF",
      cardForeground: "#031D2E",
      popover: "#FFFFFF",
      popoverForeground: "#031D2E",
      primary: "#0F3C5C",
      primaryForeground: "#E1F0F5",
      secondary: "#A8D8EA",           // ✅ بدلاً من A8D8EA (يبقى)
      secondaryForeground: "#031D2E", // ✅ نص داكن (بدلاً من E1F0F5)
      muted: "#E1F0F5",
      mutedForeground: "#0A2F4A",
      accent: "#E1F0F5",              // ✅ بدلاً من A8D8EA
      accentForeground: "#031D2E",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#6EB9D6",              // ✅ أغمق
      input: "#6EB9D6",               // ✅ أغمق
      ring: "#0F3C5C",
      radius: "0.625rem",
    },
    chatBubbleSent: '#0F3C5C',
    chatBubbleReceived: '#A8D8EA',    // ✅ أغمق من #E1F0F5
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#031D2E',
    overlay: 'rgba(3,29,46,0.5)',
    overlayLight: 'rgba(15,60,92,0.04)',
    cardBackground: '#FFFFFF',
    cardBorder: '#A8D8EA',
    cardShadow: 'rgba(0,0,0,0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #F4F8FA)
    inputBorder: '#6EB9D6',           // ✅ أغمق
    inputFocusBorder: '#0F3C5C',
    inputText: '#031D2E',
    inputPlaceholder: '#3A8FB7',
    headerBackground: '#FFFFFF',
    headerBorder: '#F0F7FA',
    switchActive: '#0F3C5C',
    switchInactive: '#A8D8EA',
    switchThumb: '#FFFFFF',
    switchTrack: '#E1F0F5',
  } as ThemePalette,
  dark: {

    primary: '#A8D8EA', primaryLight: '#E1F0F5', primaryDark: '#0F3C5C',
    primary50: '#02121A', primary100: '#031D2E', primary200: '#062338', primary300: '#0A2F4A', primary400: '#0F3C5C', primary500: '#A8D8EA', primary600: '#6EB9D6', primary700: '#3A8FB7', primary800: '#A8D8EA', primary900: '#E1F0F5',
    warm50: '#1A1106', warm100: '#2E1D0B', warm200: '#4A3114', warm300: '#6E4A20', warm400: '#946834', warm500: '#C99650',
    background: '#010A10', surface: '#02121A', surfaceMuted: '#031D2E', surfaceElevated: '#02121A',
    border: '#062338', borderLight: '#02121A',
    text: '#F0F7FA', textSecondary: '#A8D8EA', textTertiary: '#6EB9D6', textInverse: '#010A10',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#02121A', tabBarBorder: '#031D2E', tabActive: '#A8D8EA', tabInactive: '#3A8FB7',
    gradients: {
      primary: ['#E1F0F5', '#A8D8EA', '#0F3C5C'] as const, warm: ['#C99650', '#0F3C5C'] as const,
      rose: ['#E1F0F5', '#0A2F4A'] as const, auction: ['#0F3C5C', '#062338'] as const,
    },
    shadcn: {
  background: "#010A10",
  foreground: "#F0F7FA",
  card: "#02121A",
  cardForeground: "#F0F7FA",
  popover: "#02121A",
  popoverForeground: "#F0F7FA",
  primary: "#A8D8EA",
  primaryForeground: "#010A10",
  secondary: "#E1F0F5",
  secondaryForeground: "#010A10",
  muted: "#031D2E",
  mutedForeground: "#A8D8EA",
  accent: "#E1F0F5",
  accentForeground: "#010A10",
  destructive: "#F87171",
  destructiveForeground: "#010A10",
  border: "#062338",
  input: "#031D2E",
  ring: "#A8D8EA",
  radius: "0.625rem"
},
    chatBubbleSent: '#0F3C5C', chatBubbleReceived: '#031D2E', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#F0F7FA',
    overlay: 'rgba(0,0,0,0.85)', overlayLight: 'rgba(168,216,234,0.07)',
    cardBackground: '#02121A', cardBorder: '#031D2E', cardShadow: 'rgba(0,0,0,0.6)',
    inputBackground: '#02121A', inputBorder: '#031D2E', inputFocusBorder: '#A8D8EA', inputText: '#F0F7FA', inputPlaceholder: '#3A8FB7',
    headerBackground: '#010A10', headerBorder: '#02121A', switchActive: '#A8D8EA', switchInactive: '#062338', switchThumb: '#FFFFFF', switchTrack: '#031D2E',
  
} as ThemePalette
};

// ==========================================
// 🥂 26. قصر الشمبانيا (Palais Champagne)
// ==========================================
const themePalaisChampagne = {
  light: {
    primary: '#C5A56D',
    primaryLight: '#F7EBD4',
    primaryDark: '#8C6A3A',
    primary50: '#FFFCF7',
    primary100: '#FEF7ED',
    primary200: '#F7EBD4',
    primary300: '#EAD6AE',
    primary400: '#D9BB86',
    primary500: '#C5A56D',
    primary600: '#B08F57',
    primary700: '#8C6A3A',
    primary800: '#6B4F28',
    primary900: '#4A3619',
    warm50: '#FFFFFF',
    warm100: '#FFFCF7',
    warm200: '#FEF7ED',
    warm300: '#F7EBD4',
    warm400: '#EAD6AE',
    warm500: '#D9BB86',
    background: '#FFFCF7',
    surface: '#FFFFFF',
    surfaceMuted: '#EAD6AE',          // ✅ أغمق من #FEF7ED
    surfaceElevated: '#FFFFFF',
    border: '#D9BB86',                // ✅ أغمق (كان #F7EBD4)
    borderLight: '#FFFCF7',
    text: '#2E2518',
    textSecondary: '#6B4F28',         // يبقى
    textTertiary: '#8C6A3A',          // ✅ أغمق من #B08F57
    textInverse: '#FFFCF7',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#F7EBD4',
    tabActive: '#8C6A3A',
    tabInactive: '#D9BB86',
    gradients: {
      primary: ['#F7EBD4', '#C5A56D', '#6B4F28'] as const,
      warm: ['#EAD6AE', '#8C6A3A'] as const,
      rose: ['#FEF7ED', '#6B4F28'] as const,
      auction: ['#C5A56D', '#4A3619'] as const,
    },
    shadcn: {
      background: "#FFFCF7",
      foreground: "#2E2518",
      card: "#FFFFFF",
      cardForeground: "#2E2518",
      popover: "#FFFFFF",
      popoverForeground: "#2E2518",
      primary: "#C5A56D",
      primaryForeground: "#FFFCF7",
      secondary: "#EAD6AE",           // ✅ بدلاً من #F7EBD4 (أغمق)
      secondaryForeground: "#2E2518", // ✅ نص داكن
      muted: "#FEF7ED",
      mutedForeground: "#6B4F28",
      accent: "#FEF7ED",              // ✅ بدلاً من #F7EBD4
      accentForeground: "#2E2518",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFCF7",
      border: "#D9BB86",              // ✅ أغمق
      input: "#D9BB86",               // ✅ أغمق
      ring: "#C5A56D",
      radius: "0.625rem",
    },
    chatBubbleSent: '#8C6A3A',
    chatBubbleReceived: '#EAD6AE',    // ✅ أغمق من #FEF7ED
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#2E2518',
    overlay: 'rgba(46,37,24,0.4)',
    overlayLight: 'rgba(197,165,109,0.06)',
    cardBackground: '#FFFFFF',
    cardBorder: '#F7EBD4',
    cardShadow: 'rgba(0,0,0,0.03)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FFFCF7)
    inputBorder: '#D9BB86',           // ✅ أغمق
    inputFocusBorder: '#8C6A3A',
    inputText: '#2E2518',
    inputPlaceholder: '#B08F57',
    headerBackground: '#FFFFFF',
    headerBorder: '#FEF7ED',
    switchActive: '#8C6A3A',
    switchInactive: '#EAD6AE',
    switchThumb: '#FFFFFF',
    switchTrack: '#F7EBD4',
  } as ThemePalette,
  dark: {

    primary: '#F7EBD4', primaryLight: '#FFFCF7', primaryDark: '#C5A56D',
    primary50: '#1A140C', primary100: '#2E2518', primary200: '#4A3619', primary300: '#6B4F28', primary400: '#8C6A3A', primary500: '#F7EBD4', primary600: '#EAD6AE', primary700: '#D9BB86', primary800: '#C5A56D', primary900: '#B08F57',
    warm50: '#1A140C', warm100: '#2E2518', warm200: '#4A3619', warm300: '#6B4F28', warm400: '#8C6A3A', warm500: '#D9BB86',
    background: '#0F0B06', surface: '#1A140C', surfaceMuted: '#2E2518', surfaceElevated: '#1A140C',
    border: '#4A3619', borderLight: '#1A140C',
    text: '#FFFCF7', textSecondary: '#F7EBD4', textTertiary: '#C5A56D', textInverse: '#0F0B06',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#1A140C', tabBarBorder: '#2E2518', tabActive: '#F7EBD4', tabInactive: '#8C6A3A',
    gradients: {
      primary: ['#FFFCF7', '#F7EBD4', '#C5A56D'] as const, warm: ['#EAD6AE', '#8C6A3A'] as const,
      rose: ['#FEF7ED', '#6B4F28'] as const, auction: ['#C5A56D', '#4A3619'] as const,
    },
    shadcn: {
  background: "#0F0B06",
  foreground: "#FFFCF7",
  card: "#1A140C",
  cardForeground: "#FFFCF7",
  popover: "#1A140C",
  popoverForeground: "#FFFCF7",
  primary: "#F7EBD4",
  primaryForeground: "#0F0B06",
  secondary: "#FFFCF7",
  secondaryForeground: "#0F0B06",
  muted: "#2E2518",
  mutedForeground: "#F7EBD4",
  accent: "#FFFCF7",
  accentForeground: "#0F0B06",
  destructive: "#F87171",
  destructiveForeground: "#0F0B06",
  border: "#4A3619",
  input: "#2E2518",
  ring: "#F7EBD4",
  radius: "0.625rem"
},
    chatBubbleSent: '#8C6A3A', chatBubbleReceived: '#2E2518', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#FFFCF7',
    overlay: 'rgba(0,0,0,0.8)', overlayLight: 'rgba(247,235,212,0.1)',
    cardBackground: '#1A140C', cardBorder: '#2E2518', cardShadow: 'rgba(0,0,0,0.5)',
    inputBackground: '#1A140C', inputBorder: '#2E2518', inputFocusBorder: '#F7EBD4', inputText: '#FFFCF7', inputPlaceholder: '#8C6A3A',
    headerBackground: '#0F0B06', headerBorder: '#1A140C', switchActive: '#F7EBD4', switchInactive: '#4A3619', switchThumb: '#FFFFFF', switchTrack: '#2E2518',
  
} as ThemePalette
};

// ==========================================
// 🔮 27. الأميرة الجمشتية (Amethyst Princess)
// ==========================================
const themeAmethystPrincess = {
  light: {
    primary: '#8E44AD',
    primaryLight: '#E8DAEF',
    primaryDark: '#4A235A',
    primary50: '#F9F5FB',
    primary100: '#F0E4F5',
    primary200: '#E8DAEF',
    primary300: '#C39BD3',
    primary400: '#9B59B6',
    primary500: '#8E44AD',
    primary600: '#7D3C98',
    primary700: '#6C3483',
    primary800: '#5B2C6F',
    primary900: '#4A235A',
    warm50: '#FFF9F5',
    warm100: '#FFEADD',
    warm200: '#FFD6C2',
    warm300: '#FFC0A1',
    warm400: '#FFAB80',
    warm500: '#FF9666',
    background: '#FCF9FD',
    surface: '#FFFFFF',
    surfaceMuted: '#E8DAEF',          // ✅ أغمق من #F0E4F5
    surfaceElevated: '#FFFFFF',
    border: '#C39BD3',                // ✅ أغمق (كان #E8DAEF)
    borderLight: '#F9F5FB',
    text: '#311B43',
    textSecondary: '#5B2C6F',         // يبقى
    textTertiary: '#7D3C98',          // ✅ أغمق من #9B59B6
    textInverse: '#F9F5FB',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E8DAEF',
    tabActive: '#8E44AD',
    tabInactive: '#C39BD3',
    gradients: {
      primary: ['#E8DAEF', '#8E44AD', '#4A235A'] as const,
      warm: ['#FFAB80', '#8E44AD'] as const,
      rose: ['#F0E4F5', '#7D3C98'] as const,
      auction: ['#8E44AD', '#4A235A'] as const,
    },
    shadcn: {
      background: "#FCF9FD",
      foreground: "#311B43",
      card: "#FFFFFF",
      cardForeground: "#311B43",
      popover: "#FFFFFF",
      popoverForeground: "#311B43",
      primary: "#8E44AD",
      primaryForeground: "#F9F5FB",
      secondary: "#E8DAEF",           // ✅ بدلاً من E8DAEF (يبقى)
      secondaryForeground: "#311B43", // ✅ نص داكن (بدلاً من F9F5FB)
      muted: "#F0E4F5",
      mutedForeground: "#5B2C6F",
      accent: "#F0E4F5",              // ✅ بدلاً من E8DAEF
      accentForeground: "#311B43",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#C39BD3",              // ✅ أغمق
      input: "#C39BD3",               // ✅ أغمق
      ring: "#8E44AD",
      radius: "0.625rem",
    },
    chatBubbleSent: '#8E44AD',
    chatBubbleReceived: '#E8DAEF',    // ✅ أغمق من #F0E4F5
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#311B43',
    overlay: 'rgba(49,27,67,0.45)',
    overlayLight: 'rgba(142,68,173,0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E8DAEF',
    cardShadow: 'rgba(0,0,0,0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FCF9FD)
    inputBorder: '#C39BD3',           // ✅ أغمق
    inputFocusBorder: '#8E44AD',
    inputText: '#311B43',
    inputPlaceholder: '#9B59B6',
    headerBackground: '#FFFFFF',
    headerBorder: '#F0E4F5',
    switchActive: '#8E44AD',
    switchInactive: '#E8DAEF',
    switchThumb: '#FFFFFF',
    switchTrack: '#F0E4F5',
  } as ThemePalette,
  dark: {

    primary: '#E8DAEF', primaryLight: '#F9F5FB', primaryDark: '#8E44AD',
    primary50: '#1A0E24', primary100: '#311B43', primary200: '#4A235A', primary300: '#6C3483', primary400: '#8E44AD', primary500: '#E8DAEF', primary600: '#C39BD3', primary700: '#9B59B6', primary800: '#7D3C98', primary900: '#6C3483',
    warm50: '#2A140E', warm100: '#4A2216', warm200: '#6E3522', warm300: '#9B4D31', warm400: '#C96B4A', warm500: '#FF9666',
    background: '#0D0612', surface: '#1A0E24', surfaceMuted: '#311B43', surfaceElevated: '#1A0E24',
    border: '#4A235A', borderLight: '#1A0E24',
    text: '#F9F5FB', textSecondary: '#E8DAEF', textTertiary: '#C39BD3', textInverse: '#0D0612',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#1A0E24', tabBarBorder: '#311B43', tabActive: '#E8DAEF', tabInactive: '#9B59B6',
    gradients: {
      primary: ['#F9F5FB', '#E8DAEF', '#8E44AD'] as const, warm: ['#FF9666', '#8E44AD'] as const,
      rose: ['#F0E4F5', '#7D3C98'] as const, auction: ['#8E44AD', '#4A235A'] as const,
    },
    shadcn: {
  background: "#0D0612",
  foreground: "#F9F5FB",
  card: "#1A0E24",
  cardForeground: "#F9F5FB",
  popover: "#1A0E24",
  popoverForeground: "#F9F5FB",
  primary: "#E8DAEF",
  primaryForeground: "#0D0612",
  secondary: "#F9F5FB",
  secondaryForeground: "#0D0612",
  muted: "#311B43",
  mutedForeground: "#E8DAEF",
  accent: "#F9F5FB",
  accentForeground: "#0D0612",
  destructive: "#F87171",
  destructiveForeground: "#0D0612",
  border: "#4A235A",
  input: "#311B43",
  ring: "#E8DAEF",
  radius: "0.625rem"
},
    chatBubbleSent: '#8E44AD', chatBubbleReceived: '#311B43', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#F9F5FB',
    overlay: 'rgba(0,0,0,0.82)', overlayLight: 'rgba(232,218,239,0.08)',
    cardBackground: '#1A0E24', cardBorder: '#311B43', cardShadow: 'rgba(0,0,0,0.6)',
    inputBackground: '#1A0E24', inputBorder: '#311B43', inputFocusBorder: '#E8DAEF', inputText: '#F9F5FB', inputPlaceholder: '#9B59B6',
    headerBackground: '#0D0612', headerBorder: '#1A0E24', switchActive: '#E8DAEF', switchInactive: '#4A235A', switchThumb: '#FFFFFF', switchTrack: '#311B43',
  
} as ThemePalette
};

// ==========================================
// 🪞 28. مرآة التيتانيوم (Titanium Mirror)
// ==========================================
const themeTitaniumMirror = {
  light: {
    primary: '#6F7D8C',
    primaryLight: '#D5DDE5',
    primaryDark: '#2C353D',
    primary50: '#F7F8FA',
    primary100: '#EDF0F3',
    primary200: '#D5DDE5',
    primary300: '#A5B1BD',
    primary400: '#7B8A99',
    primary500: '#6F7D8C',
    primary600: '#5A6673',
    primary700: '#434E58',
    primary800: '#2C353D',
    primary900: '#1B2126',
    warm50: '#FFFFFF',
    warm100: '#F7F8FA',
    warm200: '#EDF0F3',
    warm300: '#D5DDE5',
    warm400: '#A5B1BD',
    warm500: '#7B8A99',
    background: '#F7F8FA',
    surface: '#FFFFFF',
    surfaceMuted: '#D5DDE5',          // ✅ أغمق من #EDF0F3
    surfaceElevated: '#FFFFFF',
    border: '#A5B1BD',                // ✅ أغمق (كان #D5DDE5)
    borderLight: '#F7F8FA',
    text: '#1B2126',
    textSecondary: '#434E58',         // يبقى
    textTertiary: '#5A6673',          // ✅ أغمق من #7B8A99
    textInverse: '#FFFFFF',
    success: '#2C353D',
    successLight: '#D5DDE5',          // ✅ أقل بهرجة
    warning: '#2C353D',
    warningLight: '#D5DDE5',
    error: '#2C353D',
    errorLight: '#D5DDE5',
    info: '#2C353D',
    infoLight: '#D5DDE5',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#D5DDE5',
    tabActive: '#2C353D',
    tabInactive: '#A5B1BD',
    gradients: {
      primary: ['#EDF0F3', '#6F7D8C', '#1B2126'] as const,
      warm: ['#A5B1BD', '#2C353D'] as const,
      rose: ['#F7F8FA', '#434E58'] as const,
      auction: ['#2C353D', '#1B2126'] as const,
    },
    shadcn: {
      background: "#F7F8FA",
      foreground: "#1B2126",
      card: "#FFFFFF",
      cardForeground: "#1B2126",
      popover: "#FFFFFF",
      popoverForeground: "#1B2126",
      primary: "#6F7D8C",
      primaryForeground: "#FFFFFF",
      secondary: "#D5DDE5",           // ✅ بدلاً من D5DDE5 (يبقى)
      secondaryForeground: "#1B2126", // ✅ نص داكن
      muted: "#EDF0F3",
      mutedForeground: "#434E58",
      accent: "#EDF0F3",              // ✅ بدلاً من D5DDE5
      accentForeground: "#1B2126",    // ✅ نص داكن
      destructive: "#2C353D",
      destructiveForeground: "#FFFFFF",
      border: "#A5B1BD",              // ✅ أغمق
      input: "#A5B1BD",               // ✅ أغمق
      ring: "#6F7D8C",
      radius: "0.625rem",
    },
    chatBubbleSent: '#2C353D',
    chatBubbleReceived: '#D5DDE5',    // ✅ أغمق من #EDF0F3
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#1B2126',
    overlay: 'rgba(27,33,38,0.5)',
    overlayLight: 'rgba(44,53,61,0.06)',
    cardBackground: '#FFFFFF',
    cardBorder: '#D5DDE5',
    cardShadow: 'rgba(0,0,0,0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #F7F8FA)
    inputBorder: '#A5B1BD',           // ✅ أغمق
    inputFocusBorder: '#2C353D',
    inputText: '#1B2126',
    inputPlaceholder: '#7B8A99',
    headerBackground: '#FFFFFF',
    headerBorder: '#EDF0F3',
    switchActive: '#2C353D',
    switchInactive: '#D5DDE5',
    switchThumb: '#FFFFFF',
    switchTrack: '#EDF0F3',
  } as ThemePalette,
  dark: {

    primary: '#D5DDE5', primaryLight: '#F7F8FA', primaryDark: '#6F7D8C',
    primary50: '#0F1215', primary100: '#1B2126', primary200: '#2C353D', primary300: '#434E58', primary400: '#5A6673', primary500: '#D5DDE5', primary600: '#A5B1BD', primary700: '#7B8A99', primary800: '#6F7D8C', primary900: '#5A6673',
    warm50: '#0F1215', warm100: '#1B2126', warm200: '#2C353D', warm300: '#434E58', warm400: '#5A6673', warm500: '#7B8A99',
    background: '#080A0C', surface: '#0F1215', surfaceMuted: '#1B2126', surfaceElevated: '#0F1215',
    border: '#2C353D', borderLight: '#0F1215',
    text: '#F7F8FA', textSecondary: '#D5DDE5', textTertiary: '#7B8A99', textInverse: '#080A0C',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#0F1215', tabBarBorder: '#1B2126', tabActive: '#D5DDE5', tabInactive: '#5A6673',
    gradients: {
      primary: ['#F7F8FA', '#D5DDE5', '#6F7D8C'] as const, warm: ['#A5B1BD', '#2C353D'] as const,
      rose: ['#F7F8FA', '#434E58'] as const, auction: ['#2C353D', '#1B2126'] as const,
    },
    shadcn: {
  background: "#080A0C",
  foreground: "#F7F8FA",
  card: "#0F1215",
  cardForeground: "#F7F8FA",
  popover: "#0F1215",
  popoverForeground: "#F7F8FA",
  primary: "#D5DDE5",
  primaryForeground: "#080A0C",
  secondary: "#F7F8FA",
  secondaryForeground: "#080A0C",
  muted: "#1B2126",
  mutedForeground: "#D5DDE5",
  accent: "#F7F8FA",
  accentForeground: "#080A0C",
  destructive: "#F87171",
  destructiveForeground: "#080A0C",
  border: "#2C353D",
  input: "#1B2126",
  ring: "#D5DDE5",
  radius: "0.625rem"
},
    chatBubbleSent: '#6F7D8C', chatBubbleReceived: '#1B2126', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#F7F8FA',
    overlay: 'rgba(0,0,0,0.85)', overlayLight: 'rgba(213,221,229,0.06)',
    cardBackground: '#0F1215', cardBorder: '#1B2126', cardShadow: 'rgba(0,0,0,0.6)',
    inputBackground: '#0F1215', inputBorder: '#1B2126', inputFocusBorder: '#D5DDE5', inputText: '#F7F8FA', inputPlaceholder: '#5A6673',
    headerBackground: '#080A0C', headerBorder: '#0F1215', switchActive: '#D5DDE5', switchInactive: '#2C353D', switchThumb: '#FFFFFF', switchTrack: '#1B2126',
  
} as ThemePalette
};






// ==========================================
// ✦ 29. غبار النجوم السرابي (Stardust Mirage)
// ==========================================
const themeStardustMirage = {
  light: {
    primary: '#C9A96E',
    primaryLight: '#F9F2E7',
    primaryDark: '#8B6A3A',
    primary50: '#FFFCF8',
    primary100: '#FEF7ED',
    primary200: '#F9EBD5',
    primary300: '#F0D8AE',
    primary400: '#E3C086',
    primary500: '#C9A96E',
    primary600: '#B08F57',
    primary700: '#8B6A3A',
    primary800: '#6B4F28',
    primary900: '#4A3619',
    warm50: '#FDFCFE',
    warm100: '#F6F4FC',
    warm200: '#E7E2F5',
    warm300: '#D5CCEC',
    warm400: '#C0B4E2',
    warm500: '#AA9CD6',
    background: '#FFFCF8',
    surface: '#FFFFFF',
    surfaceMuted: '#F0D8AE',          // ✅ أغمق من #FEF7ED
    surfaceElevated: '#FFFFFF',
    border: '#E3C086',                // ✅ أغمق (كان #F0D8AE)
    borderLight: '#FEF7ED',
    text: '#2E2518',
    textSecondary: '#6B4F28',         // يبقى
    textTertiary: '#8B6A3A',          // ✅ أغمق من #B08F57
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#F0D8AE',
    tabActive: '#8B6A3A',
    tabInactive: '#E3C086',
    gradients: {
      primary: ['#F9EBD5', '#C9A96E', '#6B4F28'] as const,
      warm: ['#D5CCEC', '#C9A96E'] as const,
      rose: ['#FEF7ED', '#8B6A3A'] as const,
      auction: ['#C9A96E', '#4A3619'] as const,
    },
    shadcn: {
      background: "#FFFCF8",
      foreground: "#2E2518",
      card: "#FFFFFF",
      cardForeground: "#2E2518",
      popover: "#FFFFFF",
      popoverForeground: "#2E2518",
      primary: "#C9A96E",
      primaryForeground: "#FFFFFF",
      secondary: "#F0D8AE",           // ✅ بدلاً من #F9F2E7 (أغمق)
      secondaryForeground: "#2E2518", // ✅ نص داكن
      muted: "#FEF7ED",
      mutedForeground: "#6B4F28",
      accent: "#FEF7ED",              // ✅ بدلاً من #F9F2E7
      accentForeground: "#2E2518",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#E3C086",              // ✅ أغمق
      input: "#E3C086",               // ✅ أغمق
      ring: "#C9A96E",
      radius: "0.625rem",
    },
    chatBubbleSent: '#8B6A3A',
    chatBubbleReceived: '#F0D8AE',    // ✅ أغمق من #FEF7ED
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#2E2518',
    overlay: 'rgba(46,37,24,0.4)',
    overlayLight: 'rgba(201,169,110,0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#F0D8AE',
    cardShadow: 'rgba(0,0,0,0.03)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FFFCF8)
    inputBorder: '#E3C086',           // ✅ أغمق
    inputFocusBorder: '#8B6A3A',
    inputText: '#2E2518',
    inputPlaceholder: '#B08F57',
    headerBackground: '#FFFFFF',
    headerBorder: '#FEF7ED',
    switchActive: '#8B6A3A',
    switchInactive: '#F0D8AE',
    switchThumb: '#FFFFFF',
    switchTrack: '#F0D8AE',
  } as ThemePalette,
  dark: {

    primary: '#F9EBD5', primaryLight: '#FFFCF8', primaryDark: '#C9A96E',
    primary50: '#1A140C', primary100: '#2E2518', primary200: '#4A3619', primary300: '#6B4F28', primary400: '#8B6A3A', primary500: '#F9EBD5', primary600: '#E3C086', primary700: '#C9A96E', primary800: '#B08F57', primary900: '#8B6A3A',
    warm50: '#1A1422', warm100: '#2A2036', warm200: '#403050', warm300: '#5C426E', warm400: '#7C5A94', warm500: '#AA9CD6',
    background: '#0F0B06', surface: '#1A140C', surfaceMuted: '#2E2518', surfaceElevated: '#1A140C',
    border: '#4A3619', borderLight: '#1A140C',
    text: '#FFFCF8', textSecondary: '#F9EBD5', textTertiary: '#C9A96E', textInverse: '#0F0B06',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#1A140C', tabBarBorder: '#2E2518', tabActive: '#F9EBD5', tabInactive: '#8B6A3A',
    gradients: {
      primary: ['#FFFCF8', '#F9EBD5', '#C9A96E'] as const,
      warm: ['#AA9CD6', '#C9A96E'] as const,
      rose: ['#FEF7ED', '#8B6A3A'] as const,
      auction: ['#C9A96E', '#4A3619'] as const,
    },
    shadcn: {
  background: "#0F0B06",
  foreground: "#FFFCF8",
  card: "#1A140C",
  cardForeground: "#FFFCF8",
  popover: "#1A140C",
  popoverForeground: "#FFFCF8",
  primary: "#F9EBD5",
  primaryForeground: "#0F0B06",
  secondary: "#FFFCF8",
  secondaryForeground: "#0F0B06",
  muted: "#2E2518",
  mutedForeground: "#F9EBD5",
  accent: "#FFFCF8",
  accentForeground: "#0F0B06",
  destructive: "#F87171",
  destructiveForeground: "#0F0B06",
  border: "#4A3619",
  input: "#2E2518",
  ring: "#F9EBD5",
  radius: "0.625rem"
},
    chatBubbleSent: '#C9A96E', chatBubbleReceived: '#2E2518', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#FFFCF8',
    overlay: 'rgba(0,0,0,0.85)', overlayLight: 'rgba(249,235,213,0.08)',
    cardBackground: '#1A140C', cardBorder: '#2E2518', cardShadow: 'rgba(0,0,0,0.6)',
    inputBackground: '#1A140C', inputBorder: '#2E2518', inputFocusBorder: '#F9EBD5', inputText: '#FFFCF8', inputPlaceholder: '#8B6A3A',
    headerBackground: '#0F0B06', headerBorder: '#1A140C', switchActive: '#F9EBD5', switchInactive: '#4A3619', switchThumb: '#FFFFFF', switchTrack: '#2E2518',
  
} as ThemePalette
};

// ==========================================
// 🕊️ 30. حرير الشبح (Phantom Silk)
// ==========================================
const themePhantomSilk = {
  light: {
    primary: '#B0A8B9',
    primaryLight: '#F1EEF4',
    primaryDark: '#6B6272',
    primary50: '#FDFCFD',
    primary100: '#F8F6F9',
    primary200: '#F1EEF4',
    primary300: '#DDD9E3',
    primary400: '#C7C0CF',
    primary500: '#B0A8B9',
    primary600: '#9A91A5',
    primary700: '#7B7385',
    primary800: '#6B6272',
    primary900: '#4D4653',
    warm50: '#FFFFFF',
    warm100: '#FDFCFD',
    warm200: '#F8F6F9',
    warm300: '#F1EEF4',
    warm400: '#E6E4EB',
    warm500: '#C7C0CF',
    background: '#FCFBFB',
    surface: '#FFFFFF',
    surfaceMuted: '#DDD9E3',          // ✅ أغمق من #F8F6F9
    surfaceElevated: '#FFFFFF',
    border: '#C7C0CF',                // ✅ أغمق (كان #DDD9E3)
    borderLight: '#F8F6F9',
    text: '#2D2A31',
    textSecondary: '#4D4653',         // يبقى
    textTertiary: '#6B6272',          // ✅ أغمق من #7B7385
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#DDD9E3',
    tabActive: '#6B6272',
    tabInactive: '#C7C0CF',
    gradients: {
      primary: ['#F1EEF4', '#B0A8B9', '#6B6272'] as const,
      warm: ['#E6E4EB', '#6B6272'] as const,
      rose: ['#F8F6F9', '#4D4653'] as const,
      auction: ['#6B6272', '#4D4653'] as const,
    },
    shadcn: {
      background: "#FCFBFB",
      foreground: "#2D2A31",
      card: "#FFFFFF",
      cardForeground: "#2D2A31",
      popover: "#FFFFFF",
      popoverForeground: "#2D2A31",
      primary: "#B0A8B9",
      primaryForeground: "#FFFFFF",
      secondary: "#DDD9E3",           // ✅ بدلاً من #F1EEF4 (أغمق)
      secondaryForeground: "#2D2A31", // ✅ نص داكن
      muted: "#F8F6F9",
      mutedForeground: "#4D4653",
      accent: "#F8F6F9",              // ✅ بدلاً من #F1EEF4
      accentForeground: "#2D2A31",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#C7C0CF",              // ✅ أغمق
      input: "#C7C0CF",               // ✅ أغمق
      ring: "#B0A8B9",
      radius: "0.625rem",
    },
    chatBubbleSent: '#6B6272',
    chatBubbleReceived: '#DDD9E3',    // ✅ أغمق من #F8F6F9
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#2D2A31',
    overlay: 'rgba(45,42,49,0.4)',
    overlayLight: 'rgba(176,168,185,0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#DDD9E3',
    cardShadow: 'rgba(0,0,0,0.03)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FCFBFB)
    inputBorder: '#C7C0CF',           // ✅ أغمق
    inputFocusBorder: '#6B6272',
    inputText: '#2D2A31',
    inputPlaceholder: '#9A91A5',
    headerBackground: '#FFFFFF',
    headerBorder: '#F8F6F9',
    switchActive: '#6B6272',
    switchInactive: '#DDD9E3',
    switchThumb: '#FFFFFF',
    switchTrack: '#F1EEF4',
  } as ThemePalette,
  dark: {

    // ========== الألوان الأساسية ==========
    primary: '#F1EEF4',
    primaryLight: '#FFFFFF',
    primaryDark: '#B0A8B9',
    primary50: '#1E1B21',
    primary100: '#2D2A31',
    primary200: '#3C3842',
    primary300: '#4D4653',
    primary400: '#6B6272',
    primary500: '#F1EEF4',
    primary600: '#C7C0CF',
    primary700: '#B0A8B9',
    primary800: '#9A91A5',
    primary900: '#7B7385',

    // ========== الألوان المحايدة (warm) ==========
    warm50: '#1E1B21',
    warm100: '#2D2A31',
    warm200: '#3C3842',
    warm300: '#4D4653',
    warm400: '#6B6272',
    warm500: '#C7C0CF',

    // ========== الخلفيات والأسطح ==========
    background: '#121014',
    surface: '#1E1B21',
    surfaceMuted: '#2D2A31',
    surfaceElevated: '#1E1B21',

    // ========== الحدود ==========
    border: '#3C3842',
    borderLight: '#1E1B21',

    // ========== النصوص ==========
    text: '#FFFFFF',
    textSecondary: '#F1EEF4',
    textTertiary: '#B0A8B9',
    textInverse: '#121014',

    // ========== الحالات الوظيفية ==========
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    errorLight: '#450A0A',
    info: '#60A5FA',
    infoLight: '#172554',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',

    // ========== التبويبات ==========
    tabBar: '#1E1B21',
    tabBarBorder: '#2D2A31',
    tabActive: '#F1EEF4',
    tabInactive: '#7B7385',

    // ========== التدرجات (بنفس قيم تعديلي) ==========
    gradients: {
      primary: ['#FFFFFF', '#F1EEF4', '#B0A8B9'] as const,
      warm: ['#E6E4EB', '#6B6272'] as const,
      rose: ['#F8F6F9', '#4D4653'] as const,
      auction: ['#6B6272', '#4D4653'] as const,
    },
    shadcn: {
  background: "#121014",
  foreground: "#FFFFFF",
  card: "#1E1B21",
  cardForeground: "#FFFFFF",
  popover: "#1E1B21",
  popoverForeground: "#FFFFFF",
  primary: "#F1EEF4",
  primaryForeground: "#121014",
  secondary: "#FFFFFF",
  secondaryForeground: "#121014",
  muted: "#2D2A31",
  mutedForeground: "#F1EEF4",
  accent: "#FFFFFF",
  accentForeground: "#121014",
  destructive: "#F87171",
  destructiveForeground: "#121014",
  border: "#3C3842",
  input: "#2D2A31",
  ring: "#F1EEF4",
  radius: "0.625rem"
},

    // ========== الشات ==========
    chatBubbleSent: '#B0A8B9',
    chatBubbleReceived: '#2D2A31',
    chatBubbleTextSent: '#121014',
    chatBubbleTextReceived: '#FFFFFF',

    // ========== التراكبات ==========
    overlay: 'rgba(0,0,0,0.85)',
    overlayLight: 'rgba(241,238,244,0.05)',

    // ========== البطاقات ==========
    cardBackground: '#1E1B21',
    cardBorder: '#2D2A31',
    cardShadow: 'rgba(0,0,0,0.6)',

    // ========== المدخلات ==========
    inputBackground: '#1E1B21',
    inputBorder: '#2D2A31',
    inputFocusBorder: '#F1EEF4',
    inputText: '#FFFFFF',
    inputPlaceholder: '#7B7385',

    // ========== الهيدر والسويتش ==========
    headerBackground: '#121014',
    headerBorder: '#1E1B21',
    switchActive: '#F1EEF4',
    switchInactive: '#3C3842',
    switchThumb: '#FFFFFF',
    switchTrack: '#2D2A31',
  
},
} as const;






























































// ==========================================
// 🔥 31. هالة الذهب السائل (Liquid Gold Aura)
// ==========================================
const themeLiquidGoldAura = {
  light: {
    primary: '#D4A114',
    primaryLight: '#FFF4D1',
    primaryDark: '#8B6508',
    primary50: '#FFFDF7',
    primary100: '#FFF9E8',
    primary200: '#FFF4D1',
    primary300: '#FFE59C',
    primary400: '#F5C842',
    primary500: '#D4A114',
    primary600: '#B88A0E',
    primary700: '#8B6508',
    primary800: '#6B4E06',
    primary900: '#4A3504',
    warm50: '#F4F9FD',
    warm100: '#E6F1FB',
    warm200: '#B8D8F5',
    warm300: '#7AB9ED',
    warm400: '#3D9BE0',
    warm500: '#1A7AB5',
    background: '#FFFDF7',
    surface: '#FFFFFF',
    surfaceMuted: '#FFE59C',          // ✅ أغمق من #FFF9E8
    surfaceElevated: '#FFFFFF',
    border: '#F5C842',                // ✅ أغمق (كان #FFE59C)
    borderLight: '#FFF9E8',
    text: '#3A2C06',
    textSecondary: '#6B4E06',         // يبقى (جيد)
    textTertiary: '#8B6508',          // ✅ أغمق من #B88A0E
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#FFE59C',
    tabActive: '#D4A114',
    tabInactive: '#B88A0E',
    gradients: {
      primary: ['#FFF4D1', '#D4A114', '#8B6508'] as const,
      warm: ['#3D9BE0', '#D4A114'] as const,
      rose: ['#FFF9E8', '#8B6508'] as const,
      auction: ['#D4A114', '#6B4E06'] as const,
    },
    shadcn: {
      background: "#FFFDF7",
      foreground: "#3A2C06",
      card: "#FFFFFF",
      cardForeground: "#3A2C06",
      popover: "#FFFFFF",
      popoverForeground: "#3A2C06",
      primary: "#D4A114",
      primaryForeground: "#FFFFFF",
      secondary: "#FFE59C",           // ✅ بدلاً من #FFF4D1 (أغمق)
      secondaryForeground: "#3A2C06", // ✅ نص داكن
      muted: "#FFF9E8",
      mutedForeground: "#6B4E06",
      accent: "#FFF9E8",              // ✅ بدلاً من #FFF4D1
      accentForeground: "#3A2C06",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#F5C842",              // ✅ أغمق
      input: "#F5C842",               // ✅ أغمق
      ring: "#D4A114",
      radius: "0.625rem",
    },
    chatBubbleSent: '#D4A114',
    chatBubbleReceived: '#FFE59C',    // ✅ أغمق من #FFF9E8
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#3A2C06',
    overlay: 'rgba(58,44,6,0.5)',
    overlayLight: 'rgba(212,161,20,0.06)',
    cardBackground: '#FFFFFF',
    cardBorder: '#FFE59C',
    cardShadow: 'rgba(0,0,0,0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FFFDF7)
    inputBorder: '#F5C842',           // ✅ أغمق
    inputFocusBorder: '#D4A114',
    inputText: '#3A2C06',
    inputPlaceholder: '#B88A0E',
    headerBackground: '#FFFFFF',
    headerBorder: '#FFF9E8',
    switchActive: '#D4A114',
    switchInactive: '#FFE59C',
    switchThumb: '#FFFFFF',
    switchTrack: '#FFF4D1',
  } as ThemePalette,
  dark: {

    primary: '#FFF4D1', primaryLight: '#FFFDF7', primaryDark: '#D4A114',
    primary50: '#1A1302', primary100: '#3A2C06', primary200: '#4A3504', primary300: '#6B4E06', primary400: '#8B6508', primary500: '#FFF4D1', primary600: '#F5C842', primary700: '#D4A114', primary800: '#B88A0E', primary900: '#8B6508',
    warm50: '#051A2E', warm100: '#0A2A44', warm200: '#103A5E', warm300: '#185078', warm400: '#1A6FA0', warm500: '#1A7AB5',
    background: '#0A0802', surface: '#1A1302', surfaceMuted: '#3A2C06', surfaceElevated: '#1A1302',
    border: '#4A3504', borderLight: '#1A1302',
    text: '#FFFDF7', textSecondary: '#FFF4D1', textTertiary: '#D4A114', textInverse: '#0A0802',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#1A1302', tabBarBorder: '#3A2C06', tabActive: '#FFF4D1', tabInactive: '#8B6508',
    gradients: {
      primary: ['#FFFDF7', '#FFF4D1', '#D4A114'] as const,
      warm: ['#1A7AB5', '#D4A114'] as const,
      rose: ['#FFF9E8', '#8B6508'] as const,
      auction: ['#D4A114', '#6B4E06'] as const,
    },
    shadcn: {
  background: "#0A0802",
  foreground: "#FFFDF7",
  card: "#1A1302",
  cardForeground: "#FFFDF7",
  popover: "#1A1302",
  popoverForeground: "#FFFDF7",
  primary: "#FFF4D1",
  primaryForeground: "#0A0802",
  secondary: "#FFFDF7",
  secondaryForeground: "#0A0802",
  muted: "#3A2C06",
  mutedForeground: "#FFF4D1",
  accent: "#FFFDF7",
  accentForeground: "#0A0802",
  destructive: "#F87171",
  destructiveForeground: "#0A0802",
  border: "#4A3504",
  input: "#3A2C06",
  ring: "#FFF4D1",
  radius: "0.625rem"
},
    chatBubbleSent: '#D4A114', chatBubbleReceived: '#3A2C06', chatBubbleTextSent: '#0A0802', chatBubbleTextReceived: '#FFFDF7',
    overlay: 'rgba(0,0,0,0.88)', overlayLight: 'rgba(255,244,209,0.08)',
    cardBackground: '#1A1302', cardBorder: '#3A2C06', cardShadow: 'rgba(0,0,0,0.7)',
    inputBackground: '#1A1302', inputBorder: '#3A2C06', inputFocusBorder: '#FFF4D1', inputText: '#FFFDF7', inputPlaceholder: '#8B6508',
    headerBackground: '#0A0802', headerBorder: '#1A1302', switchActive: '#FFF4D1', switchInactive: '#4A3504', switchThumb: '#0A0802', switchTrack: '#3A2C06',
  
} as ThemePalette
};

// ==========================================
// 🌌 32. مخمل السديم (Velvet Nebula)
// ==========================================
const themeVelvetNebula = {
  light: {
    primary: '#5C2D91',
    primaryLight: '#E8DEF1',
    primaryDark: '#2D0F4C',
    primary50: '#F9F5FB',
    primary100: '#F0E4F5',
    primary200: '#E8DEF1',
    primary300: '#C39BD3',
    primary400: '#9B59B6',
    primary500: '#5C2D91',
    primary600: '#4A2375',
    primary700: '#3A1B5E',
    primary800: '#2D0F4C',
    primary900: '#1D0933',
    warm50: '#1D1A2B',
    warm100: '#2E2A40',
    warm200: '#423B59',
    warm300: '#5B5273',
    warm400: '#7B6F99',
    warm500: '#A395C7',
    background: '#FAF7FC',
    surface: '#FFFFFF',
    surfaceMuted: '#C39BD3',          // ✅ أغمق من #F0E4F5
    surfaceElevated: '#FFFFFF',
    border: '#9B59B6',                // ✅ أغمق (كان #E8DEF1)
    borderLight: '#F9F5FB',
    text: '#140A24',
    textSecondary: '#2D0F4C',         // يبقى
    textTertiary: '#4A2375',          // ✅ أغمق من #9B59B6
    textInverse: '#F9F5FB',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E8DEF1',
    tabActive: '#5C2D91',
    tabInactive: '#9B59B6',
    gradients: {
      primary: ['#E8DEF1', '#5C2D91', '#1D0933'] as const,
      warm: ['#A395C7', '#2D0F4C'] as const,
      rose: ['#F0E4F5', '#3A1B5E'] as const,
      auction: ['#5C2D91', '#1D0933'] as const,
    },
    shadcn: {
      background: "#FAF7FC",
      foreground: "#140A24",
      card: "#FFFFFF",
      cardForeground: "#140A24",
      popover: "#FFFFFF",
      popoverForeground: "#140A24",
      primary: "#5C2D91",
      primaryForeground: "#F9F5FB",
      secondary: "#C39BD3",           // ✅ بدلاً من #E8DEF1 (أغمق)
      secondaryForeground: "#140A24", // ✅ نص داكن
      muted: "#F0E4F5",
      mutedForeground: "#2D0F4C",
      accent: "#F0E4F5",              // ✅ بدلاً من #E8DEF1
      accentForeground: "#140A24",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#9B59B6",              // ✅ أغمق
      input: "#9B59B6",               // ✅ أغمق
      ring: "#5C2D91",
      radius: "0.625rem",
    },
    chatBubbleSent: '#5C2D91',
    chatBubbleReceived: '#C39BD3',    // ✅ أغمق من #F0E4F5
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#140A24',
    overlay: 'rgba(20,10,36,0.5)',
    overlayLight: 'rgba(92,45,145,0.05)',
    cardBackground: '#FFFFFF',
    cardBorder: '#E8DEF1',
    cardShadow: 'rgba(0,0,0,0.04)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FAF7FC)
    inputBorder: '#9B59B6',           // ✅ أغمق
    inputFocusBorder: '#5C2D91',
    inputText: '#140A24',
    inputPlaceholder: '#9B59B6',
    headerBackground: '#FFFFFF',
    headerBorder: '#F9F5FB',
    switchActive: '#5C2D91',
    switchInactive: '#E8DEF1',
    switchThumb: '#FFFFFF',
    switchTrack: '#F0E4F5',
  } as ThemePalette,
    dark: {

    primary: '#E8DEF1', primaryLight: '#F9F5FB', primaryDark: '#5C2D91',
    primary50: '#0E071A', primary100: '#1D0933', primary200: '#2D0F4C', primary300: '#4A2375', primary400: '#5C2D91', primary500: '#E8DEF1', primary600: '#C39BD3', primary700: '#9B59B6', primary800: '#4A2375', primary900: '#2D0F4C',
    warm50: '#0E0C14', warm100: '#1D1A2B', warm200: '#2E2A40', warm300: '#423B59', warm400: '#5B5273', warm500: '#A395C7',
    background: '#04020A', surface: '#0E071A', surfaceMuted: '#1D0933', surfaceElevated: '#0E071A',
    border: '#2D0F4C', borderLight: '#0E071A',
    text: '#F9F5FB', textSecondary: '#E8DEF1', textTertiary: '#C39BD3', textInverse: '#04020A',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#0E071A', tabBarBorder: '#1D0933', tabActive: '#E8DEF1', tabInactive: '#4A2375',
    gradients: {
      primary: ['#F9F5FB', '#E8DEF1', '#5C2D91'] as const,
      warm: ['#A395C7', '#2D0F4C'] as const,
      rose: ['#F0E4F5', '#3A1B5E'] as const,
      auction: ['#5C2D91', '#1D0933'] as const,
    },
    shadcn: {
  background: "#04020A",
  foreground: "#F9F5FB",
  card: "#0E071A",
  cardForeground: "#F9F5FB",
  popover: "#0E071A",
  popoverForeground: "#F9F5FB",
  primary: "#E8DEF1",
  primaryForeground: "#04020A",
  secondary: "#F9F5FB",
  secondaryForeground: "#04020A",
  muted: "#1D0933",
  mutedForeground: "#E8DEF1",
  accent: "#F9F5FB",
  accentForeground: "#04020A",
  destructive: "#F87171",
  destructiveForeground: "#04020A",
  border: "#2D0F4C",
  input: "#1D0933",
  ring: "#E8DEF1",
  radius: "0.625rem"
},
    chatBubbleSent: '#5C2D91', chatBubbleReceived: '#1D0933', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#F9F5FB',
    overlay: 'rgba(0,0,0,0.9)', overlayLight: 'rgba(232,222,241,0.06)',
    cardBackground: '#0E071A', cardBorder: '#1D0933', cardShadow: 'rgba(0,0,0,0.7)',
    inputBackground: '#0E071A', inputBorder: '#1D0933', inputFocusBorder: '#E8DEF1', inputText: '#F9F5FB', inputPlaceholder: '#4A2375',
    headerBackground: '#04020A', headerBorder: '#0E071A', switchActive: '#E8DEF1', switchInactive: '#2D0F4C', switchThumb: '#FFFFFF', switchTrack: '#1D0933',
  
} as ThemePalette
};

// ==========================================
// 🥀 33. وردة الظلال الإلهية (Divine Rose Noir)
// ==========================================
const themeDivineRoseNoir = {
  light: {
    primary: '#1A0A0C',
    primaryLight: '#F5E1E3',
    primaryDark: '#4A1519',
    primary50: '#FFF5F5',
    primary100: '#FFE0E3',
    primary200: '#F5BFC3',
    primary300: '#E38D93',
    primary400: '#C0565F',
    primary500: '#1A0A0C',
    primary600: '#4A1519',
    primary700: '#3A0E12',
    primary800: '#2A080A',
    primary900: '#1A0A0C',
    warm50: '#FFF9F0',
    warm100: '#FFEDD1',
    warm200: '#FFDA9E',
    warm300: '#F5B84A',
    warm400: '#D99E2E',
    warm500: '#A66F18',
    background: '#FCFAFA',
    surface: '#FFFFFF',
    surfaceMuted: '#E38D93',          // ✅ أغمق من #FFF5F5
    surfaceElevated: '#FFFFFF',
    border: '#C0565F',                // ✅ أغمق (كان #F5BFC3)
    borderLight: '#FFE0E3',
    text: '#1A0A0C',
    textSecondary: '#4A1519',         // يبقى
    textTertiary: '#C0565F',          // يبقى
    textInverse: '#FFFFFF',
    success: '#10B981',
    successLight: '#A7F3D0',          // ✅ أقل بهرجة
    warning: '#FBBF24',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    warningDark: '#FF6F00',
    errorDark: '#D32F2F',
    successDark: '#388E3C',
    infoDark: '#1976D2',
    tabBar: '#FFFFFF',
    tabBarBorder: '#F5BFC3',
    tabActive: '#1A0A0C',
    tabInactive: '#E38D93',
    gradients: {
      primary: ['#F5E1E3', '#1A0A0C', '#4A1519'] as const,
      warm: ['#D99E2E', '#1A0A0C'] as const,
      rose: ['#FFE0E3', '#2A080A'] as const,
      auction: ['#1A0A0C', '#4A1519'] as const,
    },
    shadcn: {
      background: "#FCFAFA",
      foreground: "#1A0A0C",
      card: "#FFFFFF",
      cardForeground: "#1A0A0C",
      popover: "#FFFFFF",
      popoverForeground: "#1A0A0C",
      primary: "#1A0A0C",
      primaryForeground: "#FFFFFF",
      secondary: "#E38D93",           // ✅ بدلاً من #F5E1E3 (أغمق)
      secondaryForeground: "#1A0A0C", // ✅ نص داكن
      muted: "#FFF5F5",
      mutedForeground: "#4A1519",
      accent: "#FFE0E3",              // ✅ بدلاً من #F5E1E3
      accentForeground: "#1A0A0C",    // ✅ نص داكن
      destructive: "#EF4444",
      destructiveForeground: "#FFFFFF",
      border: "#C0565F",              // ✅ أغمق
      input: "#C0565F",               // ✅ أغمق
      ring: "#1A0A0C",
      radius: "0.625rem",
    },
    chatBubbleSent: '#1A0A0C',
    chatBubbleReceived: '#E38D93',    // ✅ أغمق من #FFE0E3
    chatBubbleTextSent: '#FFFFFF',
    chatBubbleTextReceived: '#1A0A0C',
    overlay: 'rgba(26,10,12,0.55)',
    overlayLight: 'rgba(26,10,12,0.02)',
    cardBackground: '#FFFFFF',
    cardBorder: '#F5BFC3',
    cardShadow: 'rgba(26,10,12,0.05)',
    inputBackground: '#FFFFFF',       // ✅ أبيض ناصع (كان #FCFAFA)
    inputBorder: '#C0565F',           // ✅ أغمق
    inputFocusBorder: '#1A0A0C',
    inputText: '#1A0A0C',
    inputPlaceholder: '#C0565F',
    headerBackground: '#FFFFFF',
    headerBorder: '#FFE0E3',
    switchActive: '#1A0A0C',
    switchInactive: '#F5BFC3',
    switchThumb: '#FFFFFF',
    switchTrack: '#F5BFC3',
  } as ThemePalette,
  dark: {

    primary: '#F5E1E3', primaryLight: '#FFF5F5', primaryDark: '#1A0A0C',
    primary50: '#1A0A0C', primary100: '#2A080A', primary200: '#3A0E12', primary300: '#4A1519', primary400: '#C0565F', primary500: '#F5E1E3', primary600: '#F5BFC3', primary700: '#E38D93', primary800: '#C0565F', primary900: '#4A1519',
    warm50: '#1A1106', warm100: '#3A260E', warm200: '#5C3D18', warm300: '#8A5C26', warm400: '#B87A34', warm500: '#A66F18',
    background: '#0A0304', surface: '#1A0A0C', surfaceMuted: '#2A080A', surfaceElevated: '#1A0A0C',
    border: '#3A0E12', borderLight: '#1A0A0C',
    text: '#FFF5F5', textSecondary: '#F5E1E3', textTertiary: '#F5BFC3', textInverse: '#0A0304',
    success: '#34D399', successLight: '#064E3B', warning: '#FBBF24', warningLight: '#451A03', error: '#F87171', errorLight: '#450A0A', info: '#60A5FA', infoLight: '#172554',
    warningDark: '#FF6F00', errorDark: '#D32F2F', successDark: '#388E3C', infoDark: '#1976D2',
    tabBar: '#1A0A0C', tabBarBorder: '#2A080A', tabActive: '#F5E1E3', tabInactive: '#C0565F',
    gradients: {
      primary: ['#FFF5F5', '#F5E1E3', '#1A0A0C'] as const,
      warm: ['#B87A34', '#1A0A0C'] as const,
      rose: ['#FFE0E3', '#2A080A'] as const,
      auction: ['#1A0A0C', '#4A1519'] as const,
    },
    shadcn: {
  background: "#0A0304",
  foreground: "#FFF5F5",
  card: "#1A0A0C",
  cardForeground: "#FFF5F5",
  popover: "#1A0A0C",
  popoverForeground: "#FFF5F5",
  primary: "#F5E1E3",
  primaryForeground: "#0A0304",
  secondary: "#FFF5F5",
  secondaryForeground: "#0A0304",
  muted: "#2A080A",
  mutedForeground: "#F5E1E3",
  accent: "#FFF5F5",
  accentForeground: "#0A0304",
  destructive: "#F87171",
  destructiveForeground: "#0A0304",
  border: "#3A0E12",
  input: "#2A080A",
  ring: "#F5E1E3",
  radius: "0.625rem"
},
    chatBubbleSent: '#1A0A0C', chatBubbleReceived: '#2A080A', chatBubbleTextSent: '#FFFFFF', chatBubbleTextReceived: '#FFF5F5',
    overlay: 'rgba(0,0,0,0.9)', overlayLight: 'rgba(245,225,227,0.06)',
    cardBackground: '#1A0A0C', cardBorder: '#2A080A', cardShadow: 'rgba(0,0,0,0.7)',
    inputBackground: '#1A0A0C', inputBorder: '#2A080A', inputFocusBorder: '#F5E1E3', inputText: '#FFF5F5', inputPlaceholder: '#C0565F',
    headerBackground: '#0A0304', headerBorder: '#1A0A0C', switchActive: '#F5E1E3', switchInactive: '#3A0E12', switchThumb: '#FFFFFF', switchTrack: '#2A080A',
  
} as ThemePalette
};






export const AVAILABLE_THEMES = {
  // المجموعة الأولى (المذكورة بالتفصيل)
  stardust_mirage: {
    name: 'سراب الغبار النجمي',
    light: themeStardustMirage.light,
    dark: themeStardustMirage.dark,
  },
  phantom_silk: {
    name: 'حرير الشبح',
    light: themePhantomSilk.light,
    dark: themePhantomSilk.dark,
  },
  liquid_gold_aura: {
    name: 'هالة الذهب السائل',
    light: themeLiquidGoldAura.light,
    dark: themeLiquidGoldAura.dark,
  },
  velvet_nebula: {
    name: 'مخمل السديم',
    light: themeVelvetNebula.light,
    dark: themeVelvetNebula.dark,
  },
  divine_rose_noir: {
    name: 'وردة الظلال الإلهية',
    light: themeDivineRoseNoir.light,
    dark: themeDivineRoseNoir.dark,
  },

  // الباقي
  diamond_solitaire: {
    name: 'ألماسة منفردة',
    light: themeDiamondSolitaire.light,
    dark: themeDiamondSolitaire.dark,
  },
  royal_platinum: {
    name: 'بلاتين ملكي',
    light: themeRoyalPlatinum.light,
    dark: themeRoyalPlatinum.dark,
  },
  crimson_throne: {
    name: 'عرش قرمزي',
    light: themeCrimsonThrone.light,
    dark: themeCrimsonThrone.dark,
  },
  golden_velvet: {
    name: 'مخمل ذهبي',
    light: themeGoldenVelvet.light,
    dark: themeGoldenVelvet.dark,
  },
  pearl_couture: {
    name: 'لؤلؤ راق',
    light: themePearlCouture.light,
    dark: themePearlCouture.dark,
  },
  imperial_onyx: {
    name: 'أونكس إمبراطوري',
    light: themeImperialOnyx.light,
    dark: themeImperialOnyx.dark,
  },
  sapphire_legend: {
    name: 'أسطورة الياقوت',
    light: themeSapphireLegend.light,
    dark: themeSapphireLegend.dark,
  },
  palais_champagne: {
    name: 'قصر الشمبانيا',
    light: themePalaisChampagne.light,
    dark: themePalaisChampagne.dark,
  },
  amethyst_princess: {
    name: 'أميرة الجمشت',
    light: themeAmethystPrincess.light,
    dark: themeAmethystPrincess.dark,
  },
  titanium_mirror: {
    name: 'مرآة التيتانيوم',
    light: themeTitaniumMirror.light,
    dark: themeTitaniumMirror.dark,
  },
  rose: {
    name: 'وردي كلاسيك',
    light: themeRose.light,
    dark: themeRose.dark,
  },
  royal_gold: {
    name: 'ذهب ملكي',
    light: themeRoyalGold.light,
    dark: themeRoyalGold.dark,
  },
  ocean: {
    name: 'محیط',
    light: themeOcean.light,
    dark: themeOcean.dark,
  },
  onyx: {
    name: 'أونكس',
    light: themeOnyx.light,
    dark: themeOnyx.dark,
  },
  sapphire: {
    name: 'ياقوت أزرق',
    light: themeSapphire.light,
    dark: themeSapphire.dark,
  },
  ruby_velvet: {
    name: 'مخمل ياقوتي',
    light: themeRubyVelvet.light,
    dark: themeRubyVelvet.dark,
  },
  emerald_ivory: {
    name: 'عاج زمردي',
    light: themeEmeraldIvory.light,
    dark: themeEmeraldIvory.dark,
  },
  champagne_bridal: {
    name: 'شمبانيا عروس',
    light: themeChampagneBridal.light,
    dark: themeChampagneBridal.dark,
  },
  amethyst: {
    name: 'جمشت',
    light: themeAmethyst.light,
    dark: themeAmethyst.dark,
  },
  mocha_bronze: {
    name: 'موكا برونزي',
    light: themeMochaBronze.light,
    dark: themeMochaBronze.dark,
  },
  rose_gold: {
    name: 'ذهب وردي',
    light: themeRoseGold.light,
    dark: themeRoseGold.dark,
  },
  ImperialL: {
    name: 'لازورد إمبراطوري',
    light: themeImperialLapis.light,
    dark: themeImperialLapis.dark,
  },
  PeacockTeal: {
    name: 'أخضر الطاووس',
    light: themePeacockTeal.light,
    dark: themePeacockTeal.dark,
  },
  PlatinumFrost: {
    name: 'صقيع بلاتيني',
    light: themePlatinumFrost.light,
    dark: themePlatinumFrost.dark,
  },
  VelvetMerlot: {
    name: 'مخمل ميرلو',
    light: themeVelvetMerlot.light,
    dark: themeVelvetMerlot.dark,
  },
  NoirDiamond: {
    name: 'ألماس أسود',
    light: themeNoirDiamond.light,
    dark: themeNoirDiamond.dark,
  },
  imperial_crocodile: {
    name: 'تمساح إمبراطوري',
    light: themeImperialCrocodile.light,
    dark: themeImperialCrocodile.dark,
  },
  iridescent_pearl: {
    name: 'لؤلؤ متقزح',
    light: themeIridescentPearl.light,
    dark: themeIridescentPearl.dark,
  },
  titanium_rose: {
    name: 'تيتانيوم وردي',
    light: themeTitaniumRose.light,
    dark: themeTitaniumRose.dark,
  },
} as const;

export type ThemeId = keyof typeof AVAILABLE_THEMES;

export const DEFAULT_THEME_ID: ThemeId = 'stardust_mirage';








export type ThemeDefinition = typeof AVAILABLE_THEMES[ThemeId];