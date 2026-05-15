// Firebase Cloud Messaging Service Worker
// This file handles push notifications when the browser/app is in the background

// Import Firebase scripts for service worker
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

// Firebase configuration - these values are injected at build time
// They are safe to expose as they have restricted permissions in GCP
const firebaseConfig = {
 apiKey: "AIzaSyBx8OiW6E9p2HYnqMxFMy2T4wW5FnICVRw",
 authDomain: "furateen-6eecd.firebaseapp.com",
 projectId: "furateen-6eecd",
 storageBucket: "furateen-6eecd.firebasestorage.app",
 messagingSenderId: "614006123081",
 appId: "1:614006123081:web:c036b0d2acf4dd66dcad98",
 measurementId: "G-MXYG298Q0G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
 console.log('[firebase-messaging-sw.js] Received background message:', payload);

 const notification = payload.notification || {};
 const data = payload.data || {};

 // Extract notification details
 const title = notification.title || 'فساتين - إشعار جديد';
 const body = notification.body || 'لديك إشعار جديد';
 const icon = notification.icon || '/icons/icon-192x192.png';
 const badge = notification.badge || '/icons/badge-72x72.png';
 const image = notification.image || data.image;
 const url = data.url || '/';

 // Notification options
 const options = {
  body,
  icon,
  badge,
  image,
  dir: 'rtl', // Right-to-left for Arabic
  lang: 'ar-SA',
  tag: data.tag || 'fusateen-notification',
  requireInteraction: data.requireInteraction === 'true',
  data: {
   url,
   ...data,
  },
  actions: [
   {
    action: 'open',
    title: 'فتح',
   },
   {
    action: 'dismiss',
    title: 'إغلاق',
   },
  ],
 };

 // Show notification
 return self.registration.showNotification(title, options);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
 console.log('[firebase-messaging-sw.js] Notification clicked:', event);

 // Close notification
 event.notification.close();

 const action = event.action;
 const data = event.notification.data || {};

 // Handle actions
 if (action === 'dismiss') {
  return;
 }

 // Open or focus the app
 const urlToOpen = data.url || '/';

 event.waitUntil(
  clients.matchAll({ type: 'window', includeUncontrolled: true })
   .then((clientList) => {
    // Check if there's already a window open
    for (const client of clientList) {
     if (client.url.includes(self.location.origin) && 'focus' in client) {
      // Navigate to the URL and focus
      client.navigate(urlToOpen);
      return client.focus();
     }
    }
    // Open new window
    if (clients.openWindow) {
     return clients.openWindow(urlToOpen);
    }
   })
 );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
 console.log('[firebase-messaging-sw.js] Notification closed:', event);

 // You can track dismissal analytics here if needed
});

// Service Worker lifecycle events
self.addEventListener('install', (event) => {
 console.log('[firebase-messaging-sw.js] Service Worker installed');
 self.skipWaiting();
});

self.addEventListener('activate', (event) => {
 console.log('[firebase-messaging-sw.js] Service Worker activated');
 event.waitUntil(clients.claim());
});

console.log('[firebase-messaging-sw.js] Service Worker loaded');
