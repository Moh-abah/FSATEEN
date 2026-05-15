// // src/providers/theme-provider.tsx
// 'use client';

// import { useEffect } from 'react';
// import { useThemeStore } from '@/stores/theme-store';
// import { AVAILABLE_THEMES } from '@/config/themes';

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const currentThemeId = useThemeStore((s) => s.currentThemeId);
//   const isDark = useThemeStore((s) => s.isDark);

//   useEffect(() => {
//     const root = document.documentElement;
//     const palette = AVAILABLE_THEMES[currentThemeId];
//     const colors = isDark ? palette.dark : palette.light;

//     // Apply CSS Variables
//     for (const [key, value] of Object.entries(colors)) {
//       if (typeof value === 'string') {
//         root.style.setProperty(`--${key}`, value);
//       }
//     }

//     // Apply dark/light class
//     if (isDark) {
//       root.classList.add('dark');
//       root.classList.remove('light');
//     } else {
//       root.classList.add('light');
//       root.classList.remove('dark');
//     }
//   }, [currentThemeId, isDark]);

//   return <>{children}</>;
// }


'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/stores/theme-store';
import { AVAILABLE_THEMES } from '@/config/themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const currentThemeId = useThemeStore((s) => s.currentThemeId);
  const isDark = useThemeStore((s) => s.isDark);

  useEffect(() => {
    const root = document.documentElement;
    const palette = AVAILABLE_THEMES[currentThemeId];
    const colors = isDark ? palette.dark : palette.light;

    // 1. Single color variables
    for (const [key, value] of Object.entries(colors)) {
      if (typeof value === 'string') {
        root.style.setProperty(`--${key}`, value);
      }
    }

    // 2. Gradient variables (based on theme palette)
    if (colors.gradients) {
      root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${colors.gradients.primary.join(', ')})`);
      root.style.setProperty('--gradient-warm', `linear-gradient(135deg, ${colors.gradients.warm.join(', ')})`);
      root.style.setProperty('--gradient-rose', `linear-gradient(135deg, ${colors.gradients.rose.join(', ')})`);
      root.style.setProperty('--gradient-auction', `linear-gradient(135deg, ${colors.gradients.auction.join(', ')})`);
    }

    // 3. Hero-specific gradient (can be overridden per theme)
    root.style.setProperty('--gradient-hero', `linear-gradient(135deg, ${colors.primaryDark}, ${colors.primary}, ${colors.primaryDark})`);

    // 4. Dark/light class
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [currentThemeId, isDark]);

  return <>{children}</>;
}