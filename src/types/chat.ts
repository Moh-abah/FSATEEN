// Chat and WebSocket types based on OpenAPI spec

export interface Conversation {
  id: string;
  created_at: string;
  last_message_at: string;
  last_message_preview: string | null;
  other_participant: {
    id: string;
    username?: string;
    avatar_url?: string | null;
    is_verified: boolean;
  };
  participant_a_id: string;
  participant_b_id: string;
  product_id: string;
  product_image: string;
  product_title: string;
  unread_count: number;
}

export interface ConversationParticipant {
  id: string;
  user_id: string;
  conversation_id: string;
  joined_at: string;
  user: {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    is_verified: boolean;
  };
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  message_type: 'text' | 'image' | 'system';
  image_url?: string | null;
  is_read: boolean;
  read_at?: string | null;
  created_at: string;
  // إضافة الحقول الفعلية من الـ API
  sender_username?: string;
  sender_avatar?: string | null;
}


export interface ConversationCreate {
  product_id?: string;
  recipient_id: string;
}

export interface MessageCreate {
  body: string;
  message_type?: 'text' | 'image';
  image_url?: string;
}

// WebSocket message types
export type WSMessageType = 
  | 'auth' 
  | 'auth_success' 
  | 'auth_failed'
  | 'message' 
  | 'message_sent' 
  | 'new_message' 
  | 'message_delivered' 
  | 'message_read' 
  | 'ping' 
  | 'pong'
  | 'error';

export interface WSMessage {
  type: WSMessageType;
  token?: string;
  body?: string;
  message_type?: 'text' | 'image';
  image_url?: string | null;
  temp_id?: string;
  message_id?: string;
  conversation_id?: string;
  sender_id?: string;
  reader_id?: string;
  timestamp?: string;
  message?: Message;
  error?: string;
}

export interface WSAuthMessage {
  type: 'auth';
  token: string;
}

export interface WSChatMessage {
  type: 'message';
  body: string;
  message_type: 'text' | 'image';
  image_url?: string | null;
  temp_id: string;
}
