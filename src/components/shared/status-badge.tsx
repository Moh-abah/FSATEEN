// Status badge component

'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  type?: 'order' | 'product' | 'auction' | 'user';
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  // Order statuses
  requested: { label: 'قيد الطلب', className: 'bg-[var(--warning)] text-[var(--textInverse)]' },
  accepted: { label: 'مقبول', className: 'bg-[var(--info)] text-[var(--textInverse)]' },
  delivered: { label: 'تم التسليم', className: 'bg-[var(--primaryLight)] text-[var(--textInverse)]' },
  received: { label: 'تم الاستلام', className: 'bg-[var(--primary)] text-[var(--textInverse)]' },
  completed: { label: 'مكتمل', className: 'bg-[var(--success)] text-[var(--textInverse)]' },
  disputed: { label: 'في نزاع', className: 'bg-[var(--error)] text-[var(--textInverse)]' },
  cancelled: { label: 'ملغي', className: 'bg-[var(--textTertiary)] text-[var(--textInverse)]' },

  // Product statuses
  active: { label: 'نشط', className: 'bg-[var(--success)] text-[var(--textInverse)]' },
  sold: { label: 'مباع', className: 'bg-[var(--primaryDark)] text-[var(--textInverse)]' },
  expired: { label: 'منتهي', className: 'bg-[var(--textTertiary)] text-[var(--textInverse)]' },
  hidden: { label: 'مخفي', className: 'bg-[var(--textTertiary)] text-[var(--textInverse)]' },

  // Auction statuses
  pending: { label: 'قيد الانتظار', className: 'bg-[var(--warning)] text-[var(--textInverse)]' },
  ended: { label: 'منتهي', className: 'bg-[var(--textTertiary)] text-[var(--textInverse)]' },

  // User verification
  verified: { label: 'موثق', className: 'bg-[var(--primary)] text-[var(--textInverse)]' },
  unverified: { label: 'غير موثق', className: 'bg-[var(--textTertiary)] text-[var(--textInverse)]' },
};

export function StatusBadge({ status, type = 'order' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    className: 'bg-[var(--textTertiary)] text-[var(--textInverse)]'
  };

  return (
    <Badge className={cn('text-[var(--textInverse)]', config.className)}>
      {config.label}
    </Badge>
  );
}