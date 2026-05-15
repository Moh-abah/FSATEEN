'use client';

import { cn, formatRelativeTime } from '@/lib/utils';
import { useMarkNotificationRead } from '@/hooks';
import { Notification } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';

interface NotificationItemProps {
 notification: Notification;
 icon?: React.ElementType;
}

export function NotificationItem({ notification, icon: Icon = Bell }: NotificationItemProps) {
 const { mutate: markAsRead } = useMarkNotificationRead();
 const router = useRouter();

 const link = notification.data?.link as string | undefined;
 const imageUrl = notification.data?.image_url as string | undefined;

 const handleClick = () => {
  if (!notification.is_read) {
   markAsRead(notification.id);
  }
  if (link) {
   router.push(link);
  }
 };

 return (
  <div
   dir="rtl"
   onClick={handleClick}
   className={cn(
    "group p-3 cursor-pointer transition-all duration-200 hover:bg-[var(--surfaceMuted)]",
    !notification.is_read && "bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10"
   )}
  >
   <div className="flex items-start gap-3">
    {/* الأيقونة أو الصورة - أول عنصر → ستظهر في اليمين (في RTL) */}
    {imageUrl ? (
     <Avatar className="h-10 w-10 shrink-0 ring-1 ring-[var(--border)]">
      <AvatarImage src={imageUrl} />
      <AvatarFallback>ص</AvatarFallback>
     </Avatar>
    ) : (
     <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
      <Icon className="h-5 w-5" />
     </div>
    )}

    {/* المحتوى النصي - ثاني عنصر → سيظهر في اليسار */}
    <div className="flex-1 min-w-0">
     <div className="flex items-start justify-between gap-2">
      <p className="text-sm font-semibold text-[var(--text)] truncate">
       {notification.title}
      </p>
      {!notification.is_read && (
       <div className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0 mt-1.5" />
      )}
     </div>
     <p className="text-xs text-[var(--textSecondary)] mt-0.5 line-clamp-2">
      {notification.message}
     </p>
     <p className="text-[11px] text-[var(--textTertiary)] mt-1">
      {formatRelativeTime(notification.created_at)}
     </p>
    </div>
   </div>
  </div>
 );
}