


// app/chats/[conversationId]/page.tsx
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MoreVertical, Search, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Navbar, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, ErrorState } from '@/components/shared';
import { ChatInput } from '@/components/chat/chat-input';
import { ConversationList } from '@/components/chat/conversation-list';
import { MessageBubble } from '@/components/chat/message-bubble';
import { DateSeparator } from '@/components/chat/date-separator';
import { useChat, useMessages, useConversations, useMarkConversationRead } from '@/hooks';
import { useAuthStore } from '@/stores/auth-store';
import { getAvatarUrl, cn } from '@/lib/utils';

export default function ChatLayoutPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.conversationId as string;
  const { user } = useAuthStore();

  // جلب قائمة المحادثات
  const { data: conversationsData, isLoading: isConversationsLoading } = useConversations();
  const conversations = conversationsData?.items || [];

  // جلب رسائل المحادثة الحالية
  const { messages, isLoading: isMessagesLoading, error, isConnected, sendMessage } = useChat(conversationId);
  const markRead = useMarkConversationRead();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMarkedRead = useRef(false);

  // تعليم المحادثة كمقروءة عند الدخول
  useEffect(() => {
    if (!hasMarkedRead.current && conversationId) {
      hasMarkedRead.current = true;
      markRead.mutate(conversationId);
    }
  }, [conversationId]);

  // التمرير لأسفل عند وصول رسالة جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // إرسال رسالة
  const handleSend = (text: string, imageUrl?: string) => {
    if (!text.trim() && !imageUrl) return;
    sendMessage(text.trim(), imageUrl);
  };

  // تجميع الرسائل حسب التاريخ لإدراج الفواصل
  const messagesWithSeparators = useMemo(() => {
    const result: { type: 'message' | 'separator'; date?: string; message?: any }[] = [];
    let lastDate: string | null = null;
    messages.forEach((msg) => {
      const date = msg.created_at.split('T')[0];
      if (date !== lastDate) {
        result.push({ type: 'separator', date });
        lastDate = date;
      }
      result.push({ type: 'message', message: msg });
    });
    return result;
  }, [messages]);

  // معلومات المستخدم الآخر
  const otherMessage = messages.find((m) => m.sender_id !== user?.id);
  const otherUser = otherMessage
    ? {
      username: otherMessage.sender_username,
      avatar_url: otherMessage.sender_avatar,
      full_name: otherMessage.sender_username,
    }
    : null;

  // معالجة حالة التحميل الأولى (عكس الترتيب)
  if (isConversationsLoading || isMessagesLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <main className="flex-1 flex min-h-0">          {/* الشريط الجانبي أصبح في اليمين */}
          <div className="w-[35%] hidden md:block order-last">
            <LoadingSkeleton type="list" count={5} />
          </div>
          {/* منطقة المحتوى في اليسار */}
          <div className="flex-1 order-first">
            <LoadingSkeleton type="list" count={5} />
          </div>
        </main>
        <MobileBottomNav />
      </div>
    );
  }

  // في حالة عدم وجود محادثة محددة (عند الدخول إلى /chats بدون id) - عكس الترتيب
  if (!conversationId || error) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <main className="flex-1 flex min-h-0">          {/* الشريط الجانبي في اليمين */}
          <div className="w-[35%] hidden md:block order-last">
            <ConversationList
              conversations={conversations}
              activeId={conversationId}
              currentUserId={user?.id}
            />
          </div>
          {/* محتوى الخطأ في اليسار */}
          <div className="flex-1 flex items-center justify-center order-first">
            <ErrorState onRetry={() => window.location.reload()} />
          </div>
        </main>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[var(--background)]">
      {/* تخطيط الشاشتين: الشريط الجانبي (يمين) + المحادثة (يسار) - عكس الترتيب */}
      <main className="flex-1 flex min-h-0 overflow-hidden">
                {/* منطقة المحادثة الرئيسية – أصبحت في اليسار */}
          <div className="flex-1 flex flex-col min-w-0 bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden order-1 animate-fade-in-up">                    {/* رأس المحادثة مع عكس اتجاه العناصر */}
          <header className="sticky top-0 z-40 bg-[var(--surface)] border-b border-[var(--border)] flex-shrink-0">
            
            <div className="flex items-center justify-between px-4 py-3">
              {/* الأيقونات (البحث والخيارات) أصبحت في الجهة اليسرى */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-[var(--textSecondary)]">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-[var(--textSecondary)]">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              {/* معلومات المستخدم وزر الرجوع أصبحت في الجهة اليمنى */}
              <div className="flex items-center gap-3">
                {/* زر الرجوع للجوال مع أيقونة متجهة لليسار */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-[var(--text)]"
                  onClick={() => router.push('/chats')}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10 border-2 border-[var(--primary)]">
                  <AvatarImage src={getAvatarUrl(otherUser?.avatar_url, otherUser?.username)} />
                  <AvatarFallback className="bg-[var(--primary)] text-[var(--textInverse)]">
                    {otherUser?.username?.charAt(0) || 'م'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-[var(--text)]">
                    {otherUser?.full_name || otherUser?.username || 'مستخدم'}
                  </p>
                  <p className="text-xs text-[var(--textSecondary)]">
                    {isConnected ? 'متصل' : 'غير متصل'}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* قائمة الرسائل */}
          <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0 messages-container">
            
            
                                    <div className="space-y-1">
              {messagesWithSeparators.map((item, index) => {
                if (item.type === 'separator') {
                  return <DateSeparator key={`sep-${item.date}`} date={item.date!} />;
                }
                const msg = item.message!;
                const isOwn = msg.sender_id === user?.id;
                return (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwn={isOwn}
                    showAvatar={!isOwn}
                    senderName={msg.sender_username}
                    senderAvatar={msg.sender_avatar}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* شريط الإدخال السفلي */}
          <div className="flex-shrink-0 bg-[var(--surface)] border-t border-[var(--border)]">
            
            
            <ChatInput onSend={handleSend} placeholder="اكتبي رسالة..." />
          </div>

        
        </div>

        {/* الشريط الجانبي – أصبح في اليمين ويظهر فقط على الشاشات المتوسطة فما فوق */}
        <aside className="w-[27%] border-r border-[var(--border)] hidden md:block overflow-y-auto order-last">
          <ConversationList
            conversations={conversations}
            activeId={conversationId}
            currentUserId={user?.id}
          />
        </aside>

       
      </main>

      {/* شريط التنقل السفلي للجوال */}
      <MobileBottomNav />


      <style jsx>{`
        .messages-container::-webkit-scrollbar {
          display: none;
        }
        .messages-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}