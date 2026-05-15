// Chats list page

'use client';

import Link from 'next/link';
import { MessageCircle, Search } from 'lucide-react';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, EmptyState, ErrorState } from '@/components/shared';
import { useConversations } from '@/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatRelativeTime, getAvatarUrl } from '@/lib/utils';
import { useState } from 'react';

export default function ChatsPage() {
  const { data, isLoading, error, refetch } = useConversations();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = data?.items.filter(conv => {
    const name = conv.other_participant?.username || '';
    const productTitle = conv.product_title || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      productTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo mb-6">المحادثات</h1>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--textTertiary)]" />
            <Input
              type="search"
              placeholder="ابحثي في المحادثات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
            />
          </div>

          {/* Conversations List */}
          {isLoading ? (
            <LoadingSkeleton type="list" count={5} />
          ) : error ? (
            <ErrorState onRetry={() => refetch()} />
          ) : filteredConversations && filteredConversations.length > 0 ? (
            <div className="space-y-2">
              {filteredConversations.map((conv) => {
                const otherUser = conv.other_participant;
                const lastMessageText = conv.last_message_preview;
                const lastMessageDate = conv.last_message_at;

                return (
                  <Link
                    key={conv.id}
                    href={`/chats/${conv.id}`}
                    scroll={false}

                    className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-150 active:scale-95">
                    {/* Product Image */}

                    {conv.product_image && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--surfaceMuted)] shrink-0">
                        <img
                          src={conv.product_image}
                          alt={conv.product_title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* User Avatar */}
                    <Avatar className="h-12 w-12 border-2 border-[var(--primary)] shrink-0">
                      <AvatarImage src={getAvatarUrl(otherUser?.avatar_url, otherUser?.username)} />
                      <AvatarFallback className="bg-[var(--primary)] text-[var(--textInverse)]">
                        {otherUser?.username?.charAt(0) || 'م'}
                      </AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-[var(--text)] truncate">
                          {otherUser?.username || 'مستخدم'}
                        </p>
                        {lastMessageDate && (
                          <span className="text-xs text-[var(--textTertiary)]">
                            {formatRelativeTime(lastMessageDate)}
                          </span>
                        )}
                      </div>

                      {conv.product_title && (
                        <p className="text-xs text-[var(--primary)] truncate">
                          {conv.product_title}
                        </p>
                      )}

                      {lastMessageText && (
                        <p className="text-sm text-[var(--textSecondary)] truncate">
                          {lastMessageText}
                        </p>
                      )}
                    </div>

                    {/* Unread Badge */}
                    {conv.unread_count > 0 && (
                      <Badge className="bg-[var(--primary)] text-[var(--textInverse)] shrink-0">
                        {conv.unread_count}
                      </Badge>
                    )}


              
                  </Link>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={MessageCircle}
              title="لا توجد محادثات"
              description="ابدأي محادثة مع بائعة من صفحة المنتج"
              actionLabel="تصفح الفساتين"
              actionHref="/products"
            />
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}