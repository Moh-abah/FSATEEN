// Notification types

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}

export type NotificationType = 
  | 'order_created'
  | 'order_accepted'
  | 'order_delivered'
  | 'order_received'
  | 'order_completed'
  | 'order_cancelled'
  | 'order_disputed'
  | 'new_message'
  | 'new_bid'
  | 'auction_won'
  | 'auction_ended'
  | 'product_sold'
  | 'product_expired'
  | 'rating_received'
  | 'verification_approved'
  | 'verification_rejected'
  | 'system';

export interface UnreadCountResponse {
  unread_count: number;
}

export interface DeviceTokenRequest {
  token: string;
  device_name?: string;
}
