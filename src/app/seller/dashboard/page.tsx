// Seller dashboard page

'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  Star,
  DollarSign,
  Eye,
  Heart,
  Plus,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, ErrorState, RatingStars } from '@/components/shared';
import { useSellerDashboard, useSellerProducts, useSellerOrders } from '@/hooks';
import { formatCurrency } from '@/lib/utils';

export default function SellerDashboardPage() {
  const { data: dashboard, isLoading: dashboardLoading, error } = useSellerDashboard();
  const { data: products } = useSellerProducts(1, 4);
  const { data: orders } = useSellerOrders(undefined, 1, 4);

  if (dashboardLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <LoadingSkeleton type="card" count={4} />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <ErrorState onRetry={() => window.location.reload()} />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  const stats = [
    { label: 'إجمالي المبيعات', value: formatCurrency(dashboard.total_revenue || 0), icon: DollarSign, color: 'text-[var(--success)]' },
    { label: 'الطلبات', value: dashboard.total_orders || 0, icon: ShoppingBag, color: 'text-[var(--info)]' },
    { label: 'المنتجات', value: dashboard.total_products || 0, icon: Package, color: 'text-[var(--primaryLight)]' },
    { label: 'المشاهدات', value: dashboard.total_views || 0, icon: Eye, color: 'text-[var(--warning)]' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-[var(--textInverse)]" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">لوحة البائعة</h1>
            </div>
            <Button asChild className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]">
              <Link href="/seller/products/new">
                <Plus className="h-4 w-4 ml-2" />
                إضافة منتج
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="border border-[var(--border)] bg-[var(--surface)]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--textSecondary)]">{stat.label}</p>
                      <p className={`text-2xl font-bold mt-1 ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color} opacity-20`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rating */}
          <Card className="border border-[var(--border)] bg-[var(--surface)] mb-8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-[var(--primary)]" />
                  <div>
                    <p className="text-sm text-[var(--textSecondary)]">تقييمك</p>
                    <RatingStars rating={dashboard.rating || 0} size="md" />
                  </div>
                </div>
                <span className="text-sm text-[var(--textSecondary)]">
                  {dashboard.total_ratings || 0} تقييم
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Products */}
            <Card className="border border-[var(--border)] bg-[var(--surface)]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-[var(--primary)]">منتجاتي</CardTitle>
                <Button variant="link" asChild className="text-[var(--primary)]">
                  <Link href="/seller/products">
                    عرض الكل
                    <ChevronLeft className="h-4 w-4 mr-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {products?.items && products.items.length > 0 ? (
                  <div className="space-y-3">
                    {products.items.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--surfaceMuted)]">
                          <img
                            src={product.images?.[0]?.url || '/placeholder-dress.png'}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--text)] truncate">{product.title}</p>
                          <p className="text-[var(--primary)] text-sm">{formatCurrency(product.price)}</p>
                        </div>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'} className={product.status === 'active' ? 'bg-[var(--success)] text-[var(--textInverse)]' : 'bg-[var(--textTertiary)] text-[var(--textInverse)]'}>
                          {product.status === 'active' ? 'نشط' : product.status === 'sold' ? 'مباع' : 'منتهي'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-[var(--textSecondary)]">لا توجد منتجات</p>
                    <Button variant="link" asChild className="text-[var(--primary)]">
                      <Link href="/seller/products/new">أضيفي منتجك الأول</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="border border-[var(--border)] bg-[var(--surface)]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-[var(--primary)]">طلبات حديثة</CardTitle>
                <Button variant="link" asChild className="text-[var(--primary)]">
                  <Link href="/seller/orders">
                    عرض الكل
                    <ChevronLeft className="h-4 w-4 mr-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {orders?.items && orders.items.length > 0 ? (
                  <div className="space-y-3">
                    {orders.items.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--surfaceMuted)]">
                          <img
                            src={order.product?.primary_image || '/placeholder-dress.png'}
                            alt={order.product_title || 'طلب'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--text)] truncate">{order.product_title}</p>
                          <p className="text-[var(--primary)] text-sm">{formatCurrency(order.product_price)}</p>
                        </div>
                        <Badge className="bg-[var(--info)] text-[var(--textInverse)]">
                          {order.status === 'requested' ? 'جديد' : order.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-[var(--textSecondary)]">لا توجد طلبات</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2 border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]">
              <Link href="/seller/products">
                <Package className="h-6 w-6 text-[var(--primary)]" />
                <span>المنتجات</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2 border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]">
              <Link href="/seller/orders">
                <ShoppingBag className="h-6 w-6 text-[var(--primary)]" />
                <span>الطلبات</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2 border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]">
              <Link href="/seller/auctions/new">
                <TrendingUp className="h-6 w-6 text-[var(--primary)]" />
                <span>إنشاء مزاد</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2 border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]">
              <Link href="/seller/store-settings">
                <Users className="h-6 w-6 text-[var(--primary)]" />
                <span>إعدادات المتجر</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}