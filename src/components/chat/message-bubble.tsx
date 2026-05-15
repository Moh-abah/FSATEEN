// Message bubble component

'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, CheckCheck, Clock } from 'lucide-react';
import { Message } from '@/types';
import { formatTime } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  senderName?: string;
  senderAvatar?: string;
  className?: string;
}

export function MessageBubble({
  message,
  isOwn,
  showAvatar = true,
  senderName,
  senderAvatar,
  className
}: MessageBubbleProps) {
  const isImage = message.message_type === 'image';
  const isSystem = message.message_type === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-[var(--surfaceMuted)] px-4 py-2 rounded-full text-sm text-[var(--textSecondary)]">
          {message.body}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-end gap-2 mb-2',
        isOwn ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      {showAvatar && !isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderAvatar} />
          <AvatarFallback className="bg-[var(--primary)] text-[var(--textInverse)] text-xs">
            {senderName?.[0] || 'U'}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-2',
          isOwn
            ? 'bg-[var(--primary)] text-[var(--textInverse)] rounded-br-none'
            : 'bg-[var(--primary)]/30 text-[var(--text)] rounded-bl-none border border-[var(--primary)]/20 shadow-sm',
          className
        )}
      >
        {isImage ? (
          <div className="rounded-lg overflow-hidden">
            <img
              src={message.image_url || ''}
              alt="صورة"
              className="max-w-full h-auto"
              loading="lazy"
            />
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message.body}</p>
        )}

        <div
          className={cn(
            'flex items-center justify-end gap-1 mt-1',
            isOwn ? 'text-[var(--textInverse)]/70' : 'text-[var(--textTertiary)]'
          )}
        >
          <span className="text-xs">{formatTime(message.created_at)}</span>
          {isOwn && (
            <span>
              {message.is_read ? (
                <CheckCheck className="h-4 w-4 text-[var(--info)]" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}