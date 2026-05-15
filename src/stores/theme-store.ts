// // // src/stores/theme-store.ts
// // 'use client';

// // import { create } from 'zustand';
// // import { persist } from 'zustand/middleware';
// // import { DEFAULT_THEME_ID, ThemeId } from '@/config/themes';


// // export type ThemeMode = 'light' | 'dark' | 'system';

// // interface ThemeState {
// //  themeMode: ThemeMode;
// //  currentThemeId: ThemeId;
// //  isDark: boolean;
// //  isInitialized: boolean;
// //  setThemeMode: (mode: ThemeMode) => void;
// //  setCurrentThemeId: (id: ThemeId) => void;
// //  toggleTheme: () => void;
// // }

// // const getSystemIsDark = (): boolean => {
// //  if (typeof window === 'undefined') return false;
// //  return window.matchMedia('(prefers-color-scheme: dark)').matches;
// // };

// // export const useThemeStore = create<ThemeState>()(
// //  persist(
// //   (set, get) => ({
// //    themeMode: 'system',
// //    currentThemeId: DEFAULT_THEME_ID,
// //    isDark: false,
// //    isInitialized: false,

// //    setThemeMode: (mode) => {
// //     const isDark = mode === 'dark' || (mode === 'system' && getSystemIsDark());
// //     set({ themeMode: mode, isDark, isInitialized: true });
// //    },
// //    setCurrentThemeId: (id) => set({ currentThemeId: id }),
// //    toggleTheme: () => {
// //     const { themeMode, isDark } = get();
// //     const newMode: ThemeMode =
// //      themeMode === 'system'
// //       ? isDark
// //        ? 'light'
// //        : 'dark'
// //       : themeMode === 'dark'
// //        ? 'light'
// //        : 'dark';
// //     set({
// //      themeMode: newMode,
// //      isDark: newMode === 'dark' || (newMode === 'system' && getSystemIsDark()),
// //     });
// //    },
// //   }),
// //   {
// //    name: 'furateen-theme-web',
// //    skipHydration: true,
// //   }
// //  )
// // );

// // // Initialize client-side
// // if (typeof window !== 'undefined') {
// //  useThemeStore.persist.rehydrate();
// //  // Sync initial system dark mode
// //  const mode = useThemeStore.getState().themeMode;
// //  const isDark = mode === 'dark' || (mode === 'system' && getSystemIsDark());
// //  useThemeStore.setState({ isDark, isInitialized: true });
// // }



// // src/stores/theme-store.ts
// 'use client';

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { DEFAULT_THEME_ID, ThemeId, AVAILABLE_THEMES } from '@/config/themes';

// export type ThemeMode = 'light' | 'dark' | 'system';

// interface ThemeState {
//    themeMode: ThemeMode;
//    currentThemeId: ThemeId;
//    isDark: boolean;
//    isInitialized: boolean;
//    setThemeMode: (mode: ThemeMode) => void;
//    setCurrentThemeId: (id: ThemeId) => void;
//    toggleTheme: () => void;
//    applyThemeVariables: () => void;
// }

// const getSystemIsDark = (): boolean => {
//    if (typeof window === 'undefined') return false;
//    return window.matchMedia('(prefers-color-scheme: dark)').matches;
// };

// export const useThemeStore = create<ThemeState>()(
//    persist(
//       (set, get) => ({
//          themeMode: 'system',
//          currentThemeId: DEFAULT_THEME_ID,
//          isDark: false,
//          isInitialized: false,

//          // تطبيق المتغيرات على CSS
//          applyThemeVariables: () => {
//             if (typeof document === 'undefined') return;
//             const { currentThemeId, isDark } = get();
//             const theme = AVAILABLE_THEMES[currentThemeId];
//             if (!theme) return;

//             const palette = isDark ? theme.dark : theme.light;
//             const root = document.documentElement;

//             // 1. المتغيرات المخصصة (الخاصة بالتطبيق)
//             const customVars = [
//                'primary', 'primaryLight', 'primaryDark', 'background', 'surface',
//                'surfaceMuted', 'border', 'borderLight', 'text', 'textSecondary',
//                'textTertiary', 'textInverse', 'success', 'warning', 'error', 'info',
//                'tabBar', 'tabActive', 'tabInactive', 'chatBubbleSent', 'chatBubbleReceived',
//                'overlay', 'overlayLight', 'cardBackground', 'cardBorder', 'cardShadow',
//                'inputBackground', 'inputBorder', 'inputFocusBorder', 'inputText',
//                'inputPlaceholder', 'headerBackground', 'headerBorder', 'switchActive',
//                'switchInactive', 'switchThumb', 'switchTrack'
//             ];
//             customVars.forEach(varName => {
//                const value = (palette as any)[varName];
//                if (value) root.style.setProperty(`--${varName}`, value);
//             });

//             // 2. متغيرات shadcn/ui (إن وجدت)
//             if (palette.shadcn) {
//                Object.entries(palette.shadcn).forEach(([key, value]) => {
//                   if (typeof value === 'string') {
//                      root.style.setProperty(`--${key}`, value);
//                   } else if (key === 'radius' && typeof value === 'string') {
//                      root.style.setProperty(`--radius`, value);
//                   }
//                });
//             }
//          },

//          setThemeMode: (mode) => {
//             const isDark = mode === 'dark' || (mode === 'system' && getSystemIsDark());
//             set({ themeMode: mode, isDark, isInitialized: true });
//             get().applyThemeVariables(); // تطبيق بعد التغيير
//          },

//          setCurrentThemeId: (id) => {
//             set({ currentThemeId: id });
//             get().applyThemeVariables(); // تطبيق بعد التغيير
//          },

//          toggleTheme: () => {
//             const { themeMode, isDark } = get();
//             const newMode: ThemeMode =
//                themeMode === 'system'
//                   ? (isDark ? 'light' : 'dark')
//                   : (themeMode === 'dark' ? 'light' : 'dark');
//             const newIsDark = newMode === 'dark' || (newMode === 'system' && getSystemIsDark());
//             set({ themeMode: newMode, isDark: newIsDark });
//             get().applyThemeVariables(); // تطبيق بعد التغيير
//          },
//       }),
//       {
//          name: 'furateen-theme-web',
//          skipHydration: true,
//       }
//    )
// );

// // Initialize client-side
// if (typeof window !== 'undefined') {
//    useThemeStore.persist.rehydrate();
//    const mode = useThemeStore.getState().themeMode;
//    const isDark = mode === 'dark' || (mode === 'system' && getSystemIsDark());
//    useThemeStore.setState({ isDark, isInitialized: true });
//    // تطبيق المتغيرات بعد التهيئة
//    useThemeStore.getState().applyThemeVariables();
// }






// // src/stores/theme-store.ts
// 'use client';

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { DEFAULT_THEME_ID, ThemeId } from '@/config/themes';


// export type ThemeMode = 'light' | 'dark' | 'system';

// interface ThemeState {
//  themeMode: ThemeMode;
//  currentThemeId: ThemeId;
//  isDark: boolean;
//  isInitialized: boolean;
//  setThemeMode: (mode: ThemeMode) => void;
//  setCurrentThemeId: (id: ThemeId) => void;
//  toggleTheme: () => void;
// }

// const getSystemIsDark = (): boolean => {
//  if (typeof window === 'undefined') return false;
//  return window.matchMedia('(prefers-color-scheme: dark)').matches;
// };

// export const useThemeStore = create<ThemeState>()(
//  persist(
//   (set, get) => ({
//    themeMode: 'system',
//    currentThemeId: DEFAULT_THEME_ID,
//    isDark: false,
//    isInitialized: false,

//    setThemeMode: (mode) => {
//     const isDark = mode === 'dark' || (mode === 'system' && getSystemIsDark());
//     set({ themeMode: mode, isDark, isInitialized: true });
//    },
//    setCurrentThemeId: (id) => set({ currentThemeId: id }),
//    toggleTheme: () => {
//     const { themeMode, isDark } = get();
//     const newMode: ThemeMode =
//      themeMode === 'system'
//       ? isDark
//        ? 'light'
//        : 'dark'
//       : themeMode === 'dark'
//        ? 'light'
//        : 'dark';
//     set({
//      themeMode: newMode,
//      isDark: newMode === 'dark' || (newMode === 'system' && getSystemIsDark()),
//     });
//    },
//   }),
//   {
//    name: 'furateen-theme-web',
//    skipHydration: true,
//   }
//  )
// );

// // Initialize client-side
// if (typeof window !== 'undefined') {
//  useThemeStore.persist.rehydrate();
//  // Sync initial system dark mode
//  const mode = useThemeStore.getState().themeMode;
//  const isDark = mode === 'dark' || (mode === 'system' && getSystemIsDark());
//  useThemeStore.setState({ isDark, isInitialized: true });
// }



// src/stores/theme-store// src/stores/theme-store.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DEFAULT_THEME_ID, ThemeId, AVAILABLE_THEMES, ThemePalette } from '@/config/themes';


export type ThemeMode = 'light' | 'dark' | 'system';

// ✨ Theme Store State Interface
export interface ThemeState {
   // 📦 State
   themeMode: ThemeMode;
   currentThemeId: ThemeId;
   isDark: boolean;
   isInitialized: boolean;
   isTransitioning: boolean;

   // 🔄 Actions
   setThemeMode: (mode: ThemeMode) => void;
   setCurrentThemeId: (id: ThemeId) => void;
   toggleTheme: () => void;
   resetTheme: () => void;
   applyThemeVariables: (palette?: ThemePalette) => void;
   initializeTheme: () => void;

   // 👁️ Preview (for theme settings page only)
   previewMode: boolean;
   setPreviewMode: (enabled: boolean) => void;
}

// ✨ Helper: Get system dark mode preference
const getSystemIsDark = (): boolean => {
   if (typeof window === 'undefined') return false;
   return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// ✨ Helper: Apply CSS variables with smooth transition
const applyCSSVariables = (palette: ThemePalette, root: HTMLElement) => {
   // 🎨 Custom Fusatini variables
   const customVars: Array<keyof ThemePalette> = [
      'primary', 'primaryLight', 'primaryDark', 'primary50', 'primary100',
      'primary200', 'primary300', 'primary400', 'primary500', 'primary600',
      'primary700', 'primary800', 'primary900',
      'warm50', 'warm100', 'warm200', 'warm300', 'warm400', 'warm500',
      'background', 'surface', 'surfaceMuted', 'surfaceElevated',
      'border', 'borderLight',
      'text', 'textSecondary', 'textTertiary', 'textInverse',
      'success', 'successLight', 'warning', 'warningLight',
      'error', 'errorLight', 'info', 'infoLight',
      'tabBar', 'tabBarBorder', 'tabActive', 'tabInactive',
      'chatBubbleSent', 'chatBubbleReceived',
      'chatBubbleTextSent', 'chatBubbleTextReceived',
      'overlay', 'overlayLight',
      'cardBackground', 'cardBorder', 'cardShadow',
      'inputBackground', 'inputBorder', 'inputFocusBorder',
      'inputText', 'inputPlaceholder',
      'headerBackground', 'headerBorder',
      'switchActive', 'switchInactive', 'switchThumb', 'switchTrack',
   ];

   customVars.forEach((varName) => {
      const value = palette[varName];
      if (value && typeof value === 'string') {
         const cssVar = `--${varName.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
         const currentValue = root.style.getPropertyValue(cssVar);
         // Only update if value changed (performance optimization)
         if (currentValue.trim() !== value.trim()) {
            root.style.setProperty(cssVar, value);
         }
      }
   });

   // 🎨 shadcn/ui variables (if defined)
   if (palette.shadcn) {
      Object.entries(palette.shadcn).forEach(([key, value]) => {
         if (typeof value === 'string') {
            const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
            root.style.setProperty(cssVar, value);
         }
      });
   }

   // 🌈 Gradient utilities
   if (palette.gradients) {
      Object.entries(palette.gradients).forEach(([name, stops]) => {
         if (Array.isArray(stops) && stops.every(s => typeof s === 'string')) {
            root.style.setProperty(
               `--gradient-${name}`,
               `linear-gradient(135deg, ${stops.join(', ')})`
            );
         }
      });
   }
};

// ✨ Helper: Add smooth transition class during theme switch
const enableThemeTransition = (root: HTMLElement) => {
   root.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
   return () => {
      // Cleanup transition after animation completes
      setTimeout(() => {
         root.style.transition = '';
      }, 300);
   };
};

// ✨ Helper: Listen for system preference changes
const setupSystemPreferenceListener = (callback: (isDark: boolean) => void) => {
   if (typeof window === 'undefined') return () => { };

   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
   const listener = (e: MediaQueryListEvent) => callback(e.matches);

   mediaQuery.addEventListener('change', listener);
   return () => mediaQuery.removeEventListener('change', listener);
};

export const useThemeStore = create<ThemeState>()(
   persist(
      (set, get) => ({
         // 📦 Initial State
         themeMode: 'system',
         currentThemeId: DEFAULT_THEME_ID,
         isDark: false,
         isInitialized: false,
         isTransitioning: false,
         previewMode: false,

         // ✨ Initialize theme on first load
         initializeTheme: () => {
            if (typeof window === 'undefined') return;

            const state = get();
            if (state.isInitialized) return;

            // Calculate initial isDark based on mode
            const isDark =
               state.themeMode === 'dark' ||
               (state.themeMode === 'system' && getSystemIsDark());

            // Apply theme variables
            const theme = AVAILABLE_THEMES[state.currentThemeId];
            if (theme) {
               const palette = isDark ? theme.dark : theme.light;
               applyCSSVariables(palette, document.documentElement);
            }

            // Update dark mode class
            if (isDark) {
               document.documentElement.classList.add('dark');
            } else {
               document.documentElement.classList.remove('dark');
            }

            // Setup system preference listener for 'system' mode
            if (state.themeMode === 'system') {
               setupSystemPreferenceListener((systemIsDark) => {
                  const current = get();
                  if (current.themeMode === 'system' && current.isDark !== systemIsDark) {
                     set({ isDark: systemIsDark });
                     get().applyThemeVariables();
                  }
               });
            }

            set({ isDark, isInitialized: true });
         },

         // 🎨 Apply theme variables to CSS
         applyThemeVariables: (paletteOverride?: ThemePalette) => {
            if (typeof document === 'undefined') return;

            const { currentThemeId, isDark, previewMode } = get();
            const theme = AVAILABLE_THEMES[currentThemeId];
            if (!theme) return;

            // Use override palette (for preview) or compute from state
            const palette = paletteOverride || (isDark ? theme.dark : theme.light);
            const root = document.documentElement;

            // Enable smooth transition
            const cleanup = enableThemeTransition(root);
            set({ isTransitioning: true });

            // Apply variables
            applyCSSVariables(palette, root);

            // Update dark mode class
            if (isDark) {
               root.classList.add('dark');
            } else {
               root.classList.remove('dark');
            }

            // Cleanup
            cleanup();
            setTimeout(() => set({ isTransitioning: false }), 300);
         },

         // 🌓 Set theme mode (light/dark/system)
         setThemeMode: (mode: ThemeMode) => {
            const isDark = mode === 'dark' || (mode === 'system' && getSystemIsDark());

            set({ themeMode: mode, isDark });
            get().applyThemeVariables();
         },

         // 🎨 Set current theme by ID
         setCurrentThemeId: (id: ThemeId) => {
            // Validate theme ID
            if (!AVAILABLE_THEMES[id]) {
               console.warn(`Theme "${id}" not found, falling back to "${DEFAULT_THEME_ID}"`);
               id = DEFAULT_THEME_ID;
            }

            set({ currentThemeId: id });
            get().applyThemeVariables();
         },

         // 🔄 Toggle between light and dark
         toggleTheme: () => {
            const { themeMode, isDark } = get();

            let newMode: ThemeMode;
            let newIsDark: boolean;

            if (themeMode === 'system') {
               // When in system mode, toggle overrides to explicit mode
               newMode = isDark ? 'light' : 'dark';
               newIsDark = !isDark;
            } else {
               newMode = themeMode === 'dark' ? 'light' : 'dark';
               newIsDark = !isDark;
            }

            set({ themeMode: newMode, isDark: newIsDark });
            get().applyThemeVariables();
         },

         // ♻️ Reset to default theme and system mode
         resetTheme: () => {
            set({
               currentThemeId: DEFAULT_THEME_ID,
               themeMode: 'system',
               isDark: getSystemIsDark()
            });
            get().applyThemeVariables();
         },

         // 👁️ Preview mode toggle (for theme settings page)
         setPreviewMode: (enabled: boolean) => {
            set({ previewMode: enabled });
            if (enabled) {
               // Apply preview with opposite mode
               const { currentThemeId, isDark } = get();
               const theme = AVAILABLE_THEMES[currentThemeId];
               if (theme) {
                  get().applyThemeVariables(isDark ? theme.light : theme.dark);
               }
            } else {
               // Revert to actual theme
               get().applyThemeVariables();
            }
         },
      }),
      {
         name: 'fusatini-theme-storage',
         storage: createJSONStorage(() => localStorage),
         skipHydration: true, // We handle hydration manually for better SSR support
         partialize: (state) => ({
            // Only persist essential state
            themeMode: state.themeMode,
            currentThemeId: state.currentThemeId,
         }),
         onRehydrateStorage: () => (state) => {
            // After rehydration from storage, initialize theme
            if (state) {
               state.initializeTheme();
            }
         },
      }
   )
);

// ✨ Client-side initialization (safe for SSR)
if (typeof window !== 'undefined') {
   // Rehydrate store from localStorage
   useThemeStore.persist.rehydrate();

   // Initialize theme after rehydration
   const initializeOnClient = () => {
      const state = useThemeStore.getState();
      if (!state.isInitialized) {
         state.initializeTheme();
      }
   };

   // Run after next tick to ensure store is ready
   setTimeout(initializeOnClient, 0);
}

// ✨ Utility: Get theme colors without hook (for server/utils)
export function getThemePalette(themeId: ThemeId, isDark: boolean): ThemePalette {
   const theme = AVAILABLE_THEMES[themeId] || AVAILABLE_THEMES[DEFAULT_THEME_ID];
   return isDark ? theme.dark : theme.light;
}

// ✨ Utility: Apply theme variables directly (for advanced use cases)
export function applyThemeToDocument(themeId: ThemeId, isDark: boolean) {
   if (typeof document === 'undefined') return;
   const palette = getThemePalette(themeId, isDark);
   applyCSSVariables(palette, document.documentElement);

   if (isDark) {
      document.documentElement.classList.add('dark');
   } else {
      document.documentElement.classList.remove('dark');
   }
}