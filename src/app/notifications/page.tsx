// Notifications page

'use client';

import Link from 'next/link';
import { Bell, Trash2, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, EmptyState, ErrorState } from '@/components/shared';
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead, useDeleteNotification } from '@/hooks';
import { formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

const NOTIFICATION_ICONS: Record<string, string> = {
  order_created: '📦',
  order_accepted: '✅',
  order_delivered: '🚚',
  order_completed: '🎉',
  new_message: '💬',
  new_bid: '💰',
  auction_won: '🏆',
  rating_received: '⭐',
  system: '🔔',
};

export default function NotificationsPage() {
  const { data, isLoading, error, refetch } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const deleteNotification = useDeleteNotification();

  const handleMarkRead = (id: string) => {
    markRead.mutate(id);
  };

  const handleMarkAllRead = () => {
    markAllRead.mutate();
  };

  const handleDelete = (id: string) => {
    deleteNotification.mutate(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                <Bell className="h-5 w-5 text-[var(--textInverse)]" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">الإشعارات</h1>
            </div>

            {data?.items && data.items.some(n => !n.is_read) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllRead}
                className="text-[var(--primary)]"
              >
                <CheckCheck className="h-4 w-4 ml-2" />
                قراءة الكل
              </Button>
            )}
          </div>

          {isLoading ? (
            <LoadingSkeleton type="list" count={5} />
          ) : error ? (
            <ErrorState onRetry={() => refetch()} />
          ) : data?.items && data.items.length > 0 ? (
            <div className="space-y-2">
              {data.items.map((notification) => (
                <Card
                  key={notification.id}
                  className={cn(
                    "border cursor-pointer transition-colors hover:shadow-md",
                    notification.is_read
                      ? "border-[var(--border)] bg-[var(--surface)]"
                      : "border-[var(--primary)] bg-[var(--surfaceMuted)]"
                  )}
                  onClick={() => !notification.is_read && handleMarkRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {NOTIFICATION_ICONS[notification.type] || '🔔'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-[var(--text)]">
                              {notification.title}
                            </p>
                            <p className="text-sm text-[var(--textSecondary)] mt-1">
                              {notification.message}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notification.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-[var(--textTertiary)]" />
                          </Button>
                        </div>
                        <p className="text-xs text-[var(--textTertiary)] mt-2">
                          {formatRelativeTime(notification.created_at)}
                        </p>
                      </div>
                      {!notification.is_read && (
                        <Badge className="bg-[var(--primary)] text-[var(--textInverse)] shrink-0">
                          جديد
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Bell}
              title="لا توجد إشعارات"
              description="ستظهر هنا الإشعارات الجديدة"
            />
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}




// // src/app/notifications/page.tsx
// 'use client';

// import { Bell, Trash2, CheckCheck, Sparkles, Zap, MessageCircle, Package, Star, Trophy, Heart, Shield, ShoppingCart, TrendingUp, Award, Tag } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
// import { LoadingSkeleton, EmptyState, ErrorState } from '@/components/shared';
// import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead, useDeleteNotification } from '@/hooks';
// import { formatRelativeTime } from '@/lib/utils';
// import { cn } from '@/lib/utils';
// import { useState } from 'react';

// // ✨ Notification Type Configuration - Better Icons
// const NOTIFICATION_CONFIG: Record<string, {
//   icon: React.ElementType;
//   color: string;
//   gradient: string;
//   label: string;
// }> = {
//   order_created: { icon: ShoppingCart, color: 'var(--primary)', gradient: 'from-[var(--primary)] to-[var(--primaryDark)]', label: 'طلب جديد' },
//   order_accepted: { icon: CheckCheck, color: 'var(--success)', gradient: 'from-[var(--success)] to-[var(--success)]/80', label: 'تم القبول' },
//   order_delivered: { icon: Package, color: 'var(--info)', gradient: 'from-[var(--info)] to-[var(--info)]/80', label: 'تم التوصيل' },
//   order_completed: { icon: Award, color: 'var(--warning)', gradient: 'from-[var(--warning)] to-[var(--warning)]/80', label: 'اكتمل' },
//   new_message: { icon: MessageCircle, color: 'var(--info)', gradient: 'from-[var(--info)] to-[var(--info)]/80', label: 'رسالة' },
//   new_bid: { icon: TrendingUp, color: 'var(--warning)', gradient: 'from-[var(--warning)] to-[var(--warning)]/80', label: 'مزايدة' },
//   auction_won: { icon: Trophy, color: 'var(--primary)', gradient: 'from-[var(--primary)] to-[var(--primaryDark)]', label: 'فوز' },
//   rating_received: { icon: Star, color: 'var(--warning)', gradient: 'from-[var(--warning)] to-[var(--warning)]/80', label: 'تقييم' },
//   system: { icon: Bell, color: 'var(--textTertiary)', gradient: 'from-[var(--textTertiary)] to-[var(--textTertiary)]/80', label: 'نظام' },
//   promotion: { icon: Tag, color: 'var(--success)', gradient: 'from-[var(--success)] to-[var(--success)]/80', label: 'عرض' },
//   favorite: { icon: Heart, color: 'var(--error)', gradient: 'from-[var(--error)] to-[var(--error)]/80', label: 'مفضلة' },
// };

// // ✨ Animated Visual Panel - LEFT SIDE (Fixed)
// function AnimatedVisualPanel({ unreadCount }: { unreadCount: number }) {
//   return (
//     <aside className="hidden lg:block lg:col-span-1">
//       <div className="sticky top-24 h-[calc(100vh-8rem)]">
//         <div className="
//           h-full rounded-3xl overflow-hidden relative
//           bg-gradient-to-br from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary-900)]
//         ">
//           {/* ✨ Floating Icons */}
//           <div className="absolute inset-0 pointer-events-none">
//             {[Bell, MessageCircle, Package, Star, Trophy, Heart, Zap, Shield].map((Icon, i) => (
//               <div
//                 key={i}
//                 className="absolute animate-float-icon"
//                 style={{
//                   top: `${10 + i * 10}%`,
//                   right: `${5 + i * 12}%`,
//                   animationDelay: `${i * 0.3}s`,
//                   animationDuration: `${4 + i * 0.5}s`,
//                 }}
//               >
//                 <Icon className={`w-6 h-6 text-white/20 ${i % 2 === 0 ? 'animate-rotate-slow' : ''}`} />
//               </div>
//             ))}
//           </div>

//           {/* ✨ Glowing Orbs */}
//           <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse-orb" />
//           <div className="absolute bottom-10 left-10 w-36 h-36 bg-[var(--primary-light)]/20 rounded-full blur-3xl animate-pulse-orb delay-1000" />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl animate-pulse-glow" />

//           {/* ✨ Floating Particles */}
//           {[...Array(25)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 right: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${3 + Math.random() * 4}s`,
//               }}
//             />
//           ))}

//           {/* ✨ Central Content */}
//           <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
//             {/* Animated Bell */}
//             <div className="relative mb-4">
//               <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse-ring" />
//               <Bell className="relative w-14 h-14 text-white animate-bell-sway" />

//               {/* Unread Badge */}
//               {unreadCount > 0 && (
//                 <div className="absolute -top-1 -left-1 animate-bounce-in">
//                   <Badge className="bg-[var(--success)] text-[var(--textInverse)] px-1.5 py-0.5 text-[10px] font-cairo">
//                     {unreadCount}
//                   </Badge>
//                 </div>
//               )}
//             </div>

//             {/* Title */}
//             <h2 className="text-xl font-bold text-white font-cairo mb-2 animate-fadeInUp">
//               الإشعارات
//             </h2>

//             {/* Description */}
//             <p className="text-white/80 font-cairo text-sm max-w-xs mb-4 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
//               {unreadCount > 0
//                 ? `لديكِ ${unreadCount} إشعار${unreadCount > 1 ? 'ات' : ''} جديد${unreadCount > 1 ? 'ة' : ''}`
//                 : 'كل الإشعارات مقروءة ✓'
//               }
//             </p>

//             {/* ✨ Feature Badges */}
//             <div className="flex flex-wrap justify-center gap-1.5 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
//               {[
//                 { icon: Zap, label: 'فوري', color: 'var(--warning)' },
//                 { icon: Shield, label: 'آمن', color: 'var(--success)' },
//                 { icon: Sparkles, label: 'حصري', color: 'var(--primary-light)' },
//               ].map((badge, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm animate-fadeInUp"
//                   style={{ animationDelay: `${300 + i * 100}ms` }}
//                 >
//                   <badge.icon className="w-3 h-3" style={{ color: badge.color }} />
//                   <span className="text-[10px] text-white/90 font-cairo">{badge.label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ✨ Decorative Bottom Wave */}
//           <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--background)] to-transparent" />
//         </div>
//       </div>
//     </aside>
//   );
// }

// // ✨ Premium Notification Item - COMPACT SIZE
// function NotificationItem({
//   notification,
//   onMarkRead,
//   onDelete
// }: {
//   notification: any;
//   onMarkRead: (id: string) => void;
//   onDelete: (id: string) => void;
// }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const config = NOTIFICATION_CONFIG[notification.type] || NOTIFICATION_CONFIG.system;
//   const Icon = config.icon;

//   return (
//     <Card
//       className={cn(
//         "group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer animate-fadeInUp",
//         notification.is_read
//           ? "border-[var(--border)] bg-[var(--surface)] hover:shadow-md hover:shadow-[var(--primary)]/10"
//           : "border-[var(--primary)]/40 bg-gradient-to-r from-[var(--primary)]/5 to-transparent hover:shadow-md hover:shadow-[var(--primary)]/20"
//       )}
//       onClick={() => !notification.is_read && onMarkRead(notification.id)}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* ✨ Animated Background Glow */}
//       <div className={`
//         absolute inset-0 opacity-0 group-hover:opacity-100 
//         transition-opacity duration-300 pointer-events-none
//         bg-gradient-to-r ${config.gradient}
//       `} style={{ opacity: isHovered ? 0.03 : 0 }} />

//       <CardContent className="p-3 relative z-10">
//         <div className="flex items-start gap-3">

//           {/* ✨ COMPACT Icon Container - Smaller */}
//           <div className={`
//             relative w-10 h-10 rounded-lg flex items-center justify-center shrink-0
//             transition-all duration-300
//             ${notification.is_read
//               ? 'bg-[var(--surfaceMuted)]'
//               : `bg-gradient-to-br ${config.gradient}`
//             }
//             group-hover:scale-105
//           `}>
//             <Icon className="w-5 h-5 text-[var(--textInverse)]" />

//             {/* Unread Pulse Indicator */}
//             {!notification.is_read && (
//               <div className="absolute inset-0 animate-ping-slow">
//                 <div className={`absolute inset-0 rounded-lg ${config.gradient} opacity-30 blur-md`} />
//               </div>
//             )}
//           </div>

//           {/* Content */}
//           <div className="flex-1 min-w-0">
//             <div className="flex items-start justify-between gap-2">
//               <div className="flex-1 min-w-0">
//                 {/* Title + Type Badge */}
//                 <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
//                   <p className="font-semibold text-[var(--text)] font-cairo text-sm truncate">
//                     {notification.title}
//                   </p>
//                   <Badge
//                     variant="secondary"
//                     className="text-[9px] font-cairo px-1.5 py-0"
//                     style={{
//                       backgroundColor: `${config.color}15`,
//                       color: config.color,
//                       borderColor: `${config.color}30`
//                     }}
//                   >
//                     {config.label}
//                   </Badge>
//                 </div>

//                 {/* Message - Smaller text */}
//                 <p className="text-xs text-[var(--textSecondary)] font-cairo line-clamp-1">
//                   {notification.message}
//                 </p>
//               </div>

//               {/* Delete Button - Smaller */}
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="shrink-0 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[var(--error)]/10 hover:text-[var(--error)]"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onDelete(notification.id);
//                 }}
//               >
//                 <Trash2 className="h-3.5 w-3.5" />
//               </Button>
//             </div>

//             {/* Footer: Time + Actions - More compact */}
//             <div className="flex items-center justify-between mt-2">
//               <p className="text-[10px] text-[var(--textTertiary)] font-cairo">
//                 {formatRelativeTime(notification.created_at)}
//               </p>

//               {/* Mark as Read Button - Smaller */}
//               {!notification.is_read && (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="h-6 text-[10px] text-[var(--primary)] hover:bg-[var(--primary)]/10 font-cairo gap-0.5"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onMarkRead(notification.id);
//                   }}
//                 >
//                   <CheckCheck className="w-3 h-3" />
//                   مقروء
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </CardContent>

//       {/* ✨ Bottom Accent Line */}
//       <div className={`
//         absolute inset-x-3 bottom-0 h-px rounded-full
//         bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent
//         scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center
//       `} />
//     </Card>
//   );
// }

// export default function NotificationsPage() {
//   const { data, isLoading, error, refetch } = useNotifications();
//   const markRead = useMarkNotificationRead();
//   const markAllRead = useMarkAllNotificationsRead();
//   const deleteNotification = useDeleteNotification();

//   const [isDeleting, setIsDeleting] = useState<string | null>(null);

//   const handleMarkRead = (id: string) => {
//     markRead.mutate(id);
//   };

//   const handleMarkAllRead = () => {
//     markAllRead.mutate();
//   };

//   const handleDelete = (id: string) => {
//     setIsDeleting(id);
//     deleteNotification.mutate(id, {
//       onSettled: () => setIsDeleting(null),
//     });
//   };

//   const unreadCount = data?.items?.filter((n: any) => !n.is_read).length || 0;

//   return (
//     <div className="min-h-screen flex flex-col bg-[var(--background)]">
//       {/* ✅ Header - UNCHANGED */}
//       <Navbar />

//       {/* ✅ Main Content - Split Layout */}
//       <main className="flex-1 py-6">
//         <div className="container mx-auto px-4 max-w-6xl">

//           {/* Grid Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

//             {/* ✅ RIGHT SIDE: Notifications List (Scrollable) */}
//             <div className="lg:col-span-2 space-y-3">

//               {/* Header Bar */}
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2.5">
//                   <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center">
//                     <Bell className="h-4.5 w-4.5 text-[var(--textInverse)]" />
//                   </div>
//                   <h1 className="text-xl font-bold text-[var(--primary)] font-cairo">الإشعارات</h1>
//                 </div>

//                 {unreadCount > 0 && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={handleMarkAllRead}
//                     disabled={markAllRead.isPending}
//                     className="text-[var(--primary)] font-cairo gap-1.5 text-sm"
//                   >
//                     {markAllRead.isPending ? (
//                       <>
//                         <Zap className="h-3.5 w-3.5 animate-spin" />
//                         جاري...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCheck className="h-3.5 w-3.5" />
//                         قراءة الكل
//                       </>
//                     )}
//                   </Button>
//                 )}
//               </div>

//               {/* Notifications List - Scrollable */}
//               <div className="space-y-2.5 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
//                 {isLoading ? (
//                   <LoadingSkeleton type="list" count={5} />
//                 ) : error ? (
//                   <ErrorState onRetry={() => refetch()} />
//                 ) : data?.items && data.items.length > 0 ? (
//                   data.items.map((notification: any, index: number) => (
//                     <div
//                       key={notification.id}
//                       className={cn(
//                         "animate-fadeInUp",
//                         isDeleting === notification.id && "opacity-50 pointer-events-none"
//                       )}
//                       style={{ animationDelay: `${index * 50}ms` }}
//                     >
//                       <NotificationItem
//                         notification={notification}
//                         onMarkRead={handleMarkRead}
//                         onDelete={handleDelete}
//                       />
//                     </div>
//                   ))
//                 ) : (
//                   <EmptyState
//                     icon={Bell}
//                     title="لا توجد إشعارات"
//                     description="ستظهر هنا الإشعارات الجديدة"
//                   />
//                 )}
//               </div>

//             </div>

//             {/* ✅ LEFT SIDE: Animated Visual (Fixed) */}
//             <AnimatedVisualPanel unreadCount={unreadCount} />

//           </div>
//         </div>
//       </main>

//       {/* ✅ Footer - UNCHANGED */}
//       <Footer />
//       <MobileBottomNav />

//       {/* ✨ Global Animations */}

//     </div>
//   );
// }