// Firebase initialization and FCM utilities
// All sensitive keys are loaded from environment variables

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
 getMessaging,
 Messaging,
 getToken,
 onMessage,
 isSupported,
 MessagePayload
} from 'firebase/messaging';

// Firebase configuration from environment variables
const firebaseConfig = {
 apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
 authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
 projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
 storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
 messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
 appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
 measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// VAPID key for web push
const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;

// Check if Firebase is properly configured
export function isFirebaseConfigured(): boolean {
 return !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.messagingSenderId &&
  vapidKey
 );
}

// Firebase app instance (singleton)
let firebaseApp: FirebaseApp | null = null;
let messagingInstance: Messaging | null = null;

/**
 * Initialize Firebase app (client-side only)
 * Returns null if Firebase is not configured or not supported
 */
export function initializeFirebase(): FirebaseApp | null {
 // Only run on client side
 if (typeof window === 'undefined') {
  return null;
 }

 // Check if already initialized
 if (firebaseApp) {
  return firebaseApp;
 }

 // Check if Firebase is configured
 if (!isFirebaseConfigured()) {
  console.warn('[Firebase] Firebase is not configured. Set environment variables to enable push notifications.');
  return null;
 }

 try {
  // Check if Firebase already has apps initialized
  const existingApps = getApps();

  if (existingApps.length > 0) {
   firebaseApp = existingApps[0];
  } else {
   firebaseApp = initializeApp(firebaseConfig);
  }

  console.log('[Firebase] Firebase initialized successfully');
  return firebaseApp;
 } catch (error) {
  console.error('[Firebase] Failed to initialize Firebase:', error);
  return null;
 }
}

/**
 * Get Firebase Messaging instance
 * Returns null if not supported or not configured
 */
export async function getFirebaseMessaging(): Promise<Messaging | null> {
 // Only run on client side
 if (typeof window === 'undefined') {
  return null;
 }

 // Return cached instance
 if (messagingInstance) {
  return messagingInstance;
 }

 // Initialize Firebase app first
 const app = initializeFirebase();
 if (!app) {
  return null;
 }

 try {
  // Check if messaging is supported in this browser
  const supported = await isSupported();
  if (!supported) {
   console.warn('[Firebase] Messaging is not supported in this browser');
   return null;
  }

  messagingInstance = getMessaging(app);
  return messagingInstance;
 } catch (error) {
  console.error('[Firebase] Failed to get messaging instance:', error);
  return null;
 }
}

/**
 * Request notification permission and get FCM token
 * @returns FCM token string or null if permission denied/not supported
 */
export async function requestFCMToken(): Promise<string | null> {
 const messaging = await getFirebaseMessaging();

 if (!messaging) {
  console.warn('[Firebase] Messaging not available');
  return null;
 }

 if (!vapidKey) {
  console.error('[Firebase] VAPID key is not configured');
  return null;
 }

 try {
  // Request permission
  const permission = await Notification.requestPermission();

  if (permission !== 'granted') {
   console.log('[Firebase] Notification permission denied');
   return null;
  }

  // Get FCM token
  const token = await getToken(messaging, { vapidKey });

  if (token) {
   console.log('[Firebase] FCM token obtained successfully');
   return token;
  }

  return null;
 } catch (error) {
  console.error('[Firebase] Failed to get FCM token:', error);
  return null;
 }
}

/**
 * Check current notification permission status
 */
export function getNotificationPermission(): NotificationPermission | null {
 if (typeof window === 'undefined' || !('Notification' in window)) {
  return null;
 }
 return Notification.permission;
}

/**
 * Listen for foreground messages
 * @param callback Function to call when a message is received
 * @returns Unsubscribe function
 */
export function onForegroundMessage(
 callback: (payload: MessagePayload) => void
): () => void {
 // This should be called after messaging is initialized
 let unsubscribe: (() => void) | null = null;

 getFirebaseMessaging().then((messaging) => {
  if (messaging) {
   unsubscribe = onMessage(messaging, (payload) => {
    console.log('[Firebase] Foreground message received:', payload);
    callback(payload);
   });
  }
 });

 // Return unsubscribe function
 return () => {
  if (unsubscribe) {
   unsubscribe();
  }
 };
}

// Export types for use in hooks
export type { MessagePayload };
