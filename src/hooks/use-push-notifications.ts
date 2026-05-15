// @ts-nocheck
// Push Notifications Hook for Firebase Cloud Messaging

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
 initializeFirebase,
 requestFCMToken,
 getNotificationPermission,
 onForegroundMessage,
 isFirebaseConfigured,
 MessagePayload
} from '@/lib/firebase';
import api from '@/lib/api';
import { toast } from 'sonner';

export interface PushNotificationState {
 isSupported: boolean;
 isConfigured: boolean;
 permission: NotificationPermission | null;
 isRegistered: boolean;
 isLoading: boolean;
 error: string | null;
 token: string | null;
}

export interface UsePushNotificationsReturn extends PushNotificationState {
 requestPermission: () => Promise<boolean>;
 registerDevice: () => Promise<boolean>;
 unregisterDevice: () => Promise<boolean>;
}

/**
 * Hook for managing Firebase Cloud Messaging push notifications
 */
export function usePushNotifications(): UsePushNotificationsReturn {
 const [state, setState] = useState<PushNotificationState>(() => ({
  isSupported: typeof window !== 'undefined' && 'Notification' in window,
  isConfigured: isFirebaseConfigured(),
  permission: typeof window !== 'undefined' && 'Notification' in window
   ? Notification.permission
   : null,
  isRegistered: false,
  isLoading: false,
  error: null,
  token: null,
 }));

 // Initialize Firebase on mount
 useEffect(() => {
  if (typeof window === 'undefined') return;

  // Initialize Firebase (this also sets up foreground message handling)
  if (state.isConfigured) {
   initializeFirebase();
  }
 }, [state.isConfigured]);

 // Listen for foreground messages
 useEffect(() => {
  if (!state.isConfigured) return;

  const unsubscribe = onForegroundMessage((payload: MessagePayload) => {
   console.log('[PushNotifications] Foreground message:', payload);

   // Show toast notification
   const notification = payload.notification;
   if (notification) {
    toast.info(notification.title || 'إشعار جديد', {
     description: notification.body,
     action: payload.data?.url ? {
      label: 'عرض',
      onClick: () => window.location.href = payload.data.url as string,
     } : undefined,
    });
   }
  });

  return unsubscribe;
 }, [state.isConfigured]);

 /**
  * Request notification permission from user
  */
 const requestPermission = useCallback(async (): Promise<boolean> => {
  if (!state.isSupported) {
   setState(prev => ({ ...prev, error: 'المتصفح لا يدعم الإشعارات' }));
   return false;
  }

  if (!state.isConfigured) {
   setState(prev => ({ ...prev, error: 'لم يتم تهيئة الإشعارات' }));
   return false;
  }

  setState(prev => ({ ...prev, isLoading: true, error: null }));

  try {
   const token = await requestFCMToken();
   const permission = getNotificationPermission();

   setState(prev => ({
    ...prev,
    permission,
    token,
    isLoading: false,
    isRegistered: !!token,
   }));

   if (!token) {
    if (permission === 'denied') {
     setState(prev => ({
      ...prev,
      error: 'تم رفض إذن الإشعارات. يمكنك تفعيله من إعدادات المتصفح.'
     }));
    }
    return false;
   }

   return true;
  } catch (error) {
   console.error('[PushNotifications] Error requesting permission:', error);
   setState(prev => ({
    ...prev,
    isLoading: false,
    error: 'فشل في طلب إذن الإشعارات',
   }));
   return false;
  }
 }, [state.isSupported, state.isConfigured]);

 /**
  * Register device token with backend
  */
 const registerDevice = useCallback(async (): Promise<boolean> => {
  if (!state.token) {
   // First get the token
   const hasPermission = await requestPermission();
   if (!hasPermission) return false;
  }

  // Get fresh token to ensure we have the latest
  const token = await requestFCMToken();
  if (!token) {
   setState(prev => ({ ...prev, error: 'فشل في الحصول على توكن الإشعارات' }));
   return false;
  }

  setState(prev => ({ ...prev, isLoading: true }));

  try {
   // Get device name
   const deviceName = typeof navigator !== 'undefined'
    ? `${navigator.userAgent.includes('Chrome') ? 'Chrome' :
     navigator.userAgent.includes('Firefox') ? 'Firefox' :
      navigator.userAgent.includes('Safari') ? 'Safari' : 'Browser'} على ${navigator.platform}`
    : 'Unknown Device';

   // Register with backend
   await api.post('/device-token', {
    token,
    device_name: deviceName,
   });

   setState(prev => ({
    ...prev,
    token,
    isRegistered: true,
    isLoading: false,
    error: null,
   }));

   toast.success('تم تفعيل الإشعارات بنجاح');
   return true;
  } catch (error) {
   console.error('[PushNotifications] Error registering device:', error);
   setState(prev => ({
    ...prev,
    isLoading: false,
    error: 'فشل في تسجيل الجهاز',
   }));
   toast.error('فشل في تسجيل الإشعارات');
   return false;
  }
 }, [state.token, requestPermission]);

 /**
  * Unregister device token from backend
  */
 const unregisterDevice = useCallback(async (): Promise<boolean> => {
  if (!state.token) {
   return true; // Already unregistered
  }

  setState(prev => ({ ...prev, isLoading: true }));

  try {
   await api.delete(`/device-token/${state.token}`);

   setState(prev => ({
    ...prev,
    isRegistered: false,
    token: null,
    isLoading: false,
    error: null,
   }));

   toast.success('تم إيقاف الإشعارات');
   return true;
  } catch (error) {
   console.error('[PushNotifications] Error unregistering device:', error);
   setState(prev => ({
    ...prev,
    isLoading: false,
    error: 'فشل في إلغاء تسجيل الإشعارات',
   }));
   return false;
  }
 }, [state.token]);

 return {
  ...state,
  requestPermission,
  registerDevice,
  unregisterDevice,
 };
}

/**
 * Simple hook to check if notifications are enabled
 */
export function useNotificationStatus() {
 const { isSupported, isConfigured, permission, isRegistered } = usePushNotifications();

 return {
  canRequestPermission: isSupported && isConfigured && permission === 'default',
  isGranted: permission === 'granted',
  isDenied: permission === 'denied',
  isEnabled: isRegistered && permission === 'granted',
  isDisabled: !isSupported || !isConfigured || permission === 'denied',
 };
}
