'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation'; // إضافة
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Conversation } from '@/types';
import { formatDistanceToNow } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  currentUserId?: string;
}

export function ConversationList({ conversations, activeId, currentUserId }: ConversationListProps) {
  const router = useRouter(); // إضافة
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const query = searchQuery.toLowerCase().trim();
    return conversations.filter(conv => {
      const username = conv.other_participant?.username?.toLowerCase() || '';
      const productTitle = conv.product_title?.toLowerCase() || '';
      const lastMessage = conv.last_message_preview?.toLowerCase() || '';
      return username.includes(query) || productTitle.includes(query) || lastMessage.includes(query);
    });
  }, [conversations, searchQuery]);

  if (conversations.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--textSecondary)]">
        <p>لا توجد محادثات</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-[var(--border)]">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--textSecondary)]" />
          <Input
            type="text"
            placeholder="بحث في المحادثات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9 w-full bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textSecondary)]"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 h-full">
        <div className="divide-y divide-[var(--border)]">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-[var(--textSecondary)]">
              <p>لا توجد نتائج بحث</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const otherUser = conversation.other_participant;
              const isActive = conversation.id === activeId;

              return (
                <div
                  key={conversation.id}
                  onClick={() => router.push(`/chats/${conversation.id}`, { scroll: false })}
                  className={`cursor-pointer flex items-center gap-3 p-4 hover:bg-[var(--surfaceMuted)] transition-colors flex-row-reverse ${isActive ? 'bg-[var(--primary)]/30' : ''
                    }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={otherUser?.avatar_url ?? undefined} />
                      <AvatarFallback className="bg-[var(--primary)] text-[var(--textInverse)]">
                        {otherUser?.username?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.unread_count > 0 && (
                      <Badge className="absolute -top-1 -left-1 h-5 w-5 p-0 flex items-center justify-center bg-[var(--error)] text-[var(--textInverse)]">
                        {conversation.unread_count}
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center justify-between flex-row-reverse">
                      <p className="font-medium truncate text-[var(--text)]">
                        {otherUser?.username || 'مستخدم'}
                      </p>
                      {conversation.last_message_at && (
                        <span className="text-xs text-[var(--textSecondary)]">
                          {formatDistanceToNow(conversation.last_message_at)}
                        </span>
                      )}
                    </div>

                    {conversation.product_title && (
                      <p className="text-xs text-[var(--primary)] truncate">
                        {conversation.product_title}
                      </p>
                    )}

                    {conversation.last_message_preview && (
                      <p className="text-sm text-[var(--textSecondary)] truncate">
                        {conversation.last_message_preview}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}