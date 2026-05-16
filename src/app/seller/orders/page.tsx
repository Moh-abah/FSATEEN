// Seller orders page

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ChevronLeft, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, EmptyState } from '@/components/shared';
import { OrderCard } from '@/components/cards';
import { useSellerOrders } from '@/hooks';
import { OrderStatus } from '@/types';

const statusLabels: Record<OrderStatus, string> = {
  requested: 'جديد',
  accepted: 'مقبول',
  delivered: 'تم التسليم',
  received: 'تم الاستلام',
  completed: 'مكتمل',
  disputed: 'نزاع',
  cancelled: 'ملغي',
};

export default function SellerOrdersPage() {
  const [status, setStatus] = useState<OrderStatus | 'all'>('all');
  const [page, setPage] = useState(1);

  const { data: orders, isLoading, error } = useSellerOrders(status === 'all' ? undefined : status, page);

  const getStatusColor = (s: OrderStatus) => {
    switch (s) {
      case 'requested': return 'bg-[var(--info)]';
      case 'accepted': return 'bg-[var(--success)]';
      case 'delivered': return 'bg-[var(--warning)]';
      case 'received': return 'bg-[var(--primaryLight)]';
      case 'completed': return 'bg-[var(--successDark)]';
      case 'disputed': return 'bg-[var(--error)]';
      case 'cancelled': return 'bg-[var(--textTertiary)]';
      default: return 'bg-[var(--textTertiary)]';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-[var(--textInverse)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">طلبات المتجر</h1>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as OrderStatus | 'all')}
            >
              <SelectTrigger className="w-40 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="requested">جديد</SelectItem>
                <SelectItem value="accepted">مقبول</SelectItem>
                <SelectItem value="delivered">تم التسليم</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          {isLoading ? (
            <LoadingSkeleton type="card" count={3} />
          ) : orders?.items && orders.items.length > 0 ? (
            <div className="space-y-4">
              {orders.items.map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-[var(--surfaceMuted)] flex-shrink-0">
                        <img
                          src={order.product_image|| '/placeholder-dress.png'}
                          alt={order.product_title || 'طلب'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-[var(--text)] truncate">
                              {order.product?.title || 'طلب'}
                            </h3>
                            <p className="text-sm text-[var(--textSecondary)] mt-1">
                              المشتري: {order.buyer?.full_name || order.buyer?.username || 'غير معروف'}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} text-[var(--textInverse)]`}>
                            {statusLabels[order.status]}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[var(--primary)] font-bold">
                            {order.product_price?.toLocaleString()} ريال
                          </span>
                          <span className="text-xs text-[var(--textTertiary)]">
                            {new Date(order.created_at).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Pagination */}
              {orders.pages && orders.pages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]"
                  >
                    السابق
                  </Button>
                  <span className="flex items-center px-3 text-sm text-[var(--text)]">
                    {page} / {orders.pages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= (orders.pages || 1)}
                    onClick={() => setPage(p => p + 1)}
                    className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]"
                  >
                    التالي
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              icon={ShoppingBag}
              title="لا توجد طلبات"
              description="لم تستلمي أي طلبات بعد"
            />
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}