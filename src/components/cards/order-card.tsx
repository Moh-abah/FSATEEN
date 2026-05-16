// Order card component

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Package, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';
import { formatCurrency, formatDate, getOrderStatusLabel, cn } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
  role?: 'buyer' | 'seller';
}

export function OrderCard({ order, role }: OrderCardProps) {
  const primaryImage = order.product_image|| '/placeholder-dress.png';

  return (
    <Link href={`/orders/${order.id}`}>
      <Card className="overflow-hidden border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-md bg-[var(--surface)]">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Product Image */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[var(--surfaceMuted)] shrink-0">
              <Image
                src={primaryImage}
                alt={order.product?.title || 'طلب'}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            {/* Order Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-[var(--text)] line-clamp-1 text-sm">
                  {order.product?.title}
                </h3>
                <Badge
                  className={cn(
                    "shrink-0 text-[var(--textInverse)]",
                    order.status === 'completed' && "bg-[var(--success)]",
                    order.status === 'cancelled' && "bg-[var(--textTertiary)]",
                    order.status === 'disputed' && "bg-[var(--error)]",
                    order.status === 'requested' && "bg-[var(--warning)]",
                    (order.status === 'accepted' || order.status === 'delivered' || order.status === 'received') && "bg-[var(--info)]"
                  )}
                >
                  {getOrderStatusLabel(order.status)}
                </Badge>
              </div>

              {/* Price */}
              <p className="text-lg font-bold text-[var(--primary)] font-cairo mt-1">
                {formatCurrency(order.product_price)}
              </p>

              {/* Order Details */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--textSecondary)] mt-2">
                <div className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  <span>
                    {role === 'seller'
                      ? `المشترية: ${order.buyer?.full_name || order.buyer?.username || 'غير معروف'}`
                      : `البائعة: ${order.seller?.full_name || order.seller?.username || 'غير معروف'}`
                    }
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(order.created_at)}</span>
                </div>
              </div>

              {/* Delivery Method */}
              {order.delivery_method && (
                <div className="flex items-center gap-1 text-xs text-[var(--textSecondary)] mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>
                    {order.delivery_method === 'meetup' ? 'استلام شخصي' : 'شحن'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}