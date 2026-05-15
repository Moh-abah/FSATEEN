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