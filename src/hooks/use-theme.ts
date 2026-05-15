// // src/hooks/use-theme.ts
// 'use client';

// import { useMemo } from 'react';
// import { useThemeStore } from '@/stores/theme-store';
// import { AVAILABLE_THEMES } from '@/config/themes';


// export function useTheme() {
//  const themeMode = useThemeStore((s) => s.themeMode);
//  const currentThemeId = useThemeStore((s) => s.currentThemeId);
//  const isDark = useThemeStore((s) => s.isDark);
//  const setThemeMode = useThemeStore((s) => s.setThemeMode);
//  const setCurrentThemeId = useThemeStore((s) => s.setCurrentThemeId);
//  const toggleTheme = useThemeStore((s) => s.toggleTheme);

//  const colors = useMemo(() => {
//   const palette = AVAILABLE_THEMES[currentThemeId];
//   return isDark ? palette.dark : palette.light;
//  }, [currentThemeId, isDark]);

//  return {
//   colors,
//   isDark,
//   themeMode,
//   currentThemeId,
  
//   setThemeMode,
//   setCurrentThemeId,
//   toggleTheme,
//  };
// }


// src/hooks/use-theme.ts
"use client";

import { useMemo, useCallback } from "react";
import { useThemeStore } from "@/stores/theme-store";
import {
 AVAILABLE_THEMES,
 ThemeId,
 ThemePalette,
 type ThemeDefinition,
} from "@/config/themes";


// ✨ Default fallback theme (Rose) - prevents crashes on invalid IDs
const DEFAULT_THEME_ID: ThemeId = "rose";

export interface UseThemeReturn {
 // 🎨 Current theme data
 colors: ThemePalette;
 themeDefinition: ThemeDefinition;

 // 🌓 State flags
 isDark: boolean;
 themeMode: "light" | "dark" | "system";
 currentThemeId: ThemeId;

 // 🔄 Actions
 setThemeMode: (mode: "light" | "dark" | "system") => void;
 setCurrentThemeId: (id: ThemeId) => void;
 toggleTheme: () => void;
 resetTheme: () => void;

 // 👁️ Preview utilities (for theme settings page)
 getPreviewColors: (previewDark: boolean) => ThemePalette;
 getPreviewDefinition: (previewDark: boolean) => ThemeDefinition;

 // 🎯 Convenient color accessors
 primary: string;
 background: string;
 text: string;
 border: string;
 // 🔄 Store internal state
 isTransitioning: boolean;
 previewMode: boolean;
 setPreviewMode: (enabled: boolean) => void;
 initializeTheme: () => void;
}

export function useTheme(): UseThemeReturn {
 // 📦 Subscribe to store state
 const themeMode = useThemeStore((state) => state.themeMode);
 const currentThemeId = useThemeStore((state) => state.currentThemeId);
 const isDark = useThemeStore((state) => state.isDark);

 const isTransitioning = useThemeStore((s) => s.isTransitioning);
 const previewMode = useThemeStore((s) => s.previewMode);
 const setPreviewMode = useThemeStore((s) => s.setPreviewMode);

 const initializeTheme = useThemeStore((s) => s.initializeTheme);

 const setThemeMode = useThemeStore((state) => state.setThemeMode);
 const setCurrentThemeId = useThemeStore((state) => state.setCurrentThemeId);
 const toggleTheme = useThemeStore((state) => state.toggleTheme);
 const resetTheme = useThemeStore((state) => state.resetTheme);

 // 🛡️ Safe theme resolution with fallback
 const safeThemeId = useMemo(() => {
  if (currentThemeId && AVAILABLE_THEMES[currentThemeId]) {
   return currentThemeId;
  }
  // Fallback to default if ID is invalid
  return DEFAULT_THEME_ID;
 }, [currentThemeId]);

 // 🎨 Compute current colors with memoization
 const colors = useMemo(() => {
  const theme = AVAILABLE_THEMES[safeThemeId];
  return isDark ? theme.dark : theme.light;
 }, [safeThemeId, isDark]);

 // 📋 Theme definition (metadata)
 const themeDefinition = useMemo(() => {
  return AVAILABLE_THEMES[safeThemeId];
 }, [safeThemeId]);

 // 👁️ Preview colors for theme settings (doesn't affect actual theme)
 const getPreviewColors = useCallback(
  (previewDark: boolean): ThemePalette => {
   const theme = AVAILABLE_THEMES[safeThemeId];
   return previewDark ? theme.dark : theme.light;
  },
  [safeThemeId],
 );

 const getPreviewDefinition = useCallback(
  (previewDark: boolean): ThemeDefinition => {
   return AVAILABLE_THEMES[safeThemeId];
  },
  [safeThemeId],
 );

 // 🎯 Convenient direct accessors (reduces var(--*) usage in components)
 const primary = colors.primary;
 const background = colors.background;
 const text = colors.text;
 const border = colors.border;

 return {
  // Data
  colors,
  themeDefinition,

  // Flags
  isDark,
  themeMode,
  currentThemeId: safeThemeId,

  // Actions
  setThemeMode,
  setCurrentThemeId,
  toggleTheme,
  resetTheme,

  // Preview utilities
  getPreviewColors,
  getPreviewDefinition,

  // Convenient accessors
  primary,
  background,
  text,
  border,

  isTransitioning,
  previewMode,
  setPreviewMode,

  initializeTheme,
 };
}

// ✨ Utility: Get theme colors without hook (for server components or utils)
export function getThemeColors(
 themeId: ThemeId,
 isDark: boolean,
): ThemePalette {
 const theme = AVAILABLE_THEMES[themeId] || AVAILABLE_THEMES[DEFAULT_THEME_ID];
 return isDark ? theme.dark : theme.light;
}

// ✨ Utility: Get all available theme IDs
export function getAvailableThemeIds(): ThemeId[] {
 return Object.keys(AVAILABLE_THEMES) as ThemeId[];
}

// ✨ Utility: Check if a theme ID is valid
export function isValidThemeId(id: string): id is ThemeId {
 return id in AVAILABLE_THEMES;
}
