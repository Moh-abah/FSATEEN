'use client';

import Link from 'next/link';
import { Bell, CheckCheck, Gift, ShoppingBag, MessageCircle, Gavel, AlertCircle, CheckCircle, XCircle, Clock, Star, UserCheck, UserX, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NotificationItem } from './notification-item';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNotifications, useUnreadCount, useMarkAllNotificationsRead } from '@/hooks';
import { NotificationType } from '@/types';
import { cn } from '@/lib/utils';

// أيقونة لكل نوع إشعار (بدون تعديل)
const getNotificationIcon = (type: NotificationType) => {
 switch (type) {
  case 'order_created': return ShoppingBag;
  case 'order_accepted': return CheckCircle;
  case 'order_delivered': return Clock;
  case 'order_received': return CheckCircle;
  case 'order_completed': return CheckCircle;
  case 'order_cancelled': return XCircle;
  case 'order_disputed': return AlertCircle;
  case 'new_message': return MessageCircle;
  case 'new_bid': return Gavel;
  case 'auction_won': return Gift;
  case 'auction_ended': return Clock;
  case 'product_sold': return ShoppingBag;
  case 'product_expired': return Clock;
  case 'rating_received': return Star;
  case 'verification_approved': return UserCheck;
  case 'verification_rejected': return UserX;
  default: return Info;
 }
};

export function NotificationsDropdown() {
 const { data: unreadData } = useUnreadCount();
 const { data: notificationsData, isLoading } = useNotifications(1, 5);
 const { mutate: markAllAsRead } = useMarkAllNotificationsRead();

 const notifications = notificationsData?.items || [];
 const unreadCount = unreadData?.unread_count || 0;

 const handleMarkAllRead = () => {
  markAllAsRead();
 };

 return (
  <DropdownMenu dir="rtl">
   <Tooltip>
    <TooltipTrigger asChild>
     <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-[var(--surfaceMuted)] transition-all duration-200">
       <Bell className="h-5 w-5 text-[var(--text)]" />
       {unreadCount > 0 && (
        <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] p-0 flex items-center justify-center text-[10px] font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] text-white shadow-md">
         {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
       )}
      </Button>
     </DropdownMenuTrigger>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]">
     الإشعارات
    </TooltipContent>
   </Tooltip>

   <DropdownMenuContent align="start" className="w-96 p-0 rounded-xl shadow-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden" sideOffset={12}>
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 bg-[var(--surfaceMuted)]/50 border-b border-[var(--border)]">
     <div className="flex items-center gap-2">
      <Bell className="h-4 w-4 text-[var(--primary)]" />
      <h4 className="font-semibold text-[var(--text)]">الإشعارات</h4>
      {unreadCount > 0 && (
       <Badge variant="secondary" className="bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] px-1.5">
        {unreadCount} جديدة
       </Badge>
      )}
     </div>
     <div className="flex items-center gap-3">
      {unreadCount > 0 && (
       <button
        onClick={handleMarkAllRead}
        className="text-xs text-[var(--textSecondary)] hover:text-[var(--primary)] transition-colors flex items-center gap-1"
       >
        <CheckCheck className="h-3 w-3" />
        <span>تحديد الكل كمقروء</span>
       </button>
      )}
      <Link
       href="/notifications"
       className="text-xs text-[var(--primary)] hover:underline font-medium"
      >
       عرض الكل
      </Link>
     </div>
    </div>

    {/* Body */}
    <ScrollArea className="h-[420px]">
     {isLoading ? (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
       <Bell className="h-8 w-8 text-[var(--textTertiary)] animate-pulse" />
       <p className="text-sm text-[var(--textSecondary)]">جاري تحميل الإشعارات...</p>
      </div>
     ) : notifications.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
       <Bell className="h-10 w-10 text-[var(--textTertiary)] opacity-40" />
       <p className="text-sm text-[var(--textSecondary)]">لا توجد إشعارات جديدة</p>
       <p className="text-xs text-[var(--textTertiary)]">ستظهر هنا التحديثات المهمة</p>
      </div>
     ) : (
      <div className="divide-y divide-[var(--border)]">
       {notifications.map((notif) => (
        <NotificationItem key={notif.id} notification={notif} icon={getNotificationIcon(notif.type)} />
       ))}
      </div>
     )}
    </ScrollArea>

    {/* Footer */}
    <div className="px-4 py-2 bg-[var(--surfaceMuted)]/30 border-t border-[var(--border)] text-center">
     <Link href="/notifications" className="text-xs text-[var(--textSecondary)] hover:text-[var(--primary)] transition-colors">
      عرض جميع الإشعارات السابقة
     </Link>
    </div>
   </DropdownMenuContent>
  </DropdownMenu>
 );
}