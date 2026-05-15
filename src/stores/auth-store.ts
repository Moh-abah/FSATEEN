// Authentication store using Zustand

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthTokens } from '@/types';
import { tokenManager } from '@/lib/api';
import api from '@/lib/api';

interface AuthState {
 user: User | null;
 isAuthenticated: boolean;
 isLoading: boolean;

 // Actions
 setUser: (user: User | null) => void;
 setTokens: (tokens: AuthTokens) => void;
 login: (identifier: string, password: string) => Promise<void>;
 loginWithOTP: (phone: string, otp: string) => Promise<AuthTokens>;
 requestOTP: (phone: string) => Promise<void>;
 logout: () => Promise<void>;
 refreshUser: () => Promise<void>;
 updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
 persist(
  (set, get) => ({
   user: null,
   isAuthenticated: false,
   isLoading: true,

   setUser: (user) => {
    set({
     user,
     isAuthenticated: !!user,
     isLoading: false
    });
   },

   setTokens: (tokens) => {
    tokenManager.setTokens(tokens.access_token, tokens.refresh_token);
   },

   login: async (identifier, password) => {
    set({ isLoading: true });
    try {
     const tokens = await api.post<AuthTokens>('/auth/login', {
      identifier,
      password
     });
     tokenManager.setTokens(tokens.access_token, tokens.refresh_token);

     // Fetch user data
     const user = await api.get<User>('/auth/me');
     set({
      user,
      isAuthenticated: true,
      isLoading: false
     });
    } catch (error) {
     set({ isLoading: false });
     throw error;
    }
   },

   loginWithOTP: async (phone, otp) => {
    set({ isLoading: true });
    try {
     const tokens = await api.post<AuthTokens>('/auth/verify-otp', {
      phone,
      otp
     });
     tokenManager.setTokens(tokens.access_token, tokens.refresh_token);

     // Fetch user data
     const user = await api.get<User>('/auth/me');
     set({
      user,
      isAuthenticated: true,
      isLoading: false
     });

     return tokens;
    } catch (error) {
     set({ isLoading: false });
     throw error;
    }
   },

   requestOTP: async (phone) => {
    await api.post('/auth/request-otp', { phone }, { skipAuth: true });
   },

   logout: async () => {
    try {
     await api.post('/auth/logout');
    } catch {
     // Ignore logout errors
    } finally {
     tokenManager.clearTokens();
     set({
      user: null,
      isAuthenticated: false
     });
    }
   },

   refreshUser: async () => {
    const token = tokenManager.getAccessToken();
    if (!token) {
     set({
      user: null,
      isAuthenticated: false,
      isLoading: false
     });
     return;
    }

    try {
     const user = await api.get<User>('/auth/me');
     set({
      user,
      isAuthenticated: true,
      isLoading: false
     });
    } catch {
     tokenManager.clearTokens();
     set({
      user: null,
      isAuthenticated: false,
      isLoading: false
     });
    }
   },

   updateUser: (data) => {
    const currentUser = get().user;
    if (currentUser) {
     set({ user: { ...currentUser, ...data } });
    }
   },
  }),
  {
   name: 'fusateen-auth',
   partialize: (state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated
   }),
  }
 )
);