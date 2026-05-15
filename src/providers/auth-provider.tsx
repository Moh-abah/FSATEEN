// Authentication provider

'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter, usePathname } from 'next/navigation';
import { initializeFirebase, isFirebaseConfigured, onForegroundMessage } from '@/lib/firebase';
import { toast } from 'sonner';

interface AuthProviderProps {
  children: ReactNode;
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/verify-otp',
  '/auth/set-password',
  '/auth/forgot-password',
  '/products',
  '/auctions',
  '/store',
  '/static',
  '/users',
];

// Check if route is public (starts with any public route)
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => {
    if (pathname === route) return true;
    if (pathname.startsWith(route + '/')) return true;
    return false;
  });
}

// Routes that require seller role
const SELLER_ROUTES = ['/seller'];

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, isAuthenticated, isLoading, refreshUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const firebaseInitializedRef = useRef(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Initialize Firebase on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Restore session
    refreshUser();

    // Initialize Firebase for push notifications
    if (isFirebaseConfigured() && !firebaseInitializedRef.current) {
      try {
        initializeFirebase();
        firebaseInitializedRef.current = true;
        console.log('[AuthProvider] Firebase initialized');
      } catch (error) {
        console.warn('[AuthProvider] Firebase initialization failed:', error);
      }
    }
  }, [refreshUser]);

  // Set up foreground message listener when authenticated
  useEffect(() => {
    if (!isAuthenticated || !firebaseInitializedRef.current) return;

    // Unsubscribe from previous listener if any
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    // Subscribe to foreground messages
    // unsubscribeRef.current = onForegroundMessage((payload) => {
    //   console.log('[AuthProvider] Foreground message:', payload);

    //   const notification = payload.notification;
    //   if (notification) {
    //     // Show toast notification for foreground messages
    //     toast.info(notification.title || 'إشعار جديد', {
    //       description: notification.body,
    //       action: payload.data?.url ? {
    //         label: 'عرض',
    //         onClick: () => {
    //           window.location.href = payload.data.url as string;
    //         },
    //       } : undefined,
    //     });
    //   }
    // });


    unsubscribeRef.current = onForegroundMessage((payload) => {
      console.log('[AuthProvider] Foreground message:', payload);

      const notification = payload.notification;
      const url = payload.data?.url; // ✅ تخزين الرابط في متغير

      if (notification) {
        toast.info(notification.title || 'إشعار جديد', {
          description: notification.body,
          action: url ? {
            label: 'عرض',
            onClick: () => {
              window.location.href = url; // ✅ استخدام المتغير الآمن
            },
          } : undefined,
        });
      }
    });
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (isLoading) return;

    // Redirect to login if not authenticated and trying to access protected route
    if (!isAuthenticated && !isPublicRoute(pathname)) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Check seller routes
    if (isAuthenticated && SELLER_ROUTES.some(route => pathname.startsWith(route))) {
      if (user?.account_type !== 'seller' && !user?.is_professional_seller) {
        // Allow basic sellers to access seller pages, but show upgrade prompts
        // For now, just allow access
      }
    }
  }, [isLoading, isAuthenticated, pathname, router, user]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF9F3]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#800020] font-tajawal">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
