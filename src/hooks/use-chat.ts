// Chat hooks using React Query + WebSocket

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState, useCallback } from 'react';
import api from '@/lib/api';
import { WebSocketClient, getChatWSUrl } from '@/lib/ws';
import { tokenManager } from '@/lib/api';
import { 
  Conversation, 
  Message, 
  ConversationCreate, 
  MessageCreate,
  PaginatedResponse,
  WSMessage,
} from '@/types';
import { useAuthStore } from '@/stores/auth-store';

// Fetch conversations list
export function useConversations(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['conversations', page, pageSize],
    queryFn: () => api.get<PaginatedResponse<Conversation>>('/chats/conversations', { 
      params: { page, page_size: pageSize } 
    }),
  });
}



export function useMessages(conversationId: string, page = 1, pageSize = 50) {
  return useQuery({
    queryKey: ['messages', conversationId, page, pageSize],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Message>>(`/chats/conversations/${conversationId}/messages`, {
        params: { page, page_size: pageSize }
      });
      console.log('📩 رسائل المحادشة:', response);
      return response;
    },
    enabled: !!conversationId,
    retry: false,              
    staleTime: 5 * 60 * 1000,   

  });
}


// Create conversation
export function useCreateConversation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ConversationCreate) => 
      api.post<Conversation>('/chats/conversations', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

// Send message via REST
export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: MessageCreate) => 
      api.post<Message>(`/chats/conversations/${conversationId}/messages`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

// Mark conversation as read
export function useMarkConversationRead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (conversationId: string) => 
      api.post(`/chats/conversations/${conversationId}/read`),



    retry: false,               
    onSuccess: (_, conversationId) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
    },
  });
}

// Full chat hook with WebSocket support
export function useChat(conversationId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [isConnected, setIsConnected] = useState(false);
  const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocketClient | null>(null);
  
  const { data: messagesData, isLoading, error } = useMessages(conversationId);
  
  // Initialize WebSocket
  useEffect(() => {
    if (!conversationId) return;
    
    const token = tokenManager.getAccessToken();
    if (!token) return;
    
    const ws = new WebSocketClient({
      conversationId: conversationId,
      onMessage: (message: WSMessage) => {
        switch (message.type) {
          case 'new_message':
          case 'message_sent':
            if (message.message) {
              // إزالة الرسالة المتفائلة إذا وجدت
              if (message.temp_id) {
                setOptimisticMessages(prev =>
                  prev.filter(m => m.id !== message.temp_id)
                );
              }

              // ✅ إضافة الرسالة الجديدة مباشرة إلى الكاش (بدون invalidate)
              queryClient.setQueryData<PaginatedResponse<Message>>(
                ['messages', conversationId, 1, 50], // نفس المفاتيح التي يستخدمها useMessages
                (oldData) => {
                  if (!oldData) {
                    return {
                      items: [message.message!],
                      total: 1,
                      page: 1,
                      page_size: 50
                    };
                  }
                  // تجنب إضافة نفس الرسالة مرتين
                  if (oldData.items.some(msg => msg.id === message.message!.id)) {
                    return oldData;
                  }
                  return {
                    ...oldData,
                    items: [...oldData.items, message.message!],
                    total: oldData.total + 1,
                  };
                }
              );

              // تحديث قائمة المحادثات (لتحديث آخر رسالة)
              queryClient.invalidateQueries({ queryKey: ['conversations'] });
            }
            break;
          case 'message_read':
            // يمكن ترك invalidate للقراءة إذا لم تكن بحاجة فورية
            queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            break;
        }
      },
      onConnectionChange: setIsConnected,
    });
    
    ws.connect(token);
    wsRef.current = ws;
    
    // Keep-alive ping
    const pingInterval = setInterval(() => {
      ws.ping();
    }, 30000);
    
    return () => {
      clearInterval(pingInterval);
      ws.disconnect();
      wsRef.current = null;
    };
  }, [conversationId, queryClient]);
  

  const sendMessage = useCallback((body: string, imageUrl?: string) => {
    if (!wsRef.current || !isConnected) {
      console.error('WebSocket not connected');
      return;
    }

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage: Message = {
      id: tempId,
      conversation_id: conversationId,
      sender_id: user?.id || '',
      sender_username: user?.username ?? undefined,  
      sender_avatar: user?.avatar_url,
      body,
      message_type: imageUrl ? 'image' : 'text',
      image_url: imageUrl || null,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    setOptimisticMessages(prev => [...prev, optimisticMessage]);

    wsRef.current.send({
      type: 'message',
      body,
      message_type: imageUrl ? 'image' : 'text',
      image_url: imageUrl || null,
      temp_id: tempId,
    });

    // ❌ إزالة REST backup completely
  }, [conversationId, isConnected, user]);

  // Merge server messages with optimistic messages
  const messages = [
    ...(messagesData?.items || []),
    ...optimisticMessages,
  ].sort((a, b) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime() 
  );
  
  return {
    messages,
    isLoading,
    error,
    isConnected,
    sendMessage,
  };
}
