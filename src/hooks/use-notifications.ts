// Notifications hooks using React Query

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Notification, UnreadCountResponse, PaginatedResponse } from '@/types';

// Fetch notifications
export function useNotifications(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['notifications', page, pageSize],
    queryFn: () => api.get<PaginatedResponse<Notification>>('/notifications', { 
      params: { page, page_size: pageSize } 
    }),
  });
}

// Fetch unread count
export function useUnreadCount() {
  return useQuery({
    queryKey: ['unread-count'],
    queryFn: () => api.get<UnreadCountResponse>('/notifications/unread-count'),
    refetchInterval: 60000, // Refetch every minute
  });
}

// Mark notification as read
export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => 
      api.patch(`/notifications/${notificationId}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unread-count'] });
    },
  });
}

// Mark all notifications as read
export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => api.put('/notifications/read-all'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unread-count'] });
    },
  });
}

// Delete notification
export function useDeleteNotification() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => 
      api.delete(`/notifications/${notificationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

// Register device token for push notifications
export function useRegisterDeviceToken() {
  return useMutation({
    mutationFn: (data: { token: string; device_name?: string }) => 
      api.post('/device-token', data),
  });
}
