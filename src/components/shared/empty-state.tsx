// Empty state component

'use client';

import { LucideIcon, Package, Search, Heart, MessageCircle, Bell, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

const DEFAULT_ICONS: Record<string, LucideIcon> = {
  products: Package,
  search: Search,
  favorites: Heart,
  chats: MessageCircle,
  notifications: Bell,
  orders: ShoppingBag,
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  const IconComponent = icon || Package;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-[var(--surfaceMuted)] flex items-center justify-center mb-4">
        <IconComponent className="h-10 w-10 text-[var(--primary)]" />
      </div>
      <h3 className="text-lg font-medium text-[var(--text)] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--textSecondary)] max-w-sm mb-4">{description}</p>
      )}
      {actionLabel && (actionHref || onAction) && (
        actionHref ? (
          <Button asChild className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]">
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : (
          <Button
            onClick={onAction}
            className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
          >
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
}